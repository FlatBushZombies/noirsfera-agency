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
    question: 'How quickly can I get started with your services?',
    answer:
      'Our onboarding process is designed to be seamless — you can get started within 24 hours with minimal setup.',
  },
  {
    id: '1',
    question: 'Can your solutions integrate with existing platforms?',
    answer:
      'Absolutely! We integrate with tools like Slack, Notion, HubSpot, and most major CRMs to streamline your workflow.',
  },
  {
    id: '2',
    question: 'Do you offer custom solutions for complex projects?',
    answer:
      'Yes. We analyze your requirements and provide tailored solutions that scale with your business.',
  },
  {
    id: '3',
    question: 'What is your refund or satisfaction policy?',
    answer:
      'Customer satisfaction is our priority. If you’re not fully satisfied within the first 30 days, we offer a hassle-free refund.',
  },
  {
    id: '4',
    question: 'Do you provide support for enterprise clients?',
    answer:
      'We offer dedicated support and account management for enterprise clients, including SLA-backed response times.',
  },
  {
    id: '5',
    question: 'Can I switch or upgrade my plan later?',
    answer:
      'Absolutely! Plans are flexible and can be upgraded or modified anytime without losing your data.',
  },
  {
    id: '6',
    question: 'How do I collaborate with my team?',
    answer:
      'Invite your team with a single click and manage permissions easily through our intuitive dashboard.',
  },
  {
    id: '7',
    question: 'Do you offer training or onboarding resources?',
    answer:
      'Yes. We provide video guides, documentation, and live onboarding sessions to ensure your team gets up to speed quickly.',
  },
  {
    id: '8',
    question: 'How secure is your platform?',
    answer:
      'We follow industry best practices including end-to-end encryption, regular audits, and GDPR compliance to keep your data safe.',
  },
  {
    id: '9',
    question: 'Who do I contact for support or questions?',
    answer:
      'Our support team is available 24/7 via chat and email to assist with any questions or issues.',
  },
];
