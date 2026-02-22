import type { OrderRequest } from '../types/requests/OrderRequest';
import type { Order } from '../types/ui/Order';
import { api } from './api';


export const OrderService = {
  createOrder: async (payload: OrderRequest): Promise<string> => {
    const response = await api.post('/orders', payload);
    return response.data.orderId;
  },
  
  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  getMyOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders/my-orders');
    return response.data;
  }
};