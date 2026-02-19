import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Target, Users, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About This Project</h1>
          <p className="text-lg text-muted-foreground">
            Learn more about the Body Fitness Tracking System
          </p>
        </div>

        <div className="space-y-6">
          <Card className="fitness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-fitness-green/10">
                  <Lightbulb className="h-5 w-5 text-fitness-green" />
                </div>
                Project Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The Body Fitness Tracking System is a comprehensive web-based application designed to help individuals monitor and improve their health and fitness. This system provides an intuitive interface for tracking daily activities, calculating health metrics, and visualizing progress over time.
              </p>
              <p className="text-muted-foreground">
                Built as an academic project for BYK College of Commerce, this system demonstrates the practical application of modern web technologies in solving real-world health and wellness challenges.
              </p>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-fitness-blue/10">
                  <Target className="h-5 w-5 text-fitness-blue" />
                </div>
                Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                In today's fast-paced world, maintaining a healthy lifestyle has become increasingly challenging. Many people struggle to track their daily fitness activities, monitor their health metrics, and stay motivated to achieve their wellness goals. There is a need for an accessible, user-friendly system that consolidates various health tracking features into a single platform, making it easier for individuals to take control of their fitness journey.
              </p>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-fitness-orange/10">
                  <Target className="h-5 w-5 text-fitness-orange" />
                </div>
                Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-fitness-orange mt-1">•</span>
                  <span>Develop a user-friendly interface for tracking daily fitness activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fitness-orange mt-1">•</span>
                  <span>Implement accurate BMI calculation and health categorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fitness-orange mt-1">•</span>
                  <span>Provide visual representations of progress through charts and graphs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fitness-orange mt-1">•</span>
                  <span>Enable goal setting and progress monitoring for users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fitness-orange mt-1">•</span>
                  <span>Ensure responsive design for accessibility across all devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fitness-orange mt-1">•</span>
                  <span>Implement secure data storage and user authentication</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-fitness-purple/10">
                  <Code className="h-5 w-5 text-fitness-purple" />
                </div>
                Technologies Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Frontend</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• React 19</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                    <li>• Shadcn/ui Components</li>
                    <li>• TanStack Router</li>
                    <li>• React Query</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Backend</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Motoko</li>
                    <li>• Internet Computer</li>
                    <li>• Internet Identity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-fitness-green/10">
                  <Users className="h-5 w-5 text-fitness-green" />
                </div>
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold text-lg mb-1">Rajeshwar Chaudhari</h4>
                  <p className="text-sm text-muted-foreground mb-2">Project Lead & Developer</p>
                  <p className="text-sm text-muted-foreground">
                    BYK College of Commerce | Academic Year 2025-26
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
