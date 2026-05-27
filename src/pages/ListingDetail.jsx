import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Star, ShieldCheck, ArrowLeft } from 'lucide-react';
import { sellers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useReview } from '../context/ReviewContext';
import ReviewSection from '../components/ReviewSection';
import './ListingDetail.css';

export default function ListingDetail() {
  const { id } = useParams();
  const { user, performAction, products } = useAuth();
  const { openConversation } = useChat();
  const { getAverageRating, getProductReviews } = useReview();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  const handleContact = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const success = performAction();
    if (!success) {
      navigate('/premium');
    } else {
      alert(`Contact du vendeur en cours... Action enregistrée ! (Actions utilisées: ${user.itemsCount + 1})`);
    }
  };

  if (!product) {
    return (
      <div className="container text-center" style={{padding: '100px 0'}}>
        <h2>Produit introuvable</h2>
        <p style={{color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)'}}>Ce produit n'existe plus ou l'URL est incorrecte.</p>
        <Link to="/" className="btn-primary">Retour à l'accueil</Link>
      </div>
    );
  }

  // Look up seller from mock data, OR build a fallback from the product + user info
  const mockSeller = sellers.find(s => s.id === product.sellerId);
  const seller = mockSeller || {
    id: product.sellerId,
    name: product.sellerName || user?.name || 'Vendeur',
    type: product.sellerRole || 'Agriculteur',
    wilaya: product.wilaya,
    experience: 0,
    rating: null,
    avatar: product.sellerAvatar || user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=150&h=150',
    phone: product.phone || 'Non renseigné',
  };

  const avgRating = getAverageRating(id);
  const reviewCount = getProductReviews(id).length;

  const handleOpenChat = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    openConversation(seller.id, seller.name, seller.avatar, product.id, product.title);
  };

  return (
    <div className="listing-detail animate-fade-in">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Accueil</Link> &gt; <Link to="/search">Produits</Link> &gt; {product.title}
        </div>

        <div className="detail-grid">
          {/* Main Content */}
          <div className="detail-main">
            <div className="gallery">
              <div className="main-image" style={{backgroundImage: `url(${product.images?.[0] || 'https://images.unsplash.com/photo-1595822533034-77a3d3c6396b?auto=format&fit=crop&w=800&q=80'})`}}></div>
              {product.images && product.images.length > 1 && (
                <div className="thumbnail-strip">
                  {product.images.map((img, idx) => (
                     <div key={idx} className={`thumbnail ${idx===0 ? 'active' : ''}`} style={{backgroundImage: `url(${img})`}}></div>
                  ))}
                </div>
              )}
            </div>

            <div className="product-info">
               <h1 className="title">{product.title}</h1>
               <div className="price-tag">{product.price} <span className="unit">{product.unit || ''}</span></div>

               <div className="specs">
                 <div className="spec-item"><MapPin size={18}/> {product.wilaya}</div>
                 <div className="spec-item"><strong>Disponible:</strong> {product.quantity}</div>
                 <div className="spec-item"><strong>Date:</strong> {product.date}</div>
               </div>

               <div className="description">
                 <h3>Description</h3>
                 <p>{product.description || 'Aucune description fournie.'}</p>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="detail-sidebar">
            <div className="seller-card text-center">
              <div className="seller-avatar" style={{backgroundImage: `url(${seller.avatar})`}}></div>
              <h2>{seller.name}</h2>
              <div className="seller-type text-primary">{seller.type}</div>

              <div className="seller-stats">
                 {seller.rating && (
                   <div className="stat"><Star size={16} fill="var(--color-warning)" color="var(--color-warning)"/> {seller.rating}</div>
                 )}
                 {seller.experience > 0 && (
                   <div className="stat">{seller.experience} ans exp.</div>
                 )}
              </div>

              {mockSeller && (
                <div className="verification">
                   <ShieldCheck size={18} className="verified-icon"/> Profil vérifié
                </div>
              )}

              <div className="contact-actions">
                 <button className="btn-primary full-width contact-btn" onClick={handleContact}>
                   <Phone size={18}/> Appeler
                 </button>
                 <button className="btn-secondary full-width contact-btn" onClick={handleOpenChat}>
                   <MessageCircle size={18}/> Envoyer un message
                 </button>
              </div>
            </div>

            <div className="map-placeholder text-center">
               <MapPin size={28} color="var(--color-text-muted)"/>
               <p style={{fontWeight: 600, marginTop: 'var(--space-sm)'}}>{product.wilaya}</p>
               <div className="map-visual">Carte bientôt disponible</div>
            </div>
          </div>
        </div>

        {/* Reviews & Ratings Section */}
        <ReviewSection productId={id} />
      </div>
    </div>
  );
}
