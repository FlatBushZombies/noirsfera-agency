export type Language = 'en' | 'ru';

export interface Translations {
  navbar: {
    logo: string;
    services: string;
    portfolio: string;
    pricing: string;
    contact: string;
    bookACall: string;
    letsGo: string;
  };
  hero: {
    availableBadge: string;
    heading: {
      modernising: string;
      through: string;
      futuristic: string;
      software: string;
      words: string[];
    };
    description: string;
    connectTelegram: string;
    youLetsChat: string;
    profileAlt: string;
    clientAvatarAlt: string;
  };
  services: {
    sectionBadge: string;
    heading: string;
    subheading: string;
    showMore: string;
    showLess: string;
    items: {
      fullstack: {
        title: string;
        subtitle: string;
        details: string[];
        scalableGrowth: string;
      };
      aiEngineering: {
        title: string;
        subtitle: string;
        details: string[];
        aiPowered: string;
      };
      uiux: {
        title: string;
        subtitle: string;
        details: string[];
        userRetention: string;
        conversions: string;
      };
    };
    cta: {
      badge: string;
      heading: string;
      description: string;
      button: string;
      buttonAria: string;
    };
  };
  portfolio: {
    badge: string;
    heading: string;
    subheading: string;
    clientAvatarAlt: string;
    viewProject: string;
    projects: {
      tutschool: {
        title: string;
        description: string;
        tags: string[];
        duration: string;
        industry: string;
        imageAlt: string;
      };
      campGuide: {
        title: string;
        description: string;
        tags: string[];
        duration: string;
        industry: string;
        imageAlt: string;
      };
      dmbPay: {
        title: string;
        description: string;
        tags: string[];
        duration: string;
        industry: string;
        imageAlt: string;
      };
      oakwood: {
        title: string;
        description: string;
        tags: string[];
        duration: string;
        industry: string;
        imageAlt: string;
      };
    };
  };
  pricing: {
    badge: string;
    heading: string;
    subheading: string;
    subscription: string;
    mostPopular: string;
    perMonth: string;
    scheduleAMeeting: string;
    scheduleMeetingAria: string;
    connectTelegram: string;
    webDevelopment: {
      title: string;
      starter: {
        name: string;
        oneTime: {
          period: string;
          description: string;
          features: string[];
        };
        subscription: {
          description: string;
          features: string[];
        };
      };
      growth: {
        name: string;
        oneTime: {
          period: string;
          description: string;
          features: string[];
        };
        subscription: {
          description: string;
          features: string[];
        };
      };
      professional: {
        name: string;
        oneTime: {
          period: string;
          description: string;
          features: string[];
        };
        subscription: {
          description: string;
          features: string[];
        };
      };
    };
    productDesign: {
      title: string;
      startupMvp: {
        name: string;
        oneTime: {
          period: string;
          description: string;
          features: string[];
        };
        subscription: {
          description: string;
          features: string[];
        };
      };
      growth: {
        name: string;
        oneTime: {
          period: string;
          description: string;
          features: string[];
        };
        subscription: {
          description: string;
          features: string[];
        };
      };
      scale: {
        name: string;
        oneTime: {
          period: string;
          description: string;
          features: string[];
        };
        subscription: {
          description: string;
          features: string[];
        };
      };
    };
  };
  testimonials: {
    badge: string;
    heading: string;
  };
  faq: {
    badge: string;
    heading: string;
    questions: string;
    subheading: string;
    items: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
    founderAlt: string;
  };
  contact: {
    heading: string;
    touch: string;
    description: string;
    viewRecentWork: string;
    quickResponse: string;
    fiveStarService: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    successToast: string;
    errorToast: string;
    errorOccurred: string;
  };
  footer: {
    heading: {
      line1: string;
      line2: string;
    };
    getStarted: string;
    letsGo: string;
    logo: string;
    copyright: string;
    privacyPolicy: string;
    termsConditions: string;
    twitterAria: string;
    instagramAria: string;
    telegramAria: string;
  };
  banner: {
    loading: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      logo: 'noirsfera',
      services: 'Services',
      portfolio: 'Portfolio',
      pricing: 'Pricing',
      contact: 'Contact',
      bookACall: 'Book a Call',
      letsGo: "Let's Go",
    },
    hero: {
      availableBadge: 'Available for New projects',
      heading: {
        modernising: 'Modernising',
        through: 'through',
        futuristic: 'futuristic',
        software: 'software',
        words: ['businesses', 'startups', 'brands'],
      },
      description: 'Building Digital Experiences that moves Brands Forward',
      connectTelegram: 'Connect to Telegram',
      youLetsChat: "+ You Let's chat",
      profileAlt: 'Profile',
      clientAvatarAlt: 'Client avatar',
    },
    services: {
      sectionBadge: 'Premium Services',
      heading: 'Transforming Vision Into Digital Reality',
      subheading: 'Comprehensive solutions tailored to elevate your brand',
      showMore: 'Show More',
      showLess: 'Show Less',
      items: {
        fullstack: {
          title: 'Fullstack Development',
          subtitle: 'End-to-end scalable web & mobile apps',
          details: ['API Development', 'Database Design', 'Cloud Deployment', 'Real-time Features'],
          scalableGrowth: 'Scalable Growth',
        },
        aiEngineering: {
          title: 'AI Engineering & Data Analytics',
          subtitle: 'Intelligent systems & predictive insights',
          details: ['Machine Learning', 'Predictive Analytics', 'Data Visualization', 'AI Integration'],
          aiPowered: 'AI-Powered',
        },
        uiux: {
          title: 'UI/UX Design',
          subtitle: 'User-centered, intuitive digital experiences',
          details: ['User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
          userRetention: 'User Retention +80%',
          conversions: 'Conversions +150%',
        },
      },
      cta: {
        badge: 'Next Steps',
        heading: 'Ready to transform your digital presence?',
        description: "Let's create something extraordinary together",
        button: "Let's Get Started",
        buttonAria: 'Start via Telegram',
      },
    },
    portfolio: {
      badge: 'Featured Works',
      heading: 'Case Studies',
      subheading: '10+ successful projects that delivered real results',
      clientAvatarAlt: 'Client avatar',
      viewProject: 'View Project',
      projects: {
        tutschool: {
          title: 'TutSchool',
          description: 'Comprehensive website for TUT School, a language and arts institution featuring course information, enrollment, and student resources.',
          tags: ['Web Design', 'Development'],
          duration: '6 weeks',
          industry: 'SaaS',
          imageAlt: 'TutSchool Website',
        },
        campGuide: {
          title: 'Camp Guide',
          description: 'Interactive guide for camping enthusiasts with location recommendations and equipment lists.',
          tags: ['Product Design', 'UI/UX'],
          duration: '8 weeks',
          industry: 'Resort',
          imageAlt: 'Camp Guide Landing Page',
        },
        dmbPay: {
          title: 'DMB Pay+',
          description: 'Secure digital payment platform with intuitive user interface and real-time transaction tracking.',
          tags: ['Mobile App', 'web3'],
          duration: '10 weeks',
          industry: 'FinTech',
          imageAlt: 'Web3 Platform',
        },
        oakwood: {
          title: 'Oakwood ESL',
          description: 'Profession Academics ESL Training school',
          tags: ['website', 'web'],
          duration: '10 weeks',
          industry: 'Education',
          imageAlt: 'Educational Platform',
        },
      },
    },
    pricing: {
      badge: 'Transparent Pricing',
      heading: 'Choose Your Plan',
      subheading: 'Flexible pricing options designed for your needs',
      subscription: 'Subscription',
      mostPopular: 'Most Popular',
      perMonth: 'per month',
      scheduleAMeeting: 'Schedule a Meeting',
      scheduleMeetingAria: 'Schedule a Meeting via WhatsApp',
      connectTelegram: 'Connect on Telegram',
      webDevelopment: {
        title: 'Web Development',
        starter: {
          name: 'Starter',
          oneTime: {
            period: 'One-Time Payment',
            description: 'Simple portfolio / landing page (1-3 pages)',
            features: [
              '2 design concepts',
              'Responsive design (desktop, tablet, mobile)',
              'Wireframes + custom layout',
              'Framer development',
              'Source code ownership',
              '1 month free support',
              '+$200 per extra page',
            ],
          },
          subscription: {
            description: 'Great entry point for freelancers',
            features: [
              'All one-time features+',
              'Weekly progress meetings',
              'Monthly updates',
              'Unlimited page additions',
              'Constant, fast support',
              'Source code ownership after 12 months',
            ],
          },
        },
        growth: {
          name: 'Growth',
          oneTime: {
            period: 'One-Time Payment',
            description: 'Small business site (4-7 pages)',
            features: [
              '2 design concepts',
              'Responsive design (desktop, tablet, mobile)',
              'Wireframes + custom layout',
              'Framer development',
              'Source code ownership',
              '1 month free support',
              '+$200 per extra page',
            ],
          },
          subscription: {
            description: 'Most popular range for SMEs',
            features: [
              'All one-time features+',
              'Weekly progress meetings',
              'Monthly updates',
              'Unlimited page additions',
              'Constant, fast support',
              'Source code ownership after 12 months',
            ],
          },
        },
        professional: {
          name: 'Professional',
          oneTime: {
            period: 'One-Time Payment',
            description: 'Corporate / advanced design (8+ pages)',
            features: [
              '2 design concepts',
              'Responsive design (desktop, tablet, mobile)',
              'Wireframes + custom layout',
              'Framer development',
              'Source code ownership',
              '1 month free support',
              '+$200 per extra page',
              'Advanced animations & interactions',
            ],
          },
          subscription: {
            description: 'Ongoing dev & maintenance',
            features: [
              'All one-time features+',
              'Weekly progress meetings',
              'Monthly updates',
              'Unlimited page additions',
              'Constant, fast support',
              'Heavy support & design iteration',
              'Source code ownership after 12 months',
            ],
          },
        },
      },
      productDesign: {
        title: 'Product Design',
        startupMvp: {
          name: 'Startup MVP',
          oneTime: {
            period: 'One-Time Payment',
            description: 'Basic mobile app + admin panel',
            features: [
              '2 design concepts',
              'Weekly updates',
              'Mobile app plus admin dashboard',
              '1-3 Months delivery',
              'App Store + Play Store launch',
              '1 month support',
              'Slack, Loom, and meeting communication',
            ],
          },
          subscription: {
            description: 'Design + minor dev support',
            features: [
              'All one-time features+',
              'Weekly progress meetings',
              '2 weekly updates',
              'Unlimited changes',
              'Constant support',
              'Source code ownership after 18 months',
            ],
          },
        },
        growth: {
          name: 'Growth',
          oneTime: {
            period: 'One-Time Payment',
            description: 'Complex UI + interactions for funded startups',
            features: [
              '2 design concepts',
              'Weekly updates',
              'Mobile app plus admin dashboard',
              '1-3 Months delivery',
              'App Store + Play Store launch',
              '1 month support',
              'Slack, Loom, and meeting communication',
              'Advanced UI/UX design',
            ],
          },
          subscription: {
            description: 'Unlimited changes + fast delivery',
            features: [
              'All one-time features+',
              'Weekly progress meetings',
              '2 weekly updates',
              'Unlimited changes',
              'Constant support',
              'Fast delivery',
              'Source code ownership after 18 months',
            ],
          },
        },
        scale: {
          name: 'Scale',
          oneTime: {
            period: 'One-Time Payment',
            description: 'Custom design systems / dashboards',
            features: [
              '2 design concepts',
              'Weekly updates',
              'Mobile app plus admin dashboard',
              '1-3 Months delivery',
              'App Store + Play Store launch',
              '1 month support',
              'Slack, Loom, and meeting communication',
              'Custom design systems',
              'Enterprise-level support',
            ],
          },
          subscription: {
            description: 'Full product design partnership',
            features: [
              'All one-time features+',
              'Weekly progress meetings',
              '2 weekly updates',
              'Unlimited changes',
              'Constant support',
              'Multiple products support',
              'Source code ownership after 18 months',
            ],
          },
        },
      },
    },
    testimonials: {
      badge: 'Client Testimonials',
      heading: "People we've worked with have said some nice things…",
    },
    faq: {
      badge: 'Support',
      heading: 'Frequently Asked',
      questions: 'Questions',
      subheading: 'Find answers to common questions about our services and process',
      items: [
        {
          id: '1',
          question: 'Who is behind noir?',
          answer: 'noir is led by a dedicated team of two co-founders: Lucki, the project manager and creative mind behind every design, and Brian, our talented lead developer. Our mission is to help brands big or small reach their full potential by creating visually stunning and impactful software. The best part is that every design is specifically tailored to our clients\' needs. So whether you\'re rebranding or just starting out, we can help you connect with your target audience.',
        },
        {
          id: '2',
          question: 'How long does it take to complete a project?',
          answer: 'and full websites, and 2–4 weeks for MVPs, depending on the complexity of each project. A detailed project timeline is always provided after our initial consultation.',
        },
        {
          id: '3',
          question: 'Do you design both web and mobile applications?',
          answer: 'Absolutely! We specialize in full-stack development for web platforms, mobile apps (iOS & Android), and progressive web apps with seamless performance.',
        },
        {
          id: '4',
          question: 'How secure are the apps and systems you build?',
          answer: 'Security is built in from day one. We follow best practices including encryption, authentication, and compliance with GDPR and other relevant standards.',
        },
        {
          id: '5',
          question: 'Do you offer post-launch support?',
          answer: 'Yes, clients on our subscription based plan receive ongoing support at all times. Those who have completed a one time project with us can also reach out anytime for additional support or upgrades as needed.',
        },
        {
          id: '6',
          question: 'Can you integrate our software with existing tools?',
          answer: 'Yes. We integrate with popular platforms like Slack, Notion, HubSpot, and CRMs to streamline workflows and data management.',
        },
        {
          id: '7',
          question: 'Can I customize the package?',
          answer: 'Absolutely! We can create a package tailored to your specific needs. Just let us know what you\'re looking for, and we\'ll design a solution that best fits your business.',
        },
      ],
      founderAlt: 'Founder',
    },
    contact: {
      heading: 'Get in',
      touch: 'Touch',
      description: "Ready to start a project with us? Let's create something amazing together.",
      viewRecentWork: 'View our recent work',
      quickResponse: 'Quick response time',
      fiveStarService: '5-star rated service',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'hello@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us about your project and goals...',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      successToast: 'Message sent successfully!',
      errorToast: 'Failed to send message. Please try again',
      errorOccurred: 'An error occurred',
    },
    footer: {
      heading: {
        line1: 'If you scrolled this far,',
        line2: 'we should queue up a time to chat',
      },
      getStarted: 'Get Started',
      letsGo: "Let's Go",
      logo: 'noirsfera',
      copyright: '© 2025 noirsfera. All Rights Reserved',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      twitterAria: 'Twitter',
      instagramAria: 'Instagram',
      telegramAria: 'Telegram',
    },
    banner: {
      loading: 'LOADING',
    },
  },
  ru: {
    navbar: {
      logo: 'noirsfera',
      services: 'Услуги',
      portfolio: 'Портфолио',
      pricing: 'Цены',
      contact: 'Контакты',
      bookACall: 'Записаться на звонок',
      letsGo: 'Поехали',
    },
    hero: {
      availableBadge: 'Доступны для новых проектов',
      heading: {
        modernising: 'Модернизируем',
        through: 'с помощью',
        futuristic: 'футуристичного',
        software: 'ПО',
        words: ['бизнес', 'стартапы', 'бренды'],
      },
      description: 'Создаём цифровой опыт, который продвигает бренды вперёд',
      connectTelegram: 'Связаться через Telegram',
      youLetsChat: '+ Вы. Давайте пообщаемся',
      profileAlt: 'Профиль',
      clientAvatarAlt: 'Аватар клиента',
    },
    services: {
      sectionBadge: 'Премиум услуги',
      heading: 'Превращаем видение в цифровую реальность',
      subheading: 'Комплексные решения для развития вашего бренда',
      showMore: 'Показать больше',
      showLess: 'Показать меньше',
      items: {
        fullstack: {
          title: 'Fullstack разработка',
          subtitle: 'Масштабируемые веб и мобильные приложения',
          details: ['Разработка API', 'Проектирование БД', 'Облачное развертывание', 'Функции реального времени'],
          scalableGrowth: 'Масштабируемый рост',
        },
        aiEngineering: {
          title: 'AI-инженерия и аналитика',
          subtitle: 'Интеллектуальные системы и прогнозная аналитика',
          details: ['Машинное обучение', 'Прогнозная аналитика', 'Визуализация данных', 'Интеграция ИИ'],
          aiPowered: 'На базе ИИ',
        },
        uiux: {
          title: 'UI/UX дизайн',
          subtitle: 'Интуитивный дизайн, ориентированный на пользователя',
          details: ['Исследование пользователей', 'Прототипирование', 'Дизайн-системы', 'Тестирование юзабилити'],
          userRetention: 'Удержание +80%',
          conversions: 'Конверсии +150%',
        },
      },
      cta: {
        badge: 'Следующие шаги',
        heading: 'Готовы преобразить своё цифровое присутствие?',
        description: 'Давайте создадим что-то выдающееся вместе',
        button: 'Начать работу',
        buttonAria: 'Начать через Telegram',
      },
    },
    portfolio: {
      badge: 'Избранные работы',
      heading: 'Кейсы',
      subheading: '10+ успешных проектов с реальными результатами',
      clientAvatarAlt: 'Аватар клиента',
      viewProject: 'Посмотреть проект',
      projects: {
        tutschool: {
          title: 'TutSchool',
          description: 'Комплексный сайт для школы TUT School, языкового и художественного учреждения с информацией о курсах, записью и ресурсами для студентов.',
          tags: ['Веб-дизайн', 'Разработка'],
          duration: '6 недель',
          industry: 'SaaS',
          imageAlt: 'Сайт TutSchool',
        },
        campGuide: {
          title: 'Camp Guide',
          description: 'Интерактивный гид для любителей кемпинга с рекомендациями локаций и списками снаряжения.',
          tags: ['Продуктовый дизайн', 'UI/UX'],
          duration: '8 недель',
          industry: 'Курорт',
          imageAlt: 'Лендинг Camp Guide',
        },
        dmbPay: {
          title: 'DMB Pay+',
          description: 'Безопасная платформа цифровых платежей с интуитивным интерфейсом и отслеживанием транзакций в реальном времени.',
          tags: ['Мобильное приложение', 'web3'],
          duration: '10 недель',
          industry: 'ФинТех',
          imageAlt: 'Web3 платформа',
        },
        oakwood: {
          title: 'Oakwood ESL',
          description: 'Профессиональная школа обучения ESL',
          tags: ['веб-сайт', 'веб'],
          duration: '10 недель',
          industry: 'Образование',
          imageAlt: 'Образовательная платформа',
        },
      },
    },
    pricing: {
      badge: 'Прозрачные цены',
      heading: 'Выберите свой план',
      subheading: 'Гибкие варианты ценообразования под ваши нужды',
      subscription: 'Подписка',
      mostPopular: 'Самый популярный',
      perMonth: 'в месяц',
      scheduleAMeeting: 'Записаться на встречу',
      scheduleMeetingAria: 'Записаться на встречу через WhatsApp',
      connectTelegram: 'Связаться в Telegram',
      webDevelopment: {
        title: 'Веб-разработка',
        starter: {
          name: 'Стартовый',
          oneTime: {
            period: 'Единоразовый платёж',
            description: 'Простое портфолио / лендинг (1-3 страницы)',
            features: [
              '2 дизайн-концепта',
              'Адаптивный дизайн (десктоп, планшет, мобильный)',
              'Прототипы + индивидуальная вёрстка',
              'Разработка на Framer',
              'Владение исходным кодом',
              '1 месяц бесплатной поддержки',
              '+$200 за каждую доп. страницу',
            ],
          },
          subscription: {
            description: 'Отличная точка входа для фрилансеров',
            features: [
              'Все функции единоразового плана+',
              'Еженедельные встречи по прогрессу',
              'Ежемесячные обновления',
              'Неограниченное добавление страниц',
              'Постоянная быстрая поддержка',
              'Владение кодом через 12 месяцев',
            ],
          },
        },
        growth: {
          name: 'Рост',
          oneTime: {
            period: 'Единоразовый платёж',
            description: 'Сайт малого бизнеса (4-7 страниц)',
            features: [
              '2 дизайн-концепта',
              'Адаптивный дизайн (десктоп, планшет, мобильный)',
              'Прототипы + индивидуальная вёрстка',
              'Разработка на Framer',
              'Владение исходным кодом',
              '1 месяц бесплатной поддержки',
              '+$200 за каждую доп. страницу',
            ],
          },
          subscription: {
            description: 'Самый популярный для МСП',
            features: [
              'Все функции единоразового плана+',
              'Еженедельные встречи по прогрессу',
              'Ежемесячные обновления',
              'Неограниченное добавление страниц',
              'Постоянная быстрая поддержка',
              'Владение кодом через 12 месяцев',
            ],
          },
        },
        professional: {
          name: 'Профессиональный',
          oneTime: {
            period: 'Единоразовый платёж',
            description: 'Корпоративный / продвинутый дизайн (8+ страниц)',
            features: [
              '2 дизайн-концепта',
              'Адаптивный дизайн (десктоп, планшет, мобильный)',
              'Прототипы + индивидуальная вёрстка',
              'Разработка на Framer',
              'Владение исходным кодом',
              '1 месяц бесплатной поддержки',
              '+$200 за каждую доп. страницу',
              'Продвинутые анимации и взаимодействия',
            ],
          },
          subscription: {
            description: 'Постоянная разработка и поддержка',
            features: [
              'Все функции единоразового плана+',
              'Еженедельные встречи по прогрессу',
              'Ежемесячные обновления',
              'Неограниченное добавление страниц',
              'Постоянная быстрая поддержка',
              'Полная поддержка и итерации дизайна',
              'Владение кодом через 12 месяцев',
            ],
          },
        },
      },
      productDesign: {
        title: 'Продуктовый дизайн',
        startupMvp: {
          name: 'Стартап MVP',
          oneTime: {
            period: 'Единоразовый платёж',
            description: 'Базовое мобильное приложение + админ-панель',
            features: [
              '2 дизайн-концепта',
              'Еженедельные обновления',
              'Мобильное приложение + админ-панель',
              'Доставка за 1-3 месяца',
              'Запуск в App Store + Play Store',
              '1 месяц поддержки',
              'Связь через Slack, Loom и встречи',
            ],
          },
          subscription: {
            description: 'Дизайн + минимальная поддержка разработки',
            features: [
              'Все функции единоразового плана+',
              'Еженедельные встречи по прогрессу',
              '2 обновления в неделю',
              'Неограниченные изменения',
              'Постоянная поддержка',
              'Владение кодом через 18 месяцев',
            ],
          },
        },
        growth: {
          name: 'Рост',
          oneTime: {
            period: 'Единоразовый платёж',
            description: 'Сложный UI + взаимодействия для финансируемых стартапов',
            features: [
              '2 дизайн-концепта',
              'Еженедельные обновления',
              'Мобильное приложение + админ-панель',
              'Доставка за 1-3 месяца',
              'Запуск в App Store + Play Store',
              '1 месяц поддержки',
              'Связь через Slack, Loom и встречи',
              'Продвинутый UI/UX дизайн',
            ],
          },
          subscription: {
            description: 'Неограниченные изменения + быстрая доставка',
            features: [
              'Все функции единоразового плана+',
              'Еженедельные встречи по прогрессу',
              '2 обновления в неделю',
              'Неограниченные изменения',
              'Постоянная поддержка',
              'Быстрая доставка',
              'Владение кодом через 18 месяцев',
            ],
          },
        },
        scale: {
          name: 'Масштаб',
          oneTime: {
            period: 'Единоразовый платёж',
            description: 'Кастомные дизайн-системы / дашборды',
            features: [
              '2 дизайн-концепта',
              'Еженедельные обновления',
              'Мобильное приложение + админ-панель',
              'Доставка за 1-3 месяца',
              'Запуск в App Store + Play Store',
              '1 месяц поддержки',
              'Связь через Slack, Loom и встречи',
              'Кастомные дизайн-системы',
              'Поддержка корпоративного уровня',
            ],
          },
          subscription: {
            description: 'Полное партнёрство по продуктовому дизайну',
            features: [
              'Все функции единоразового плана+',
              'Еженедельные встречи по прогрессу',
              '2 обновления в неделю',
              'Неограниченные изменения',
              'Постоянная поддержка',
              'Поддержка нескольких продуктов',
              'Владение кодом через 18 месяцев',
            ],
          },
        },
      },
    },
    testimonials: {
      badge: 'Отзывы клиентов',
      heading: 'Люди, с которыми мы работали, сказали кое-что приятное...',
    },
    faq: {
      badge: 'Поддержка',
      heading: 'Часто задаваемые',
      questions: 'вопросы',
      subheading: 'Найдите ответы на частые вопросы о наших услугах и процессах',
      items: [
        {
          id: '1',
          question: 'Кто стоит за noir?',
          answer: 'noir возглавляет команда из двух со-основателей: Lucki, менеджер проектов и креативный ум за каждым дизайном, и Brian, наш талантливый главный разработчик. Наша миссия — помочь брендам больших и малых размеров раскрыть свой полный потенциал, создавая визуально потрясающее и впечатляющее программное обеспечение. Лучшая часть в том, что каждый дизайн специально адаптирован под нужды наших клиентов. Так что, независимо от того, проводите ли вы ребрендинг или только начинаете, мы можем помочь вам связаться с вашей целевой аудиторией.',
        },
        {
          id: '2',
          question: 'Сколько времени занимает завершение проекта?',
          answer: 'и полноценные веб-сайты, и 2–4 недели для MVP, в зависимости от сложности каждого проекта. Подробный график проекта всегда предоставляется после нашей первоначальной консультации.',
        },
        {
          id: '3',
          question: 'Вы разрабатываете веб-приложения и мобильные приложения?',
          answer: 'Абсолютно! Мы специализируемся на fullstack разработке для веб-платформ, мобильных приложений (iOS и Android) и прогрессивных веб-приложений с бесшовной производительностью.',
        },
        {
          id: '4',
          question: 'Насколько безопасны приложения и системы, которые вы создаёте?',
          answer: 'Безопасность встроена с первого дня. Мы следуем лучшим практикам, включая шифрование, аутентификацию и соблюдение GDPR и других соответствующих стандартов.',
        },
        {
          id: '5',
          question: 'Вы предлагаете поддержку после запуска?',
          answer: 'Да, клиенты по нашему плану подписки получают постоянную поддержку в любое время. Те, кто завершил единоразовый проект с нами, также могут обратиться в любое время для дополнительной поддержки или обновлений по мере необходимости.',
        },
        {
          id: '6',
          question: 'Можете ли вы интегрировать наше ПО с существующими инструментами?',
          answer: 'Да. Мы интегрируем с популярными платформами, такими как Slack, Notion, HubSpot и CRM для оптимизации рабочих процессов и управления данными.',
        },
        {
          id: '7',
          question: 'Могу ли я настроить пакет?',
          answer: 'Абсолютно! Мы можем создать пакет, адаптированный под ваши конкретные потребности. Просто дайте нам знать, что вы ищете, и мы разработаем решение, которое лучше всего подходит вашему бизнесу.',
        },
      ],
      founderAlt: 'Основатель',
    },
    contact: {
      heading: 'Свяжитесь',
      touch: 'с нами',
      description: 'Готовы начать проект с нами? Давайте создадим что-то удивительное вместе.',
      viewRecentWork: 'Посмотреть наши последние работы',
      quickResponse: 'Быстрое время ответа',
      fiveStarService: '5-звездочный сервис',
      fullNameLabel: 'Полное имя',
      fullNamePlaceholder: 'Иван Иванов',
      emailLabel: 'Email адрес',
      emailPlaceholder: 'hello@example.com',
      messageLabel: 'Сообщение',
      messagePlaceholder: 'Расскажите нам о вашем проекте и целях...',
      sendMessage: 'Отправить сообщение',
      sending: 'Отправка...',
      successToast: 'Сообщение успешно отправлено!',
      errorToast: 'Не удалось отправить сообщение. Попробуйте снова',
      errorOccurred: 'Произошла ошибка',
    },
    footer: {
      heading: {
        line1: 'Если вы прокрутили так далеко,',
        line2: 'нам стоит назначить время для беседы',
      },
      getStarted: 'Начать',
      letsGo: 'Поехали',
      logo: 'noirsfera',
      copyright: '© 2025 noirsfera. Все права защищены',
      privacyPolicy: 'Политика конфиденциальности',
      termsConditions: 'Условия использования',
      twitterAria: 'Twitter',
      instagramAria: 'Instagram',
      telegramAria: 'Telegram',
    },
    banner: {
      loading: 'ЗАГРУЗКА',
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}