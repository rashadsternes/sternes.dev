import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import QuoteBreak from '@/components/QuoteBreak'
import WhyChooseMe from '@/components/WhyChooseMe'
import Portfolio from '@/components/Portfolio'
import Reviews from '@/components/Reviews'
import Skills from '@/components/Skills'
import LLMSection from '@/components/LLMSection'
import Pricing from '@/components/Pricing'
import Stats from '@/components/Stats'
import Terms from '@/components/Terms'
import Process from '@/components/Process'
import Values from '@/components/Values'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <QuoteBreak />
        <WhyChooseMe />
        <Portfolio />
        <Reviews />
        <Skills />
        <LLMSection />
        <Pricing />
        <Stats />
        <Terms />
        <Process />
        <Values />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
