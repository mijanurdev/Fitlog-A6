"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";
import { PlanWorkout, Workout } from "@/types";

interface PlanContextType {
  plan: PlanWorkout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;

  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  metrics: {
    exercises: number;
    minutes: number;
    calories: number;
  };
}

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(plan)
      );
    }
  }, [plan, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(saved)
      );
    }
  }, [saved, isHydrated]);

  const addToPlan = (workout: Workout) => {
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      toast.error("Already in today's plan!");
      return;
    }

    if (plan.length >= 5) {
      toast.error(
        "Today's plan is full! Max 5 workouts."
      );
      return;
    }

    setPlan((previousPlan) => [
      ...previousPlan,
      {
        ...workout,
        isDone: false,
      },
    ]);

    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      toast.error("Already saved!");
      return;
    }

    setSaved((previousSaved) => [
      ...previousSaved,
      workout,
    ]);

    toast.success("Saved for later!");
  };

  const removeFromPlan = (id: number) => {
    setPlan((previousPlan) =>
      previousPlan.filter(
        (item) => item.id !== id
      )
    );

    toast.success("Removed from plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((previousSaved) =>
      previousSaved.filter(
        (item) => item.id !== id
      )
    );

    toast.success("Removed from saved");
  };

  const markAsDone = (id: number) => {
    setPlan((previousPlan) =>
      previousPlan.map((item) =>
        item.id === id
          ? {
              ...item,
              isDone: true,
            }
          : item
      )
    );

    toast.success("Workout completed!");
  };

  const metrics = {
    exercises: plan.length,

    minutes: plan.reduce(
      (total, item) =>
        total + item.duration,
      0
    ),

    calories: plan.reduce(
      (total, item) =>
        total + item.caloriesBurned,
      0
    ),
  };

  const value: PlanContextType = {
    plan,
    saved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    metrics,
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}