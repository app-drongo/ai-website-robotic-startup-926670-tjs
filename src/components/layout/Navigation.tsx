'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Bot, Zap } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'RoboTech',
  brandIcon: 'Bot',
  ctaText: 'Get Started',
  ctaHref: '#hero',
  menuItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
  ],
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  const IconComponent = config.brandIcon === 'Bot' ? Bot : Zap;

  return (
    <section
      id="navigation"
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <IconComponent className="h-5 w-5" />
            </div>
            <span
              className="text-xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleNavClick('#hero')}
              data-editable="brandName"
            >
              {config.brandName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {config.menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                data-editable-href={`menuItems[${idx}].href`}
                data-href={item.href}
              >
                <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button
              onClick={handleCtaClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-card text-card-foreground w-[300px] sm:w-[400px]"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span
                      className="text-xl font-bold text-card-foreground"
                      data-editable="brandName"
                    >
                      {config.brandName}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-card-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-4 py-6 flex-1">
                  {config.menuItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(item.href)}
                      className="text-left text-lg text-muted-foreground hover:text-card-foreground transition-colors py-2 px-4 rounded-lg hover:bg-accent"
                      data-editable-href={`menuItems[${idx}].href`}
                      data-href={item.href}
                    >
                      <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="pt-6 border-t border-border">
                  <Button
                    onClick={handleCtaClick}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    data-editable-href="ctaHref"
                    data-href={config.ctaHref}
                  >
                    <span data-editable="ctaText">{config.ctaText}</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
