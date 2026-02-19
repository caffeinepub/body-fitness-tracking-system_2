import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { useQueries } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const { calculateBMI } = useQueries();

  const handleCalculate = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!heightNum || !weightNum || heightNum <= 0 || weightNum <= 0) {
      toast.error('Please enter valid height and weight values');
      return;
    }

    calculateBMI.mutate(
      { heightCm: heightNum, weightKg: weightNum },
      {
        onSuccess: (data) => {
          setResult({ bmi: data[0], category: data[1] });
          toast.success('BMI calculated and saved!');
        },
        onError: () => {
          toast.error('Failed to calculate BMI');
        },
      }
    );
  };

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'text-blue-500';
      case 'Normal':
        return 'text-fitness-green';
      case 'Overweight':
        return 'text-fitness-orange';
      case 'Obese':
        return 'text-red-500';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">BMI Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your Body Mass Index and understand your health status
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="fitness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-fitness-purple/10">
                  <Calculator className="h-5 w-5 text-fitness-purple" />
                </div>
                Calculate Your BMI
              </CardTitle>
              <CardDescription>Enter your height and weight below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
              <Button
                onClick={handleCalculate}
                className="w-full fitness-gradient"
                size="lg"
                disabled={calculateBMI.isPending}
              >
                {calculateBMI.isPending ? 'Calculating...' : 'Calculate BMI'}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle>Your Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-6xl font-bold text-fitness-purple mb-2">
                      {result.bmi.toFixed(1)}
                    </div>
                    <div className={`text-2xl font-semibold ${getBMIColor(result.category)}`}>
                      {result.category}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Your BMI has been calculated and saved to your dashboard.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="fitness-card lg:col-span-2">
            <CardHeader>
              <CardTitle>BMI Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg border-2 border-blue-500/20 bg-blue-500/5">
                  <div className="font-semibold text-blue-500 mb-1">Underweight</div>
                  <div className="text-sm text-muted-foreground">BMI &lt; 18.5</div>
                </div>
                <div className="p-4 rounded-lg border-2 border-fitness-green/20 bg-fitness-green/5">
                  <div className="font-semibold text-fitness-green mb-1">Normal</div>
                  <div className="text-sm text-muted-foreground">BMI 18.5 - 24.9</div>
                </div>
                <div className="p-4 rounded-lg border-2 border-fitness-orange/20 bg-fitness-orange/5">
                  <div className="font-semibold text-fitness-orange mb-1">Overweight</div>
                  <div className="text-sm text-muted-foreground">BMI 25 - 29.9</div>
                </div>
                <div className="p-4 rounded-lg border-2 border-red-500/20 bg-red-500/5">
                  <div className="font-semibold text-red-500 mb-1">Obese</div>
                  <div className="text-sm text-muted-foreground">BMI ≥ 30</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
