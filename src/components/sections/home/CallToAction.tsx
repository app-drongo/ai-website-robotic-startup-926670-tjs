'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CTA = {
  sectionTitle: 'Ready to Transform Your Business?',
  sectionSubtitle: 'Join thousands of companies already using our robotic solutions to increase efficiency and reduce costs.',
  description: 'Get started with a free consultation and see how our AI-powered robots can revolutionize your operations.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/get-started',
  secondaryCtaText: 'Schedule Demo',
  secondaryCtaHref: '/demo',
  features: [
    {
      icon: 'Zap',
      title: '30-Day Free Trial',
      description: 'Test our solutions risk-free'
    },
    {
      icon: 'Shield',
      title: '24/7 Support',
      description: 'Expert assistance when you need it'
    },
    {
      icon: 'Cpu',
      title: 'Easy Integration',
      description: 'Seamless setup in under 24 hours'
    }
  ],
  trustBadge: 'Trusted by 500+ companies worldwide'
} as const;

type CallToActionProps = Partial<typeof DEFAULT_CTA>;

export default function CallToAction(props: CallToActionProps) {
  const config = { ...DEFAULT_CTA, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const iconMap = {
      Zap,
      Shield,
      Cpu,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Zap;
    return <IconComponent className="h-6 w-6" />;
  };

  const handlePrimaryCTA = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryCTA = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="cta" className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span data-editable="sectionTitle">{config.sectionTitle}</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              <span data-editable="description">{config.description}</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 group px-8 py-4 text-lg"
              onClick={handlePrimaryCTA}
              data-editable-href="primaryCtaHref"
              data-href={config.primaryCtaHref}
            >
              <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-4 text-lg"
              onClick={handleSecondaryCTA}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {config.features.map((feature, idx) => (
              <Card
                key={idx}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mx-auto mb-4">
                    {getIcon(feature.icon)}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-muted/50 text-muted-foreground px-6 py-3 rounded-full backdrop-blur-sm">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">
                <span data-editable="trustBadge">{config.trustBadge}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}