// src/hooks/useCart.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState, useCallback } from "react";

const useCart = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { isSignedIn, getToken } = useAuth();
  const [pendingAddBookIds, setPendingAddBookIds] = useState(() => new Set());

  const cartKey = useMemo(() => ["cart"], []);
  const emptyCart = useMemo(
    () => ({ items: [], totalCart: 0, delivery: 0, totalWithDelivery: 0 }),
    [],
  );

  const getBookId = useCallback((book) => book?._id || book?.id, []);

  const getBookPrice = useCallback((book) => {
    const price = book?.discountedPrice ?? book?.mpc ?? book?.price ?? 0;
    return Number(price) || 0;
  }, []);

  const recalculateCart = useCallback(
    (cart) => {
      const items = (cart?.items || []).map((item) => {
        const quantity = Number(item.quantity) || 0;
        const price = getBookPrice(item.book);
        return {
          ...item,
          quantity,
          itemTotal: price * quantity,
        };
      });
      const totalCart = items.reduce((sum, item) => sum + (item.itemTotal || 0), 0);
      const delivery = Number(cart?.delivery) || 0;

      return {
        ...emptyCart,
        ...cart,
        items,
        totalCart,
        totalWithDelivery: totalCart + delivery,
      };
    },
    [emptyCart, getBookPrice],
  );

  const optimisticallyAddBook = useCallback(
    (currentCart, book) => {
      const bookId = getBookId(book);
      const cart = currentCart || emptyCart;
      const items = [...(cart.items || [])];
      const existingIndex = items.findIndex((item) => getBookId(item.book) === bookId);

      if (existingIndex >= 0) {
        const currentItem = items[existingIndex];
        items[existingIndex] = {
          ...currentItem,
          quantity: (Number(currentItem.quantity) || 0) + 1,
        };
      } else {
        items.push({
          book,
          quantity: 1,
          itemTotal: getBookPrice(book),
        });
      }

      return recalculateCart({ ...cart, items });
    },
    [emptyCart, getBookId, getBookPrice, recalculateCart],
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: cartKey,
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
      const bookId = getBookId(book);
      if (!bookId) {
        throw new Error("Missing book id");
      }

      const token = await getToken({ template: "backend" });
      return axios.post(
        "https://backendsvkwbshp.onrender.com/api/cart",
        { bookId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
    onMutate: async ({ book }) => {
      const bookId = getBookId(book);
      if (bookId) {
        setPendingAddBookIds((prev) => {
          const next = new Set(prev);
          next.add(bookId);
          return next;
        });
      }

      await queryClient.cancelQueries({ queryKey: cartKey });
      const previousCart = queryClient.getQueryData(cartKey);
      queryClient.setQueryData(cartKey, (currentCart) =>
        optimisticallyAddBook(currentCart, book),
      );

      return { previousCart, bookId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKey });
      enqueueSnackbar("Proizvod dodan u korpu", { variant: "success" });
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousCart) {
        queryClient.setQueryData(cartKey, ctx.previousCart);
      }
      enqueueSnackbar("Greska pri dodavanju u korpu", { variant: "error" });
    },
    onSettled: (_data, _error, vars, ctx) => {
      const bookId = ctx?.bookId || getBookId(vars?.book);
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
      await queryClient.cancelQueries({ queryKey: cartKey });
      const previousCart = queryClient.getQueryData(cartKey);
      return { previousCart };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKey }),
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousCart) {
        queryClient.setQueryData(cartKey, ctx.previousCart);
      }
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
      await queryClient.cancelQueries({ queryKey: cartKey });
      const previousCart = queryClient.getQueryData(cartKey);
      return { previousCart };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKey }),
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousCart) {
        queryClient.setQueryData(cartKey, ctx.previousCart);
      }
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
      queryClient.setQueryData(cartKey, emptyCart);
      enqueueSnackbar("Korpa je ociscena", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: cartKey });
    },
    onError: () => {
      enqueueSnackbar("Greska pri ciscenju korpe", { variant: "error" });
    },
  });

  const debouncedAddToCart = useMemo(
    () =>
      debounce((book) => {
        if (!isSignedIn) {
          enqueueSnackbar("Morate biti prijavljeni da dodate knjige u korpu", {
            variant: "warning",
          });
          return;
        }

        if (!getBookId(book)) {
          enqueueSnackbar("Greska pri dodavanju u korpu", { variant: "error" });
          return;
        }

        addMutation.mutate({ book });
      }, 200),
    [addMutation, enqueueSnackbar, getBookId, isSignedIn],
  );
  const debouncedUpdateCartItem = useMemo(
    () => debounce((bookId, quantity) => updateMutation.mutate({ bookId, quantity }), 250),
    [updateMutation],
  );
  const debouncedRemoveCartItem = useMemo(
    () => debounce((bookId) => removeMutation.mutate(bookId), 200),
    [removeMutation],
  );

  useEffect(() => {
    return () => {
      debouncedAddToCart.cancel();
      debouncedUpdateCartItem.cancel();
      debouncedRemoveCartItem.cancel();
    };
  }, [debouncedAddToCart, debouncedUpdateCartItem, debouncedRemoveCartItem]);

  const isAddingBook = useCallback(
    (bookId) => pendingAddBookIds.has(bookId),
    [pendingAddBookIds],
  );

  return {
    cart: data || emptyCart,
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
