import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplet, Plus } from 'lucide-react';

interface WaterIntakeTrackerProps {
  currentIntake: number;
  onAddWater: () => void;
}

export default function WaterIntakeTracker({ currentIntake, onAddWater }: WaterIntakeTrackerProps) {
  const dailyGoalMl = 2000;
  const glassSize = 250;
  const glasses = Math.floor(currentIntake / glassSize);
  const progress = Math.min((currentIntake / dailyGoalMl) * 100, 100);

  return (
    <Card className="fitness-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-fitness-blue/10">
            <Droplet className="h-5 w-5 text-fitness-blue" />
          </div>
          Water Intake
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-fitness-blue">{glasses}</div>
          <div className="text-sm text-muted-foreground">glasses ({currentIntake}ml)</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Daily Goal</span>
            <span className="font-medium">{dailyGoalMl}ml (8 glasses)</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">
            {progress.toFixed(0)}% of daily goal
          </p>
        </div>

        <Button onClick={onAddWater} className="w-full fitness-gradient" size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Glass (250ml)
        </Button>

        <div className="flex justify-center gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-8 rounded-sm border-2 transition-colors ${
                i < glasses
                  ? 'bg-fitness-blue border-fitness-blue'
                  : 'border-muted bg-muted/20'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
