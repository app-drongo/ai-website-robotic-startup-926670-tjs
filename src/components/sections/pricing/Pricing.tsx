'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Zap, Star, Crown } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  sectionTitle: 'Choose Your Robotic Solution',
  sectionSubtitle: 'Flexible pricing plans designed to scale with your automation needs',
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for small businesses getting started with automation',
      price: '$2,999',
      period: '/month',
      icon: 'Zap',
      badge: '',
      features: [
        'Up to 5 robotic units',
        'Basic AI integration',
        'Email support',
        'Standard maintenance',
        'Mobile app access',
        'Basic analytics dashboard'
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/get-started',
      popular: false
    },
    {
      name: 'Professional',
      description: 'Advanced automation for growing enterprises',
      price: '$7,999',
      period: '/month',
      icon: 'Star',
      badge: 'Most Popular',
      features: [
        'Up to 25 robotic units',
        'Advanced AI & machine learning',
        'Priority 24/7 support',
        'Predictive maintenance',
        'Custom integrations',
        'Advanced analytics & reporting',
        'Multi-site management',
        'API access'
      ],
      ctaText: 'Get Started',
      ctaHref: '/get-started',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Complete automation ecosystem for large organizations',
      price: 'Custom',
      period: '',
      icon: 'Crown',
      badge: 'Enterprise',
      features: [
        'Unlimited robotic units',
        'Custom AI development',
        'Dedicated account manager',
        'White-glove implementation',
        'Custom hardware solutions',
        'Enterprise-grade security',
        'SLA guarantees',
        'On-premise deployment options'
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact',
      popular: false
    }
  ],
  additionalInfo: {
    title: 'All plans include',
    features: [
      'Cloud-based management platform',
      'Regular software updates',
      'Data encryption & security',
      'Training & onboarding support'
    ]
  }
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const iconMap = {
      Zap,
      Star,
      Crown,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Zap;
    return <IconComponent className="h-6 w-6" />;
  };

  const handleCTA = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative bg-card text-card-foreground border-border hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? 'ring-2 ring-primary scale-105 lg:scale-110'
                  : 'hover:scale-105'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge
                    variant={plan.popular ? 'default' : 'secondary'}
                    className="bg-primary text-primary-foreground px-4 py-1"
                  >
                    <span data-editable={`plans[${idx}].badge`}>{plan.badge}</span>
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                {/* Icon */}
                <div className="mx-auto mb-4 bg-primary/10 text-primary p-3 rounded-lg w-fit">
                  {getIcon(plan.icon)}
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">
                      <span data-editable={`plans[${idx}].price`}>{plan.price}</span>
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-1">
                        <span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  size="lg"
                  onClick={() => handleCTA(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-6">
            <span data-editable="additionalInfo.title">{config.additionalInfo.title}</span>
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {config.additionalInfo.features.map((feature, idx) => (
              <div key={idx} className="flex items-center justify-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-muted-foreground">
                  <span data-editable={`additionalInfo.features[${idx}]`}>{feature}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-muted rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
            <p className="text-muted-foreground mb-6">
              Our team can design a tailored robotic automation system for your specific needs.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleCTA('/contact')}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
