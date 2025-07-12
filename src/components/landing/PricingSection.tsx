'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Clock, TrendingUp } from 'lucide-react'
import SecureYourSpotModal from './modals/SecureYourSpotModal'

export default function PricingSection() {
    return (
        <section id="pricing" className="py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-6"
                >
                    Pricing that rewards early movers
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto text-gray-400 mb-12"
                >
                    Join now and lock in a lifetime discount. Get early access, priority support, and exclusive feedback calls.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-6 text-left">
                    {/* Early Bird */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6"
                    >
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-white">Early Bird Access</h3>
                            <p className="text-sm text-white/80">Limited slots – only $21/month for life</p>
                        </div>
                        <div className="text-white text-3xl font-bold mb-4">$21<span className="text-sm font-normal">/month</span></div>
                        <ul className="space-y-2 text-sm text-white/90 mb-6">
                            <li className="flex items-center gap-2"><BadgeCheck size={16} /> 1-on-1 feedback calls</li>
                            <li className="flex items-center gap-2"><BadgeCheck size={16} /> Priority support</li>
                            <li className="flex items-center gap-2"><BadgeCheck size={16} /> Feature request voting</li>
                            <li className="flex items-center gap-2"><BadgeCheck size={16} /> Lifetime 30% discount</li>
                        </ul>
                        <SecureYourSpotModal />
                    </motion.div>

                    {/* Standard */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-[#1D1D1D] rounded-2xl p-6 border border-white/10"
                    >
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-white/90">Regular Access</h3>
                            <p className="text-sm text-gray-400">Available after launch</p>
                        </div>
                        <div className="text-white text-3xl font-bold mb-4">$30<span className="text-sm font-normal">/month</span></div>
                        <ul className="space-y-2 text-sm text-gray-400 mb-6">
                            <li className="flex items-center gap-2"><Clock size={16} /> No early bird benefits</li>
                            <li className="flex items-center gap-2"><TrendingUp size={16} /> Standard support</li>
                            <li className="flex items-center gap-2">No feedback calls</li>
                            <li className="flex items-center gap-2">No voting power</li>
                        </ul>
                        <button className="bg-gray-700 text-white text-sm px-4 py-2 rounded-lg cursor-not-allowed opacity-50" disabled>
                            Coming Soon
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
