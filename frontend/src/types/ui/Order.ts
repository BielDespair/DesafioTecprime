// O que criamos no React:
export interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  paymentMethod: string;
  items: OrderItem[]; 
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number; 
}