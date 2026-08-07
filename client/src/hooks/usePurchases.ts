import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import purchaseService from "../services/purchase.service";

export function usePurchases() {
  return useQuery({
    queryKey: ["purchases"],
    queryFn: () =>
      purchaseService.getPurchases(),
  });
}

export function useCreatePurchase() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: purchaseService.createPurchase,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["pantry"],
      });
    },
  });
}