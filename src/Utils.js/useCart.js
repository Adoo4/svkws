// src/hooks/useCart.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";
import { debounce } from "lodash";
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
      return res.data; // backend sends items, totalCart, delivery, totalWithDelivery
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: isSignedIn,
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
    onMutate: async () => {
      await queryClient.cancelQueries(["cart"]);
      const previousCart = queryClient.getQueryData(["cart"]);
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

  // 🔹 Update cart quantity
  const updateMutation = useMutation({
    mutationFn: async ({ bookId, quantity }) => {
      const token = await getToken({ template: "backend" });
      return axios.patch(
        "https://backendsvkwbshp.onrender.com/api/cart",
        { bookId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["cart"]);
      const previousCart = queryClient.getQueryData(["cart"]);
      return { previousCart };
    },
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["cart"], ctx.previousCart);
      enqueueSnackbar("Greška pri ažuriranju korpe", { variant: "error" });
    },
  });

  // 🔹 Remove item
  const removeMutation = useMutation({
    mutationFn: async (bookId) => {
      const token = await getToken({ template: "backend" });
      return axios.delete(
        `https://backendsvkwbshp.onrender.com/api/cart/${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["cart"]);
      const previousCart = queryClient.getQueryData(["cart"]);
      return { previousCart };
    },
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["cart"], ctx.previousCart);
      enqueueSnackbar("Greška pri uklanjanju iz korpe", { variant: "error" });
    },
  });

  // 🔹 Clear cart
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken({ template: "backend" });
      return axios.delete(
        "https://backendsvkwbshp.onrender.com/api/cart",
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.setQueryData(["cart"], {
        items: [],
        totalCart: 0,
        delivery: 0,
        totalWithDelivery: 0,
      });
      enqueueSnackbar("Korpa je očišćena", { variant: "success" });
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      enqueueSnackbar("Greška pri čišćenju korpe", { variant: "error" });
    },
  });

  // 🔹 Debounced wrappers for UX
  const debouncedAddToCart = useMemo(
    () => debounce((book) => addMutation.mutate({ book }), 200),
    [addMutation]
  );
  const debouncedUpdateCartItem = useMemo(
    () => debounce((bookId, quantity) => updateMutation.mutate({ bookId, quantity }), 250),
    [updateMutation]
  );
  const debouncedRemoveCartItem = useMemo(
    () => debounce((bookId) => removeMutation.mutate(bookId), 200),
    [removeMutation]
  );

  return {
    cart: data || { items: [], totalCart: 0, delivery: 0, totalWithDelivery: 0 },
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
