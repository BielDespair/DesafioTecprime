import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './Home.css';
import type { Product } from '../types/ui/Product';
import { ProductService } from '../services/productService';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    ProductService.getAll()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Carregando catálogo...</div>;
  }

  return (
    <div className="home-container">
      <header>
        <h1>Nosso Catálogo</h1>
        <p>Encontre os melhores produtos com os melhores preços.</p>
      </header>

      <main className="product-grid">
        {products.map(product => (
          <article key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">R$ {product.price.toFixed(2)}</p>
              <button
                className="add-button"
                onClick={() => addToCart(product)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}