import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories, wilayas, mockAds } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import './Home.css';

// SVG icon components — clean, consistent stroke style
const CategoryIcons = {
  all: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  vegetables: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M12 2c0 5.5-3 10-3 10s3 4.5 3 10" />
      <path d="M2 12h20" />
    </svg>
  ),
  fruits: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c4.97 0 9-3.58 9-8 0-3.5-2.5-6.5-6-7.5C14 5 13 3 12 2c-1 1-2 3-3 4.5C5.5 7.5 3 10.5 3 14c0 4.42 4.03 8 9 8z" />
      <path d="M12 2c1 2.5 3 4 3 4" />
    </svg>
  ),
  grains: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C12 7 8 4 4 3c0 4 2 8 8 9" />
      <path d="M12 12c0-5 4-8 8-9 0 4-2 8-8 9" />
      <path d="M4 3c1 3 2 6 3 9" />
    </svg>
  ),
  livestock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
      <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-1 0V11a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-1 0V11a2 2 0 0 0-4 0v5z" />
    </svg>
  ),
  dairy: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l1 6H7L8 2z" />
      <path d="M7 8c-.5 3-1 8 0 11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2c1-3 .5-8 0-11" />
      <path d="M10 14h4" />
    </svg>
  ),
  equipment: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="17" r="3" /><circle cx="17" cy="17" r="3" />
      <path d="M3 17V9l5-5h8l3 5v8" />
      <path d="M8 4v6h10" />
    </svg>
  ),
  fertilizers: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" /><path d="M10 20c0-6 2-10 2-10s2 4 2 10" />
      <path d="M5 10c1-2 3-4 7-4s6 2 7 4" />
      <path d="M5 10c-1 1-2 3-2 5h18c0-2-1-4-2-5" />
    </svg>
  ),
  olives: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="13" rx="5" ry="7" />
      <path d="M12 6V2" />
      <path d="M9 4c0 0 1 2 3 2s3-2 3-2" />
    </svg>
  ),
  honey: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.5 6h-7L12 2z" />
      <path d="M8.5 8l-4 7h15l-4-7" />
      <path d="M7 15l-2 5h14l-2-5" />
      <path d="M11 12h2" />
    </svg>
  ),
};

export default function Home() {
  const { products } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('All Wilayas');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [promoAnimating, setPromoAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      changePromo((currentPromoIndex + 1) % mockAds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentPromoIndex]);

  const changePromo = (idx) => {
    setPromoAnimating(true);
    setTimeout(() => {
      setCurrentPromoIndex(idx);
      setPromoAnimating(false);
    }, 300);
  };

  const filteredProducts = products.filter(p => {
    const matchWilaya = selectedWilaya === 'All Wilayas' || p.wilaya === selectedWilaya;
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchWilaya && matchCategory && matchSearch;
  });

  return (
    <div className="page animate-fade-in">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content text-center">
          <h1 className="hero-title">
            Le marché agricole <span className="text-primary">algérien</span>
          </h1>
          <p className="hero-subtitle">
            Achetez et vendez fruits, légumes, céréales et matériel agricole directement entre producteurs et acheteurs à travers les 69 wilayas.
          </p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="filter-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="filter-group">
              <select value={selectedWilaya} onChange={e => setSelectedWilaya(e.target.value)} className="filter-select">
                {wilayas.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="filter-select">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <button className="btn-primary search-btn">
              {filteredProducts.length} résultats
            </button>
          </div>

          {/* Integrated Categories */}
          <div className="hero-categories">
            {categories.slice(0, 10).map(c => (
              <div
                key={c.id}
                className={`mini-category ${selectedCategory === c.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(c.id)}
              >
                <span className="mini-icon">
                  {CategoryIcons[c.id] || CategoryIcons.fertilizers}
                </span>
                <span className="mini-name">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promotions-section container">
        <div
          className={`promo-banner ${promoAnimating ? 'promo-exit' : 'promo-enter'}`}
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(20,20,20,0.92) 0%, rgba(20,20,20,0.75) 40%, rgba(20,20,20,0.2) 70%, rgba(0,0,0,0) 100%), url(${mockAds[currentPromoIndex].image})`,
          }}
        >
          <div className="promo-content">
            <span className="promo-tag">{mockAds[currentPromoIndex].tag}</span>
            <h2 className="promo-title">{mockAds[currentPromoIndex].title}</h2>
            <p className="promo-desc">{mockAds[currentPromoIndex].description}</p>
            <button className="btn-primary promo-cta">{mockAds[currentPromoIndex].company} →</button>
          </div>

          {/* Dots */}
          <div className="promo-controls">
            {mockAds.map((_, idx) => (
              <button
                key={idx}
                className={`promo-dot ${idx === currentPromoIndex ? 'active' : ''}`}
                onClick={() => changePromo(idx)}
                aria-label={`Promo ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev/Next arrows */}
          <button className="promo-arrow promo-arrow-prev" onClick={() => changePromo((currentPromoIndex - 1 + mockAds.length) % mockAds.length)} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="promo-arrow promo-arrow-next" onClick={() => changePromo((currentPromoIndex + 1) % mockAds.length)} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Listings */}
      <section className="listings container">
        <div className="section-header">
          <h2>Dernières annonces</h2>
          <p className="text-muted">Produits frais du champ à votre table.</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="empty-state text-center">
            <h3>Aucun produit trouvé</h3>
            <p className="text-muted">Essayez de modifier vos filtres de wilaya ou catégorie.</p>
          </div>
        )}

        <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
          <Link to="/search" className="btn-secondary">Voir tous les produits →</Link>
        </div>
      </section>
    </div>
  );
}