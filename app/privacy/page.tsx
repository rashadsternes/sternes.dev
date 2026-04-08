import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Sternes Digital',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="prose prose-slate lg:prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-8">
            Last updated: April 8, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Introduction
            </h2>
            <p>
              Sternes Digital ("we," "our," or "us"), operating at sternes.dev, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Information We Collect
            </h2>
            <h3 className="text-xl font-semibold mb-3">Information You Provide</h3>
            <p>We may collect information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Use our AI-powered client fit assessment tool</li>
              <li>Schedule a consultation through Calendly</li>
              <li>Contact us through our website</li>
              <li>Subscribe to our newsletter or communications</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name and contact information (email, phone number)</li>
              <li>Business information and project details</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain information, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Assess client fit using AI technology (Claude by Anthropic)</li>
              <li>Schedule and manage consultations</li>
              <li>Send you relevant information about our services (with your consent)</li>
              <li>Analyze website usage and improve user experience</li>
              <li>Prevent fraud and ensure website security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Third-Party Services
            </h2>
            <p>We use the following third-party services that may collect information:</p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Anthropic Claude API</h3>
            <p>
              Our AI-powered fit assessment tool uses Anthropic's Claude API to analyze your project needs. Information you provide through this tool is sent to Anthropic for processing. Please review <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Anthropic's Privacy Policy</a> for more information.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Calendly</h3>
            <p>
              We use Calendly for scheduling consultations. When you schedule a meeting, your information is processed by Calendly. Please review <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Calendly's Privacy Policy</a> for more information.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Vercel</h3>
            <p>
              Our website is hosted on Vercel. Vercel may collect standard web analytics data. Please review <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Vercel's Privacy Policy</a> for more information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Cookies and Tracking Technologies
            </h2>
            <p>
              We may use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Data Retention
            </h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Your Rights
            </h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Children's Privacy
            </h2>
            <p>
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              Email: <a href="mailto:support@sternes.dev" className="text-blue-600 hover:underline">support@sternes.dev</a>
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a href="/" className="text-blue-600 hover:underline">
              ← Back to Home
            </a>
          </div>
        </article>
      </div>
    </main>
  )
}
