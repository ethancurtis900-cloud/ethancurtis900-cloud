import { Footer } from '@/components/Footer'

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms and Conditions</h1>
        <p className="text-slate-400 mb-8">Last updated: March 29, 2025</p>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing and using MetroNexa's services, you agree to be bound by these Terms and Conditions.
              If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily access the materials on MetroNexa's website for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on MetroNexa's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or mirror the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Service Description</h2>
            <p className="mb-4">
              MetroNexa provides AI-powered business automation solutions. We reserve the right to modify,
              suspend, or discontinue any part of our services at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Account Terms</h2>
            <p className="mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times.
              You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Maintaining the security of your account and password</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Payment Terms</h2>
            <p className="mb-4">
              Subscription fees are billed in advance on a recurring basis (monthly or annually).
              All fees are non-refundable except as required by law. We reserve the right to change our fees
              with 30 days' notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              The service and its original content, features, and functionality are owned by MetroNexa and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. User Data and Privacy</h2>
            <p className="mb-4">
              Your use of our service is also governed by our Privacy Policy. By using our services, you consent
              to the collection and use of information as detailed in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Prohibited Uses</h2>
            <p className="mb-4">You may not use our services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Disclaimer</h2>
            <p className="mb-4">
              The materials on MetroNexa's website are provided on an 'as is' basis. MetroNexa makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Limitations</h2>
            <p className="mb-4">
              In no event shall MetroNexa or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on MetroNexa's website, even if MetroNexa or a MetroNexa authorized representative
              has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and bar access to the service immediately, without prior notice
              or liability, under our sole discretion, for any reason whatsoever, including without limitation if you
              breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Governing Law</h2>
            <p className="mb-4">
              These terms shall be governed and construed in accordance with the laws of the jurisdiction in which
              MetroNexa operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
              will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at legal@metronexa.com
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
