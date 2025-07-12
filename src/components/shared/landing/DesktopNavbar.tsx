// components/navbar/DesktopNavbar.tsx
'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import SecureYourSpotModal from "@/components/landing/modals/SecureYourSpotModal"

export default function DesktopNavbar() {
    return (
        <nav className="hidden md:flex items-center justify-between py-4 px-6 border-b bg-white">
            <Link href="/" className="text-2xl font-bold text-black">
                truefolio<span className="text-blue-600">.cv</span>
            </Link>
            <div className="flex gap-6 items-center">
                <Link href="#features" className="text-sm hover:text-blue-600 transition">Features</Link>
                <Link href="#pricing" className="text-sm hover:text-blue-600 transition">Pricing</Link>
                <Link href="#testimonials" className="text-sm hover:text-blue-600 transition">Testimonials</Link>
                <Link href="#faq" className="text-sm hover:text-blue-600 transition">FAQ</Link>
            </div>
            <SecureYourSpotModal />
        </nav>
    )
}
