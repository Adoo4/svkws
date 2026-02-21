// src/hooks/useCart.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";
import debounce from "lodash/debounce";
import { useMemo, useState, useCallback } from "react";

const useCart = () => {

  
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { isSignedIn, getToken } = useAuth();
  const [pendingAddBookIds, setPendingAddBookIds] = useState(() => new Set());

  

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = await getToken({ template: "backend" });
      const res = await axios.get(
        "https://backendsvkwbshp.onrender.com/api/cart",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: isSignedIn,
  });
  

  const addMutation = useMutation({
    mutationFn: async ({ book }) => {
      const token = await getToken({ template: "backend" });
      return axios.post(
        "https://backendsvkwbshp.onrender.com/api/cart",
        { bookId: book._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
    onMutate: async ({ book }) => {
      if (book?._id) {
        setPendingAddBookIds((prev) => {
          const next = new Set(prev);
          next.add(book._id);
          return next;
        });
      }

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
      enqueueSnackbar("Greska pri dodavanju u korpu", { variant: "error" });
    },
    onSettled: (_data, _error, vars) => {
      const bookId = vars?.book?._id;
      if (!bookId) return;
      setPendingAddBookIds((prev) => {
        const next = new Set(prev);
        next.delete(bookId);
        return next;
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ bookId, quantity }) => {
      const token = await getToken({ template: "backend" });
      return axios.patch(
        "https://backendsvkwbshp.onrender.com/api/cart",
        { bookId, quantity },
        { headers: { Authorization: `Bearer ${token}` } },
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
      enqueueSnackbar("Greska pri azuriranju korpe", { variant: "error" });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (bookId) => {
      const token = await getToken({ template: "backend" });
      return axios.delete(
        `https://backendsvkwbshp.onrender.com/api/cart/${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } },
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
      enqueueSnackbar("Greska pri uklanjanju iz korpe", { variant: "error" });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken({ template: "backend" });
      return axios.delete(
        "https://backendsvkwbshp.onrender.com/api/cart",
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
    onSuccess: () => {
      queryClient.setQueryData(["cart"], {
        items: [],
        totalCart: 0,
        delivery: 0,
        totalWithDelivery: 0,
      });
      enqueueSnackbar("Korpa je ociscena", { variant: "success" });
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      enqueueSnackbar("Greska pri ciscenju korpe", { variant: "error" });
    },
  });

  const debouncedAddToCart = useMemo(
    () => debounce((book) => addMutation.mutate({ book }), 200),
    [addMutation],
  );
  const debouncedUpdateCartItem = useMemo(
    () => debounce((bookId, quantity) => updateMutation.mutate({ bookId, quantity }), 250),
    [updateMutation],
  );
  const debouncedRemoveCartItem = useMemo(
    () => debounce((bookId) => removeMutation.mutate(bookId), 200),
    [removeMutation],
  );

  const isAddingBook = useCallback(
    (bookId) => pendingAddBookIds.has(bookId),
    [pendingAddBookIds],
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
    isAddingBook,
  };
};

export default useCart;
