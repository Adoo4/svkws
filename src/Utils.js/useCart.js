// src/hooks/useCart.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";
import { debounce } from "lodash"; // 👈 import lodash debounce
import { useMemo } from "react";

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
    return res.data.items.map((i) => ({ ...i.book, quantity: i.quantity }));
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
      queryClient.setQueryData(["cart"], (old = []) => {
        const exists = old.find((item) => item._id === book._id);
        return exists
          ? old.map((item) =>
              item._id === book._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...old, { ...book, quantity: 1 }];
      });
      return { previousCart };
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["cart"], ctx.previousCart);
      enqueueSnackbar("Greška pri dodavanju u korpu", { variant: "error" });
    },
    onSuccess: () => {
      enqueueSnackbar("Proizvod dodan u korpu", { variant: "success" });
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
      queryClient.setQueryData(["cart"], (old) =>
        old.map((item) =>
          item._id === bookId ? { ...item, quantity } : item
        )
      );
      return { previousCart };
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["cart"], ctx.previousCart);
      enqueueSnackbar("Greška pri ažuriranju korpe", { variant: "error" });
    },
  });

const clearCartMutation = useMutation({
  mutationFn: async () => {
    const token = await getToken({ template: "backend" });
    await axios.delete("https://backendsvkwbshp.onrender.com/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  onSuccess: () => {
    queryClient.setQueryData(["cart"], []);
    enqueueSnackbar("Korpa je očišćena", { variant: "success" });
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
      queryClient.setQueryData(["cart"], (old) =>
        old.filter((item) => item._id !== bookId)
      );
      return { previousCart };
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["cart"], ctx.previousCart);
      enqueueSnackbar("Greška pri uklanjanju iz korpe", { variant: "error" });
    },
  });

  const debouncedAddToCart = useMemo(
    () => debounce((book) => addMutation.mutate({ book }), 200),
    [addMutation]
  );

  const debouncedRemoveCartItem = useMemo(
    () => debounce((bookId) => removeMutation.mutate(bookId), 200),
    [removeMutation]
  );

 return {
    cart: data || [],
    isLoading,
    isError,
    addToCart: debouncedAddToCart,       // 👈 use debounced version
    updateCartItem: debouncedUpdateCartItem,
    removeCartItem: debouncedRemoveCartItem, // 👈 use debounced version
    clearCart: clearCartMutation.mutate,
    isAdding: addMutation.isPending,
  };
};

export default useCart;


/*  STARI useCart Hook*/

/*
// src/hooks/useCart.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react"; // <-- import useAuth

const useCart = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { isSignedIn, getToken } = useAuth(); // <-- destructure hook

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
     const token = await getToken({ template: "backend" }); // 👈 pravi JWT
      console.log("Clerk token:", token);
      console.log("Signed in?", isSignedIn);


      const res = await axios.get(
        "https://backendsvkwbshp.onrender.com/api/cart",
        { headers: { Authorization: `Bearer ${token}` } }
        
      );
      

      return res.data.items.map((i) => ({ ...i.book, quantity: i.quantity }));
    },
    staleTime: 5 * 60 * 1000,
  });

  const addMutation = useMutation({
  mutationFn: async ({ book }) => {
    const token = await getToken();
    return axios.post(
      "https://backendsvkwbshp.onrender.com/api/cart",
      { bookId: book._id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  onMutate: async ({ book }) => {
    await queryClient.cancelQueries(["cart"]);

    const previousCart = queryClient.getQueryData(["cart"]);

    // optimistic update
    queryClient.setQueryData(["cart"], (old = []) => {
      const exists = old.find((item) => item._id === book._id);
      if (exists) {
        return old.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...old, { ...book, quantity: 1 }];
    });

    return { previousCart };
  },
  onError: (_err, _vars, context) => {
    // rollback if backend fails
    queryClient.setQueryData(["cart"], context.previousCart);
    enqueueSnackbar("Greška pri dodavanju u korpu", { variant: "error" });
  },
  onSuccess: () => {
    enqueueSnackbar("Proizvod dodan u korpu", { variant: "success" });
  },
  onSettled: () => {
    queryClient.invalidateQueries(["cart"]);
  },
});


const updateMutation = useMutation({
  mutationFn: async ({ bookId, quantity }) => {
    const token = await getToken();
    return axios.patch(
      "https://backendsvkwbshp.onrender.com/api/cart",
      { bookId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  onMutate: async ({ bookId, quantity }) => {
    await queryClient.cancelQueries(["cart"]);

    const previousCart = queryClient.getQueryData(["cart"]);

    // optimistic update
    queryClient.setQueryData(["cart"], (old) =>
      old.map((item) =>
        item._id === bookId ? { ...item, quantity } : item
      )
    );

    return { previousCart };
  },
  onError: (_err, _vars, context) => {
    // rollback
    queryClient.setQueryData(["cart"], context.previousCart);
    enqueueSnackbar("Greška pri ažuriranju korpe", { variant: "error" });
  },
  onSettled: () => {
    queryClient.invalidateQueries(["cart"]);
  },
});

 const removeMutation = useMutation({
  mutationFn: async (bookId) => {
    const token = await getToken();
    return axios.delete(
      `https://backendsvkwbshp.onrender.com/api/cart/${bookId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  onMutate: async (bookId) => {
    await queryClient.cancelQueries(["cart"]);

    const previousCart = queryClient.getQueryData(["cart"]);

    queryClient.setQueryData(["cart"], (old) =>
      old.filter((item) => item._id !== bookId)
    );

    return { previousCart };
  },
  onError: (_err, _vars, context) => {
    queryClient.setQueryData(["cart"], context.previousCart);
    enqueueSnackbar("Greška pri uklanjanju iz korpe", { variant: "error" });
  },
  onSettled: () => {
    queryClient.invalidateQueries(["cart"]);
  },
});

  const addToCart = (book) => addMutation.mutate({ book });
  const updateCartItem = (bookId, quantity) =>
    updateMutation.mutate({ bookId, quantity });
  const removeCartItem = (bookId) => removeMutation.mutate(bookId);

  return {
    cart: data || [],
    isLoading,
    isError,
    addToCart,
    updateCartItem,
    removeCartItem,
  };
};

export default useCart;


*/


