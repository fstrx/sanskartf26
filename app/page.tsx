import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroLoader from '@/components/sections/HeroLoader'
import Chaos from '@/components/sections/Chaos'
import Understanding from '@/components/sections/Understanding'
import Interactive from '@/components/sections/Interactive'
import Global from '@/components/sections/Global'
import Data from '@/components/sections/Data'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroLoader />
        <Chaos />
        <Understanding />
        <Interactive />
        <Global />
        <Data />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
