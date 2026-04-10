import { Footer } from '@/components/Footer'

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: March 29, 2025</p>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              MetroNexa ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our services.
            </p>
            <p className="mb-4">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
              please do not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us, including:</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Personal Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
              <li>Business information (company name, industry, size)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Automatically Collected Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information (device type, operating system)</li>
              <li>Usage data (features used, time spent on service)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues and security concerns</li>
              <li>Personalize and improve your experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing and Disclosure</h2>
            <p className="mb-4">We may share your information in the following circumstances:</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">With Your Consent</h3>
            <p className="mb-4">We may share your information with your explicit consent.</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Service Providers</h3>
            <p className="mb-4">
              We may share information with third-party service providers who perform services on our behalf,
              such as payment processing, data analysis, email delivery, hosting services, and customer service.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Business Transfers</h3>
            <p className="mb-4">
              We may share or transfer information in connection with, or during negotiations of, any merger,
              sale of company assets, financing, or acquisition of all or a portion of our business.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Legal Requirements</h3>
            <p className="mb-4">
              We may disclose information if required to do so by law or in response to valid requests by
              public authorities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational security measures to protect your information
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure data centers with physical security measures</li>
            </ul>
            <p className="mb-4 mt-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure,
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
            <p className="mb-4">
              We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
              unless a longer retention period is required or permitted by law. When we no longer need your information,
              we will securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights and Choices</h2>
            <p className="mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your information</li>
              <li><strong>Portability:</strong> Request transfer of your information</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
              <li><strong>Withdraw consent:</strong> Withdraw your consent at any time</li>
            </ul>
            <p className="mb-4 mt-4">
              To exercise these rights, please contact us at privacy@metronexa.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our service and store certain information.
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Third-Party Links</h2>
            <p className="mb-4">
              Our service may contain links to third-party websites or services that are not owned or controlled by
              MetroNexa. We have no control over, and assume no responsibility for, the content, privacy policies,
              or practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Children's Privacy</h2>
            <p className="mb-4">
              Our service is not intended for individuals under the age of 18. We do not knowingly collect personal
              information from children under 18. If you become aware that a child has provided us with personal
              information, please contact us, and we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your country of residence.
              These countries may have data protection laws that are different from the laws of your country. We take
              appropriate safeguards to ensure that your information remains protected in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. California Privacy Rights</h2>
            <p className="mb-4">
              If you are a California resident, you have specific rights regarding your personal information under
              the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The right to know what personal information is collected</li>
              <li>The right to know whether personal information is sold or disclosed</li>
              <li>The right to opt-out of the sale of personal information</li>
              <li>The right to deletion of personal information</li>
              <li>The right to non-discrimination for exercising your rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. GDPR Compliance</h2>
            <p className="mb-4">
              If you are located in the European Economic Area (EEA), you have certain data protection rights under
              the General Data Protection Regulation (GDPR). We aim to take reasonable steps to allow you to correct,
              amend, delete, or limit the use of your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this
              Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">15. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none space-y-2">
              <li>Email: privacy@metronexa.com</li>
              <li>Address: MetroNexa Legal Department</li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
