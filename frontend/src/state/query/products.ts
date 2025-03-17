import { useQuery } from "@tanstack/react-query";
import { FetchAllProductsResponse, FetchProductResponse, PRODUCTS_URL } from "../types";

async function fetchProductsPage(skip: number, limit: number, search: string): Promise<FetchAllProductsResponse> {
  const res = await fetch(`${PRODUCTS_URL}?limit=${limit}&skip=${skip}${search && `&search=${search}`}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json()
}

/**
 * Takes in a JSONApi link url and returns the page number query param or 1 if it doesnt exist
 * @param link - JSONApi link url
 * @returns number
 */
export function getPageParam(link: string): number {
  const params = new URL(link).searchParams;
  const page = params.get('page[number]');
  if (page) {
    return parseInt(page);
  }
  return 1;
}

export function useFetchProducts(page = 1, limit = 10, search = '') {
  const skip = (page - 1) * limit;
  return useQuery({
    queryKey: ['products', page, limit, search],
    queryFn: () => fetchProductsPage(skip, limit, search),
  })
}

export function useFetchProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<FetchProductResponse> => {
      const res = await fetch(`${PRODUCTS_URL}/${id}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    }
  });
}
