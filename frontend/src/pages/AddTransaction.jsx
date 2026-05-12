import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import transactionService from '../services/transactionService';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
    amount: '',
    category: '',
    type: 'expense'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await transactionService.addTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', itemsCenter: 'center', justifyContent: 'center', height: '70vh' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', alignSelf: 'center' }}>
          <CheckCircle2 size={48} color="var(--success)" />
        </div>
        <h2 className="title" style={{ fontSize: '1.5rem', textAlign: 'center' }}>Transaction Added!</h2>
        <p className="text-muted" style={{ textAlign: 'center' }}>Redirecting to dashboard...</p>
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
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'expense'})}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: formData.type === 'expense' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.02)',
                  color: formData.type === 'expense' ? 'var(--danger)' : 'white',
                  fontWeight: formData.type === 'expense' ? 600 : 400,
                  transition: 'all 0.2s'
                }}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'income'})}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: formData.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                  color: formData.type === 'income' ? 'var(--success)' : 'white',
                  fontWeight: formData.type === 'income' ? 600 : 400,
                  transition: 'all 0.2s'
                }}
              >
                Income
              </button>
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
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required 
                style={{ fontSize: '1.5rem', paddingLeft: '2.5rem', fontWeight: 600 }}
              />
            </div>
          </div>

          <div className="flex-col gap-2">
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Category</label>
            <select 
              className="w-full" 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required 
              style={{ padding: '0.85rem 1rem' }}
            >
              <option value="">Select category...</option>
              <option value="Food">🍔 Food & Dining</option>
              <option value="Transport">🚗 Transport</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Rent">🏠 Rent/Housing</option>
              <option value="Health">🏥 Health</option>
              <option value="Salary">💰 Salary</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          <div className="flex-col gap-2">
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Description</label>
            <textarea 
              placeholder="What was this for?" 
              rows="3" 
              className="w-full"
              value={formData.text}
              onChange={(e) => setFormData({...formData, text: e.target.value})}
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full" 
            style={{ padding: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              'Save Transaction'
            )}
          </button>
        </form>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default AddTransaction;
