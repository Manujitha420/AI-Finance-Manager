import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(10, 10, 15, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '0.75rem',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{label}</p>
        <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const Chart = ({ transactions = [] }) => {
  // Group spending by day for the last 7 days
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  const chartData = days.map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    const dayName = days[d.getDay()];
    
    const dailySpend = transactions
      .filter(t => t.type === 'expense')
      .filter(t => new Date(t.createdAt).toDateString() === d.toDateString())
      .reduce((acc, curr) => acc + curr.amount, 0);
      
    return { name: dayName, spend: dailySpend };
  });

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="spend" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
