import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Sparkles, TrendingUp } from 'lucide-react';

const Login = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* Left Artwork Side */}
      <div style={{ 
        flex: 1, 
        display: 'none', 
        '@media(minWidth: 900px)': { display: 'flex' },
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(10, 10, 15, 1) 70%)',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem'
      }} className="artwork-panel">
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          background: 'var(--accent-glow)', filter: 'blur(100px)', borderRadius: '50%',
          top: '20%', left: '20%'
        }}></div>
        
        <div style={{ zIndex: 1, color: 'white', maxWidth: '400px' }}>
          <div className="flex items-center gap-2 mb-6" style={{ background: 'rgba(255,255,255,0.05)', display: 'inline-flex', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
            <Sparkles size={18} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>AI Financial Intelligence</span>
          </div>
          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, fontWeight: 700, marginBottom: '1.5rem' }}>
            Master your <span style={{ color: 'var(--accent-primary)' }}>money</span>
          </h1>
          <p className="subtitle" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            Track expenses, visualize your wealth, and get deeply personalized AI insights on how to optimize your spending.
          </p>
          
          <div className="glass-card mt-4 flex items-center gap-4" style={{ padding: '1rem', width: 'fit-content' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.75rem', borderRadius: '50%' }}>
              <TrendingUp color="var(--success)" size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>AI Prediction</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>+24% Savings Route</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Form Side */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '3rem' }}>
          <div className="flex items-center gap-3 justify-center mb-8">
            <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
              <Wallet size={24} color="white" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>AI Finance</h2>
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: 'white' }}>Welcome back</h3>
          <p className="text-muted mb-6">Enter your details to access your dashboard.</p>

          <form className="flex-col gap-4">
            <div className="flex-col gap-1">
              <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Email address</label>
              <input type="email" placeholder="you@example.com" className="w-full" required />
            </div>
            
            <div className="flex-col gap-1">
              <div className="flex justify-between">
                <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Password</label>
                <a href="#" style={{ fontSize: '0.875rem' }}>Forgot password?</a>
              </div>
              <input type="password" placeholder="••••••••" className="w-full" required />
            </div>

            <Link to="/dashboard" className="mt-4">
              <button type="button" className="btn btn-primary w-full" style={{ padding: '1rem' }}>
                Sign in to Dashboard
              </button>
            </Link>
          </form>

          <p className="text-muted mt-6" style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign up for free</Link>
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .artwork-panel { display: none !important; }
        }
      `}} />
    </div>
  );
};

export default Login;
