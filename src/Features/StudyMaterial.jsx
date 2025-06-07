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
    padding: '2rem',
  },
  card: {
    background: 'linear-gradient(145deg, #12181f, #1c222b)',
    padding: '3rem 2.5rem',
    borderRadius: '16px',
    boxShadow: '0 0 30px rgba(0, 255, 204, 0.08)',
    maxWidth: '720px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    color: '#00ffcc',
    marginBottom: '2rem',
    fontSize: '2rem',
  },
  subjectContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  subjectCard: {
    backgroundColor: '#1f2933',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'left',
    transition: 'transform 0.3s ease',
  },
  subjectCardHover: {
    transform: 'translateY(-3px)',
  },
  subjectTitle: {
    color: '#00ffcc',
    marginBottom: '0.75rem',
    fontSize: '1.2rem',
  },
  topicList: {
    color: '#ccc',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    paddingLeft: '1.2rem',
  },
  link: {
    display: 'inline-block',
    marginTop: '2rem',
    color: '#00ffcc',
    textDecoration: 'none',
    fontSize: '0.95rem',
  }
};

const StudyMaterials = () => {
  return (
    <div style={commonStyles.page}>
      <div style={commonStyles.card}>
        <h1 style={commonStyles.title}>Study Materials</h1>

        <div style={commonStyles.subjectContainer}>
          <div style={commonStyles.subjectCard}>
            <h2 style={commonStyles.subjectTitle}>Physics</h2>
            <ul style={commonStyles.topicList}>
              <li>Motion & Kinematics</li>
              <li>Thermodynamics</li>
              <li>Electromagnetism</li>
            </ul>
          </div>

          <div style={commonStyles.subjectCard}>
            <h2 style={commonStyles.subjectTitle}>Chemistry</h2>
            <ul style={commonStyles.topicList}>
              <li>Atomic Structure</li>
              <li>Organic Chemistry</li>
              <li>Chemical Bonding</li>
            </ul>
          </div>

          <div style={commonStyles.subjectCard}>
            <h2 style={commonStyles.subjectTitle}>Maths</h2>
            <ul style={commonStyles.topicList}>
              <li>Calculus</li>
              <li>Algebra</li>
              <li>Coordinate Geometry</li>
            </ul>
          </div>
        </div>

        <a href="/" style={commonStyles.link}>← Back to Home</a>
      </div>
    </div>
  );
};

export default StudyMaterials;
