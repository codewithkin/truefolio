'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SecureYourSpotModal from "@/components/landing/modals/SecureYourSpotModal"

export default function MobileNavbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="flex md:hidden items-center justify-between px-4 py-4 bg-[#1D1D1D]">
            <Link href="/" className="text-xl font-bold text-white">
                truefolio<span className="text-blue-600">.cv</span>
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                        <Menu size={24} />
                    </Button>
                </SheetTrigger>

                <SheetContent side="right" className="bg-[#1D1D1D] text-white w-full h-full flex flex-col justify-between">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-bold text-white">
                            truefolio<span className="text-blue-600">.cv</span>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col gap-6 mt-8 text-gray-300 font-medium px-4">
                        <Link href="#features" onClick={() => setOpen(false)} className="text-base hover:text-blue-600 transition">
                            Features
                        </Link>
                        <Link href="#pricing" onClick={() => setOpen(false)} className="text-base hover:text-blue-600 transition">
                            Pricing
                        </Link>
                        <Link href="#testimonials" onClick={() => setOpen(false)} className="text-base hover:text-blue-600 transition">
                            Testimonials
                        </Link>
                        <Link href="#faq" onClick={() => setOpen(false)} className="text-base hover:text-blue-600 transition">
                            FAQ
                        </Link>
                    </div>

                    <div className="mt-10 px-4 pb-8">
                        <SecureYourSpotModal />
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    )
}
