import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <Link href={`/products/${product.product_id}`}>
                <div className="relative">
                    {/* Thumbnail with zoom effect */}
                    <div className="relative h-56 overflow-hidden">
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Product Details with improved spacing and typography */}
                    <div className="p-5">
                        {/* Title with better truncate */}
                        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 line-clamp-2 min-h-[3.5rem]">
                            {product.title}
                        </h3>

                        {/* Category with pill design */}
                        <div className="mb-3">
                            <span className="inline-block px-3 py-0.5 text-sm bg-gray-100 text-gray-600 rounded-full capitalize">
                                {product.category}
                            </span>
                        </div>

                        {/* Price with enhanced styling */}
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-2xl font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                            </p>
                            <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
                                View Details →
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;