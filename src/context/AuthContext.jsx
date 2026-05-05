import { createContext, useState, useContext, useEffect } from 'react';
import { mockProducts as initialProducts } from '../data/mockData';

export const testAccounts = [
  {
    id: 't1',
    name: 'Salim (Farmer)',
    role: 'agriculteur',
    email: 'farmer@gmail.com',
    password: 'farmer123',
    plan: 'freemium',
    itemsCount: 0,
    avatar: 'https://images.unsplash.com/photo-1595873730248-6a56e077a94f?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 't2',
    name: 'Omar (Buyer)',
    role: 'buyer',
    email: 'buyer@gmail.com',
    password: 'buyer123',
    plan: 'freemium',
    itemsCount: 0,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 't3',
    name: 'Agro Pro (Business)',
    role: 'business',
    email: 'business@gmail.com',
    password: 'business123',
    plan: 'freemium',
    itemsCount: 0,
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=100'
  },
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize state from local storage first, fallback to defaults
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agri_user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('agri_products');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : initialProducts;
  });

  // Sync back to local storage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem('agri_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agri_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('agri_products', JSON.stringify(products));
  }, [products]);

  const login = (account) => setUser({ ...account });

  const logout = () => setUser(null);

  const upgradePlan = () => setUser(prev => ({ ...prev, plan: 'premium' }));

  // Call this function when the user wants to buy or post an item
  const performAction = () => {
    if (!user) return false;

    // Check Freemium limits
    if (user.plan === 'freemium' && user.itemsCount >= 3) {
      return false; // Limit reached
    }

    // Successful action
    setUser(prev => ({ ...prev, itemsCount: prev.itemsCount + 1 }));
    return true;
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addListing = (newProduct) => {
    if (!performAction()) return false;

    setProducts(prev => [{ ...newProduct, id: 'p' + (prev.length + 1) }, ...prev]);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradePlan, performAction, testAccounts, products, addListing, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
