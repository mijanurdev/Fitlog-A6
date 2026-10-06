"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  PlanWorkout,
  Workout,
} from "@/types";

interface PlanContextType {
  plan: PlanWorkout[];
  saved: Workout[];
  isHydrated: boolean;

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

const PlanContext =
  createContext<PlanContextType | null>(null);

export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  /* =:= STATE =:= */

  const [plan, setPlan] =
    useState<PlanWorkout[]>([]);

  const [saved, setSaved] =
    useState<Workout[]>([]);

  const [isHydrated, setIsHydrated] =
    useState(false);


  /* =:= CLIENT READY =:= */

  useEffect(() => {
    setIsHydrated(true);
  }, []);


  /* =:= ADD TO PLAN =:= */

  const addToPlan = (
    workout: Workout
  ) => {
    const exists =
      plan.some(
        (item) =>
          String(item.id) ===
          String(workout.id)
      );

    if (exists) {
      return;
    }

    if (plan.length >= 5) {
      toast.error(
        "Today's plan is full"
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

    toast.success(
      "Added to today's plan"
    );
  };


  /* =:= ADD TO SAVED =:= */

  const addToSaved = (
    workout: Workout
  ) => {
    const exists =
      saved.some(
        (item) =>
          String(item.id) ===
          String(workout.id)
      );

    if (exists) {
      return;
    }

    setSaved((previousSaved) => [
      ...previousSaved,
      workout,
    ]);

    toast.success(
      "Saved for later"
    );
  };


  /* =:= REMOVE FROM PLAN =:= */

  const removeFromPlan = (
    id: number
  ) => {
    setPlan((previousPlan) =>
      previousPlan.filter(
        (item) =>
          String(item.id) !==
          String(id)
      )
    );

    toast.success(
      "Removed from plan"
    );
  };


  /* =:= REMOVE FROM SAVED =:= */

  const removeFromSaved = (
    id: number
  ) => {
    setSaved((previousSaved) =>
      previousSaved.filter(
        (item) =>
          String(item.id) !==
          String(id)
      )
    );

    toast.success(
      "Removed from saved"
    );
  };


  /* =:= MARK AS DONE =:= */

  const markAsDone = (
    id: number
  ) => {
    setPlan((previousPlan) =>
      previousPlan.map((item) =>
        String(item.id) ===
        String(id)
          ? {
              ...item,
              isDone: true,
            }
          : item
      )
    );

    toast.success(
      "Workout completed"
    );
  };


  /* =:= METRICS =:= */

  const metrics = {
    exercises: plan.length,

    minutes: plan.reduce(
      (total, item) =>
        total + item.duration,
      0
    ),

    calories: plan.reduce(
      (total, item) =>
        total +
        item.caloriesBurned,
      0
    ),
  };


  /* =:= CONTEXT VALUE =:= */

  const value: PlanContextType = {
    plan,
    saved,
    isHydrated,

    addToPlan,
    addToSaved,

    removeFromPlan,
    removeFromSaved,

    markAsDone,

    metrics,
  };


  return (
    <PlanContext.Provider
      value={value}
    >
      {children}
    </PlanContext.Provider>
  );
}


export function usePlan() {
  const context =
    useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}