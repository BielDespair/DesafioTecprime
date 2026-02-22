import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderService } from '../services/orderService';
import './MyOrders.css';
import type { Order } from '../types/ui/Order';

export function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderService.getMyOrders()
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar pedidos", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando histórico...</div>;

  return (
    <div className="my-orders-container">
      <h2>Meus Pedidos</h2>
      <p style={{ color: '#666' }}>Acompanhe o histórico de suas compras.</p>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', padding: '40px', background: '#fff', borderRadius: '10px' }}>
          <h3>Você ainda não fez nenhum pedido.</h3>
          <Link to="/" style={{ color: '#007bff', display: 'inline-block', marginTop: '15px' }}>Começar a comprar</Link>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => {
            // Calcula o total do pedido para exibir no card
            const total = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            
            return (
              <div key={order.orderId} className="order-card">
                <div className="order-card-info">
                  <h3>Pedido #{order.orderId.split('-')[0]}</h3>
                  <p><strong>Pagamento:</strong> {order.paymentMethod}</p>
                  <p><strong>Itens:</strong> {order.items.reduce((acc, item) => acc + item.quantity, 0)} produto(s)</p>
                </div>
                
                <div className="order-card-actions">
                  <div className="order-total">R$ {total.toFixed(2)}</div>
                  <Link to={`/orders/${order.orderId}`} className="btn-details">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}