import React from 'react';

export const Features = () => {
    return (
        <section className="py-12 md:py-20 bg-[hsl(var(--cream-bg))]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-serif text-[hsl(var(--dark-green))] mb-4">
                        Centuries of Connections
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Combining traditional agricultural wisdom with modern tissue culture biotechnology.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image Card */}
                    <div className="relative group">
                        {/* Decorative background removed */}
                        <img
                            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2670&auto=format&fit=crop"
                            alt="Farmer inspecting plants"
                            className="relative w-full h-[300px] md:h-[400px] object-cover rounded-[2rem] shadow-xl"
                        />
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[hsl(var(--cream-bg))] p-4 rounded-xl shadow-xl hidden md:flex items-center justify-center">
                            <div className="text-center">
                                <span className="block text-4xl font-bold text-[hsl(var(--dark-green))]">98%</span>
                                <span className="text-sm text-gray-600">Survival Rate</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-[hsl(var(--primary))]">Service Cards</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We provide end-to-end agricultural solutions. From initial tissue culture propagation in our sterile labs to hardening and field delivery.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-[hsl(var(--dark-green))]">Tissue Culture</h4>
                                <p className="text-sm text-gray-500 mt-1">Virus-free propagation</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-[hsl(var(--dark-green))]">Hardening</h4>
                                <p className="text-sm text-gray-500 mt-1">Acclimatization center</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-[hsl(var(--dark-green))]">Logistics</h4>
                                <p className="text-sm text-gray-500 mt-1">Nationwide delivery</p>
                            </div>
                            <div className="p-4 bg-[hsl(var(--accent-orange))] rounded-xl shadow-sm text-white flex items-center justify-center cursor-pointer hover:bg-opacity-90">
                                <span className="font-bold">View All &rarr;</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
