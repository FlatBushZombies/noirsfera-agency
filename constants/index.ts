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
    id: '0',
    question: 'Who is behind noir?',
    answer:
      'noir is led by a dedicated team of two co-founders: Lucki, the project manager and creative mind behind every design, and Brian, our talented lead developer. Our mission is to help brands big or small reach their full potential by creating visually stunning and impactful software. The best part is that every design is specifically tailored to our clients’ needs. So whether you’re rebranding or just starting out, we can help you connect with your target audience.',
  },
  {
    id: '1',
    question: 'Do you design both web and mobile applications?',
    answer:
      'Absolutely! We specialize in full-stack development for web platforms, mobile apps (iOS & Android), and progressive web apps with seamless performance.',
  },
  {
    id: '2',
    question: 'Can you create custom UI/UX tailored to our brand?',
    answer:
      'Yes. Our design team crafts intuitive and engaging interfaces that align with your brand identity and enhance user experience.',
  },
  {
    id: '3',
    question: 'Do you provide end-to-end solutions for complex systems?',
    answer:
      'We analyze your requirements, design scalable architectures, and deliver full-stack solutions that evolve with your business needs.',
  },
  {
    id: '4',
    question: 'How secure are the apps and systems you build?',
    answer:
      'Security is built in from day one. We follow best practices including encryption, authentication, and compliance with GDPR and other relevant standards.',
  },
  {
    id: '5',
    question: 'Can we upgrade or expand our software later?',
    answer:
      'Absolutely! Our systems are modular and scalable, allowing you to add features, integrate new tools, or migrate platforms without hassle.',
  },
  {
    id: '6',
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. We offer ongoing maintenance, performance monitoring, and quick fixes to ensure your software runs smoothly after launch.',
  },
  {
    id: '7',
    question: 'Do you assist with onboarding our team on the new systems?',
    answer:
      'Definitely. We provide documentation, training sessions, and live support to ensure your team can use the systems efficiently.',
  },
  {
    id: '8',
    question: 'Can you integrate our software with existing tools?',
    answer:
      'Yes. We integrate with popular platforms like Slack, Notion, HubSpot, and CRMs to streamline workflows and data management.',
  },
  {
    id: '9',
    question: 'Who can we contact for questions or project updates?',
    answer:
      'Your dedicated account manager and our support team are available to assist via email, chat, or video call throughout the project lifecycle.',
  },
];

