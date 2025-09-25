import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";

const useWishlist = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { isSignedIn, getToken } = useAuth();

  // Fetch Wishlist
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const token = await getToken({ template: "backend" });
      const res = await axios.get(
        "https://backendsvkwbshp.onrender.com/api/wishlist",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.items; // array of book objects
    },
    enabled: isSignedIn,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // Add to Wishlist
  const addMutation = useMutation({
    mutationFn: async ({ bookId }) => {
      const token = await getToken();
      return axios.post(
        "https://backendsvkwbshp.onrender.com/api/wishlist",
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async ({ bookId }) => {
      await queryClient.cancelQueries(["wishlist"]);
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old = []) => {
        if (old.find(item => item._id === bookId)) return old;
        return [...old, { _id: bookId }];
      });

      return { previousWishlist };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["wishlist"], context.previousWishlist);
      enqueueSnackbar("Greška pri dodavanju u wishlistu", { variant: "error" });
    },
    onSuccess: () => {
      enqueueSnackbar("Proizvod dodan u wishlistu", { variant: "success" });
    },
  });

  // Remove from Wishlist
  const removeMutation = useMutation({
    mutationFn: async (bookId) => {
      const token = await getToken();
      return axios.delete(
        `https://backendsvkwbshp.onrender.com/api/wishlist/${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async (bookId) => {
      await queryClient.cancelQueries(["wishlist"]);
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old) =>
        old.filter((item) => item._id !== bookId)
      );

      return { previousWishlist };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["wishlist"], context.previousWishlist);
      enqueueSnackbar("Greška pri uklanjanju iz wishlista", { variant: "error" });
    },
    onSuccess: () => {
      enqueueSnackbar("Proizvod uklonjen iz wishlista", { variant: "success" });
    },
  });

  // Clear Wishlist
  const clearMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        "https://backendsvkwbshp.onrender.com/api/wishlist",
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["wishlist"]);
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], []);
      return { previousWishlist };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["wishlist"], context.previousWishlist);
      enqueueSnackbar("Greška pri brisanju wishlista", { variant: "error" });
    },
    onSuccess: () => {
      enqueueSnackbar("Wishlist očišćen", { variant: "success" });
    },
  });

  return {
    wishlist: data || [],
    isLoading,
    isError,
    addToWishlist: (bookId) => addMutation.mutate({ bookId }),
    removeFromWishlist: (bookId) => removeMutation.mutate(bookId),
    clearWishlist: () => clearMutation.mutate(),
  };
};

export default useWishlist;
