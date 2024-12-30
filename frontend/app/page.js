import React from 'react';
import ProductList from '../components/ProductList';

const Page = () => {
    return (
        <>
            <div className="text-2xl font-bold text-left pl-4 mt-8 font-sans">
                Our Products:
            </div>
            <div className="text-2xl font-bold text-left mt-8 font-sans">
                <ProductList />
            </div>
            {/* Footer */}
            <footer className="text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} QwikBuyz. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Page;
