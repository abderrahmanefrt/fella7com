import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

export default function NewArrivals() {
  const { products } = useAuth();

  const newProducts = [...products]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 12);

  return (
    <div className="animate-fade-in" style={{background: 'var(--color-bg)', minHeight: 'calc(100vh - 64px)', padding: 'var(--space-xl) 0 var(--space-2xl)'}}>
      <div className="container">
        <div style={{marginBottom: 'var(--space-xl)'}}>
          <h1>Nouveautés</h1>
          <p style={{color: 'var(--color-text-secondary)', fontSize: '0.95rem'}}>
            Les derniers produits ajoutés sur la plateforme.
          </p>
        </div>

        <div className="product-grid">
          {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
