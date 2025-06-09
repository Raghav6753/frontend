import { useState } from 'react';
import React from 'react';
import '../App.css';
import Toast from '../Toast/ToastMess';
import { Link, useNavigate } from 'react-router-dom';

const packages = [
  {
    title: 'Basic Package',
    price: 1,
    description: 'Includes access to basic study materials, community forums, and test series.',
  },
  {
    title: 'Pro Package',
    price: 2,
    description: 'All features in Basic + mentorship support, AI doubt solving, and progress tracking.',
  },
  {
    title: 'Ultimate Package',
    price: 3,
    description: 'Everything in Pro + smart scheduler, flashcards, revision plans, and priority support.',
  },
];

const PackagesSection = () => {
  const [toastMsg, setToastMsg] = useState(null);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleClick = (e, path) => {
    if (!user) {
      e.preventDefault(); // stop link navigation
      setToastMsg("Login to continue");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="packages-page">
      {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
      )}
      <h3 className="packages-heading">Our Packages</h3>
      <div className="packages-section">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="package-card"
            to="#"
            onClick={(e) => handleClick(e, "/pro-feature")}
          >
            <div className="package-title">{pkg.title}</div>
            <div className="package-price">₹{pkg.price} / month</div>
            <div className="package-description">{pkg.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagesSection;
