import React from 'react';
import { Package, ClipboardCheck, MessageCircle, BarChart3 } from 'lucide-react';

export const HowItWorks = () => {
    const steps = [
        {
            icon: <Package size={22} />,
            title: "Receive Quality Materials",
            desc: "Farmers get certified disease-free seedlings."
        },
        {
            icon: <ClipboardCheck size={22} />,
            title: "Soil Tested & Analyzed",
            desc: "We analyze soil health to optimize inputs."
        },
        {
            icon: <MessageCircle size={22} />,
            title: "Clear Advice Delivered",
            desc: "Actionable guidance via SMS, voice, or agent."
        },
        {
            icon: <BarChart3 size={22} />,
            title: "Monitor & Improve",
            desc: "Continuous tracking for better harvests."
        }
    ];

    return (
        <section className="py-14 md:py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--dark-green))] mb-3 font-serif">
                        How It Works
                    </h2>
                    <p className="text-gray-600 text-sm">A simple flow designed for trust and results.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

                    <div className="grid md:grid-cols-4 gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="w-14 h-14 bg-white border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] rounded-full flex items-center justify-center mb-5 font-bold shadow-sm group-hover:bg-[hsl(var(--primary))] group-hover:text-white transition-all duration-300 relative">
                                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-[hsl(var(--accent-orange))] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                                        {index + 1}
                                    </div>
                                    {step.icon}
                                </div>
                                <h3 className="text-base font-bold text-[hsl(var(--dark-green))] mb-1.5">{step.title}</h3>
                                <p className="text-xs text-gray-500 max-w-[180px]">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
