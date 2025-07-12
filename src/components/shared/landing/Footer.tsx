import Link from "next/link"
import { FaXTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-[#1D1D1D] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Branding */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            truefolio<span className="text-blue-600">.cv</span>
          </Link>
          <p className="text-sm text-gray-400 mt-2 max-w-xs">
            Beautiful, client-reviewed portfolios for freelancers. Get noticed and hired — faster.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 text-sm">
          <Link href="#features" className="hover:text-blue-500 transition">Features</Link>
          <Link href="#pricing" className="hover:text-blue-500 transition">Pricing</Link>
          <Link href="#testimonials" className="hover:text-blue-500 transition">Testimonials</Link>
          <Link href="#faq" className="hover:text-blue-500 transition">FAQ</Link>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-white">Connect</h4>
          <div className="flex items-center gap-4 text-lg">
            <Link href="https://x.com/codewithkin" target="_blank" aria-label="Twitter">
              <FaXTwitter className="hover:text-blue-500 transition" />
            </Link>
            <Link href="https://wa.link/l8jgyg" target="_blank" aria-label="WhatsApp">
              <FaWhatsapp className="hover:text-green-500 transition" />
            </Link>
            <Link href="mailto:codewithkin@gmail.com" target="_blank" aria-label="Email">
              <FaEnvelope className="hover:text-red-400 transition" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} truefolio.cv — Built by <Link href="https://x.com/codewithkin" className="underline hover:text-blue-500">Kin Leon</Link>
      </div>
    </footer>
  )
}
