'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Bot } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  logo: {
    text: 'RoboTech',
    href: '/'
  },
  links: [
    { text: 'Home', href: '/' },
    { text: 'Features', href: '/#features' },
    { text: 'Pricing', href: '/pricing' },
    { text: 'Contact', href: '/contact' }
  ],
  cta: {
    text: 'Get Started',
    href: '/get-started'
  }
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation(config.logo.href)}
            data-editable-href="logo.href"
            data-href={config.logo.href}
          >
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Bot className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-foreground">
              <span data-editable="logo.text">{config.logo.text}</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {config.links.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(link.href)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                data-editable-href={`links[${idx}].href`}
                data-href={link.href}
              >
                <span data-editable={`links[${idx}].text`}>{link.text}</span>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavigation(config.cta.href)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="cta.href"
              data-href={config.cta.href}
            >
              <span data-editable="cta.text">{config.cta.text}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-2 pb-4 border-b border-border">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                      <Bot className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                      <span data-editable="logo.text">{config.logo.text}</span>
                    </span>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    {config.links.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavigation(link.href)}
                        className="text-left text-lg text-foreground hover:text-primary transition-colors duration-200 py-2"
                        data-editable-href={`links[${idx}].href`}
                        data-href={link.href}
                      >
                        <span data-editable={`links[${idx}].text`}>{link.text}</span>
                      </button>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-4">
                    <Button
                      onClick={() => handleNavigation(config.cta.href)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      data-editable-href="cta.href"
                      data-href={config.cta.href}
                    >
                      <span data-editable="cta.text">{config.cta.text}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
