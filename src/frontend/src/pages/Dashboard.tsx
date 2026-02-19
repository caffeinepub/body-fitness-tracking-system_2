import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Flame, Activity, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import StepCounter from '../components/StepCounter';
import WaterIntakeTracker from '../components/WaterIntakeTracker';
import WeeklyChart from '../components/WeeklyChart';
import { useQueries } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { userData, weeklyData, addWaterIntake, recordDailyData, resetDailyData } = useQueries();

  const todayData = userData.data?.[userData.data.length - 1];
  const currentSteps = todayData ? Number(todayData.steps) : 0;
  const currentWater = todayData ? Number(todayData.waterIntakeMl) : 0;
  const currentCalories = todayData ? Number(todayData.caloriesBurned) : 0;
  const currentBMI = todayData?.bmi;
  const currentBMICategory = todayData?.bmiCategory;

  const handleAddWater = () => {
    addWaterIntake.mutate(250n, {
      onSuccess: () => {
        toast.success('Water intake updated!');
      },
      onError: () => {
        toast.error('Failed to update water intake');
      },
    });
  };

  const handleStepsUpdate = (steps: number) => {
    recordDailyData.mutate(
      { steps: BigInt(steps), waterIntakeMl: BigInt(currentWater), caloriesBurned: BigInt(currentCalories) },
      {
        onSuccess: () => {
          toast.success('Steps updated successfully!');
        },
        onError: () => {
          toast.error('Failed to update steps');
        },
      }
    );
  };

  const handleReset = () => {
    resetDailyData.mutate(undefined, {
      onSuccess: () => {
        toast.success('Daily data reset successfully!');
      },
      onError: () => {
        toast.error('Failed to reset data');
      },
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-muted-foreground">Track your daily fitness progress</p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" onClick={handleReset} disabled={resetDailyData.isPending}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <StepCounter initialSteps={currentSteps} onStepsUpdate={handleStepsUpdate} />
        <WaterIntakeTracker currentIntake={currentWater} onAddWater={handleAddWater} />
        
        <Card className="fitness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-fitness-orange/10">
                <Flame className="h-5 w-5 text-fitness-orange" />
              </div>
              Calories Burned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-fitness-orange mb-2">
                {currentCalories.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">kcal today</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyChart data={weeklyData.data || []} />
        </div>

        <Card className="fitness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-fitness-purple/10">
                <Activity className="h-5 w-5 text-fitness-purple" />
              </div>
              BMI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentBMI ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-fitness-purple mb-2">
                    {currentBMI.toFixed(1)}
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-fitness-purple/10 text-fitness-purple text-sm font-medium">
                    {currentBMICategory}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground text-center">
                  Last calculated: {format(new Date(), 'PPP')}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No BMI data available</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/bmi-calculator'}
                >
                  Calculate BMI
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
