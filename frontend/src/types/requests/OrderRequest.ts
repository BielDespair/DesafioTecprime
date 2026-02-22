export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  paymentMethod: 'CARTAO' | 'BOLETO' | 'PIX' | 'NUBANK';
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}


export enum PaymentMethod {
  CARTAO = 'CARTAO',
  BOLETO = 'BOLETO',
  PIX = 'PIX',
  NUBANK = 'NUBANK'
}