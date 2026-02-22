import type { Product } from '../types/ui/Product';
import { api } from './api';

export const ProductService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  }
};