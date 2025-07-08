import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'admin' | 'teacher' | 'warning';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary: {
    background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
    color: 'white',
  },
  admin: {
    background: 'linear-gradient(45deg, #ff4444, #cc3333)',
    color: 'white',
  },
  teacher: {
    background: 'linear-gradient(45deg, #ff9500, #cc7700)',
    color: 'white',
  },
  warning: {
    background: 'linear-gradient(45deg, #ffd700, #ccaa00)',
    color: 'black',
  }
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const baseStyle = {
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    opacity: disabled ? 0.6 : 1,
    ...variantStyles[variant]
  };

  return (
    <button
      style={baseStyle}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};