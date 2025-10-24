export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export const faq = [
  {
    id: '1',
    question: 'Who is behind noir?',
    answer:
      'noir is led by a dedicated team of two co-founders: Lucki, the project manager and creative mind behind every design, and Brian, our talented lead developer. Our mission is to help brands big or small reach their full potential by creating visually stunning and impactful software. The best part is that every design is specifically tailored to our clients’ needs. So whether you’re rebranding or just starting out, we can help you connect with your target audience.',
  },
  {
    id: '2',
    question: 'How long does it take to complete a project?',
    answer:
      'and full websites, and 2–4 weeks for MVPs, depending on the complexity of each project. A detailed project timeline is always provided after our initial consultation.',
  },
  {
    id: '3',
    question: 'Do you design both web and mobile applications?',
    answer:
      'Absolutely! We specialize in full-stack development for web platforms, mobile apps (iOS & Android), and progressive web apps with seamless performance.',
  },
  {
    id: '4',
    question: 'How secure are the apps and systems you build?',
    answer:
      'Security is built in from day one. We follow best practices including encryption, authentication, and compliance with GDPR and other relevant standards.',
  },
  {
    id: '5',
    question: 'Do you offer post-launch support?',
    answer:
      'Yes, clients on our subscription based plan receive ongoing support at all times. Those who have completed a one time project with us can also reach out anytime for additional support or upgrades as needed.',
  },
  {
    id: '6',
    question: 'Can you integrate our software with existing tools?',
    answer:
      'Yes. We integrate with popular platforms like Slack, Notion, HubSpot, and CRMs to streamline workflows and data management.',
  },
  {
    id: '7',
    question: 'Can I customize the package?',
    answer:
      'Absolutely! We can create a package tailored to your specific needs. Just let us know what you’re looking for, and we’ll design a solution that best fits your business.',
  },
];

