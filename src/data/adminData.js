// ─────────────────────────────────────────────────────────────────────────────
// ADMIN DASHBOARD — Mock Data for Revenue, Transactions & Platform Stats
// ─────────────────────────────────────────────────────────────────────────────

// Monthly revenue data (DZD) for the past 12 months
export const monthlyRevenue = [
  { month: 'Jun 2025', revenue: 245000, premiumSubs: 18, adRevenue: 85000, commissions: 160000 },
  { month: 'Jul 2025', revenue: 312000, premiumSubs: 24, adRevenue: 102000, commissions: 210000 },
  { month: 'Aug 2025', revenue: 378000, premiumSubs: 31, adRevenue: 118000, commissions: 260000 },
  { month: 'Sep 2025', revenue: 290000, premiumSubs: 27, adRevenue: 95000, commissions: 195000 },
  { month: 'Oct 2025', revenue: 425000, premiumSubs: 38, adRevenue: 135000, commissions: 290000 },
  { month: 'Nov 2025', revenue: 510000, premiumSubs: 45, adRevenue: 160000, commissions: 350000 },
  { month: 'Dec 2025', revenue: 480000, premiumSubs: 42, adRevenue: 148000, commissions: 332000 },
  { month: 'Jan 2026', revenue: 395000, premiumSubs: 36, adRevenue: 125000, commissions: 270000 },
  { month: 'Feb 2026', revenue: 462000, premiumSubs: 41, adRevenue: 142000, commissions: 320000 },
  { month: 'Mar 2026', revenue: 548000, premiumSubs: 52, adRevenue: 168000, commissions: 380000 },
  { month: 'Apr 2026', revenue: 615000, premiumSubs: 58, adRevenue: 185000, commissions: 430000 },
  { month: 'May 2026', revenue: 680000, premiumSubs: 65, adRevenue: 205000, commissions: 475000 },
];

// Revenue by category
export const revenueByCategory = [
  { category: 'Bétail & Volaille', revenue: 1850000, percentage: 28, color: '#e07a2f' },
  { category: 'Céréales & Légumineuses', revenue: 1320000, percentage: 20, color: '#d4880f' },
  { category: 'Légumes', revenue: 985000, percentage: 15, color: '#2d6a4f' },
  { category: 'Olives & Huile', revenue: 790000, percentage: 12, color: '#52b788' },
  { category: 'Fruits', revenue: 590000, percentage: 9, color: '#c53030' },
  { category: 'Produits Laitiers', revenue: 425000, percentage: 6.5, color: '#2b6cb0' },
  { category: 'Miel & Apiculture', revenue: 310000, percentage: 4.7, color: '#f4a261' },
  { category: 'Autres', revenue: 290000, percentage: 4.8, color: '#8a8a8a' },
];

// Recent transactions
export const recentTransactions = [
  { id: 'tx1', buyer: 'Hamza B.', seller: 'Draoui Sid Ahmed', product: 'Moutons Ouled Djellal', amount: 290000, commission: 14500, date: '2026-05-17', status: 'completed' },
  { id: 'tx2', buyer: 'Karim L.', seller: 'Garmel Brahim', product: "Huile d'Olive Extra Vierge", amount: 45000, commission: 2250, date: '2026-05-17', status: 'completed' },
  { id: 'tx3', buyer: 'Mehdi S.', seller: 'Inidjouane Azdine', product: 'Oranges Navel', amount: 47500, commission: 2375, date: '2026-05-16', status: 'completed' },
  { id: 'tx4', buyer: 'Youcef A.', seller: 'Ouled Lime Djilali', product: 'Taureaux Engraissés', amount: 840000, commission: 42000, date: '2026-05-16', status: 'pending' },
  { id: 'tx5', buyer: 'Nabil R.', seller: 'Doumaz Malika', product: 'Miel de Thym Sauvage', amount: 18000, commission: 900, date: '2026-05-15', status: 'completed' },
  { id: 'tx6', buyer: 'Rachid K.', seller: 'Hami Ali', product: 'Tomates Cerises Sous Serre', amount: 22500, commission: 1125, date: '2026-05-15', status: 'completed' },
  { id: 'tx7', buyer: 'Anis M.', seller: 'Doumaz Mourad', product: 'Poulets de Chair Fermiers', amount: 48300, commission: 2415, date: '2026-05-14', status: 'refunded' },
  { id: 'tx8', buyer: 'Sofiane T.', seller: 'Anou Bouzid', product: 'Pommes Golden', amount: 32500, commission: 1625, date: '2026-05-14', status: 'completed' },
  { id: 'tx9', buyer: 'Zaki H.', seller: 'Doumaz Fadil', product: 'Blé Dur Semences', amount: 116000, commission: 5800, date: '2026-05-13', status: 'completed' },
  { id: 'tx10', buyer: 'Amine F.', seller: 'Kouroughli Sadek', product: "Agneaux de Race Hamra", amount: 168000, commission: 8400, date: '2026-05-13', status: 'completed' },
];

