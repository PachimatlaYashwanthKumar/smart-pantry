import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import productService from "../services/product.service";
import type { ProductInput } from "../services/product.service";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      productService.getProducts(),
  });
}

export function useCreateProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: ProductInput
    ) =>
      productService.createProduct(
        data
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: ProductInput;
    }) =>
      productService.updateProduct(
        id,
        data
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      productService.deleteProduct(id),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}