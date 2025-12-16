'use client';

import { Bot, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  logo: {
    text: 'RoboTech',
    description: 'Transforming industries with cutting-edge AI-powered robotic solutions.'
  },
  sections: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '/#features' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'Demo', href: '/demo' },
        { text: 'Documentation', href: '/docs' }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '/about' },
        { text: 'Careers', href: '/careers' },
        { text: 'News', href: '/news' },
        { text: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Center', href: '/help' },
        { text: 'Community', href: '/community' },
        { text: 'Training', href: '/training' },
        { text: 'Status', href: '/status' }
      ]
    }
  ],
  contact: {
    email: 'hello@robotech.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Drive, Tech Valley, CA 94000'
  },
  social: [
    { icon: 'Github', href: 'https://github.com', label: 'GitHub' },
    { icon: 'Twitter', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'Linkedin', href: 'https://linkedin.com', label: 'LinkedIn' }
  ],
  legal: {
    copyright: '© 2024 RoboTech. All rights reserved.',
    links: [
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Terms of Service', href: '/terms' },
      { text: 'Cookie Policy', href: '/cookies' }
    ]
  }
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const getSocialIcon = (iconName: string) => {
    const iconMap = {
      Github,
      Twitter,
      Linkedin,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Github;
    return <IconComponent className="h-5 w-5" />;
  };

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <footer className="bg-muted text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Bot className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-foreground">
                <span data-editable="logo.text">{config.logo.text}</span>
              </span>
            </div>
            <p className="text-sm mb-6 max-w-xs">
              <span data-editable="logo.description">{config.logo.description}</span>
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">
                  <span data-editable="contact.email">{config.contact.email}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">
                  <span data-editable="contact.phone">{config.contact.phone}</span>
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-sm">
                  <span data-editable="contact.address">{config.contact.address}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {config.sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="text-foreground font-semibold mb-4">
                <span data-editable={`sections[${sectionIdx}].title`}>{section.title}</span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="text-sm hover:text-primary transition-colors duration-200"
                      data-editable-href={`sections[${sectionIdx}].links[${linkIdx}].href`}
                      data-href={link.href}
                    >
                      <span data-editable={`sections[${sectionIdx}].links[${linkIdx}].text`}>
                        {link.text}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm">
              <span data-editable="legal.copyright">{config.legal.copyright}</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {config.social.map((social, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigation(social.href)}
                  className="hover:text-primary transition-colors duration-200"
                  aria-label={social.label}
                  data-editable-href={`social[${idx}].href`}
                  data-href={social.href}
                >
                  {getSocialIcon(social.icon)}
                </button>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {config.legal.links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigation(link.href)}
                  className="text-sm hover:text-primary transition-colors duration-200"
                  data-editable-href={`legal.links[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`legal.links[${idx}].text`}>{link.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
