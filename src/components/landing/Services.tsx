import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface Product {
    id: number;
    tag: string;
    tagColor: string;
    title: string;
    price: number;
    image: string;
}

interface ServicesProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

export const Services: React.FC<ServicesProps> = ({ products, onAddToCart }) => {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
                    <div>
                        <span className="text-[hsl(var(--accent-orange))] font-bold uppercase tracking-wider text-sm">Our Varieties</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--dark-green))] mt-2">Premium Cultivars</h2>
                    </div>
                    <button className="text-[hsl(var(--primary))] font-semibold hover:underline self-start md:self-auto">View All Varieties</button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group bg-[hsl(var(--cream-bg))] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[hsl(var(--primary))]/20">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-[hsl(var(--dark-green))] text-xs font-bold rounded-full shadow-sm">
                                    {product.tag}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[hsl(var(--dark-green))] mb-2">{product.title}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-2xl font-bold text-[hsl(var(--primary))]">₦{product.price.toLocaleString()}</span>
                                    <button
                                        onClick={() => onAddToCart(product)}
                                        className="w-10 h-10 rounded-full bg-[hsl(var(--accent-orange))] text-white flex items-center justify-center hover:bg-[hsl(var(--accent-orange))]/90 transition-colors shadow-md"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
