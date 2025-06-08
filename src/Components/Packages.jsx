import React from 'react';
import '../App.css'; // External CSS file

const packages = [
  {
    title: 'Basic Package',
    price: 499,
    description: 'Includes access to basic study materials, community forums, and test series.',
  },
  {
    title: 'Pro Package',
    price: 999,
    description: 'All features in Basic + mentorship support, AI doubt solving, and progress tracking.',
  },
  {
    title: 'Ultimate Package',
    price: 1499,
    description: 'Everything in Pro + smart scheduler, flashcards, revision plans, and priority support.',
  },
];

const PackagesSection = () => {
  const handlePayment = async (amount, packageTitle) => {
  if (!window.Razorpay) {
    alert('Razorpay SDK not loaded. Please check your script import.');
    return;
  }

  try {
    const API = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${API}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount * 100 }), // amount in paise
    });

    if (!res.ok) {
      alert('Failed to create order. Please try again.');
      return;
    }

    const data = await res.json();

    const options = {
      key: 'rzp_test_p5spBljvg1aGjg', // 🛑 Replace with process.env one or Razorpay Key ID
      amount: data.amount,
      currency: data.currency,
      name: 'My Study Platform',
      description: packageTitle,
      order_id: data.id,
      handler: async function (response) {
        try {
          const verifyRes = await fetch('/api/user/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const result = await verifyRes.json();

          if (result.success) {
            alert(`✅ Payment Verified!\nPayment ID: ${response.razorpay_payment_id}`);
          } else {
            alert("❌ Payment Failed! Invalid Signature.");
          }
        } catch (err) {
          console.error("Verification error", err);
          alert("❌ Verification Failed! Something went wrong.");
        }
      },
      prefill: {
        name: 'Student Name',
        email: 'student@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error(error);
    alert('Something went wrong while initiating payment.');
  }
};



  return (
    <div className="packages-page">
      <h3 className="packages-heading">Our Packages</h3>
      <div className="packages-section">
        {packages.map((pkg, index) => (
          <div key={index} className="package-card" onClick={() => handlePayment(pkg.price, pkg.title)} style={{ cursor: 'pointer' }}>
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
