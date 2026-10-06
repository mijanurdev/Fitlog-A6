"use client";

import {
  useEffect,
  useState,
} from "react";

import { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";

import WorkoutCard from "@/components/WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] =
    useState<Workout[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data =
          await getAllWorkouts();

        setWorkouts(data);
      } catch (error) {
        console.error(
          "Workout loading error:",
          error
        );

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
      className="
        site-container
        scroll-mt-27.5

        pb-18.75
        pt-14

        sm:pt-15

        lg:pb-21.25
        lg:pt-16.5
      "
    >

      {/* =:= SECTION HEADING =:= */}

      <div className="mb-7

        <h2
          className="
            font-display

            text-[31px]
            font-bold
            uppercase
            leading-none

            text-white

            sm:text-[33px]

            lg:text-[35px]
          "
        >
          THE LIBRARY
        </h2>


        <p
          className="
            mt-2.5

            text-[13px]
            font-normal
            leading-[1.6]

            text-[#A2A4AB]

            sm:text-[14px]
          "
        >
          Twelve lifts covering every major muscle group.
        </p>

      </div>


      {/* =:= LOADING =:= */}

      {loading && (
        <div
          className="
            flex
            min-h-70
            flex-col
            items-center
            justify-center
            gap-3
          "
        >
          <div
            className="
              h-8
              w-8

              animate-spin

              rounded-full

              border-[3px]
              border-[#303238]
              border-t-[#C7FF00]
            "
          />

          <p className="text-[13px] text-[#A2A4AB]">
            Loading workouts...
          </p>
        </div>
      )}


      {/* =:= ERROR =:= */}

      {!loading && error && (
        <div
          className="
            flex
            min-h-57.5
            items-center
            justify-center

            rounded-[10px]

            border
            border-[#202228]

            bg-[#15161B]

            text-[14px]
            text-[#A7A9B0]
          "
        >
          Unable to load workouts.
        </div>
      )}


      {/* =:= WORKOUT GRID =:= */}

      {!loading && !error && (
        <div
          className="
            grid
            grid-cols-1
            gap-4.5

            sm:grid-cols-2
            sm:gap-5

            lg:grid-cols-3
            lg:gap-5.5
          "
        >
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}

    </section>
  );
}