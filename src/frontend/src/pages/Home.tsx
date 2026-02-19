import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, Target, Award } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/hero-fitness.dim_1920x800.png)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Body Fitness Tracking System
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90">by Rajeshwar Chaudhari</p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/80">
            Take control of your health journey with our comprehensive fitness tracking system.
            Monitor your steps, water intake, calories, and BMI all in one place.
          </p>
          <Button
            size="lg"
            className="fitness-gradient text-lg px-8 py-6 hover:scale-105 transition-transform"
            onClick={() => navigate({ to: '/dashboard' })}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose FitTrack?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="fitness-card p-6 text-center hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-full bg-fitness-green/10 mb-4">
                <Activity className="h-8 w-8 text-fitness-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Tracking</h3>
              <p className="text-muted-foreground">
                Track your daily activities with precision and ease
              </p>
            </div>
            <div className="fitness-card p-6 text-center hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-full bg-fitness-blue/10 mb-4">
                <TrendingUp className="h-8 w-8 text-fitness-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
              <p className="text-muted-foreground">
                Visualize your progress with detailed charts and insights
              </p>
            </div>
            <div className="fitness-card p-6 text-center hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-full bg-fitness-orange/10 mb-4">
                <Target className="h-8 w-8 text-fitness-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Goal Setting</h3>
              <p className="text-muted-foreground">
                Set and achieve your fitness goals with personalized targets
              </p>
            </div>
            <div className="fitness-card p-6 text-center hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-full bg-fitness-purple/10 mb-4">
                <Award className="h-8 w-8 text-fitness-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Achievement System</h3>
              <p className="text-muted-foreground">
                Stay motivated with milestones and achievements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already tracking their way to a healthier lifestyle.
          </p>
          <Button
            size="lg"
            className="fitness-gradient text-lg px-8 py-6"
            onClick={() => navigate({ to: '/register' })}
          >
            Start Tracking Now
          </Button>
        </div>
      </section>
    </div>
  );
}
