'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Brain, Zap, Shield, Cpu, Eye } from 'lucide-react';

const DEFAULT_FEATURES = {
  sectionTitle: 'Revolutionary Technology Stack',
  sectionSubtitle: 'Discover the advanced capabilities that set our robotic solutions apart',
  features: [
    {
      icon: 'Bot',
      title: 'Advanced AI Integration',
      description:
        'Cutting-edge machine learning algorithms enable autonomous decision-making and adaptive behavior in complex environments.',
      badge: 'AI-Powered',
    },
    {
      icon: 'Brain',
      title: 'Neural Processing Unit',
      description:
        'Custom-designed neural processors deliver real-time computation for complex robotic tasks with unprecedented efficiency.',
      badge: 'Hardware',
    },
    {
      icon: 'Zap',
      title: 'Lightning-Fast Response',
      description:
        'Sub-millisecond reaction times ensure optimal performance in dynamic industrial and commercial applications.',
      badge: 'Performance',
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description:
        'Military-grade encryption and secure communication protocols protect your operations and sensitive data.',
      badge: 'Security',
    },
    {
      icon: 'Cpu',
      title: 'Edge Computing',
      description:
        'Distributed processing capabilities reduce latency and enable offline operation for mission-critical tasks.',
      badge: 'Computing',
    },
    {
      icon: 'Eye',
      title: 'Computer Vision',
      description:
        'Advanced visual recognition systems provide precise object detection and environmental mapping capabilities.',
      badge: 'Vision',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };

  const getIcon = (iconName: string) => {
    const iconMap = {
      Bot,
      Brain,
      Zap,
      Shield,
      Cpu,
      Eye,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Bot;
    return <IconComponent className="h-8 w-8" />;
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:bg-accent/5 transition-colors duration-300 group"
            >
              <CardContent className="p-8">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    {getIcon(feature.icon)}
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`features[${idx}].description`}>
                      {feature.description}
                    </span>
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-2 bg-muted text-muted-foreground px-6 py-3 rounded-full">
            <Bot className="h-5 w-5" />
            <span className="text-sm font-medium">Powered by Next-Gen Robotics</span>
          </div>
        </div>
      </div>
    </section>
  );
}
