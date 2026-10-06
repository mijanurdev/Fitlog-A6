"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Workout } from "@/types";
import { getWorkoutById } from "@/utils/api";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    plan,
    saved,
    addToPlan,
    addToSaved,
  } = usePlan();

  const [workout, setWorkout] =
    useState<Workout | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function loadWorkout() {
      try {
        setLoading(true);
        setError(false);

        const data =
          await getWorkoutById(id);

        setWorkout(data);
      } catch (error) {
        console.error(
          "Workout details loading error:",
          error
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadWorkout();
    }
  }, [id]);

  /* =:= LOADING =:= */

  if (loading) {
    return (
      <div
        className="
          site-container
          flex
          min-h-130
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

        <p className="text-[13px] text-[#A3A5AC]">
          Loading workout...
        </p>
      </div>
    );
  }

  /* =:= ERROR =:= */

  if (error || !workout) {
    return (
      <div
        className="
          site-container
          flex
          min-h-130
          items-center
          justify-center
        "
      >
        <p className="text-[14px] text-[#A7A9B0]">
          Workout not found.
        </p>
      </div>
    );
  }

  /* =:= BUTTON CONDITIONS =:= */

  const alreadyInPlan =
    plan.some(
      (item) =>
        String(item.id) ===
        String(workout.id)
    );

  const alreadySaved =
    saved.some(
      (item) =>
        String(item.id) ===
        String(workout.id)
    );

  const planFull =
    plan.length >= 5;

  const addButtonDisabled =
    alreadyInPlan || planFull;

  const saveButtonDisabled =
    alreadySaved;

  return (
    <section
      className="
        site-container
        pb-17.5
        pt-8.5

        sm:pt-10

        lg:pb-21.25
        lg:pt-11.5
      "
    >

      {/* =:= 50 / 50 LAYOUT =:= */}
      <div
        className="
          grid
          grid-cols-1
          gap-8.5

          lg:grid-cols-2
          lg:gap-11

          xl:gap-13
        "
      >

        {/* =:= LEFT IMAGE =:= */}

        <div
          className="
            relative
            min-h-120
            w-full
            overflow-hidden
            rounded-[13px]
            bg-[#17181D]

            sm:min-h-140

            lg:h-full
            lg:min-h-162.5
          "
        >
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>


        {/* =:= RIGHT DETAILS =:= */}

        <div
          className="
            flex
            flex-col
            justify-center
          "
        >

          <h1
            className="
              font-display
              text-[34px]
              font-bold
              uppercase
              leading-[1.05]
              text-white

              sm:text-[39px]

              lg:text-[42px]
            "
          >
            {workout.name}
          </h1>


          <p
            className="
              mt-3
              max-w-180
              text-[13px]
              leading-[1.7]
              text-[#A3A5AC]

              sm:text-[14px]
            "
          >
            {workout.description}
          </p>


          <div
            className="
              mt-4.5
              flex
              flex-wrap
              gap-2
            "
          >
            {workout.muscleGroups.map(
              (muscle) => (
                <span
                  key={muscle}
                  className="
                    rounded-[7px]
                    bg-[#C7FF00]
                    px-3.5
                    py-1.5
                    text-[11px]
                    font-bold
                    uppercase
                    leading-none
                    text-black
                  "
                >
                  {muscle}
                </span>
              )
            )}
          </div>


          {/* =:= DETAILS PANEL =:= */}

          <div
            className="
              mt-5.75
              overflow-hidden
              rounded-[10px]
              border
              border-[#292C33]
              bg-[#1B1D23]
            "
          >

            <div className="flex items-center justify-between border-b border-[#2A2D34] px-4.5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                EQUIPMENT
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.equipment}
              </span>
            </div>


            <div className="flex items-center justify-between border-b border-[#2A2D34] px-4.5-py-3
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                DIFFICULTY
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.difficulty}
              </span>
            </div>


            <div className="flex items-center justify-between border-b border-[#2A2D34] px-4.5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                SETS
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.sets}
              </span>
            </div>


            <div className="flex items-center justify-between border-b border-[#2A2D34] px-4.5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                REPS
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.reps}
              </span>
            </div>


            <div className="flex items-center justify-between border-b border-[#2A2D34] px-4.5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                DURATION
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.duration} min
              </span>
            </div>


            <div className="flex items-center justify-between border-b border-[#2A2D34] px-4.5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                CALORIES
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.caloriesBurned} kcal
              </span>
            </div>


            <div className="flex items-center justify-between px-4.5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                RATING
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.rating}
              </span>
            </div>

          </div>


          {/* =:= INSTRUCTIONS =:= */}

          <div className="mt-6.5">
            <h2
              className="
                font-display
                text-[18px]
                font-bold
                uppercase
                text-white
              "
            >
              INSTRUCTIONS
            </h2>

            <ol
              className="
                mt-3.5
                space-y-2.5
                text-[13px]
                leading-[1.65]
                text-[#A5A7AE]
              "
            >
              {workout.instructions.map(
                (instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-2.5"
                  >
                    <span
                      className="
                        shrink-0
                        font-semibold
                        text-white
                      "
                    >
                      {index + 1}.
                    </span>

                    <span>
                      {instruction}
                    </span>
                  </li>
                )
              )}
            </ol>
          </div>


          {/* =:= ACTION BUTTONS =:= */}

          <div
            className="
              mt-7

              flex
              flex-col
              items-center
              justify-center
              gap-3

              sm:flex-row
              sm:flex-wrap
              sm:justify-center

              lg:justify-start
            "
          >

            {/* =:= ADD TO PLAN =:= */}
            <button
              type="button"

              disabled={addButtonDisabled}

              onClick={() => {
                if (addButtonDisabled) {
                  return;
                }

                addToPlan(workout);
              }}

              style={{
                cursor: addButtonDisabled
                  ? "not-allowed"
                  : "pointer",
              }}

              className={`
                inline-flex
                h-10.75

                w-[82%]
                max-w-65

                items-center
                justify-center
                gap-1.75

                rounded-md

                px-6.5

                text-[12px]
                font-bold

                transition-all
                duration-200

                sm:w-58.75

                ${
                  addButtonDisabled
                    ? `
                      cursor-not-allowed!
                      bg-[#34363D]
                      text-[#92949A]
                      opacity-70
                    `
                    : `
                      bg-[#C7FF00]
                      text-black
                      hover:bg-[#D5FF3F]
                    `
                }
              `}
            >
              <Plus
                size={15}
                strokeWidth={2.2}
              />

              {alreadyInPlan
                ? "Already in Plan"
                : planFull
                ? "Plan Full"
                : "Add to today's plan"}
            </button>


            {/* =:= SAVE FOR LATER =:= */}
            <button
              type="button"

              disabled={saveButtonDisabled}

              onClick={() => {
                if (saveButtonDisabled) {
                  return;
                }

                addToSaved(workout);
              }}

              style={{
                cursor: saveButtonDisabled
                  ? "not-allowed"
                  : "pointer",
              }}

              className={`
                inline-flex
                h-10.75

                w-[82%]
                max-w-65

                items-center
                justify-center
                gap-1.75

                rounded-md

                border

                px-6.5

                text-[12px]
                font-semibold

                transition-all
                duration-200

                sm:w-51.25

                ${
                  saveButtonDisabled
                    ? `
                      cursor-not-allowed!
                      border-[#34363D]
                      bg-[#34363D]
                      text-[#92949A]
                      opacity-70
                    `
                    : `
                      border-[#34363D]
                      bg-[#17181D]
                      text-[#E5E6E8]
                      hover:border-[#555860]
                    `
                }
              `}
            >
              <Bookmark
                size={14}
                strokeWidth={2}
              />

              {alreadySaved
                ? "Saved"
                : "Save for later"}
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}