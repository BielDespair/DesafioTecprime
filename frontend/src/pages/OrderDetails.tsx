import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { OrderService } from '../services/orderService';
import { ProductService } from '../services/productService';
import './OrderDetails.css';
import type { Order } from '../types/ui/Order';
import type { Product } from '../types/ui/Product';

export function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    Promise.all([
      OrderService.getOrderById(id),
      ProductService.getAll()
    ])
      .then(([orderData, catalogData]) => {
        setOrder(orderData);
        setCatalog(catalogData);
        setLoading(false);
      })
      .catch(err => {
        setError('Pedido não encontrado ou erro ao carregar dados.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando detalhes...</div>;
  if (error) return <div style={{ textAlign: 'center', color: '#dc3545', marginTop: '50px' }}>{error}</div>;
  if (!order) return null;

  const total = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="order-details-container">
      <div className="order-header">
        <h2>Detalhes do Pedido</h2>
        <p>ID: {order.orderId}</p>
      </div>

      <div className="order-info-grid">
        <div className="info-block">
          <h4>Cliente</h4>
          <p>{order.customerName}</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>{order.customerEmail}</p>
        </div>
        <div className="info-block">
          <h4>Endereço de Entrega</h4>
          <p>{order.customerAddress}</p>
        </div>
        <div className="info-block">
          <h4>Forma de Pagamento</h4>
          <p>{order.paymentMethod}</p>
        </div>
      </div>

      <h3 style={{ marginBottom: '15px' }}>Itens Comprados</h3>
      <table className="order-items-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unit.</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => {
            const productInfo = catalog.find(p => p.id === item.productId);
            const productName = productInfo ? productInfo.name || (productInfo as any).title : `Produto Indisponível (#${item.productId})`;
            const productImage = productInfo ? productInfo.image : 'https://via.placeholder.com/40?text=Sem+Foto';

            return (
              <tr key={index}>
                <td>
                  <div className="product-cell">
                    <img src={productImage} alt={productName} className="product-cell-image" />
                    <span className="product-cell-name">{productName}</span>
                  </div>
                </td>
                <td>{item.quantity}x</td>
                <td>R$ {item.price.toFixed(2)}</td>
                <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={3} style={{ textAlign: 'right' }} className="total-row">Total Pago:</td>
            <td className="total-row">R$ {total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link to="/my-orders" style={{ color: '#007bff', fontWeight: 'bold' }}>Voltar para Meus Pedidos</Link>
      </div>
    </div>
  );
}