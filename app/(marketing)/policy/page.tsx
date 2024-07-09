export default function PolicyPage () {
  return (
    <main className='w-full pt-10 flex flex-col gap-2 items-center'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground text-center'>Employee Portal Policy</h1>
      <p className='text-center px-6 md:px-2 max-w-[600px] md:text-lg font-semibold mt-5'>This Employee Portal Policy outlines the acceptable use, responsibilities, and guidelines for employees accessing and utilizing the company's Employee Portal. By accessing the Employee Portal, you agree to abide by the terms outlined in this policy.</p>
      <div className='w-full md:w-[700px] flex flex-col items-center mt-10 gap-3'>
        <ul className='list-decimal px-6 md:px-4 space-y-4'>
          <li>
            <p className='font-semibold'>Access and Use</p>
            <ul className='px-5 list-disc'>
              <li>Authorized Access: Access to the Employee Portal is restricted to current employees of the company. Unauthorized access or use of the portal is strictly prohibited.</li>
              <li>Account Security: Employees are responsible for maintaining the security and confidentiality of their login credentials. Sharing login information with others or allowing unauthorized access to the Employee Portal is prohibited.</li>
              <li>Compliance: Users must comply with all applicable laws, regulations, and company policies while accessing and using the Employee Portal.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Acceptable Use</p>
            <ul className='px-5 list-disc'>
              <li>Purpose: The Employee Portal is intended for business-related activities, including accessing company resources, communication with colleagues, and participation in company-related discussions.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Prohibited Activities:</p>
            <p>The following activities are strictly prohibited:</p>
            <ul className='px-5 list-disc'>
              <li>Engaging in any unlawful or unethical conduct.</li>
              <li>Misrepresenting oneself or others.</li>
              <li>Uploading or sharing content that is offensive, discriminatory, or harassing.</li>
              <li>Disrupting the functionality of the Employee Portal or interfering with other users' access.</li>
              <li>Violating the privacy rights of others.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Confidentiality</p>
            <ul className='px-5 list-disc'>
              <li>Protection of Information: Employees must respect the confidentiality of company information and refrain from sharing sensitive or proprietary information through the Employee Portal.</li>
              <li>Data Security: Employees must adhere to data security protocols and take precautions to prevent unauthorized access to company data or systems.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Communication</p>
            <ul className='px-5 list-disc'>
              <li>Professionalism: All communication conducted through the Employee Portal should be professional, respectful, and in accordance with company communication standards.</li>
              <li>Use of Company Resources: Employees should use company resources, such as email and messaging systems, responsibly and for business purposes only.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Compliance Monitoring</p>
            <ul className='px-5 list-disc'>
              <li>Monitoring: The company reserves the right to monitor employee activity on the Employee Portal for compliance with this policy and applicable laws.</li>
              <li>Consequences of Non-Compliance: Violation of this policy may result in disciplinary action, up to and including termination of employment.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Policy Acknowledgment</p>
            <ul className='px-5 list-disc'>
              <li>Acknowledgment: By accessing the Employee Portal, employees acknowledge that they have read, understood, and agree to comply with the terms outlined in this policy.</li>
              <li>Training and Education: The company will provide training and education to employees regarding their responsibilities and obligations under this policy.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Policy Review and Updates</p>
            <ul className='px-5 list-disc'>
              <li>Review: This policy will be reviewed periodically to ensure its effectiveness and relevance.</li>
              <li>Updates: The company reserves the right to update or modify this policy as needed. Employees will be notified of any changes to the policy.</li>
            </ul>
          </li>
          <li>
            <p className='font-semibold'>Contact Information</p>
            <p>For questions or concerns regarding this policy, employees should contact the HR department or designated company representative.
            </p>
          </li>
        </ul>
        <p className='uppercase font-semibold text-center mt-10 mb-10'>By accessing the Employee Portal, employees agree to abide by the terms outlined in this policy and understand that failure to comply may result in disciplinary action.</p>
      </div>
    </main>
  )
}
