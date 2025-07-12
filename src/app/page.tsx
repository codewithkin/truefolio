import DesktopNavbar from "@/components/shared/landing/DesktopNavbar"
import Footer from "@/components/shared/landing/Footer"
import MobileNavbar from "@/components/shared/landing/Mobilenavbar"

function Landing() {
  return (
    <main>
      <DesktopNavbar />
      <MobileNavbar />

      <Footer />
    </main>
  )
}

export default Landing
