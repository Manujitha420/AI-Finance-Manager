import React from 'react';
import { Bell, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <header style={{
      height: '80px',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(10px)',
      background: 'rgba(10, 10, 15, 0.8)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div className="flex items-center" style={{ 
        background: 'var(--bg-secondary)', 
        padding: '0.5rem 1rem', 
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-color)',
        width: '300px'
      }}>
        <Search size={18} className="text-muted" style={{ marginRight: '0.5rem' }} />
        <input 
          type="text" 
          placeholder="Search transactions..." 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            outline: 'none', 
            width: '100%',
            padding: 0
          }} 
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3" style={{ cursor: 'pointer' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--accent-primary), #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            color: 'white'
          }}>
            MR
          </div>
          <div className="flex-col">
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Manujitha</span>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>Pro Plan</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
