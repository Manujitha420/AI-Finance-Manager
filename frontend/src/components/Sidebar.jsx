import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, LogOut, Wallet } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Add Transaction', path: '/add-transaction', icon: <PlusCircle size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      position: 'fixed',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="flex items-center gap-2 mb-8" style={{ padding: '0 0.5rem' }}>
        <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
          <Wallet size={24} color="white" />
        </div>
        <h2 style={{ fontSize: '1.25rem', color: 'white' }}>AI Finance</h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 ${isActive ? 'active' : ''}`}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'white' : 'var(--text-muted)',
                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                fontWeight: isActive ? '500' : '400',
                transition: 'var(--transition)'
              }}
            >
              <span style={{ color: isActive ? 'var(--accent-primary)' : 'inherit' }}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '1rem 0' }}>
        <Link to="/login" className="flex items-center gap-3" style={{ color: 'var(--text-muted)', padding: '0.75rem 1rem' }}>
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
