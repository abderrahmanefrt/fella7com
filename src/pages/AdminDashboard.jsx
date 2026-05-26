import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, DollarSign, TrendingUp, TrendingDown, Users, ShoppingBag,
  CreditCard, BarChart3, PieChart, ArrowUpRight, ArrowDownRight, RefreshCw,
  Crown, Megaphone, ArrowLeft, Menu, X, Package, Activity, Eye, MousePointerClick,
  Search, UserCog, ShieldBan, ShieldAlert, ShieldCheck, Trash2, UserX, AlertTriangle, CheckCircle
} from 'lucide-react';
import {
  monthlyRevenue, revenueByCategory, recentTransactions, platformStats,
  topProducts, revenueByWilaya, adRevenue, dailyRevenue, premiumSubscriptions,
  initialUserAccounts
} from '../data/adminData';
import { sellers, mockProducts } from '../data/mockData';
import './AdminDashboard.css';

function formatDZD(value) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
  return value.toLocaleString('fr-DZ');
}

function formatFullDZD(value) {
  return value.toLocaleString('fr-DZ') + ' DA';
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Accounts management state
  const [userAccounts, setUserAccounts] = useState(initialUserAccounts);
  const [accountSearch, setAccountSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalAction, setModalAction] = useState(null); // { type: 'delete'|'suspend'|'ban'|'activate', user }

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
  const maxWilayaRevenue = Math.max(...revenueByWilaya.map(w => w.revenue));
  const maxDailyRevenue = Math.max(...dailyRevenue.map(d => d.revenue));

  const totalCommissions = monthlyRevenue.reduce((s, m) => s + m.commissions, 0);
  const totalAdRevenue = monthlyRevenue.reduce((s, m) => s + m.adRevenue, 0);
  const totalPremiumRevenue = premiumSubscriptions.filter(s => s.status === 'active').length * 1500;

  const lastMonth = monthlyRevenue[monthlyRevenue.length - 1];
  const prevMonth = monthlyRevenue[monthlyRevenue.length - 2];
  const revenueGrowth = ((lastMonth.revenue - prevMonth.revenue) / prevMonth.revenue * 100).toFixed(1);

  return (
    <div className="admin-dashboard">
      {/* Mobile overlay */}
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">F</div>
          <div>
            <h2>Fella7com</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-title">Principal</div>
          <button
            className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
          >
            <LayoutDashboard size={18} /> Vue d'ensemble
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === 'revenue' ? 'active' : ''}`}
            onClick={() => { setActiveTab('revenue'); setSidebarOpen(false); }}
          >
            <DollarSign size={18} /> Revenus
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => { setActiveTab('transactions'); setSidebarOpen(false); }}
          >
            <CreditCard size={18} /> Transactions
          </button>

          <div className="sidebar-section-title">Monétisation</div>
          <button
            className={`sidebar-nav-item ${activeTab === 'ads' ? 'active' : ''}`}
            onClick={() => { setActiveTab('ads'); setSidebarOpen(false); }}
          >
            <Megaphone size={18} /> Publicités
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === 'premium' ? 'active' : ''}`}
            onClick={() => { setActiveTab('premium'); setSidebarOpen(false); }}
          >
            <Crown size={18} /> Abonnements
          </button>

          <div className="sidebar-section-title">Gestion</div>
          <button
            className={`sidebar-nav-item ${activeTab === 'accounts' ? 'active' : ''}`}
            onClick={() => { setActiveTab('accounts'); setSidebarOpen(false); }}
          >
            <UserCog size={18} /> Comptes
          </button>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/" className="sidebar-back-link">
            <ArrowLeft size={18} /> Retour au site
          </Link>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header admin-fade-in">
          <div className="admin-header-left">
            <h1>
              {activeTab === 'overview' && "Vue d'ensemble"}
              {activeTab === 'revenue' && 'Analyse des Revenus'}
              {activeTab === 'transactions' && 'Transactions'}
              {activeTab === 'ads' && 'Performance Publicitaire'}
              {activeTab === 'premium' && 'Abonnements Premium'}
              {activeTab === 'accounts' && 'Gestion des Comptes'}
            </h1>
            <p>
              <span className="live-indicator">
                <span className="live-dot" />
                Live
              </span>
              {' '}— Dernière mise à jour: 17 Mai 2026, 22:00
            </p>
          </div>
          <div className="admin-header-right">
            <select className="admin-period-select" id="admin-period">
              <option>Ce mois</option>
              <option>30 derniers jours</option>
              <option>Ce trimestre</option>
              <option>Cette année</option>
            </select>
            <button className="admin-refresh-btn" id="admin-refresh">
              <RefreshCw size={15} /> Actualiser
            </button>
          </div>
        </header>

        {/* ━━━ OVERVIEW TAB ━━━ */}
        {activeTab === 'overview' && (
          <>
            {/* Stat Cards */}
            <div className="stat-cards-grid">
              <div className="stat-card accent-green admin-fade-in admin-stagger-1" id="stat-revenue">
                <div className="stat-card-header">
                  <span className="stat-card-title">Revenus du mois</span>
                  <div className="stat-card-icon green"><DollarSign size={20} /></div>
                </div>
                <div className="stat-card-value">{formatFullDZD(lastMonth.revenue)}</div>
                <span className={`stat-card-change ${revenueGrowth > 0 ? 'positive' : 'negative'}`}>
                  {revenueGrowth > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {revenueGrowth > 0 ? '+' : ''}{revenueGrowth}%
                </span>
                <span className="stat-card-sub">vs mois précédent</span>
              </div>

              <div className="stat-card accent-blue admin-fade-in admin-stagger-2" id="stat-transactions">
                <div className="stat-card-header">
                  <span className="stat-card-title">Transactions</span>
                  <div className="stat-card-icon blue"><CreditCard size={20} /></div>
                </div>
                <div className="stat-card-value">{platformStats.totalTransactions.toLocaleString()}</div>
                <span className="stat-card-change positive">
                  <ArrowUpRight size={14} /> +12.3%
                </span>
                <span className="stat-card-sub">total cumulé</span>
              </div>

              <div className="stat-card accent-yellow admin-fade-in admin-stagger-3" id="stat-users">
                <div className="stat-card-header">
                  <span className="stat-card-title">Utilisateurs actifs</span>
                  <div className="stat-card-icon yellow"><Users size={20} /></div>
                </div>
                <div className="stat-card-value">{platformStats.activeUsers.toLocaleString()}</div>
                <span className="stat-card-change positive">
                  <ArrowUpRight size={14} /> +8.5%
                </span>
                <span className="stat-card-sub">{platformStats.totalUsers} au total</span>
              </div>

              <div className="stat-card accent-red admin-fade-in admin-stagger-4" id="stat-premium">
                <div className="stat-card-header">
                  <span className="stat-card-title">Abonnés Premium</span>
                  <div className="stat-card-icon red"><Crown size={20} /></div>
                </div>
                <div className="stat-card-value">{platformStats.premiumUsers}</div>
                <span className="stat-card-change positive">
                  <ArrowUpRight size={14} /> +{((platformStats.premiumUsers / platformStats.totalUsers) * 100).toFixed(1)}%
                </span>
                <span className="stat-card-sub">taux de conversion</span>
              </div>
            </div>

            {/* Revenue Chart + Category */}
            <div className="admin-charts-grid admin-fade-in">
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3><BarChart3 size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Revenus Mensuels</h3>
                  <span className="card-badge">12 mois</span>
                </div>
                <div className="revenue-chart">
                  {monthlyRevenue.map((m, i) => (
                    <div className="revenue-chart-bar-group" key={i}>
                      <div
                        className="revenue-chart-bar"
                        style={{ height: `${(m.revenue / maxRevenue) * 200}px` }}
                      >
                        <div className="revenue-chart-bar-tooltip">{formatFullDZD(m.revenue)}</div>
                      </div>
                      <span className="revenue-chart-label">
                        {m.month.split(' ')[0].substring(0, 3)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3><PieChart size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Par Catégorie</h3>
                </div>
                <div className="category-chart">
                  {revenueByCategory.map((cat, i) => (
                    <div className="category-item" key={i}>
                      <div className="category-dot" style={{ background: cat.color }} />
                      <div className="category-info">
                        <div className="category-name">{cat.category}</div>
                        <div className="category-bar-wrapper">
                          <div className="category-bar" style={{ width: `${cat.percentage * 3.5}%`, background: cat.color }} />
                        </div>
                      </div>
                      <span className="category-value">{cat.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="revenue-breakdown-grid admin-fade-in">
              <div className="breakdown-card">
                <div className="breakdown-card-icon commissions"><ShoppingBag size={22} /></div>
                <h4>Commissions (5%)</h4>
                <div className="breakdown-value">{formatFullDZD(totalCommissions)}</div>
                <div className="breakdown-sub">Sur {platformStats.completedTransactions} ventes complétées</div>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-card-icon subscriptions"><Crown size={22} /></div>
                <h4>Abonnements Premium</h4>
                <div className="breakdown-value">{formatFullDZD(totalPremiumRevenue)}/mois</div>
                <div className="breakdown-sub">{premiumSubscriptions.filter(s => s.status === 'active').length} abonnés actifs × 1 500 DA</div>
              </div>
              <div className="breakdown-card">
                <div className="breakdown-card-icon ads"><Megaphone size={22} /></div>
                <h4>Revenus Publicitaires</h4>
                <div className="breakdown-value">{formatFullDZD(totalAdRevenue)}</div>
                <div className="breakdown-sub">{adRevenue.length} campagnes actives</div>
              </div>
            </div>

            {/* Bottom Grid: Top Products + Wilayas */}
            <div className="admin-bottom-grid admin-fade-in">
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3><Package size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Top Produits</h3>
                  <span className="card-badge">Par ventes</span>
                </div>
                {topProducts.map((p, i) => (
                  <div className="top-product-row" key={i}>
                    <div className={`top-product-rank ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-default'}`}>
                      {i + 1}
                    </div>
                    <div className="top-product-info">
                      <div className="top-product-name">{p.name}</div>
                      <div className="top-product-seller">{p.seller}</div>
                    </div>
                    <div className="top-product-sales">
                      <div className="top-product-amount">{formatFullDZD(p.totalSales)}</div>
                      <div className="top-product-units">{p.unitsSold} unités</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3><Activity size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Revenus par Wilaya</h3>
                </div>
                {revenueByWilaya.map((w, i) => (
                  <div className="wilaya-row" key={i}>
                    <div className="wilaya-name">{w.wilaya}</div>
                    <div className="wilaya-bar-wrapper">
                      <div className="wilaya-bar" style={{ width: `${(w.revenue / maxWilayaRevenue) * 100}%` }} />
                    </div>
                    <div className="wilaya-value">{formatFullDZD(w.revenue)}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ━━━ REVENUE TAB ━━━ */}
        {activeTab === 'revenue' && (
          <>
            <div className="stat-cards-grid admin-fade-in">
              <div className="stat-card accent-green">
                <div className="stat-card-header">
                  <span className="stat-card-title">Revenu Total (12 mois)</span>
                  <div className="stat-card-icon green"><DollarSign size={20} /></div>
                </div>
                <div className="stat-card-value">{formatFullDZD(platformStats.totalRevenue)}</div>
              </div>
              <div className="stat-card accent-blue">
                <div className="stat-card-header">
                  <span className="stat-card-title">Commissions Totales</span>
                  <div className="stat-card-icon blue"><TrendingUp size={20} /></div>
                </div>
                <div className="stat-card-value">{formatFullDZD(totalCommissions)}</div>
              </div>
              <div className="stat-card accent-yellow">
                <div className="stat-card-header">
                  <span className="stat-card-title">Revenus Pubs</span>
                  <div className="stat-card-icon yellow"><Megaphone size={20} /></div>
                </div>
                <div className="stat-card-value">{formatFullDZD(totalAdRevenue)}</div>
              </div>
              <div className="stat-card accent-red">
                <div className="stat-card-header">
                  <span className="stat-card-title">Panier Moyen</span>
                  <div className="stat-card-icon red"><ShoppingBag size={20} /></div>
                </div>
                <div className="stat-card-value">{formatFullDZD(platformStats.averageOrderValue)}</div>
              </div>
            </div>

            {/* Daily Revenue Sparkline */}
            <div className="admin-card admin-fade-in" style={{ marginBottom: 28 }}>
              <div className="admin-card-header">
                <h3><BarChart3 size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Revenus Journaliers — Mai 2026</h3>
                <span className="card-badge">30 jours</span>
              </div>
              <div className="daily-chart">
                {dailyRevenue.map((d, i) => (
                  <div
                    key={i}
                    className={`daily-bar ${i === dailyRevenue.length - 1 ? 'today' : ''}`}
                    style={{ height: `${(d.revenue / maxDailyRevenue) * 100}%` }}
                    title={`${d.date}: ${formatFullDZD(d.revenue)}`}
                  />
                ))}
              </div>
            </div>

            {/* Monthly Breakdown Table */}
            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h3>Détail Mensuel</h3>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Mois</th>
                      <th>Revenu Total</th>
                      <th>Commissions</th>
                      <th>Publicités</th>
                      <th>Premium (abonnés)</th>
                      <th>Croissance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyRevenue.map((m, i) => {
                      const prev = i > 0 ? monthlyRevenue[i - 1].revenue : m.revenue;
                      const growth = ((m.revenue - prev) / prev * 100).toFixed(1);
                      return (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{m.month}</td>
                          <td className="tx-amount">{formatFullDZD(m.revenue)}</td>
                          <td className="tx-commission">{formatFullDZD(m.commissions)}</td>
                          <td>{formatFullDZD(m.adRevenue)}</td>
                          <td>{m.premiumSubs} × 1 500 DA</td>
                          <td>
                            {i > 0 && (
                              <span className={`stat-card-change ${growth >= 0 ? 'positive' : 'negative'}`}>
                                {growth >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {growth >= 0 ? '+' : ''}{growth}%
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ━━━ TRANSACTIONS TAB ━━━ */}
        {activeTab === 'transactions' && (
          <>
            <div className="stat-cards-grid admin-fade-in" style={{ marginBottom: 28 }}>
              <div className="stat-card accent-green">
                <div className="stat-card-header">
                  <span className="stat-card-title">Complétées</span>
                  <div className="stat-card-icon green"><TrendingUp size={20} /></div>
                </div>
                <div className="stat-card-value">{platformStats.completedTransactions}</div>
              </div>
              <div className="stat-card accent-yellow">
                <div className="stat-card-header">
                  <span className="stat-card-title">En attente</span>
                  <div className="stat-card-icon yellow"><Activity size={20} /></div>
                </div>
                <div className="stat-card-value">{platformStats.pendingTransactions}</div>
              </div>
              <div className="stat-card accent-red">
                <div className="stat-card-header">
                  <span className="stat-card-title">Remboursées</span>
                  <div className="stat-card-icon red"><TrendingDown size={20} /></div>
                </div>
                <div className="stat-card-value">{platformStats.refundedTransactions}</div>
              </div>
              <div className="stat-card accent-blue">
                <div className="stat-card-header">
                  <span className="stat-card-title">Taux de succès</span>
                  <div className="stat-card-icon blue"><BarChart3 size={20} /></div>
                </div>
                <div className="stat-card-value">{((platformStats.completedTransactions / platformStats.totalTransactions) * 100).toFixed(1)}%</div>
              </div>
            </div>

            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h3><CreditCard size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Transactions Récentes</h3>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Acheteur</th>
                      <th>Vendeur</th>
                      <th>Produit</th>
                      <th>Montant</th>
                      <th>Commission</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map(tx => (
                      <tr key={tx.id}>
                        <td>{tx.date}</td>
                        <td>{tx.buyer}</td>
                        <td>{tx.seller}</td>
                        <td style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.product}</td>
                        <td className="tx-amount">{formatFullDZD(tx.amount)}</td>
                        <td className="tx-commission">+{formatFullDZD(tx.commission)}</td>
                        <td>
                          <span className={`tx-status ${tx.status}`}>
                            <span className="tx-status-dot" />
                            {tx.status === 'completed' ? 'Complétée' : tx.status === 'pending' ? 'En attente' : 'Remboursée'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ━━━ ADS TAB ━━━ */}
        {activeTab === 'ads' && (
          <>
            <div className="stat-cards-grid admin-fade-in" style={{ marginBottom: 28 }}>
              <div className="stat-card accent-yellow">
                <div className="stat-card-header">
                  <span className="stat-card-title">Revenus Pubs (Mai)</span>
                  <div className="stat-card-icon yellow"><DollarSign size={20} /></div>
                </div>
                <div className="stat-card-value">{formatFullDZD(adRevenue.reduce((s, a) => s + a.spent, 0))}</div>
              </div>
              <div className="stat-card accent-blue">
                <div className="stat-card-header">
                  <span className="stat-card-title">Impressions</span>
                  <div className="stat-card-icon blue"><Eye size={20} /></div>
                </div>
                <div className="stat-card-value">{adRevenue.reduce((s, a) => s + a.impressions, 0).toLocaleString()}</div>
              </div>
              <div className="stat-card accent-green">
                <div className="stat-card-header">
                  <span className="stat-card-title">Clics</span>
                  <div className="stat-card-icon green"><MousePointerClick size={20} /></div>
                </div>
                <div className="stat-card-value">{adRevenue.reduce((s, a) => s + a.clicks, 0).toLocaleString()}</div>
              </div>
              <div className="stat-card accent-red">
                <div className="stat-card-header">
                  <span className="stat-card-title">CTR Moyen</span>
                  <div className="stat-card-icon red"><BarChart3 size={20} /></div>
                </div>
                <div className="stat-card-value">
                  {(adRevenue.reduce((s, a) => s + a.clicks, 0) / adRevenue.reduce((s, a) => s + a.impressions, 0) * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h3><Megaphone size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Performance des Campagnes</h3>
                <span className="card-badge">Mai 2026</span>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Annonceur</th>
                      <th>Campagne</th>
                      <th>Dépensé</th>
                      <th>Impressions</th>
                      <th>Clics</th>
                      <th>CTR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adRevenue.map(ad => (
                      <tr key={ad.id}>
                        <td style={{ fontWeight: 600 }}>{ad.company}</td>
                        <td>{ad.campaign}</td>
                        <td className="ad-metric" style={{ color: '#f59e0b' }}>{formatFullDZD(ad.spent)}</td>
                        <td>{ad.impressions.toLocaleString()}</td>
                        <td>{ad.clicks.toLocaleString()}</td>
                        <td><span className="ad-ctr">{(ad.clicks / ad.impressions * 100).toFixed(1)}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ━━━ PREMIUM TAB ━━━ */}
        {activeTab === 'premium' && (
          <>
            <div className="stat-cards-grid admin-fade-in" style={{ marginBottom: 28 }}>
              <div className="stat-card accent-green">
                <div className="stat-card-header">
                  <span className="stat-card-title">Revenu Premium Mensuel</span>
                  <div className="stat-card-icon green"><DollarSign size={20} /></div>
                </div>
                <div className="stat-card-value">{formatFullDZD(totalPremiumRevenue)}</div>
              </div>
              <div className="stat-card accent-blue">
                <div className="stat-card-header">
                  <span className="stat-card-title">Abonnés Actifs</span>
                  <div className="stat-card-icon blue"><Crown size={20} /></div>
                </div>
                <div className="stat-card-value">{premiumSubscriptions.filter(s => s.status === 'active').length}</div>
              </div>
              <div className="stat-card accent-yellow">
                <div className="stat-card-header">
                  <span className="stat-card-title">Taux de Conversion</span>
                  <div className="stat-card-icon yellow"><TrendingUp size={20} /></div>
                </div>
                <div className="stat-card-value">{platformStats.conversionRate}%</div>
              </div>
              <div className="stat-card accent-red">
                <div className="stat-card-header">
                  <span className="stat-card-title">Churn (expirés)</span>
                  <div className="stat-card-icon red"><TrendingDown size={20} /></div>
                </div>
                <div className="stat-card-value">{premiumSubscriptions.filter(s => s.status === 'expired').length}</div>
              </div>
            </div>

            <div className="admin-card admin-fade-in">
              <div className="admin-card-header">
                <h3><Crown size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Abonnements Premium</h3>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Utilisateur</th>
                      <th>Plan</th>
                      <th>Montant</th>
                      <th>Date début</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiumSubscriptions.map(sub => (
                      <tr key={sub.id}>
                        <td style={{ fontWeight: 600 }}>{sub.user}</td>
                        <td><Crown size={14} style={{ color: '#f59e0b', marginRight: 4, verticalAlign: 'middle' }} />{sub.plan}</td>
                        <td className="tx-amount">{formatFullDZD(sub.amount)}/mois</td>
                        <td>{sub.startDate}</td>
                        <td>
                          <span className={`tx-status ${sub.status === 'active' ? 'completed' : 'refunded'}`}>
                            <span className="tx-status-dot" />
                            {sub.status === 'active' ? 'Actif' : 'Expiré'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ━━━ ACCOUNTS TAB ━━━ */}
        {activeTab === 'accounts' && (() => {
          const filtered = userAccounts.filter(u => {
            const matchesSearch = accountSearch === '' ||
              u.name.toLowerCase().includes(accountSearch.toLowerCase()) ||
              u.email.toLowerCase().includes(accountSearch.toLowerCase()) ||
              u.wilaya.toLowerCase().includes(accountSearch.toLowerCase());
            const matchesRole = roleFilter === 'all' || u.role === roleFilter;
            const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
          });

          const handleAction = () => {
            if (!modalAction) return;
            const { type, user } = modalAction;
            if (type === 'delete') {
              setUserAccounts(prev => prev.filter(u => u.id !== user.id));
            } else if (type === 'suspend') {
              setUserAccounts(prev => prev.map(u => u.id === user.id ? { ...u, status: 'suspended' } : u));
            } else if (type === 'ban') {
              setUserAccounts(prev => prev.map(u => u.id === user.id ? { ...u, status: 'banned' } : u));
            } else if (type === 'activate') {
              setUserAccounts(prev => prev.map(u => u.id === user.id ? { ...u, status: 'active' } : u));
            }
            setModalAction(null);
          };

          const totalActive = userAccounts.filter(u => u.status === 'active').length;
          const totalSuspended = userAccounts.filter(u => u.status === 'suspended').length;
          const totalBanned = userAccounts.filter(u => u.status === 'banned').length;

          return (
            <>
              {/* Stats */}
              <div className="stat-cards-grid admin-fade-in" style={{ marginBottom: 28 }}>
                <div className="stat-card accent-green">
                  <div className="stat-card-header">
                    <span className="stat-card-title">Total Comptes</span>
                    <div className="stat-card-icon green"><Users size={20} /></div>
                  </div>
                  <div className="stat-card-value">{userAccounts.length}</div>
                </div>
                <div className="stat-card accent-blue">
                  <div className="stat-card-header">
                    <span className="stat-card-title">Actifs</span>
                    <div className="stat-card-icon blue"><ShieldCheck size={20} /></div>
                  </div>
                  <div className="stat-card-value">{totalActive}</div>
                </div>
                <div className="stat-card accent-yellow">
                  <div className="stat-card-header">
                    <span className="stat-card-title">Suspendus</span>
                    <div className="stat-card-icon yellow"><ShieldAlert size={20} /></div>
                  </div>
                  <div className="stat-card-value">{totalSuspended}</div>
                </div>
                <div className="stat-card accent-red">
                  <div className="stat-card-header">
                    <span className="stat-card-title">Bannis</span>
                    <div className="stat-card-icon red"><ShieldBan size={20} /></div>
                  </div>
                  <div className="stat-card-value">{totalBanned}</div>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="accounts-toolbar admin-fade-in">
                <div className="accounts-search-wrapper">
                  <Search size={16} />
                  <input
                    type="text"
                    className="accounts-search"
                    placeholder="Rechercher par nom, email ou wilaya..."
                    value={accountSearch}
                    onChange={e => setAccountSearch(e.target.value)}
                    id="accounts-search"
                  />
                </div>
                <select
                  className="accounts-filter-select"
                  value={roleFilter}
                  onChange={e => setRoleFilter(e.target.value)}
                  id="accounts-role-filter"
                >
                  <option value="all">Tous les rôles</option>
                  <option value="agriculteur">Agriculteur</option>
                  <option value="buyer">Acheteur</option>
                  <option value="business">Business</option>
                </select>
                <select
                  className="accounts-filter-select"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  id="accounts-status-filter"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="suspended">Suspendu</option>
                  <option value="banned">Banni</option>
                </select>
                <div className="accounts-count">
                  <strong>{filtered.length}</strong> / {userAccounts.length}
                </div>
              </div>

              {/* User List */}
              <div className="admin-fade-in">
                {filtered.length === 0 ? (
                  <div className="accounts-empty">
                    <UserX size={48} />
                    <p>Aucun compte ne correspond à votre recherche</p>
                  </div>
                ) : (
                  filtered.map(user => (
                    <div className="user-row" key={user.id}>
                      <div className={`user-avatar role-${user.role}`}>
                        {user.name.charAt(0)}
                      </div>

                      <div className="user-main-info">
                        <div className="user-name-line">
                          <span className="user-name">{user.name}</span>
                          <span className={`user-role-badge ${user.role}`}>
                            {user.role === 'agriculteur' ? '🌾 Agriculteur' : user.role === 'buyer' ? '🛒 Acheteur' : '🏢 Business'}
                          </span>
                          <span className={`user-plan-badge ${user.plan}`}>
                            {user.plan === 'premium' && <Crown size={10} />}
                            {user.plan}
                          </span>
                        </div>
                        <div className="user-meta">
                          <span>{user.email}</span>
                          <span>📍 {user.wilaya}</span>
                          <span>📅 Inscrit le {user.registeredAt}</span>
                        </div>
                      </div>

                      <div className="user-stats">
                        <div className="user-stat-item">
                          <div className="user-stat-value">{user.listings}</div>
                          <div className="user-stat-label">Annonces</div>
                        </div>
                        <div className="user-stat-item">
                          <div className="user-stat-value">{user.purchases}</div>
                          <div className="user-stat-label">Achats</div>
                        </div>
                      </div>

                      <div className={`user-status-badge ${user.status}`}>
                        <span className="user-status-dot" />
                        {user.status === 'active' ? 'Actif' : user.status === 'suspended' ? 'Suspendu' : 'Banni'}
                      </div>

                      <div className="user-actions">
                        {user.status !== 'active' && (
                          <button
                            className="user-action-btn btn-activate"
                            title="Réactiver"
                            onClick={() => setModalAction({ type: 'activate', user })}
                          >
                            <ShieldCheck size={15} />
                          </button>
                        )}
                        {user.status === 'active' && (
                          <button
                            className="user-action-btn btn-suspend"
                            title="Suspendre"
                            onClick={() => setModalAction({ type: 'suspend', user })}
                          >
                            <ShieldAlert size={15} />
                          </button>
                        )}
                        {user.status !== 'banned' && (
                          <button
                            className="user-action-btn btn-ban"
                            title="Bannir"
                            onClick={() => setModalAction({ type: 'ban', user })}
                          >
                            <ShieldBan size={15} />
                          </button>
                        )}
                        <button
                          className="user-action-btn btn-delete"
                          title="Supprimer"
                          onClick={() => setModalAction({ type: 'delete', user })}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Confirmation Modal */}
              {modalAction && (
                <div className="admin-modal-overlay" onClick={() => setModalAction(null)}>
                  <div className="admin-modal" onClick={e => e.stopPropagation()}>
                    <div className={`admin-modal-icon ${
                      modalAction.type === 'delete' ? 'danger' :
                      modalAction.type === 'ban' ? 'danger' :
                      modalAction.type === 'suspend' ? 'warning' : 'success'
                    }`}>
                      {modalAction.type === 'delete' && <Trash2 size={24} />}
                      {modalAction.type === 'ban' && <ShieldBan size={24} />}
                      {modalAction.type === 'suspend' && <AlertTriangle size={24} />}
                      {modalAction.type === 'activate' && <CheckCircle size={24} />}
                    </div>
                    <h3>
                      {modalAction.type === 'delete' && 'Supprimer le compte'}
                      {modalAction.type === 'ban' && 'Bannir le compte'}
                      {modalAction.type === 'suspend' && 'Suspendre le compte'}
                      {modalAction.type === 'activate' && 'Réactiver le compte'}
                    </h3>
                    <p>
                      {modalAction.type === 'delete' && 'Cette action est irréversible. Toutes les données de'}
                      {modalAction.type === 'ban' && "L'utilisateur ne pourra plus accéder à la plateforme."}
                      {modalAction.type === 'suspend' && "L'utilisateur sera temporairement bloqué."}
                      {modalAction.type === 'activate' && "L'utilisateur retrouvera un accès complet."}
                    </p>
                    <p><span className="modal-user-name">{modalAction.user.name}</span> — {modalAction.user.email}</p>
                    <div className="admin-modal-actions">
                      <button className="admin-modal-btn cancel" onClick={() => setModalAction(null)}>
                        Annuler
                      </button>
                      <button
                        className={`admin-modal-btn ${
                          modalAction.type === 'delete' || modalAction.type === 'ban' ? 'danger' :
                          modalAction.type === 'suspend' ? 'warning' : 'success'
                        }`}
                        onClick={handleAction}
                      >
                        {modalAction.type === 'delete' && <><Trash2 size={15} /> Supprimer</>}
                        {modalAction.type === 'ban' && <><ShieldBan size={15} /> Bannir</>}
                        {modalAction.type === 'suspend' && <><ShieldAlert size={15} /> Suspendre</>}
                        {modalAction.type === 'activate' && <><ShieldCheck size={15} /> Réactiver</>}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </main>
    </div>
  );
}
