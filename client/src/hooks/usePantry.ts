import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import pantryService from "../services/pantry.service";

export function usePantry() {
  return useQuery({
    queryKey: ["pantry"],
    queryFn: () =>
      pantryService.getPantry(),
  });
}

export function useConsumeStock() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      quantity,
    }: {
      id: string;
      quantity: number;
    }) =>
      pantryService.consumeStock(
        id,
        quantity
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["pantry"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
}