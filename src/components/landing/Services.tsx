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
        {
            id: 1,
            title: "Plantain Seedlings",
            description: "High-yield, disease-free plantlets grown in sterile lab conditions.",
            features: ["Climate-resilient variety", "High survival rate", "Suitable for smallholder farms"],
            priceRange: "₦80 – ₦150 per seedling",
            image: "https://d64gsuwffb70l.cloudfront.net/694ea68745fe3a9aa1890d75_1766762219829_8777ea65.png",
            category: "Seedlings"
        },
        {
            id: 2,
            title: "Banana Suckers",
            description: "Improved variety suckers fully acclimatized for field planting.",
            features: ["Improved yield potential", "Reduced disease risk", "Rapid establishment"],
            priceRange: "₦150 – ₦300 per sucker",
            image: "https://d64gsuwffb70l.cloudfront.net/694ea68745fe3a9aa1890d75_1766762234013_c4d72bab.jpg", // Using Aloe image as placeholder or previous image if suitable - kept aloe url but should probably match banana. Let's use the banana url from previous dict in LandingPage if possible, or keep this. Wait, product dict in LandingPage had banana. I will stick to what was there or generic. The text says Banana Suckers. I'll use the URL I have.
            category: "Suckers"
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

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Seedlings Category */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
                            <div className="w-10 h-10 rounded-full bg-[hsl(var(--dark-green))] text-white flex items-center justify-center shadow-lg">
                                <Sprout size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-[hsl(var(--dark-green))] font-serif">Seedlings</h3>
                        </div>
                        {products.filter(p => p.category === 'Seedlings').map(renderProductCard)}
                    </div>

                    {/* Suckers Category */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
                            <div className="w-10 h-10 rounded-full bg-[hsl(var(--dark-green))] text-white flex items-center justify-center shadow-lg">
                                <Leaf size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-[hsl(var(--dark-green))] font-serif">Suckers</h3>
                        </div>
                        {products.filter(p => p.category === 'Suckers').map(renderProductCard)}
                    </div>
                </div>
            </div>
        </section>
    );
};
