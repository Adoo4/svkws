











// src/hooks/useWishlist.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const { isSignedIn, getToken, isLoaded } = useAuth();

  // --- FETCH WISHLIST ---
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const token = await getToken({ template: "backend" });
      const res = await axios.get(
        "https://backendsvkwbshp.onrender.com/api/wishlist",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.items;
    },
    staleTime: 5 * 60 * 1000,
    enabled: isLoaded && isSignedIn,
  });

  // --- ADD TO WISHLIST ---
  const addMutation = useMutation({
    mutationFn: async (book) => {
      const token = await getToken({ template: "backend" });
      return axios.post(
        "https://backendsvkwbshp.onrender.com/api/wishlist",
        { bookId: book._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async (book) => {
      await queryClient.cancelQueries(["wishlist"]);
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old = []) => {
        if (old.some((b) => b._id === book._id)) return old;
        return [...old, book];
      });

      return { previousWishlist };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], ctx.previousWishlist);
      }
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["wishlist"]);
      }, 2000);
    },
  });

  // --- REMOVE FROM WISHLIST ---
  const removeMutation = useMutation({
    mutationFn: async (bookId) => {
      const token = await getToken({ template: "backend" });
      return axios.delete(
        `https://backendsvkwbshp.onrender.com/api/wishlist/${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async (bookId) => {
      await queryClient.cancelQueries(["wishlist"]);
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old = []) =>
        old.filter((b) => b._id !== bookId)
      );

      return { previousWishlist };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], ctx.previousWishlist);
      }
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["wishlist"]);
      }, 2000);
    },
  });

  // --- CLEAR WISHLIST ---
  const clearMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken({ template: "backend" });
      return axios.delete(
        `https://backendsvkwbshp.onrender.com/api/wishlist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["wishlist"]);
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], []);
      return { previousWishlist };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], ctx.previousWishlist);
      }
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["wishlist"]);
      }, 2000);
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































/*{// src/hooks/useWishlist.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const { isSignedIn, getToken, isLoaded } = useAuth(); // 🔹 add isLoaded

  // --- FETCH WISHLIST ---
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const token = await getToken({ template: "backend" });
      const res = await axios.get(
        "https://backendsvkwbshp.onrender.com/api/wishlist",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.items;
    },
    staleTime: 5 * 60 * 1000,
    enabled: isLoaded && isSignedIn, // 🔹 wait until auth is loaded
  });

  // --- ADD TO WISHLIST ---
  const addMutation = useMutation({
    mutationFn: async (book) => {
      const token = await getToken({ template: "backend" });
      return axios.post(
        "https://backendsvkwbshp.onrender.com/api/wishlist",
        { bookId: book._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async (book) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData({ queryKey: ["wishlist"] }, (old = []) => {
        if (old.some((b) => b._id === book._id)) return old;
        return [...old, book];
      });

      return { previousWishlist };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousWishlist) {
       queryClient.setQueryData(["wishlist"], ctx.previousWishlist);
      }
    },
    onSettled: () => {
      setTimeout(() => {
    queryClient.invalidateQueries(["wishlist"]);
  }, 2000);
    },
  });

  // --- REMOVE FROM WISHLIST ---
  const removeMutation = useMutation({
    mutationFn: async (bookId) => {
      const token = await getToken({ template: "backend" });
      return axios.delete(
        `https://backendsvkwbshp.onrender.com/api/wishlist/${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previousWishlist = queryClient.getQueryData({ queryKey: ["wishlist"] });

      queryClient.setQueryData({ queryKey: ["wishlist"] }, (old = []) =>
        old.filter((b) => b._id !== bookId)
      );

      return { previousWishlist };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousWishlist) {
        queryClient.setQueryData({ queryKey: ["wishlist"] }, ctx.previousWishlist);
      }
    },
    onSettled: () => {setTimeout(() => {
    queryClient.invalidateQueries(["wishlist"]);
  }, 2000);},
  });


  // --- CLEAR WISHLIST ---
const clearMutation = useMutation({
  mutationFn: async () => {
    const token = await getToken({ template: "backend" });
    return axios.delete(
      `https://backendsvkwbshp.onrender.com/api/wishlist`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  onMutate: async () => {
    await queryClient.cancelQueries({ queryKey: ["wishlist"] });
    const previousWishlist = queryClient.getQueryData({ queryKey: ["wishlist"] });

    queryClient.setQueryData({ queryKey: ["wishlist"] }, []);
    return { previousWishlist };
  },
  onError: (_err, _vars, ctx) => {
    if (ctx?.previousWishlist) {
      queryClient.setQueryData({ queryKey: ["wishlist"] }, ctx.previousWishlist);
    }
  },
  onSettled: () => {
    setTimeout(() => {
    queryClient.invalidateQueries(["wishlist"]);
  }, 2000);
  },
});


  return {
    wishlist: data || [],
    isLoading,
    isError,
    addToWishlist: (book) => addMutation.mutate(book),
    removeFromWishlist: (bookId) => removeMutation.mutate(bookId),
     clearWishlist: () => clearMutation.mutate(), // ✅ expose function,
  };
};

export default useWishlist;

*/