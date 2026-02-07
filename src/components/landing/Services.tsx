import React from 'react';
import { ArrowRight, Check, Sprout, Leaf } from 'lucide-react';

interface Product {
    id: number;
    title: string;
    description: string;
    features: string[];
    priceRange: string;
    image: string;
    category: 'Seedlings' | 'Suckers';
}

interface ServicesProps {
    onOpenContact: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenContact }) => {
    const products: Product[] = [
        // Suckers
        {
            id: 1,
            title: "Plantain Suckers",
            description: "High-yield, disease-free plantlets grown in sterile lab conditions.",
            features: ["Climate-resilient variety", "High survival rate", "Suitable for smallholder farms"],
            priceRange: "₦200 per sucker",
            image: "/products/plantain_sucker.png",
            category: "Suckers"
        },
        {
            id: 2,
            title: "Banana Suckers",
            description: "Improved variety suckers fully acclimatized for field planting.",
            features: ["Improved yield potential", "Reduced disease risk", "Rapid establishment"],
            priceRange: "₦200 per sucker",
            image: "/products/banana_sucker.png",
            category: "Suckers"
        },
        {
            id: 3,
            title: "Pineapple Suckers",
            description: "Sweet, vigorous pineapple suckers ready for planting.",
            features: ["High sugar content variety", "Fast growing", "Drought tolerant"],
            priceRange: "Contact for Price",
            image: "/products/pineapple_sucker.png",
            category: "Suckers"
        },

        // Seedlings
        {
            id: 4,
            title: "Orange Seedlings",
            description: "Grafted hybrid orange seedlings for early fruiting.",
            features: ["Sweet & juicy", "Early maturity", "Disease resistant"],
            priceRange: "₦1,000 per seedling",
            image: "/products/orange_seedling.png",
            category: "Seedlings"
        },
        {
            id: 5,
            title: "Mango Seedlings",
            description: "Premium grafted mango seedlings.",
            features: ["Fibreless varieties", "High export value", "Vigorous growth"],
            priceRange: "₦1,000 per seedling",
            image: "/products/mango_seedling.png",
            category: "Seedlings"
        },
        {
            id: 6,
            title: "Lime/Lemon Seedlings",
            description: "High-quality citrus seedlings.",
            features: ["Juicy & aromatic", "Year-round fruiting potential", "Hardy rootstock"],
            priceRange: "₦1,000 per seedling",
            image: "/products/lime_lemon_seedling.png",
            category: "Seedlings"
        },
        {
            id: 7,
            title: "Watermelon Seedlings",
            description: "Hybrid watermelon seedlings/seeds.",
            features: ["High brix content", "Large fruit size", "Resistant to wilt"],
            priceRange: "Contact for Price",
            image: "/products/watermelon_seedling.png",
            category: "Seedlings"
        },
        {
            id: 8,
            title: "Bell Pepper",
            description: "Vibrant and crisp bell pepper seedlings.",
            features: ["Greenhouse or open field", "Thick flesh", "High market demand"],
            priceRange: "Contact for Price",
            image: "/products/bell_pepper_seedling.png",
            category: "Seedlings"
        }
    ];

    const renderProductCard = (product: Product) => (
        <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[hsl(var(--cream-bg))] text-[hsl(var(--dark-green))] text-xs font-bold rounded-full mb-2">
                        {product.category}
                    </span>
                    <h3 className="text-xl font-bold text-[hsl(var(--dark-green))] mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                    <ul className="space-y-2 mb-6">
                        {product.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                                <Check size={16} className="text-[hsl(var(--accent-orange))] mt-0.5 flex-shrink-0" />
                                <span>{feat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400">Price Range</span>
                        <span className="font-bold text-[hsl(var(--primary))]">{product.priceRange}</span>
                    </div>
                    <button
                        onClick={onOpenContact}
                        className="w-full py-3 bg-[hsl(var(--dark-green))] text-[hsl(var(--cream-bg))] font-semibold rounded-xl hover:bg-[hsl(var(--primary))] transition-colors flex items-center justify-center gap-2"
                    >
                        Request Supply
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-16 md:py-24 bg-[hsl(var(--cream-bg))]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[hsl(var(--accent-orange))] font-bold uppercase tracking-wider text-sm">Product Categories</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--dark-green))] mt-3 mb-4 font-serif">
                        Clean Planting Materials
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We supply verified disease-free seedlings and suckers directly to farmers.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto space-y-20">
                    {/* Seedlings Category */}
                    <div>
                        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                            <div className="w-12 h-12 rounded-full bg-[hsl(var(--dark-green))] text-white flex items-center justify-center shadow-lg">
                                <Sprout size={24} />
                            </div>
                            <h3 className="text-3xl font-bold text-[hsl(var(--dark-green))] font-serif">Seedlings</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.filter(p => p.category === 'Seedlings').map(renderProductCard)}
                        </div>
                    </div>

                    {/* Suckers Category */}
                    <div>
                        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                            <div className="w-12 h-12 rounded-full bg-[hsl(var(--dark-green))] text-white flex items-center justify-center shadow-lg">
                                <Leaf size={24} />
                            </div>
                            <h3 className="text-3xl font-bold text-[hsl(var(--dark-green))] font-serif">Suckers</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.filter(p => p.category === 'Suckers').map(renderProductCard)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
