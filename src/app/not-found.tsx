"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Ghost, Rocket, Folder, Search } from "lucide-react"
import DesktopNavbar from "@/components/shared/landing/DesktopNavbar"
import MobileNavbar from "@/components/shared/landing/Mobilenavbar"
import Footer from "@/components/shared/landing/Footer"

const floatingIcons = [
    { Icon: Rocket, x: -100, y: -50, delay: 0.1 },
    { Icon: Folder, x: 100, y: 80, delay: 0.3 },
    { Icon: Search, x: -60, y: 120, delay: 0.5 },
    { Icon: Ghost, x: 60, y: -100, delay: 0.7 },
]

export default function NotFound() {
    return (
        <>
            <DesktopNavbar />
            <MobileNavbar />
            <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20">
                {/* Floating Icons */}
                {floatingIcons.map(({ Icon, x, y, delay }, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        animate={{ opacity: 0.3, x, y }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay,
                            ease: "easeInOut",
                        }}
                        className="absolute"
                    >
                        <Icon className="w-20 h-20 text-slate-800" />
                    </motion.div>
                ))}

                {/* Brand Icon */}
                <Image
                    src="/icons/icon.jpg"
                    alt="Truefolio logo"
                    width={64}
                    height={64}
                    className="rounded-xl mb-4 border border-white/20 shadow-md"
                />

                {/* Headings */}
                <h1 className="text-5xl font-bold tracking-tight toast">404</h1>
                <p className="mt-2 text-md text-slate-400">
                    Page not found. The page you’re looking for doesn’t exist.
                </p>

                {/* CTA */}
                <Button asChild size="lg" className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 toast">
                    <Link href="/">Return to homepage</Link>
                </Button>

                {/* Signature */}
                <p className="mt-10 text-sm toast/50">
                    — Built with 💙 by <span className="toast font-medium">Truefolio</span>
                </p>
            </div>
            <Footer />
        </>
    )
}
