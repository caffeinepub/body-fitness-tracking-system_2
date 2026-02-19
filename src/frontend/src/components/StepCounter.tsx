import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Footprints } from 'lucide-react';

interface StepCounterProps {
  initialSteps?: number;
  onStepsUpdate: (steps: number) => void;
}

export default function StepCounter({ initialSteps = 0, onStepsUpdate }: StepCounterProps) {
  const [steps, setSteps] = useState(initialSteps);
  const dailyGoal = 10000;
  const progress = Math.min((steps / dailyGoal) * 100, 100);

  const handleStepsChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setSteps(numValue);
  };

  const handleUpdate = () => {
    onStepsUpdate(steps);
  };

  return (
    <Card className="fitness-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-fitness-green/10">
            <Footprints className="h-5 w-5 text-fitness-green" />
          </div>
          Step Counter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-32 h-32">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                className="text-fitness-green transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{steps.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">steps</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Daily Goal</span>
            <span className="font-medium">{dailyGoal.toLocaleString()} steps</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">
            {progress.toFixed(0)}% of daily goal
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter steps"
            value={steps || ''}
            onChange={(e) => handleStepsChange(e.target.value)}
            min="0"
          />
          <Button onClick={handleUpdate} className="fitness-gradient">
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
