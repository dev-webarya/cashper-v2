import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Rahul Sharma',
        role: 'Business Owner',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        text: 'Cashper made getting a business loan incredibly simple. The process was smooth, and I got the funds within 48 hours. Highly recommended!',
    },
    {
        id: 2,
        name: 'Priya Patel',
        role: 'IT Professional',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        text: 'The tax planning service saved me thousands of rupees. The experts are knowledgeable and always available to answer questions.',
    },
    {
        id: 3,
        name: 'Amit Kumar',
        role: 'Entrepreneur',
        image: 'https://randomuser.me/api/portraits/men/67.jpg',
        rating: 5,
        text: 'Outstanding customer service! They helped me find the perfect insurance plan for my family. The claims process was hassle-free.',
    },
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust Cashper for their financial needs
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                            {/* Quote Icon */}
                            <div className="mb-4">
                                <Quote className="w-10 h-10 text-blue-500 opacity-50" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-16 text-center">
                    <p className="text-gray-500 mb-6">Trusted by 10,000+ customers</p>
                    <div className="flex justify-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                            <span className="text-green-600 font-semibold">4.9</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm">Google Reviews</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
