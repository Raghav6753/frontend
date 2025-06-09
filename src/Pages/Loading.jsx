import React from "react";

const Loading = () => {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body, html {
          height: 100%;
          background: #0d1117;
          overflow: hidden;
        }

        .loading-container {
          height: 100vh;
          width:100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0d1117;
        }

        .loading-logo {
          font-size: 3.5rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          color: #00ffcc;
          text-shadow: 0 0 30px rgba(0, 255, 204, 0.8);
        }

        .gradient-text {
          margin-left: 12px;
          background: linear-gradient(270deg, #00fff0, #00d4ff, #00bfff, #00ffa6, #00fff0);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientFlow 3s ease-in-out infinite;
          text-shadow: 0 0 20px rgba(0, 255, 204, 0.4);
        }

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      <div className="loading-container">
        <h1 className="loading-logo">
          ∑ <span className="gradient-text">SigmaJEE</span>
        </h1>
      </div>
    </>
  );
};

export default Loading;
