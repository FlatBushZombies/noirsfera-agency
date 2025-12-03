# Internationalization Implementation Guide

## ✅ What's Already Done

1. **Translation System** (`lib/translations.ts`)
   - Complete English and Russian translations
   - TypeScript interfaces for type safety
   - Helper function `getTranslations(language)`

2. **Language Context** (`lib/LanguageContext.tsx`)
   - Global language state management
   - Persists language preference to localStorage
   - Custom hook `useLanguage()`

3. **Language Switcher Component** (`components/LanguageSwitcher.tsx`)
   - Beautiful modal with English/Russian options
   - Globe icon button
   - Smooth animations

4. **Navbar Updated** (`components/navbar.tsx`)
   - Integrated language switcher
   - Uses translations for nav items and buttons
   - Works on both desktop and mobile

5. **Layout Updated** (`app/layout.tsx`)
   - Wrapped with `LanguageProvider`

## 🔧 How to Update Each Component

### Step-by-Step Pattern

For each component, follow this pattern:

#### 1. Import Dependencies
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';
```

#### 2. Get Translations
```typescript
export function YourComponent() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // Rest of your component...
}
```

#### 3. Replace Hardcoded Text
```typescript
// Before:
<h2>Featured Works</h2>

// After:
<h2>{t.portfolio.badge}</h2>
```

## 📋 Components to Update

### 1. Hero Component (`components/hero.tsx`)
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';

export function Hero() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // Use translations:
  // t.hero.availableBadge
  // t.hero.heading.modernising
  // t.hero.heading.words (array for FlipWords)
  // t.hero.description
  // t.hero.connectTelegram
  // t.hero.profileAlt
  // t.hero.clientAvatarAlt
}
```

### 2. Services Component (`components/services.tsx`)
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';

export function Services() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // Update the services array to use translations:
  const services = [
    {
      title: t.services.items.fullstack.title,
      subtitle: t.services.items.fullstack.subtitle,
      details: t.services.items.fullstack.details,
      icon: "code",
    },
    {
      title: t.services.items.aiEngineering.title,
      subtitle: t.services.items.aiEngineering.subtitle,
      details: t.services.items.aiEngineering.details,
      icon: "brain",
    },
    {
      title: t.services.items.uiux.title,
      subtitle: t.services.items.uiux.subtitle,
      details: t.services.items.uiux.details,
      icon: "palette",
    },
  ];
  
  // Use other translations:
  // t.services.sectionBadge
  // t.services.heading
  // t.services.subheading
  // t.services.showMore / t.services.showLess
  // t.services.cta.heading
  // t.services.cta.button
}
```

### 3. Portfolio Component (`components/portfolio.tsx`)
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';

export default function Portfolio() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // Update projects array:
  const projects = [
    {
      id: 1,
      title: t.portfolio.projects.tutschool.title,
      description: t.portfolio.projects.tutschool.description,
      tags: t.portfolio.projects.tutschool.tags,
      duration: t.portfolio.projects.tutschool.duration,
      industry: t.portfolio.projects.tutschool.industry,
      image: "/tutschool.png",
      imageAlt: t.portfolio.projects.tutschool.imageAlt,
      link: "https://tutschool.ru/",
    },
    // ... repeat for campGuide, dmbPay, oakwood
  ];
  
  // Use:
  // t.portfolio.badge
  // t.portfolio.heading
  // t.portfolio.subheading
  // t.portfolio.viewProject
  // t.portfolio.clientAvatarAlt
}
```

### 4. Pricing Component (`components/pricing.tsx`)
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';

