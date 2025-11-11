// src/hooks/useCart.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";
import { debounce } from "lodash"; // 👈 import lodash debounce
import { useMemo } from "react";
const getEffectivePrice = (book) => {
  if (book.discount && new Date(book.discount.validUntil) >= new Date()) {
    return book.price * (1 - book.discount.amount / 100);
  }
  return book.price;
};

const useCart = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { isSignedIn, getToken } = useAuth();

  // 🔹 Fetch cart
const { data, isLoading, isError } = useQuery({
  queryKey: ["cart"],
queryFn: async () => {
  const token = await getToken({ template: "backend" });
  const res = await axios.get(
    "https://backendsvkwbshp.onrender.com/api/cart",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // map items to include itemTotal
 const { items, totalWithDelivery, delivery, totalCart } = res.data;
return { items, totalWithDelivery, delivery, totalCart };


  
},
  staleTime: 5 * 60 * 1000, // cache for 5 minutes
  refetchOnWindowFocus: false, // 🔹 stop automatic refetch
  refetchOnReconnect: false,   // 🔹 stop automatic refetch
  enabled: isSignedIn,         // only fetch if signed in
});


  // 🔹 Add to cart
  const addMutation = useMutation({
    mutationFn: async ({ book }) => {
      const token = await getToken({ template: "backend" });
      return axios.post(
        "https://backendsvkwbshp.onrender.com/api/cart",
        { bookId: book._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
onMutate: async ({ book }) => {
  await queryClient.cancelQueries(["cart"]);
  const previousCart = queryClient.getQueryData(["cart"]);

  // Optimistically update cache
  queryClient.setQueryData(["cart"], (old) => {
    if (!old) return { items: [{ book, quantity: 1, itemTotal: book.price }], totalCart: book.price, totalWithDelivery: book.price, delivery: 0 };

    const idx = old.items.findIndex((i) => i.book._id === book._id);
    let newItems;
    if (idx > -1) {
      newItems = old.items.map((i) =>
        i.book._id === book._id
          ? { ...i, quantity: i.quantity + 1, itemTotal: (i.quantity + 1) * getEffectivePrice(i.book) }
          : i
      );
    } else {
      newItems = [...old.items, { book, quantity: 1, itemTotal: getEffectivePrice(book) }];
    }

    const newTotalCart = newItems.reduce((acc, i) => acc + i.itemTotal, 0);
    const delivery = old.delivery || 0;
    const totalWithDelivery = newTotalCart + delivery;

    return { ...old, items: newItems, totalCart: newTotalCart, totalWithDelivery };
  });

  return { previousCart };
},

onSuccess: () => {
  queryClient.invalidateQueries(["cart"]);
  enqueueSnackbar("Proizvod dodan u korpu", { variant: "success" });
},
onError: (_err, _vars, ctx) => {
  queryClient.setQueryData(["cart"], ctx.previousCart);
  enqueueSnackbar("Greška pri dodavanju u korpu", { variant: "error" });
},
  });

  // 🔹 Update cart
 const updateMutation = useMutation({
  mutationFn: async ({ bookId, quantity }) => {
    const token = await getToken({ template: "backend" });
    return axios.patch(
      "https://backendsvkwbshp.onrender.com/api/cart",
      { bookId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  onMutate: async ({ bookId, quantity }) => {
    await queryClient.cancelQueries(["cart"]);
    const previousCart = queryClient.getQueryData(["cart"]);

   queryClient.setQueryData(["cart"], (old) => {
  if (!old) return old;

  const newItems = old.items.map((item) =>
    item.book._id === bookId
      ? { ...item, quantity, itemTotal: getEffectivePrice(item.book) * quantity }
      : item
  );

  const newTotalCart = newItems.reduce((acc, i) => acc + i.itemTotal, 0);
  const delivery = old.delivery || 0;
  const totalWithDelivery = newTotalCart + delivery;

  return { ...old, items: newItems, totalCart: newTotalCart, totalWithDelivery };
});


    return { previousCart };
  },
  onError: (_err, _vars, ctx) => {
    queryClient.setQueryData(["cart"], ctx.previousCart);
    enqueueSnackbar("Greška pri ažuriranju korpe", { variant: "error" });
  },
});

//Clear Cart
const clearCartMutation = useMutation({
  mutationFn: async () => {
    const token = await getToken({ template: "backend" });
    await axios.delete("https://backendsvkwbshp.onrender.com/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
 onSuccess: () => {
  queryClient.setQueryData(["cart"], {
    items: [],
    totalWithDelivery: 0,
    delivery: 0,
  });
  enqueueSnackbar("Korpa je očišćena", { variant: "success" });
  queryClient.invalidateQueries(["cart"]); // optional, ensures fresh backend state
},
  onError: () => {
    enqueueSnackbar("Greška pri čišćenju korpe", { variant: "error" });
  },
});

  // 🔹 Debounced wrapper so UI can spam without 429
  const debouncedUpdateCartItem = useMemo(
    () =>
      debounce((bookId, quantity) => {
        updateMutation.mutate({ bookId, quantity });
      }, 250), // wait 250ms after last change
    [updateMutation]
  );

  // 🔹 Remove item
const removeMutation = useMutation({
  mutationFn: async (bookId) => {
    const token = await getToken({ template: "backend" });
    return axios.delete(
      `https://backendsvkwbshp.onrender.com/api/cart/${bookId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  onMutate: async (bookId) => {
    await queryClient.cancelQueries(["cart"]);
    const previousCart = queryClient.getQueryData(["cart"]);

    queryClient.setQueryData(["cart"], (old) => {
      if (!old) return old;

      const newItems = old.items.filter((item) => item.book._id !== bookId);
      const newTotalCart = newItems.reduce((acc, i) => acc + i.itemTotal, 0);
      const totalWithDelivery = newTotalCart + (old.delivery || 0);

      return {
        ...old,
        items: newItems,
        totalCart: newTotalCart,
        totalWithDelivery,
      };
    });

    return { previousCart };
  },
  onError: (_err, _vars, ctx) => {
    queryClient.setQueryData(["cart"], ctx.previousCart);
    enqueueSnackbar("Greška pri uklanjanju iz korpe", { variant: "error" });
  },
});
/*
const removeMutation = useMutation({
  mutationFn: async (bookId) => {
    const token = await getToken({ template: "backend" });
    return axios.delete(
      `https://backendsvkwbshp.onrender.com/api/cart/${bookId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  onMutate: async (bookId) => {
    await queryClient.cancelQueries(["cart"]);
    const previousCart = queryClient.getQueryData(["cart"]);

    queryClient.setQueryData(["cart"], (old) => ({
      ...old,
      items: old.items.filter((item) => item.book._id !== bookId),
    }));

    return { previousCart };
  },
  onError: (_err, _vars, ctx) => {
    queryClient.setQueryData(["cart"], ctx.previousCart);
    enqueueSnackbar("Greška pri uklanjanju iz korpe", { variant: "error" });
  },
});
*/


  const debouncedAddToCart = useMemo(
    () => debounce((book) => addMutation.mutate({ book }), 200),
    [addMutation]
  );

  const debouncedRemoveCartItem = useMemo(
    () => debounce((bookId) => removeMutation.mutate(bookId), 200),
    [removeMutation]
  );

return {
  cart: data || { items: [], totalWithDelivery: 0, delivery: 0 },
  isLoading,
  isError,
  addToCart: debouncedAddToCart,
  updateCartItem: debouncedUpdateCartItem,
  removeCartItem: debouncedRemoveCartItem,
  clearCart: clearCartMutation.mutate,
  isAdding: addMutation.isPending,
};
};

export default useCart;


