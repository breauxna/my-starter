export const BASE_API_URL = 'http://localhost:3000';
export const PRODUCTS_URL = `${BASE_API_URL}/products`;

export type Status = 'error' | 'loading' | 'ok';

/**
 * ------ Base types --------
 */

/**
 * ------ Data types --------
 */

export interface ProductsAPIData {
  _id: string,
  name: string,
  description: string,
  price: number,
  imageUrl: string,
}

interface PaginationAPIData {
  totalItems: number;
  totalPages: number; 
}

/**
 * ------ Response types --------
 */
export interface FetchAllProductsResponse {
  data: ProductsAPIData[];
  pagination: PaginationAPIData;
}

export interface FetchProductResponse {
  data: ProductsAPIData;
}