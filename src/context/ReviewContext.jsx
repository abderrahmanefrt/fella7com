import { createContext, useState, useContext, useEffect } from 'react';

const ReviewContext = createContext();

// Pre-populate some mock reviews
const initialReviews = {
  p1: [
    { id: 'r1', userId: 't2', userName: 'Omar (Buyer)', rating: 5, comment: "Excellents plants, bien racinés et en très bon état. Livraison rapide !", date: '2026-03-28' },
    { id: 'r2', userId: 't3', userName: 'Agro Pro', rating: 4, comment: "Bonne qualité globale, quelques plants un peu fragiles mais rien de grave.", date: '2026-03-27' },
  ],
  p3: [
    { id: 'r3', userId: 't2', userName: 'Omar (Buyer)', rating: 5, comment: "Miel exceptionnel ! Goût authentique et emballage soigné. Je recommande vivement.", date: '2026-03-25' },
  ],
  p7: [
    { id: 'r4', userId: 't1', userName: 'Salim (Farmer)', rating: 5, comment: "La meilleure huile d'olive que j'ai goûtée. Pressée à froid, qualité premium.", date: '2026-03-22' },
    { id: 'r5', userId: 't2', userName: 'Omar (Buyer)', rating: 4, comment: "Très bonne huile, un peu chère mais la qualité est au rendez-vous.", date: '2026-03-23' },
    { id: 'r6', userId: 't3', userName: 'Agro Pro', rating: 5, comment: "Nous utilisons cette huile pour notre restaurant. Nos clients adorent !", date: '2026-03-24' },
  ],
  p5: [
    { id: 'r7', userId: 't3', userName: 'Agro Pro', rating: 4, comment: "Beaux moutons, bien entretenus. Le vendeur est sérieux et professionnel.", date: '2026-03-26' },
  ]
};

// Pre-populate some mock complaints
const initialComplaints = [
  {
    id: 'comp1',
    userId: 't2',
    userName: 'Omar (Buyer)',
    productId: 'p4',
    subject: 'Qualité non conforme',
    description: "Les poulets reçus ne correspondent pas à la description. Le poids moyen est de 1.8kg au lieu de 2.3kg annoncé.",
    status: 'en_cours',
    date: '2026-03-30',
  }
];

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('agri_reviews');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : initialReviews;
  });

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('agri_complaints');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : initialComplaints;
  });

  useEffect(() => {
    localStorage.setItem('agri_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('agri_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // Add a review for a product
  const addReview = (productId, userId, userName, rating, comment) => {
    const newReview = {
      id: 'r_' + Date.now(),
      userId,
      userName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview]
    }));

    return newReview;
  };

  // Get reviews for a product
  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  // Get average rating for a product
  const getAverageRating = (productId) => {
    const productReviews = reviews[productId];
    if (!productReviews || productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / productReviews.length) * 10) / 10;
  };

  // Check if a user has already reviewed a product
  const hasUserReviewed = (productId, userId) => {
    const productReviews = reviews[productId] || [];
    return productReviews.some(r => r.userId === userId);
  };

  // Submit a complaint
  const submitComplaint = (userId, userName, productId, subject, description) => {
    const newComplaint = {
      id: 'comp_' + Date.now(),
      userId,
      userName,
      productId,
      subject,
      description,
      status: 'soumise',
      date: new Date().toISOString().split('T')[0]
    };

    setComplaints(prev => [...prev, newComplaint]);
    return newComplaint;
  };

  // Get complaints for the current user
  const getUserComplaints = (userId) => {
    return complaints.filter(c => c.userId === userId);
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      addReview,
      getProductReviews,
      getAverageRating,
      hasUserReviewed,
      complaints,
      submitComplaint,
      getUserComplaints
    }}>
      {children}
    </ReviewContext.Provider>
  );
}

export const useReview = () => useContext(ReviewContext);
