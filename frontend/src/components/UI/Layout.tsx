import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Private Class Tracker',
  description = 'Private Class Management System',
  showHeader = true
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #2a3441 100%)',
        color: '#e0e6ed',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {showHeader && (
          <header style={{
            borderBottom: '1px solid #00d4ff',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '20px 0'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
              <h1 style={{
                fontSize: '2rem',
                color: '#00d4ff',
                fontWeight: '300',
                margin: 0,
                textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
              }}>
                Private Class Tracker
              </h1>
              <p style={{ 
                color: '#b0b7c3', 
                margin: '5px 0 0 0',
                fontSize: '0.9rem'
              }}>
                Command & Control Center
              </p>
            </div>
          </header>
        )}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          {children}
        </div>
      </main>
    </>
  );
};