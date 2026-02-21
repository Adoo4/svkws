// src/Utils.js/useTempOrder.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";

export const useTempOrder = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { getToken } = useAuth();

  const createTempOrderMutation = useMutation({
    mutationFn: async (tempOrder) => {
      // get Clerk JWT token for backend auth
      const token = await getToken({ template: "backend" });
console.log("ORDER TOKEN:", token);
      const { data } = await axios.post(
        "https://backendsvkwbshp.onrender.com/api/order/create-temp",
        tempOrder,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    onSuccess: (data) => {
      enqueueSnackbar("Privremena narudžba sačuvana!", { variant: "success" });
      queryClient.invalidateQueries(["tempOrders"]);
    },
    onError: (error) => {
  
      enqueueSnackbar("Greška pri kreiranju privremene narudžbe.", { variant: "error" });
    },
  });

  return {
    createTempOrder: createTempOrderMutation.mutateAsync, // async/await friendly
    isCreating: createTempOrderMutation.isPending,
  };
};
