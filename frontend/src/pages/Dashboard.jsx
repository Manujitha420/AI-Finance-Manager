import React from 'react';
import { Sparkles, Wallet, TrendingUp, ArrowDownRight } from 'lucide-react';
import Chart from '../components/Chart';
import TransactionList from '../components/TransactionList';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="title" style={{ fontSize: '1.75rem' }}>Dashboard</h1>
          <p className="subtitle" style={{ marginBottom: 0 }}>Overview of your finances</p>
        </div>
        <Link to="/add-transaction">
          <button className="btn btn-primary">
            + Add Transaction
          </button>
        </Link>
      </div>

      {/* Top Value Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)' }}>
          <div className="flex items-center gap-3 mb-2 text-muted">
            <Wallet size={18} /> Total Balance
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>$12,450.00</div>
          <div className="flex items-center gap-2" style={{ color: 'var(--success)', fontSize: '0.9rem' }}>
            <TrendingUp size={16} /> +5.2% from last month
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div className="flex items-center gap-3 mb-2 text-muted">
            <ArrowDownRight size={18} /> Monthly Spending
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>$3,240.50</div>
          <div className="flex items-center gap-2" style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>
            <TrendingUp size={16} style={{ transform: 'rotate(180deg)' }} /> +12% from last month
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
          <div className="flex items-center gap-3 mb-2" style={{ color: 'var(--accent-primary)' }}>
            <Sparkles size={18} /> AI Insight
          </div>
          <p style={{ lineHeight: 1.5, marginTop: '0.5rem' }}>
            You spent <strong>25% more</strong> on transport this week. Consider switching to public transit to save ~$120/mo.
          </p>
          <button className="btn btn-secondary mt-4" style={{ width: '100%', fontSize: '0.9rem', padding: '0.5rem' }}>
            View Full Analysis
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {/* Chart Section */}
        <div className="glass-card">
          <div className="flex justify-between items-center mb-6">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Spending Activity</h3>
            <select style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '4px' }}>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <Chart />
        </div>

        {/* Transactions Section */}
        <div className="glass-card">
          <div className="flex justify-between items-center mb-6">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Recent Transactions</h3>
            <a href="#" style={{ fontSize: '0.9rem' }}>View All</a>
          </div>
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
