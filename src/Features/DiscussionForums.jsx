import React from 'react';
const commonStyles = {
  page: {
    backgroundColor: '#0d1117',
    minHeight: '100vh',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    background: 'linear-gradient(145deg, #12181f, #1c222b)',
    padding: '3rem 2.5rem',
    borderRadius: '16px',
    boxShadow: '0 0 30px rgba(0, 255, 204, 0.08)',
    maxWidth: '420px',
    textAlign: 'center',
  },
  title: {
    color: '#00ffcc',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
  },
  text: {
    color: '#ccc',
    fontSize: '1rem',
    lineHeight: '1.6',
    textDecoration:'none'
  },
  link: {
    display: 'inline-block',
    marginTop: '1.5rem',
    color: '#00ffcc',
    textDecoration: 'none',
  }
};

const styles = {
  ...commonStyles,
};

const DiscussionForums = () => {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Discussion Forums</h1>
        <p style={styles.text}>
          Ask and answer questions. Engage with other aspirants in structured threads.
        </p>
        <a href="/" style={styles.link}>← Back to Home</a>
      </div>
    </div>
  );
};



export default DiscussionForums;
