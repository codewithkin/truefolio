'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Globe, MessageSquareHeart, Star, LinkIcon, Sparkles } from 'lucide-react'

const features = [
    {
        title: 'Own Your Space',
        description: 'Get your own subdomain (like kin.truefolio.cv) and stand out as a pro.',
        icon: Globe,
    },
    {
        title: 'Client Reviews That Convert',
        description: 'Let your clients vouch for you — showcase ratings and testimonials.',
        icon: Star,
    },
    {
        title: 'Built for Freelancers',
        description: 'Truefolio is designed from the ground up to solve real freelancer problems.',
        icon: BadgeCheck,
    },
    {
        title: 'One-Link Proof',
        description: 'Share a single, powerful link with everything that matters.',
        icon: LinkIcon,
    },
    {
        title: 'Early Feedback Advantage',
        description: 'Invite clients to leave feedback with one click, early in the project.',
        icon: MessageSquareHeart,
    },
    {
        title: 'Stand Out, Not Blend In',
        description: 'Beautiful layouts that don’t feel generic or templated.',
        icon: Sparkles,
    },
]

export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    Everything freelancers need, nothing they don't.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto text-gray-400 mb-6"
                >
                    Truefolio helps you build proof-driven portfolios, collect feedback, and win more trust from clients.
                </motion.p>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="bg-gradient-to-br from-[#1D1D1D] to-slate-800 rounded-2xl p-6 text-left hover:shadow-lg hover:shadow-blue-500/10 transition text-white"
                        >
                            <feature.icon className="w-6 h-6 text-blue-500 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
