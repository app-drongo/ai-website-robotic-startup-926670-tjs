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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={config.heroImageUrl}
          alt={config.heroImageAlt}
          fill
          className="object-cover"
          data-editable-src="heroImageUrl"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Badge */}
          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="bg-primary/20 text-white border-primary/30 px-4 py-2 backdrop-blur-sm"
            >
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Headlines */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
              <span
                data-editable="headline"
                className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
              >
                {config.headline}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              <span data-editable="subheadline">{config.subheadline}</span>
            </p>

            <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
              <span data-editable="description">{config.description}</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              className="border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all duration-300"
              onClick={handleSecondaryCTA}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
            >
              <Play className="mr-2 h-5 w-5" />
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
            {config.stats.map((stat, idx) => (
              <Card
                key={idx}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2 text-primary">
                    {getStatIcon(stat.icon)}
                  </div>
                  <div className="text-2xl font-bold">
                    <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
