import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Profile() {
  const { user, updateProfile, products } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  
  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ avatar: avatarUrl });
    alert('Profile Picture successfully updated!');
  };

  const userListings = products.filter(p => p.sellerId === user.id);

  return (
    <div className="page animate-fade-in" style={{background: 'var(--color-background)', minHeight: 'calc(100vh - 80px)', padding: 'var(--spacing-2xl) 0'}}>
      <div className="container" style={{maxWidth: '800px'}}>
        
        <div className="glass-panel" style={{padding: 'var(--spacing-2xl)', marginBottom: 'var(--spacing-xl)'}}>
           <h2>Profile Settings</h2>
           <p className="text-muted" style={{marginBottom: 'var(--spacing-lg)'}}>Manage your account identity and listings.</p>
           
           <div style={{display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'center'}}>
             <img src={user.avatar} alt="Current Avatar" style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--color-primary-light)'}} />
             
             <form onSubmit={handleSave} style={{flex: 1}}>
                <div style={{marginBottom: 'var(--spacing-md)'}}>
                  <label style={{display: 'block', fontWeight: 'bold', marginBottom: 'var(--spacing-xs)'}}>Profile Picture URL</label>
                  <input 
                    type="url" 
                    value={avatarUrl}
                    onChange={e => setAvatarUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    style={{width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1'}}
                    required
                  />
                  <small className="text-muted">Since this is a prototype, please paste a valid image URL.</small>
                </div>
                <button type="submit" className="btn-primary">Update Picture</button>
             </form>
           </div>
        </div>

        {user.role !== 'buyer' && (
           <div className="glass-panel" style={{padding: 'var(--spacing-2xl)'}}>
              <h2>Your Posted Listings ({userListings.length})</h2>
              
              {userListings.length > 0 ? (
                <div className="product-grid" style={{marginTop: 'var(--spacing-xl)', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'}}>
                  {userListings.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <div className="text-center" style={{padding: 'var(--spacing-xl)', border: '1px dashed #cbd5e1', marginTop: 'var(--spacing-md)'}}>
                  <p>You haven't posted any products yet.</p>
                  <button className="btn-secondary" onClick={() => navigate('/post')} style={{marginTop: 'var(--spacing-md)'}}>Post Your First Item</button>
                </div>
              )}
           </div>
        )}

      </div>
    </div>
  );
}