// Premium subscriptions history
export const premiumSubscriptions = [
  { id: 'sub1', user: 'Derriche Mohamed', plan: 'Premium', amount: 1500, startDate: '2026-05-01', status: 'active' },
  { id: 'sub2', user: 'Doumaz Fadil', plan: 'Premium', amount: 1500, startDate: '2026-05-03', status: 'active' },
  { id: 'sub3', user: 'Garmel Brahim', plan: 'Premium', amount: 1500, startDate: '2026-04-15', status: 'active' },
  { id: 'sub4', user: 'Inidjouane Azdine', plan: 'Premium', amount: 1500, startDate: '2026-04-20', status: 'active' },
  { id: 'sub5', user: 'Hafid Smail', plan: 'Premium', amount: 1500, startDate: '2026-03-10', status: 'active' },
  { id: 'sub6', user: 'Draoui Sid Ahmed', plan: 'Premium', amount: 1500, startDate: '2026-05-08', status: 'active' },
  { id: 'sub7', user: 'Boubekeur Karim', plan: 'Premium', amount: 1500, startDate: '2026-05-12', status: 'active' },
  { id: 'sub8', user: 'Fezari Abdelouahab', plan: 'Premium', amount: 1500, startDate: '2026-03-01', status: 'expired' },
  { id: 'sub9', user: 'Chami Mohamed', plan: 'Premium', amount: 1500, startDate: '2026-02-15', status: 'expired' },
];

// Ad revenue breakdown
export const adRevenue = [
  { id: 'ar1', company: 'AgriMech DZ', campaign: 'Tracteurs 2026', spent: 45000, impressions: 12400, clicks: 890, period: 'Mai 2026' },
  { id: 'ar2', company: 'بذور وحبوب SA', campaign: 'Semences Premium', spent: 38000, impressions: 9800, clicks: 720, period: 'Mai 2026' },
  { id: 'ar3', company: 'Irrigation Pro', campaign: 'Solutions Riz', spent: 35000, impressions: 8500, clicks: 650, period: 'Mai 2026' },
  { id: 'ar4', company: 'Agri Engrais PLUS', campaign: 'Engrais Bio', spent: 42000, impressions: 11200, clicks: 830, period: 'Mai 2026' },
  { id: 'ar5', company: 'GreenHouse Solutions', campaign: 'Serres Modernes', spent: 28000, impressions: 7200, clicks: 540, period: 'Mai 2026' },
  { id: 'ar6', company: 'طاقة شمسية للفلاحة', campaign: 'Énergie Verte', spent: 17000, impressions: 4500, clicks: 310, period: 'Mai 2026' },
];

// Top selling products
export const topProducts = [
  { name: 'Moutons Ouled Djellal', totalSales: 2450000, unitsSold: 42, seller: 'Draoui Sid Ahmed' },
  { name: 'Taureaux Engraissés', totalSales: 2100000, unitsSold: 5, seller: 'Ouled Lime Djilali' },
  { name: "Huile d'Olive Extra Vierge", totalSales: 540000, unitsSold: 600, seller: 'Garmel Brahim' },
  { name: 'Blé Dur Semences', totalSales: 464000, unitsSold: 80, seller: 'Doumaz Fadil' },
  { name: 'Oranges Navel', totalSales: 380000, unitsSold: 4000, seller: 'Inidjouane Azdine' },
];

