import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <Sprout size={24} />
            <span>fella7com</span>
          </div>
          <p>La première marketplace agricole d'Algérie. Connectez producteurs, acheteurs et entreprises agricoles à travers les 69 wilayas.</p>
        </div>

        <div className="footer-col">
          <h4>Marketplace</h4>
          <Link to="/search">Tous les produits</Link>
          <Link to="/new">Nouveautés</Link>
          <Link to="/post">Vendre un produit</Link>
        </div>

        <div className="footer-col">
          <h4>Compte</h4>
          <Link to="/login">Se connecter</Link>
          <Link to="/register">Créer un compte</Link>
          <Link to="/profile">Mon profil</Link>
          <Link to="/premium">Premium</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <span>contact@fella7com.com</span>
          <span>+213 555 123 456</span>
          <span>Algiers, Algeria</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 fella7com. Tous droits réservés.</span>
      </div>
    </footer>
  );
}
