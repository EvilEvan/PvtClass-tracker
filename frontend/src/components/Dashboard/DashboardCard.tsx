import React from 'react';
import Link from 'next/link';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'admin' | 'teacher' | 'warning';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  href,
  onClick,
  variant = 'default'
}) => {
  const content = (
    <Card variant={variant} onClick={onClick}>
      <div style={{
        width: '60px',
        height: '60px',
        backgroundColor: `rgba(${variant === 'admin' ? '255, 68, 68' : 
                              variant === 'teacher' ? '255, 149, 0' : 
                              variant === 'warning' ? '255, 215, 0' : '0, 212, 255'}, 0.2)`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <span style={{ fontSize: '24px', color: 
          variant === 'admin' ? '#ff4444' : 
          variant === 'teacher' ? '#ff9500' : 
          variant === 'warning' ? '#ffd700' : '#00d4ff' 
        }}>
          {icon}
        </span>
      </div>
      <h3 style={{
        color: variant === 'admin' ? '#ff4444' : 
               variant === 'teacher' ? '#ff9500' : 
               variant === 'warning' ? '#ffd700' : '#00d4ff',
        fontSize: '1.4rem',
        marginBottom: '10px',
        fontWeight: '500'
      }}>
        {title}
      </h3>
      <p style={{
        color: '#b0b7c3',
        fontSize: '0.95rem',
        lineHeight: '1.5',
        marginBottom: '20px'
      }}>
        {description}
      </p>
      <Button variant={variant}>
        {buttonText}
      </Button>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
};