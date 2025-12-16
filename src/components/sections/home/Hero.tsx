'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Zap, Target, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  headline: 'The Future of Robotics is Here',
  subheadline:
    'Transforming industries with cutting-edge AI-powered robotic solutions that increase efficiency, reduce costs, and unlock new possibilities for your business.',
  description:
    'Our advanced robotic systems combine machine learning, computer vision, and precision engineering to deliver autonomous solutions that adapt to your unique operational needs.',
  ctaText: 'Start Your Transformation',
  ctaHref: '/get-started',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
  heroImageAlt: 'Advanced robotic arm in modern manufacturing facility',
  stats: [
    { label: 'Efficiency Increase', value: '300%', icon: 'zap' },
    { label: 'Cost Reduction', value: '45%', icon: 'target' },
    { label: 'ROI Achievement', value: '18mo', icon: 'trending' },
  ],
  badge: 'Industry Leader',
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryCTA = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCTA = () => {
    navigate(config.secondaryCtaHref);
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-5 w-5" />;
      case 'target':
        return <Target className="h-5 w-5" />;
      case 'trending':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Badge */}
            <div className="flex justify-start">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 px-4 py-2"
              >
                <span data-editable="badge">{config.badge}</span>
              </Badge>
            </div>

            {/* Headlines */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span
                  data-editable="headline"
                  className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                >
                  {config.headline}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subheadline">{config.subheadline}</span>
              </p>

              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                <span data-editable="description">{config.description}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 group"
                onClick={handlePrimaryCTA}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                onClick={handleSecondaryCTA}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
              >
                <Play className="mr-2 h-5 w-5" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {config.stats.map((stat, idx) => (
                <Card
                  key={idx}
                  className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2 text-primary">
                      {getStatIcon(stat.icon)}
                    </div>
                    <div className="text-2xl font-bold">
                      <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={config.heroImageUrl}
                alt={config.heroImageAlt}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                data-editable-src="heroImageUrl"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">AI Active</span>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
