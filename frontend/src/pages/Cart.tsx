import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import './Cart.css';
import { PaymentMethod, type OrderRequest } from '../types/requests/OrderRequest';

export function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: PaymentMethod.PIX
  });

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    
    const token = localStorage.getItem('@Tecprime:token');
    if (!token) {
      setError('Por favor, faça login antes de finalizar a compra.');
      return;
    }

    setLoading(true);

    const payload: OrderRequest = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerAddress: formData.address,
      paymentMethod: formData.payment,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    try {
      const response = await api.post('/orders', payload);
      setOrderId(response.data.orderId);
      clearCart();
    } catch (err: any) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setError('Sessão expirada. Faça login novamente.');
      } else {
        setError('Ocorreu um erro ao processar o seu pedido. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  // Tela de Sucesso
  if (orderId) {
    return (
      <div className="cart-page">
        <div className="status-screen success">
          <h2>🎉 Pedido confirmado!</h2>
          <p>O número do seu pedido é:</p>
          <h3 style={{ margin: '15px 0' }}>{orderId}</h3>
          <Link to="/" className="back-link">Voltar ao Catálogo</Link>
        </div>
      </div>
    );
  }

  // Tela de Carrinho Vazio
  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="status-screen">
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos para continuar comprando.</p>
          <Link to="/" className="back-link">Voltar às compras</Link>
        </div>
      </div>
    );
  }

  // Tela Principal do Carrinho
  return (
    <div className="cart-page">
      <h1 className="cart-title">Finalizar Compra</h1>
      
      {error && <div className="error-box">{error}</div>}

      <div className="cart-grid">
        
        <div className="cart-left-column">
          
          <div className="cart-box">
            <h2 className="section-title">Seus Produtos</h2>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3 className="item-title">{item.name}</h3>
                  <div className="item-actions">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remover</button>
                  </div>
                </div>
                <div className="item-price">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-box">
            <h2 className="section-title">Dados de Entrega</h2>
            <form id="checkoutForm" onSubmit={handleCheckout}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input required type="text" className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input required type="email" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Endereço Completo</label>
                <input required type="text" className="form-input" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Forma de Pagamento</label>
                <select className="form-input" value={formData.payment} onChange={e => setFormData({...formData, payment: e.target.value as PaymentMethod})}>
                  {Object.values(PaymentMethod).map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            </form>
          </div>

        </div>

        <div className="summary-box">
          <h2 className="section-title">Resumo do Pedido</h2>
          
          <div className="summary-line">
            <span>Subtotal ({cart.length} itens)</span>
            <span>R$ {cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Frete</span>
            <span style={{ color: '#28a745' }}>Grátis</span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span>R$ {cartTotal.toFixed(2)}</span>
          </div>

          <button 
            type="submit" 
            form="checkoutForm" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Confirmar Compra'}
          </button>
        </div>

      </div>
    </div>
  );
}