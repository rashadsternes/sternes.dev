import NavRedesign from '@/components/NavRedesign'
import HeroRedesign from '@/components/HeroRedesign'
import ServicesRedesign from '@/components/ServicesRedesign'
import QuoteBreakRedesign from '@/components/QuoteBreakRedesign'
import WhyChooseMeRedesign from '@/components/WhyChooseMeRedesign'
import PortfolioRedesign from '@/components/PortfolioRedesign'
import LLMSectionRedesign from '@/components/LLMSectionRedesign'
import PricingRedesign from '@/components/PricingRedesign'
import StatsRedesign from '@/components/StatsRedesign'
import TermsRedesign from '@/components/TermsRedesign'
import ProcessRedesign from '@/components/ProcessRedesign'
import ValuesRedesign from '@/components/ValuesRedesign'
import ContactFormRedesign from '@/components/ContactFormRedesign'
import Footer from '@/components/Footer'

export default function RedesignPage() {
  return (
    <>
      <NavRedesign />
      <main>
        <HeroRedesign />
        <ServicesRedesign />
        <QuoteBreakRedesign />
        <WhyChooseMeRedesign />
        <PortfolioRedesign />
        <LLMSectionRedesign />
        <PricingRedesign />
        <StatsRedesign />
        <TermsRedesign />
        <ProcessRedesign />
        <ValuesRedesign />
        <ContactFormRedesign />
      </main>
      <Footer />
    </>
  )
}
