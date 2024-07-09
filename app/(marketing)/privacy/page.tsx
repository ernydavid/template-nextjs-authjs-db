export default function PrivacyPage () {
  return (
    <main className='w-full pt-10 flex flex-col gap-2 items-center'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground text-center'>Employee Portal Privacy Policy</h1>
      <p className='text-center px-6 md:px-2 max-w-[600px] md:text-lg font-semibold mt-5'>This Privacy Policy describes how we collect, use, and disclose personal information collected from users of our Employee Portal. By accessing or using the Employee Portal, you consent to the collection, use, and disclosure of your personal information in accordance with this Privacy Policy.</p>
      <div className='w-full md:w-[700px] flex flex-col items-center mt-10 gap-3'>
        <ul className='list-decimal px-6 md:px-4 space-y-4'>
          <li>
            <p className='font-semibold'>Information We Collect</p>
            <ul className='px-5 list-disc'>
              <li><span className='font-semibold'>Personal Information:</span> When you create an account on the Employee Portal, we may collect personal information such as your name, email address, contact information, and other details necessary for account creation and management.</li>
              <li><span className='font-semibold'>Usage Information:</span> We may collect information about your use of the Employee Portal, including log data, device information, and usage patterns.</li>
              <li><span className='font-semibold'>Communications:</span> We may collect information that you provide to us when you communicate with us or other users through the Employee Portal.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>How We Use Your Information</p>
            <ul className='px-5 list-disc'>
              <li><span className='font-semibold'>To Provide Services:</span> We use your personal information to provide access to the Employee Portal and its features, as well as to communicate with you regarding your account and any updates or changes to the platform.</li>
              <li><span className='font-semibold'>To Improve Services:</span> We may use aggregated usage data to analyze trends, track user interactions, and improve the functionality and user experience of the Employee Portal.</li>
              <li><span className='font-semibold'>To Communicate:</span> We may use your contact information to send you important notifications, announcements, or other communications related to your use of the Employee Portal or your employment with the company.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Information Sharing and Disclosure</p>
            <ul className='px-5 list-disc'>
              <li><span className='font-semibold'>With Your Consent:</span> We may share your personal information with third parties with your consent or at your direction.</li>
              <li><span className='font-semibold'>Service Providers:</span> We may engage third-party service providers to assist us in providing the Employee Portal or performing related services, and we may share your personal information with these providers as necessary for them to perform their functions.</li>
              <li><span className='font-semibold'>Legal Compliance:</span> We may disclose your personal information to comply with applicable laws, regulations, legal processes, or governmental requests.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Data Security</p>
            <p>We take reasonable measures to protect the security of your personal information and to prevent unauthorized access, disclosure, alteration, or destruction.</p>
          </li>
          <li>
            <p className='font-semibold'>Data Retention</p>
            <p>We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
          </li>
          <li>
            <p className='font-semibold'>Your Choices</p>
            <p>You may update, correct, or delete your personal information at any time by accessing your account settings on the Employee Portal. You may also opt-out of receiving certain communications from us by following the instructions provided in those communications.</p>
          </li>
          <li>
            <p className='font-semibold'>Children's Privacy</p>
            <p>The Employee Portal is not intended for use by children under the age of 18, and we do not knowingly collect personal information from children under the age of 18.</p>
          </li>
          <li>
            <p className='font-semibold'>Changes to this Privacy Policy</p>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of any material changes by posting the updated Privacy Policy on the Employee Portal.</p>
          </li>
          <li>
            <p className='font-semibold'>Contact Us</p>
            <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at employee@5999cargo.com.<br /><br /> By accessing or using the Employee Portal, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
            </p>
          </li>
        </ul>
        <p className='uppercase font-semibold text-center mt-10 mb-10'>By accessing or using the Employee Portal, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.</p>
      </div>
    </main>
  )
}
