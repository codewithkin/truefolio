import DesktopNavbar from "@/components/shared/landing/DesktopNavbar"
import Footer from "@/components/shared/landing/Footer"
import MobileNavbar from "@/components/shared/landing/Mobilenavbar"
import Header from "@/components/landing/Header"
import FeaturesSection from "@/components/landing/FeaturesSection"

function Landing() {
  return (
    <main>
      <DesktopNavbar />
      <MobileNavbar />
      <Header />
      <FeaturesSection />
      <Footer />
    </main>
  )
}

export default Landing
