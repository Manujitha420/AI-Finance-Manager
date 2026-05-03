import React from 'react';
import { Utensils, Car, ShoppingBag, Coffee, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const mockTransactions = [
  { id: 1, name: 'Uber Ride', category: 'Transport', amount: 24.50, type: 'expense', date: 'Today, 2:30 PM', icon: <Car size={18} /> },
  { id: 2, name: 'Whole Foods', category: 'Groceries', amount: 120.00, type: 'expense', date: 'Today, 10:15 AM', icon: <ShoppingBag size={18} /> },
  { id: 3, name: 'Salary', category: 'Income', amount: 4500.00, type: 'income', date: 'Yesterday', icon: <ArrowDownRight size={18} /> },
  { id: 4, name: 'Starbucks', category: 'Food', amount: 5.40, type: 'expense', date: 'Yesterday', icon: <Coffee size={18} /> },
  { id: 5, name: 'Dining out', category: 'Food', amount: 65.00, type: 'expense', date: 'Oct 24', icon: <Utensils size={18} /> },
];

const TransactionList = () => {
  return (
    <div className="flex-col gap-3">
      {mockTransactions.map((tx) => (
        <div key={tx.id} className="glass-card flex items-center justify-between" style={{ padding: '1rem' }}>
          <div className="flex items-center gap-3">
            <div style={{ 
              background: tx.type === 'income' ? 'var(--success-bg)' : 'rgba(255,255,255,0.05)',
              color: tx.type === 'income' ? 'var(--success)' : 'white',
              padding: '0.75rem', 
              borderRadius: '50%' 
            }}>
              {tx.icon}
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>{tx.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tx.category} • {tx.date}</div>
            </div>
          </div>
          <div style={{ 
            fontWeight: 600, 
            color: tx.type === 'income' ? 'var(--success)' : 'white' 
          }}>
            {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