export default function Pricing() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // Update pricingData with translations:
  const pricingData = [
    {
      title: t.pricing.webDevelopment.title,
      packages: {
        starter: {
          name: t.pricing.webDevelopment.starter.name,
          oneTime: {
            price: "$1,200", // Keep prices as-is
            priceRange: "$1,200 - $2,000",
            period: t.pricing.webDevelopment.starter.oneTime.period,
            description: t.pricing.webDevelopment.starter.oneTime.description,
            features: t.pricing.webDevelopment.starter.oneTime.features,
          },
          subscription: {
            price: "$150",
            priceRange: "$150 - $200/mo",
            period: t.pricing.perMonth,
            description: t.pricing.webDevelopment.starter.subscription.description,
            features: t.pricing.webDevelopment.starter.subscription.features,
          },
        },
        // ... repeat for growth and professional
      },
    },
    // ... repeat for productDesign
  ];
  
  // Use:
  // t.pricing.badge
  // t.pricing.heading
  // t.pricing.subheading
  // t.pricing.subscription
  // t.pricing.mostPopular
  // t.pricing.scheduleAMeeting
  // t.pricing.connectTelegram
}
```

### 5. Testimonials Component (`components/testimonials.tsx`)
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';

export function Testimonials() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // NOTE: Testimonial content (name, company, text) should stay as-is
  // Only translate the section headings:
  // t.testimonials.badge
  // t.testimonials.heading
}
```

### 6. FAQ Component (`components/faq.tsx`)
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';

const FAQ = () => {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // Replace the faq import with:
  const faq = t.faq.items;
  
  // Use:
  // t.faq.badge
  // t.faq.heading
  // t.faq.questions
  // t.faq.subheading
  // t.faq.founderAlt (for image alt text)
}
```

### 7. Contact Component (`components/contact.tsx`)
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';

export default function Contact() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // Use in toast messages:
  if (res.ok) {
    toast.success(t.contact.successToast);
  } else {
    toast.error(t.contact.errorToast);
  }
  
  // Use for all labels and placeholders:
  // t.contact.heading
  // t.contact.touch
  // t.contact.description
  // t.contact.fullNameLabel
  // t.contact.fullNamePlaceholder
  // t.contact.emailLabel
  // t.contact.emailPlaceholder
  // t.contact.messageLabel
  // t.contact.messagePlaceholder
  // t.contact.sendMessage
  // t.contact.sending
  // t.contact.viewRecentWork
  // t.contact.quickResponse
  // t.contact.fiveStarService
}
```

### 8. Footer Component (`components/footer.tsx`)
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // Use:
  // t.footer.heading.line1
  // t.footer.heading.line2
  // t.footer.getStarted / t.footer.letsGo (for button)
  // t.footer.logo
  // t.footer.copyright
  // t.footer.privacyPolicy
  // t.footer.termsConditions
  // t.footer.twitterAria (for aria-label)
  // t.footer.instagramAria
  // t.footer.telegramAria
}
```

### 9. Banner Component (`components/banner.tsx`)
```typescript
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslations } from '@/lib/translations';

export default function Banner() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  // Use:
  // t.banner.loading
}
```

## 🎯 Quick Checklist

- [x] Translation file created with EN/RU
- [x] Language Context created
- [x] Language Switcher component created
- [x] Navbar updated with switcher
- [x] Layout wrapped with LanguageProvider
- [ ] Update Hero component
- [ ] Update Services component
- [ ] Update Portfolio component
- [ ] Update Pricing component
- [ ] Update Testimonials component
- [ ] Update FAQ component
- [ ] Update Contact component
- [ ] Update Footer component
- [ ] Update Banner component

## 🔍 Testing

1. **Test Language Switching**
   - Click globe icon in navbar
   - Select Russian → all text should change
   - Select English → should revert back
   - Refresh page → language should persist

2. **Test on Mobile**
   - Language switcher should appear on mobile navbar
   - Modal should be responsive

3. **Test All Sections**
   - Navigate through all sections
   - Verify all text changes language
   - Check that prices, URLs, and dynamic data stay unchanged

## 💡 Important Notes

- **DO NOT translate**: Prices, URLs, image paths, dynamic data (like `t.name`, `t.company`)
- **DO translate**: All user-facing text, labels, buttons, headings, descriptions
- **Maintain**: All Tailwind classes, animations, and component structure
- **TypeScript**: The translations object is fully typed, so you'll get autocomplete

## 🚀 You're Ready!

The foundation is complete. Now simply update each component following the patterns above. The language switcher is fully functional and will automatically update all components that use `useLanguage()` and `getTranslations()`.
