import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";

actor {
  type HealthData = {
    steps : Nat;
    waterIntakeMl : Nat;
    caloriesBurned : Nat;
    bmi : ?Float;
    bmiCategory : ?Text;
    timestamp : Time.Time;
  };

  module HealthData {
    public func compareByTimestamp(hd1 : HealthData, hd2 : HealthData) : Order.Order {
      Int.compare(hd1.timestamp, hd2.timestamp);
    };
  };

  let userHealthData = Map.empty<Principal, List.List<HealthData>>();

  public shared ({ caller }) func recordDailyData(steps : Nat, waterIntakeMl : Nat, caloriesBurned : Nat) : async () {
    let newData : HealthData = {
      steps;
      waterIntakeMl;
      caloriesBurned;
      bmi = null;
      bmiCategory = null;
      timestamp = Time.now();
    };

    let existingData = switch (userHealthData.get(caller)) {
      case (null) { List.empty<HealthData>() };
      case (?data) { data };
    };

    existingData.add(newData);
    userHealthData.add(caller, existingData);
  };

  public shared ({ caller }) func calculateAndStoreBMI(heightCm : Float, weightKg : Float) : async (Float, Text) {
    let heightM = heightCm / 100.0;
    let bmi = weightKg / (heightM * heightM);
    let bmiCategory = if (bmi < 18.5) {
      "Underweight";
    } else if (bmi < 25.0) {
      "Normal";
    } else if (bmi < 30.0) {
      "Overweight";
    } else {
      "Obese";
    };

    let newData : HealthData = {
      steps = 0;
      waterIntakeMl = 0;
      caloriesBurned = 0;
      bmi = ?bmi;
      bmiCategory = ?bmiCategory;
      timestamp = Time.now();
    };

    let existingData = switch (userHealthData.get(caller)) {
      case (null) { List.empty<HealthData>() };
      case (?data) { data };
    };

    existingData.add(newData);
    userHealthData.add(caller, existingData);

    (bmi, bmiCategory);
  };

  public shared ({ caller }) func resetDailyData() : async () {
    let todayTimestamp = Time.now();
    let filteredData = switch (userHealthData.get(caller)) {
      case (null) { List.empty<HealthData>() };
      case (?data) {
        let filtered = List.empty<HealthData>();
        for (entry in data.values()) {
          if (todayTimestamp > (entry.timestamp + 86400000000000)) {
            filtered.add(entry);
          };
        };
        filtered;
      };
    };
    userHealthData.add(caller, filteredData);
  };

  public query ({ caller }) func getWeeklyData() : async [HealthData] {
    let now = Time.now();
    let weekAgo = now - 604800000000000;

    let allData = switch (userHealthData.get(caller)) {
      case (null) { List.empty<HealthData>() };
      case (?data) { data };
    };

    let filtered = List.empty<HealthData>();
    for (entry in allData.values()) {
      if (entry.timestamp >= weekAgo) {
        filtered.add(entry);
      };
    };

    filtered.toArray().sort(HealthData.compareByTimestamp);
  };

  public shared ({ caller }) func addWaterIntake(amountMl : Nat) : async () {
    let newData : HealthData = {
      steps = 0;
      waterIntakeMl = amountMl;
      caloriesBurned = 0;
      bmi = null;
      bmiCategory = null;
      timestamp = Time.now();
    };

    let existingData = switch (userHealthData.get(caller)) {
      case (null) { List.empty<HealthData>() };
      case (?data) { data };
    };

    existingData.add(newData);
    userHealthData.add(caller, existingData);
  };

  public query ({ caller }) func getUserData() : async [HealthData] {
    switch (userHealthData.get(caller)) {
      case (null) {
        Runtime.trap("No data found for user");
      };
      case (?data) {
        data.toArray().sort(HealthData.compareByTimestamp);
      };
    };
  };
};