// Revenue by wilaya (top regions)
export const revenueByWilaya = [
  { wilaya: 'Blida', revenue: 890000, transactions: 142 },
  { wilaya: 'Tizi Ouzou', revenue: 720000, transactions: 98 },
  { wilaya: 'Djelfa', revenue: 680000, transactions: 65 },
  { wilaya: 'Tiaret', revenue: 540000, transactions: 78 },
  { wilaya: 'Sétif', revenue: 485000, transactions: 95 },
  { wilaya: 'Chlef', revenue: 420000, transactions: 72 },
  { wilaya: 'Constantine', revenue: 380000, transactions: 85 },
  { wilaya: 'Mascara', revenue: 350000, transactions: 45 },
];

// Daily revenue for current month (last 30 days)
export const dailyRevenue = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 4, i + 1); // May 2026
  const base = 15000 + Math.random() * 25000;
  const weekend = date.getDay() === 5 || date.getDay() === 6 ? 1.3 : 1;
  return {
    day: i + 1,
    date: `${i + 1} Mai`,
    revenue: Math.round(base * weekend),
  };
});

// Platform overview stats
export const platformStats = {
  totalUsers: 1247,
  activeUsers: 893,
  totalSellers: 342,
  totalBuyers: 905,
  totalProducts: 1856,
  activeListings: 1204,
  totalTransactions: 4823,
  completedTransactions: 4512,
  pendingTransactions: 186,
  refundedTransactions: 125,
  averageOrderValue: 28500,
  totalRevenue: 5340000,
  monthlyRevenue: 680000,
  premiumUsers: 65,
  conversionRate: 5.2,
  adClicks: 53400,
};

