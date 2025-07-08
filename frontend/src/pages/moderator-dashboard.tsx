import React from 'react';
import Head from 'next/head';

export default function ModeratorDashboard() {
  return (
    <>
      <Head>
        <title>Moderator Dashboard - Private Class Tracker</title>
      </Head>
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        color: '#e0e6ed',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#00d4ff', fontSize: '2.5rem', marginBottom: '2rem' }}>
            Moderator Dashboard
          </h1>
          <p style={{ color: '#b0b7c3', fontSize: '1.1rem' }}>
            Welcome to the moderator dashboard. This area is under development.
          </p>
        </div>
      </main>
    </>
  );
}