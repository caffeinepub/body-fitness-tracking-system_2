import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, TrendingUp, Calculator, Target, FileText, Smartphone } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Activity,
      title: 'Smart Tracking',
      description: 'Automatically track your daily activities including steps, water intake, and calories burned with precision.',
      color: 'fitness-green',
    },
    {
      icon: TrendingUp,
      title: 'Health Analytics',
      description: 'Visualize your progress with detailed charts and insights. Understand your trends and patterns over time.',
      color: 'fitness-blue',
    },
    {
      icon: Calculator,
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index instantly and track changes over time. Get personalized health recommendations.',
      color: 'fitness-purple',
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set personalized fitness goals and track your progress. Stay motivated with daily targets and milestones.',
      color: 'fitness-orange',
    },
    {
      icon: FileText,
      title: 'Progress Reports',
      description: 'Generate comprehensive reports of your fitness journey. Review weekly and monthly summaries of your achievements.',
      color: 'fitness-green',
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive Design',
      description: 'Access your fitness data anywhere, anytime. Fully optimized for mobile, tablet, and desktop devices.',
      color: 'fitness-blue',
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Features</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover all the powerful features that make our fitness tracking system the perfect companion for your health journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="fitness-card hover:scale-105 transition-transform">
              <CardHeader>
                <div className={`inline-flex p-3 rounded-lg bg-${feature.color}/10 mb-3`}>
                  <Icon className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Card className="fitness-card max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Why These Features Matter</CardTitle>
          </CardHeader>
          <CardContent className="text-left space-y-4">
            <p className="text-muted-foreground">
              Our comprehensive fitness tracking system is designed with your success in mind. Each feature works together to provide you with a complete picture of your health and fitness journey.
            </p>
            <p className="text-muted-foreground">
              Whether you're just starting your fitness journey or you're a seasoned athlete, our tools adapt to your needs and help you achieve your goals faster and more efficiently.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
