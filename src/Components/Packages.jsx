import React from 'react';
import '../App.css'; // External CSS file

const packages = [
  {
    title: 'Basic Package',
    price: '₹499 / month',
    description: 'Includes access to basic study materials, community forums, and test series.',
  },
  {
    title: 'Pro Package',
    price: '₹999 / month',
    description: 'All features in Basic + mentorship support, AI doubt solving, and progress tracking.',
  },
  {
    title: 'Ultimate Package',
    price: '₹1499 / month',
    description: 'Everything in Pro + smart scheduler, flashcards, revision plans, and priority support.',
  },
];

const PackagesSection = () => {
  return (
    <div className="packages-page">
      <h3 className="packages-heading">Our Packages</h3>
      <div className="packages-section">
        {packages.map((pkg, index) => (
          <div key={index} className="package-card">
            <div className="package-title">{pkg.title}</div>
            <div className="package-price">{pkg.price}</div>
            <div className="package-description">{pkg.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagesSection;
