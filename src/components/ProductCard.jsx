import { MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <article className="product-card glass-panel hover-lift">
      <Link to={`/listing/${product.id}`} className="card-link-wrap">
        <div 
          className="product-image" 
          style={{ backgroundImage: `url(${product.images[0]})` }}
          aria-label={product.title}
        >
          <div className="product-price-badge animate-slide-up">
            {product.price} <span className="unit">{product.unit}</span>
          </div>
        </div>
        
        <div className="product-content">
          <div className="product-category-tag">{product.category.toUpperCase()}</div>
          <h3 className="product-title">{product.title}</h3>
          
          <div className="product-meta">
            <span className="meta-item"><MapPin size={16} /> {product.wilaya}</span>
            <span className="meta-item"><Calendar size={16} /> {product.date}</span>
          </div>
          
          <div className="product-seller">
            <CheckCircle size={16} className="verified-icon" />
            <span className="seller-name">Verified Seller</span>
          </div>
          
          <div className="card-action">
            <span className="btn-secondary full-width text-center">View Details</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
