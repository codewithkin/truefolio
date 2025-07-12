'use client'

import { motion } from 'framer-motion'
import SecureYourSpotModal from "@/components/landing/modals/SecureYourSpotModal"

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="py-24 px-6 text-center flex flex-col items-center justify-center bg-[#1D1D1D] text-white"
    >
      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
        Portfolios that speak for you.
        <br className="hidden md:block" />
        Built for freelancers, powered by client feedback.
      </h1>

      {/* Subheading */}
      <p className="mt-6 max-w-xl text-gray-400 text-base md:text-lg">
        Truefolio helps freelancers build beautiful, client-reviewed portfolios
        that prove credibility, build trust, and help you get hired — faster.
        Join now and get early access for 60% off — for life.
      </p>

      {/* CTA */}
      <div className="mt-10">
        <SecureYourSpotModal />
      </div>
    </motion.header>
  )
}
