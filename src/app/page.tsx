import DesktopNavbar from "@/components/shared/landing/DesktopNavbar"
import Footer from "@/components/shared/landing/Footer"
import MobileNavbar from "@/components/shared/landing/Mobilenavbar"
import Header from "@/components/landing/Header"
import FeaturesSection from "@/components/landing/FeaturesSection"
import PricingSection from "@/components/landing/PricingSection"
import FaqSection from "@/components/landing/FAQ"
import ComparisonTable from "@/components/landing/ComparisonTable"

function Landing() {
  return (
    <main>
      <DesktopNavbar />
      <MobileNavbar />
      <Header />
      <FeaturesSection />
      <ComparisonTable />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  )
}

export default Landing
