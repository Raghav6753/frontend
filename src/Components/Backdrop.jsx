import React from 'react';
import "../App.css"
const Backdrop = ({ visible, onClick }) => {
  return (
    visible && (
      <div
        id="backdrop"
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          width: '100%',
          height: 'calc(100% - 64px)',
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: 900
        }}
        onClick={onClick}
      />
    )
  );
};

export default Backdrop;
