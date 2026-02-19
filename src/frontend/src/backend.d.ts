import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HealthData {
    bmi?: number;
    waterIntakeMl: bigint;
    bmiCategory?: string;
    steps: bigint;
    timestamp: Time;
    caloriesBurned: bigint;
}
export type Time = bigint;
export interface backendInterface {
    addWaterIntake(amountMl: bigint): Promise<void>;
    calculateAndStoreBMI(heightCm: number, weightKg: number): Promise<[number, string]>;
    getUserData(): Promise<Array<HealthData>>;
    getWeeklyData(): Promise<Array<HealthData>>;
    recordDailyData(steps: bigint, waterIntakeMl: bigint, caloriesBurned: bigint): Promise<void>;
    resetDailyData(): Promise<void>;
}
