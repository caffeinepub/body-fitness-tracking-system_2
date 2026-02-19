import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { HealthData } from '../backend';

export function useQueries() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const userData = useQuery<HealthData[]>({
    queryKey: ['userData'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getUserData();
      } catch (error) {
        // Return empty array if no data found
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });

  const weeklyData = useQuery<HealthData[]>({
    queryKey: ['weeklyData'],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getWeeklyData();
    },
    enabled: !!actor && !isFetching,
  });

  const addWaterIntake = useMutation({
    mutationFn: async (amountMl: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.addWaterIntake(amountMl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyData'] });
    },
  });

  const recordDailyData = useMutation({
    mutationFn: async (data: { steps: bigint; waterIntakeMl: bigint; caloriesBurned: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.recordDailyData(data.steps, data.waterIntakeMl, data.caloriesBurned);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyData'] });
    },
  });

  const calculateBMI = useMutation({
    mutationFn: async (data: { heightCm: number; weightKg: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.calculateAndStoreBMI(data.heightCm, data.weightKg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });

  const resetDailyData = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.resetDailyData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyData'] });
    },
  });

  return {
    userData,
    weeklyData,
    addWaterIntake,
    recordDailyData,
    calculateBMI,
    resetDailyData,
  };
}