// ─────────────────────────────────────────────────────────────────────────────
// USER ACCOUNTS — For admin management
// ─────────────────────────────────────────────────────────────────────────────
export const initialUserAccounts = [
  { id: 'u1', name: 'Derriche Mohamed', email: 'derriche.m@gmail.com', role: 'agriculteur', plan: 'premium', status: 'active', wilaya: 'Blida', phone: '0555-10-20-30', registeredAt: '2025-06-12', lastLogin: '2026-05-17', listings: 12, purchases: 0, revenue: 185000 },
  { id: 'u2', name: 'Doumaz Fadil', email: 'fadil.doumaz@gmail.com', role: 'agriculteur', plan: 'premium', status: 'active', wilaya: 'Tiaret', phone: '0770-20-30-40', registeredAt: '2025-07-03', lastLogin: '2026-05-17', listings: 8, purchases: 2, revenue: 464000 },
  { id: 'u3', name: 'Doumaz Malika', email: 'malika.d@gmail.com', role: 'agriculteur', plan: 'freemium', status: 'active', wilaya: 'Béjaïa', phone: '0661-30-40-50', registeredAt: '2025-08-15', lastLogin: '2026-05-16', listings: 5, purchases: 0, revenue: 78000 },
  { id: 'u4', name: 'Garmel Brahim', email: 'brahim.garmel@gmail.com', role: 'agriculteur', plan: 'premium', status: 'active', wilaya: 'Tizi Ouzou', phone: '0799-70-80-90', registeredAt: '2025-06-25', lastLogin: '2026-05-17', listings: 15, purchases: 1, revenue: 540000 },
  { id: 'u5', name: 'Draoui Sid Ahmed', email: 'sidahmed.draoui@gmail.com', role: 'agriculteur', plan: 'premium', status: 'active', wilaya: 'Djelfa', phone: '0550-50-60-70', registeredAt: '2025-09-01', lastLogin: '2026-05-17', listings: 6, purchases: 0, revenue: 2450000 },
  { id: 'u6', name: 'Hamza Benali', email: 'hamza.b@gmail.com', role: 'buyer', plan: 'freemium', status: 'active', wilaya: 'Algiers', phone: '0555-11-22-33', registeredAt: '2025-10-10', lastLogin: '2026-05-17', listings: 0, purchases: 24, revenue: 0 },
  { id: 'u7', name: 'Karim Lounis', email: 'karim.lounis@gmail.com', role: 'buyer', plan: 'freemium', status: 'active', wilaya: 'Oran', phone: '0661-22-33-44', registeredAt: '2025-11-05', lastLogin: '2026-05-16', listings: 0, purchases: 18, revenue: 0 },
  { id: 'u8', name: 'Agro Pro SARL', email: 'contact@agropro.dz', role: 'business', plan: 'premium', status: 'active', wilaya: 'Blida', phone: '0770-33-44-55', registeredAt: '2025-07-20', lastLogin: '2026-05-17', listings: 32, purchases: 45, revenue: 890000 },
  { id: 'u9', name: 'Inidjouane Azdine', email: 'azdine.i@gmail.com', role: 'agriculteur', plan: 'premium', status: 'active', wilaya: 'Chlef', phone: '0661-33-44-55', registeredAt: '2025-08-08', lastLogin: '2026-05-15', listings: 10, purchases: 0, revenue: 380000 },
  { id: 'u10', name: 'Rachid Khelifi', email: 'rachid.k@gmail.com', role: 'buyer', plan: 'freemium', status: 'suspended', wilaya: 'Constantine', phone: '0550-44-55-66', registeredAt: '2025-12-01', lastLogin: '2026-04-28', listings: 0, purchases: 3, revenue: 0 },
  { id: 'u11', name: 'Youcef Amrani', email: 'youcef.amrani@gmail.com', role: 'buyer', plan: 'freemium', status: 'active', wilaya: 'Sétif', phone: '0799-55-66-77', registeredAt: '2026-01-15', lastLogin: '2026-05-16', listings: 0, purchases: 8, revenue: 0 },
  { id: 'u12', name: 'Sofiane Touati', email: 'sofiane.t@gmail.com', role: 'buyer', plan: 'freemium', status: 'active', wilaya: 'Annaba', phone: '0555-66-77-88', registeredAt: '2026-02-20', lastLogin: '2026-05-14', listings: 0, purchases: 5, revenue: 0 },
  { id: 'u13', name: 'Fezari Abdelouahab', email: 'fezari.a@gmail.com', role: 'agriculteur', plan: 'freemium', status: 'active', wilaya: 'Médéa', phone: '0670-60-70-80', registeredAt: '2025-06-30', lastLogin: '2026-05-13', listings: 7, purchases: 0, revenue: 125000 },
  { id: 'u14', name: 'Nabil Rahmani', email: 'nabil.r@gmail.com', role: 'buyer', plan: 'freemium', status: 'banned', wilaya: 'Mascara', phone: '0661-77-88-99', registeredAt: '2025-11-18', lastLogin: '2026-03-05', listings: 0, purchases: 1, revenue: 0 },
  { id: 'u15', name: 'Ouled Lime Djilali', email: 'djilali.ol@gmail.com', role: 'agriculteur', plan: 'premium', status: 'active', wilaya: 'Mascara', phone: '0770-99-00-11', registeredAt: '2025-07-14', lastLogin: '2026-05-17', listings: 4, purchases: 0, revenue: 2100000 },
  { id: 'u16', name: 'Mehdi Seddiki', email: 'mehdi.seddiki@gmail.com', role: 'buyer', plan: 'freemium', status: 'active', wilaya: 'Tipaza', phone: '0555-88-99-00', registeredAt: '2026-03-10', lastLogin: '2026-05-16', listings: 0, purchases: 12, revenue: 0 },
  { id: 'u17', name: 'Kouroughli Sadek', email: 'sadek.k@gmail.com', role: 'agriculteur', plan: 'freemium', status: 'active', wilaya: 'Batna', phone: '0660-88-99-00', registeredAt: '2025-09-22', lastLogin: '2026-05-13', listings: 3, purchases: 0, revenue: 168000 },
  { id: 'u18', name: 'Anis Merzougui', email: 'anis.merz@gmail.com', role: 'buyer', plan: 'freemium', status: 'suspended', wilaya: 'Mostaganem', phone: '0770-00-11-22', registeredAt: '2026-01-08', lastLogin: '2026-04-15', listings: 0, purchases: 2, revenue: 0 },
  { id: 'u19', name: 'BioFerme Express', email: 'info@bioferme.dz', role: 'business', plan: 'premium', status: 'active', wilaya: 'Boumerdès', phone: '0550-12-34-56', registeredAt: '2025-10-05', lastLogin: '2026-05-17', listings: 28, purchases: 15, revenue: 620000 },
  { id: 'u20', name: 'Zaki Haddad', email: 'zaki.haddad@gmail.com', role: 'buyer', plan: 'freemium', status: 'active', wilaya: 'Tlemcen', phone: '0661-98-76-54', registeredAt: '2026-02-14', lastLogin: '2026-05-13', listings: 0, purchases: 6, revenue: 0 },
];
