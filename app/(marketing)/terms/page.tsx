export default function TermsPage () {
  return (
    <main className='w-full pt-10 flex flex-col gap-2 items-center'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground text-center'>Employee Portal Terms of Use</h1>
      <p className='text-center px-6 md:px-2 max-w-[600px] md:text-lg uppercase font-semibold mt-5'>Welcome to our 5999 Cargo Employee Portal! This platform is provided to you subject to the following Terms of Use. By accessing or using the Employee Portal, you agree to be bound by these terms. Please read them carefully before proceeding.</p>
      <div className='w-full md:w-[700px] flex flex-col items-center mt-10 gap-3'>
        <ul className='list-decimal px-6 md:px-4 space-y-4'>
          <li>
            <p className='font-semibold'>Acceptance of Terms</p>
            <p>By accessing or using the Employee Portal, you agree to comply with these Terms of Use. If you do not agree with any part of these terms, you may not access or use the Employee Portal.</p>
          </li>
          <li>
            <p className='font-semibold'>Access and Use</p>
            <p>You are granted a non-exclusive, non-transferable, limited license to access and use the Employee Portal for the purpose of engaging with company resources, communication, and collaboration with other employees, and any other lawful purpose permitted by the company.</p>
          </li>
          <li>
            <p className='font-semibold'>User Accounts</p>
            <p>You may be required to create a user account to access certain features of the Employee Portal. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</p>
          </li>
          <li>
            <p className='font-semibold'>Content</p>
            <p>The Employee Portal may contain materials such as documents, forms, training resources, announcements, and other content provided by the company. You agree not to modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any such content without the prior written consent of 5999 Cargo Group©.</p>
          </li>
          <li>
            <p className='font-semibold'>Privacy</p>
            <p>Your use of the Employee Portal is subject to our Privacy Policy, which governs the collection, use, and disclosure of your personal information. By using the Employee Portal, you consent to the terms of our Privacy Policy.</p>
          </li>
          <li>
            <p className='font-semibold'>Prohibited Conduct</p>
            <p>You agree not to use the Employee Portal for any unlawful purpose or in any way that violates these Terms of Use. Prohibited conduct includes, but is not limited to:</p>
            <ul className='px-5 list-disc'>
              <li>Violating any applicable laws or regulations.</li>
              <li>Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
              <li>Interfering with or disrupting the operation of the Employee Portal or servers or networks connected to the Employee Portal.</li>
              <li>Engaging in any conduct that restricts or inhibits any other user from using or enjoying the Employee Portal.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Termination</p>
            <p>We reserve the right to suspend or terminate your access to the Employee Portal at any time and for any reason, without prior notice or liability.</p>
          </li>
          <li>
            <p className='font-semibold'>Modifications</p>
            <p>We may revise these Terms of Use at any time without prior notice. By continuing to access or use the Employee Portal after any revisions become effective, you agree to be bound by the revised terms.</p>
          </li>
          <li>
            <p className='font-semibold'>Governing Law</p>
            <p>These Terms of Use shall be governed by and construed in accordance with the laws of all respectives countries where the Employee Portal is available to use, without regard to its conflict of law provisions.</p>
          </li>
          <li>
            <p className='font-semibold'>Contact Us</p>
            <p>If you have any questions or concerns about these Terms of Use, please contact us at:</p>
            <a href='#'>employee@5999cargo.com</a>
          </li>
        </ul>
        <p className='uppercase font-semibold text-center mt-10 mb-10'>By accessing or using the Employee Portal, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.</p>
      </div>
    </main>
  )
}
