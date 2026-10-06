"use client";

import { useEffect, useState } from "react";

import WorkoutCard from "@/components/WorkoutCard";
import { getAllWorkouts } from "@/utils/api";
import { Workout } from "@/types";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        setError(false);

        const data = await getAllWorkouts();

        setWorkouts(data);
      } catch (error) {
        console.error("Workout loading error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="site-container scroll-mt-[110px] pb-[75px] pt-[56px] sm:pt-[60px] lg:pb-[85px] lg:pt-[66px]"
    >
      <div className="mb-[28px]">
        <h2 className="font-display text-[31px] font-bold uppercase leading-none text-white sm:text-[33px] lg:text-[35px]">
          THE LIBRARY
        </h2>

        <p className="mt-[9px] text-[13px] leading-[1.6] text-[#979AA2] sm:text-[14px]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading && (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-[12px]">
          <div className="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-[#303238] border-t-[#C7FF00]" />

          <p className="text-[13px] text-[#9EA1A9]">Loading workouts...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex min-h-[250px] items-center justify-center">
          <p className="text-[13px] text-[#A5A7AE]">Failed to load workouts.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:gap-[20px] lg:grid-cols-3 lg:gap-[22px]">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
