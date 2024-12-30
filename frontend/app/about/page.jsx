import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Main Title */}
      <div className="text-4xl font-bold text-center text-gray-800 mb-8">
        About QwikBuyz
      </div>

      {/* Our Story Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          QwikBuyz was founded in 2024 with the objective of delivering quality products at the best deals. 
          We are a team of dedicated professionals who are passionate about providing a hassle-free shopping 
          experience to our customers. Our objective is to simplify the purchase process by ensuring that 
          customers get the best deal on a product and low delivery times.
        </p>
      </section>

      {/* How QwikBuyz Works Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How QwikBuyz Works</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We have extensive collaborations with diverse vendors and product outlets. 
          Our team identifies the best discounts on products and lists them on our platform. 
          Vendors can also list their products on our platform and reach a wider audience, 
          ensuring a seamless shopping experience for both buyers and sellers.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} QwikBuyz. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
