import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'admin' | 'teacher' | 'warning';
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  primary: {
    border: '1px solid #00d4ff',
    boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
  },
  admin: {
    border: '1px solid #ff4444',
    boxShadow: '0 0 20px rgba(255, 68, 68, 0.1)',
  },
  teacher: {
    border: '1px solid #ff9500',
    boxShadow: '0 0 20px rgba(255, 149, 0, 0.1)',
  },
  warning: {
    border: '1px solid #ffd700',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
  }
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '' 
}) => {
  const baseStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '12px',
    padding: '30px',
    transition: 'all 0.3s ease',
    cursor: onClick ? 'pointer' : 'default',
    ...variantStyles[variant]
  };

  return (
    <div 
      style={baseStyle}
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  );
};