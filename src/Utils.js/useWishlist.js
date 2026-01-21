// src/hooks/useWishlist.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const API_URL = "https://backendsvkwbshp.onrender.com/api/wishlist";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const { isSignedIn, getToken, isLoaded } = useAuth();

  // --- Helper to get auth headers ---
  const getAuthHeaders = async () => {
    if (!isSignedIn) return {};
    const token = await getToken({ template: "backend" });
    return { Authorization: `Bearer ${token}` };
  };

  // --- FETCH WISHLIST ---
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const headers = await getAuthHeaders();
      const res = await axios.get(API_URL, { headers });
      return res.data.items || [];
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: isLoaded && isSignedIn,
  });

  // --- ADD TO WISHLIST ---
  const addMutation = useMutation({
    mutationFn: async (book) => {
      const headers = await getAuthHeaders();
      return axios.post(API_URL, { bookId: book._id }, { headers });
    },
    onMutate: async (book) => {
      await queryClient.cancelQueries(["wishlist"]);
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old = []) =>
        old.some((b) => b._id === book._id) ? old : [...old, book]
      );

      return { previousWishlist };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], context.previousWishlist);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  // --- REMOVE FROM WISHLIST ---
  const removeMutation = useMutation({
    mutationFn: async (bookId) => {
      const headers = await getAuthHeaders();
      return axios.delete(`${API_URL}/${bookId}`, { headers });
    },
    onMutate: async (bookId) => {
      await queryClient.cancelQueries(["wishlist"]);
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old = []) =>
        old.filter((b) => b._id !== bookId)
      );

      return { previousWishlist };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], context.previousWishlist);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  // --- CLEAR WISHLIST ---
  const clearMutation = useMutation({
    mutationFn: async () => {
      const headers = await getAuthHeaders();
      return axios.delete(API_URL, { headers });
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["wishlist"]);
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], []);
      return { previousWishlist };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], context.previousWishlist);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  return {
    wishlist: data || [],
    isLoading,
    isError,
    addToWishlist: (book) => addMutation.mutate(book),
    removeFromWishlist: (bookId) => removeMutation.mutate(bookId),
    clearWishlist: () => clearMutation.mutate(),
  };
};

export default useWishlist;
