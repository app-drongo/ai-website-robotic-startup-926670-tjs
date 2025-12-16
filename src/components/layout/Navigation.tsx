'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  logo: 'RoboTech',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  ctaText: 'Get Started',
  ctaHref: '/get-started',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavigation('/')}
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
              data-editable="logo"
            >
              {config.logo}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {config.links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigation(link.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${
                    isScrolled ? 'text-foreground' : 'text-white hover:text-white/80'
                  }`}
                  data-editable={`links[${idx}].label`}
                  data-editable-href={`links[${idx}].href`}
                  data-href={link.href}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavigation(config.ctaHref)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable="ctaText"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              {config.ctaText}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-b border-border/50 mt-2 rounded-lg">
              {config.links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigation(link.href)}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md w-full text-left transition-colors duration-200"
                  data-editable={`links[${idx}].label`}
                  data-editable-href={`links[${idx}].href`}
                  data-href={link.href}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => handleNavigation(config.ctaHref)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  data-editable="ctaText"
                  data-editable-href="ctaHref"
                  data-href={config.ctaHref}
                >
                  {config.ctaText}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
