import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { categories, wilayas } from '../data/mockData';
import './CreateListing.css';

export default function CreateListing() {
  const { user, addListing } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    category: categories[1].id,
    price: '',
    unit: 'per kg',
    quantity: '',
    wilaya: wilayas[1],
    description: ''
  });

  const categoryImages = {
    vegetables: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&w=800',
    fruits: 'https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&w=800',
    grains: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&w=800',
    livestock: 'https://images.pexels.com/photos/3540310/pexels-photo-3540310.jpeg?auto=compress&w=800',
    dairy: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&w=800',
    equipment: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=800',
    fertilizers: 'https://images.pexels.com/photos/5231135/pexels-photo-5231135.jpeg?auto=compress&w=800',
    olives: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&w=800'
  };
  
  const previewImage = categoryImages[formData.category] || 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&w=800';

  if (!user || user.role === 'buyer') {
    return (
      <div className="container text-center" style={{padding: '100px 0'}}>
        <h2>Unauthorized</h2>
        <p>You must be a Seller or Agri-Business to post items.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      ...formData,
      sellerId: user.id,
      sellerName: user.name,
      sellerAvatar: user.avatar,
      sellerRole: user.role === 'business' ? 'Agri-Business' : 'Agriculteur',
      date: new Date().toISOString().split('T')[0],
      images: [previewImage]
    };
    
    const success = addListing(newProduct);
    if (!success) {
      navigate('/premium');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="create-listing-page animate-fade-in">
      <div className="container form-container glass-panel">
        <h1>Create New Listing</h1>
        <p className="text-muted" style={{marginBottom: 'var(--spacing-xl)'}}>Fill out the details of your agricultural product.</p>
        
        <form onSubmit={handleSubmit} className="listing-form">
          <div className="form-group full-width">
            <label>Product Title</label>
            <input name="title" type="text" placeholder="e.g., Organic Red Tomatoes" value={formData.title} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              {categories.slice(1).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Wilaya</label>
            <select name="wilaya" value={formData.wilaya} onChange={handleChange} required>
              {wilayas.slice(1).map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          
          <div className="form-group">
            <label>Price (DZD)</label>
            <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Selling Unit</label>
            <select name="unit" value={formData.unit} onChange={handleChange} required>
              <option value="per kg">Per kg</option>
              <option value="per piece">Per piece</option>
              <option value="per quintal">Per quintal</option>
              <option value="per tonne">Per tonne</option>
              <option value="total">Total</option>
            </select>
          </div>

          <div className="form-group">
            <label>Available Quantity</label>
            <input name="quantity" type="text" placeholder="e.g., 500 kg" value={formData.quantity} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label>Detailed Description</label>
            <textarea name="description" rows="4" placeholder="Describe your product's quality, harvest date, and delivery options..." value={formData.description} onChange={handleChange} required></textarea>
          </div>
          
          {/* Dynamic Image Preview */}
          <div className="form-group full-width">
             <label>Listing Photo Preview (Auto-selected by AI based on category)</label>
             <div className="image-preview" style={{backgroundImage: `url(${previewImage})`}}>
                <div className="image-overlay text-center" style={{padding: 'var(--spacing-md)'}}>
                   <span style={{color: 'white', fontWeight: 'bold'}}>High-Quality Catalog Photo Automatically Matched!</span>
                </div>
             </div>
          </div>

          <div className="form-actions full-width">
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn-primary">Publish Listing (Action: 1)</button>
          </div>
        </form>
      </div>
    </div>
  );
}
