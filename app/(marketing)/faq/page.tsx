import { CollapsibleFAQ } from './_components/collapsible-faq'

export default function FaqPage () {
  return (
    <main className='w-full pt-10 flex flex-col gap-2 items-center'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground text-center'>Frequently Asked Questions</h1>
      <p className='text-center px-6 md:px-2 max-w-[600px] text-sm sm:text-base md:text-lg'>Got a question? We've got answers. If you have some other questions, feel free to email us at&nbsp; <a href='#'>hello@example.com</a></p>
      <div className='w-full flex flex-col items-center mt-10 gap-3'>
        <CollapsibleFAQ
          title='What is the purpose of the Employee Portal?'
          content='The Employee Portal is a centralized platform designed to streamline communication, collaboration, and access to important resources for all employees within the organization.'
        />
        <CollapsibleFAQ
          title='How do I log in to the Employee Portal?'
          content='You can log in to the Employee Portal using your unique username and password provided by the HR department. If you encounter any issues with logging in, please contact the IT helpdesk for assistance.'
        />
        <CollapsibleFAQ
          title='What can I do on the Employee Portal?'
        >
          <div className='w-full flex flex-col gap-2'>
            <p>
              The Employee Portal offers a range of features including:
            </p>
            <ul className='list-disc px-4'>
              <li>Access to company policies and procedures</li>
              <li>Employee directory</li>
              <li>Leave management system</li>
              <li>Training and development resources</li>
              <li>Announcement board for company updates</li>
              <li>Access to company forms and documents</li>
            </ul>
          </div>
        </CollapsibleFAQ>
        <CollapsibleFAQ
          title='Can I access the Employee Portal from outside the office?'
          content='Yes, the Employee Portal is accessible from any internet-enabled device, allowing you to stay connected and productive whether you&apos;re in the office, at home, or on the go.'
        />
        <CollapsibleFAQ
          title='How do I request time off through the Employee Portal?'
          content='You can submit your leave requests through the Leave Management system on the Employee Portal. Simply select the dates you wish to request, provide any necessary details, and submit your request for approval.'
        />
        <CollapsibleFAQ
          title='Is the information on the Employee Portal secure?'
          content='Yes, we take the security of your information seriously. The Employee Portal is protected by advanced security measures to ensure that your data remains confidential and secure.'
        />
        <CollapsibleFAQ
          title='Can I update my personal information on the Employee Portal?'
          content='Yes, you can update your personal information such as contact details and emergency contacts through the Employee Portal. Simply navigate to the relevant section and make the necessary changes.'
        />
        <CollapsibleFAQ
          title=' How often is the Employee Portal updated?'
          content='The Employee Portal is regularly updated with new features, resources, and information to ensure that it remains a valuable tool for all employees. Updates are typically scheduled to minimize disruption to users.'
        />
        <CollapsibleFAQ
          title=' I have a suggestion for improving the Employee Portal. How can I submit it?'
          content='We welcome feedback and suggestions for improving the Employee Portal. Please submit your suggestions through the feedback form available on the portal, or alternatively, you can reach out to the HR department or IT helpdesk directly.'
        />
      </div>
    </main>
  )
}
