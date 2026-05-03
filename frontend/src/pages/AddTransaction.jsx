import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="flex-col items-center justify-center" style={{ height: '70vh' }}>
        <div style={{ background: 'var(--success-bg)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
          <CheckCircle2 size={48} color="var(--success)" />
        </div>
        <h2 className="title" style={{ fontSize: '1.5rem' }}>Transaction Added!</h2>
        <p className="text-muted">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '2rem' }}>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="title" style={{ fontSize: '1.75rem', marginBottom: 0 }}>Add Transaction</h1>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} className="flex-col gap-6">
          
          <div className="flex-col gap-2">
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <label style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--danger)',
                fontWeight: 600
              }}>
                <input type="radio" name="type" value="expense" defaultChecked style={{ display: 'none' }} />
                Expense
              </label>
              <label style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.02)',
                color: 'white',
              }}>
                <input type="radio" name="type" value="income" style={{ display: 'none' }} />
                Income
              </label>
            </div>
          </div>

          <div className="flex-col gap-2">
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Amount</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>$</span>
              <input 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                className="w-full" 
                required 
                style={{ fontSize: '1.5rem', paddingLeft: '2.5rem', fontWeight: 600 }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="flex-col gap-2">
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Category</label>
              <select className="w-full" required style={{ padding: '0.85rem 1rem' }}>
                <option value="">Select category...</option>
                <option value="food">🍔 Food & Dining</option>
                <option value="transport">🚗 Transport</option>
                <option value="shopping">🛍️ Shopping</option>
                <option value="entertainment">🎬 Entertainment</option>
                <option value="housing">🏠 Housing</option>
                <option value="utilities">⚡ Utilities</option>
                <option value="other">📦 Other</option>
              </select>
            </div>

            <div className="flex-col gap-2">
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Date</label>
              <input type="date" className="w-full" defaultValue={new Date().toISOString().split('T')[0]} required style={{ padding: '0.85rem 1rem' }} />
            </div>
          </div>

          <div className="flex-col gap-2">
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Description (Optional)</label>
            <textarea placeholder="What was this for?" rows="3" className="w-full"></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ padding: '1rem', marginTop: '1rem' }}>
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
