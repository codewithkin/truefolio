'use client'

import { motion } from 'framer-motion'
import SecureYourSpotModal from "@/components/landing/modals/SecureYourSpotModal"

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="py-24 px-6 text-center flex flex-col items-center justify-center text-[#1D1D1D]"
        >
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Portfolios that speak for you.
                <br className="hidden md:block" />
                Built for{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    freelancers
                </span>
                , powered by client{' '}
                <span className="bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                    feedback
                </span>
            </h1>


            {/* Subheading */}
            <p className="mt-4 md:max-w-3xl text-gray-400 text-base md:text-lg">
                Truefolio helps freelancers build beautiful, client-reviewed portfolios
                that prove credibility, build trust, and help you get hired — faster
            </p>

            {/* CTA */}
            <div className="mt-4">
                <SecureYourSpotModal whiteBg={true} />
            </div>
        </motion.header>
    )
}
