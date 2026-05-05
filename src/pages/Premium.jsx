import { Link, useNavigate } from 'react-router-dom';
import { Crown, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Premium.css';

export default function Premium() {
  const { upgradePlan, user } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    upgradePlan();
    alert('Payment Successful! You are now a Premium member with unlimited access.');
    navigate('/');
  };

  return (
    <div className="premium-page animate-fade-in">
      <div className="container text-center premium-container">
         <Crown size={64} className="text-warning" style={{margin: '0 auto var(--spacing-md)'}} />
         <h1>Limit Reached</h1>
         <p className="premium-subtitle">You have used your 3 free actions. Upgrade to Premium for unlimited access!</p>
         
         <div className="pricing-cards">
            {/* Freemium Card */}
            <div className="pricing-card glass-panel">
               <h2>Freemium</h2>
               <div className="price">0 DZD <span className="unit">/ month</span></div>
               <ul className="features text-left">
                 <li><Check size={18} className="text-muted"/> View all products</li>
                 <li><Check size={18} className="text-muted"/> Post/Buy up to 3 items</li>
                 <li><Check size={18} className="text-muted"/> Basic support</li>
               </ul>
               <button className="btn-secondary full-width" disabled>Current Plan</button>
            </div>
            
            {/* Premium Card */}
            <div className="pricing-card premium-card glass-panel hover-lift">
               <div className="ribbon">MOST POPULAR</div>
               <h2>Premium <Crown size={20} className="text-warning" style={{display:'inline', verticalAlign:'text-bottom'}}/></h2>
               <div className="price text-warning">1,500 DZD <span className="unit">/ month</span></div>
               <ul className="features text-left">
                 <li><Check size={18} className="text-warning"/> Unlimited posts & purchases</li>
                 <li><Check size={18} className="text-warning"/> Priority placement in search</li>
                 <li><Check size={18} className="text-warning"/> Advanced analytics</li>
                 <li><Check size={18} className="text-warning"/> 24/7 Premium Support</li>
               </ul>
               <button className="btn-primary full-width upgrade-btn" onClick={handleUpgrade}>
                 Upgrade Now (Demo)
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
