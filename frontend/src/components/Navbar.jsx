import React from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

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
        <div className="flex items-center gap-3">
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
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-col">
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user?.name || 'User'}</span>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>Pro Plan</span>
          </div>
          <button 
            onClick={logout}
            className="btn-secondary" 
            style={{ 
              padding: '0.5rem', 
              marginLeft: '0.5rem', 
              borderRadius: 'var(--radius-sm)',
              color: 'var(--danger)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
