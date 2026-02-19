import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import type { HealthData } from '../backend';

interface WeeklyChartProps {
  data: HealthData[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const processedData = data.slice(-7).map((entry) => {
    const date = new Date(Number(entry.timestamp) / 1000000);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      steps: Number(entry.steps),
      water: Number(entry.waterIntakeMl),
      calories: Number(entry.caloriesBurned),
    };
  });

  const maxSteps = Math.max(...processedData.map((d) => d.steps), 10000);

  return (
    <Card className="fitness-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-fitness-orange/10">
            <BarChart3 className="h-5 w-5 text-fitness-orange" />
          </div>
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {processedData.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No data available yet. Start tracking to see your progress!
            </p>
          ) : (
            <div className="space-y-3">
              {processedData.map((entry, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{entry.day}</span>
                    <span className="text-muted-foreground">{entry.steps.toLocaleString()} steps</span>
                  </div>
                  <div className="h-8 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-fitness-green to-fitness-blue transition-all duration-500"
                      style={{ width: `${(entry.steps / maxSteps) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
