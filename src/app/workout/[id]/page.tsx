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

  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWorkout() {
      try {
        setLoading(true);
        setError(false);

        const data = await getWorkoutById(id);

        setWorkout(data);
      } catch (error) {
        console.error("Workout details loading error:", error);

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadWorkout();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="site-container flex min-h-[520px] flex-col items-center justify-center gap-[12px]">
        <div className="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-[#303238] border-t-[#C7FF00]" />

        <p className="text-[13px] text-[#A3A5AC]">Loading workout...</p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="site-container flex min-h-[520px] items-center justify-center">
        <p className="text-[14px] text-[#A7A9B0]">Workout not found.</p>
      </div>
    );
  }

  const alreadyInPlan = plan.some(
    (item) => String(item.id) === String(workout.id),
  );

  const alreadySaved = saved.some(
    (item) => String(item.id) === String(workout.id),
  );

  const planFull = plan.length >= 5;

  const addButtonDisabled = alreadyInPlan || planFull;

  const saveButtonDisabled = alreadySaved;

  return (
    <section className="site-container pb-[70px] pt-[34px] sm:pt-[40px] lg:pb-[85px] lg:pt-[46px]">
      <div className="grid grid-cols-1 gap-[34px] lg:grid-cols-2 lg:gap-[44px] xl:gap-[52px]">
        {/* =:= LEFT IMAGE =:= */}
        <div className="relative min-h-[480px] w-full overflow-hidden rounded-[13px] bg-[#17181D] sm:min-h-[560px] lg:h-full lg:min-h-[650px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* =:= RIGHT SIDE =:= */}
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-[34px] font-bold uppercase leading-[1.05] text-white sm:text-[39px] lg:text-[42px]">
            {workout.name}
          </h1>

          <p className="mt-[12px] max-w-[720px] text-[13px] leading-[1.7] text-[#A3A5AC] sm:text-[14px]">
            {workout.description}
          </p>

          {/* =:= MUSCLE GROUPS =:= */}
          <div className="mt-[18px] flex flex-wrap gap-[8px]">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-[7px] bg-[#C7FF00] px-[14px] py-[6px] text-[11px] font-bold uppercase leading-none text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* =:= SPECS =:= */}
          <div className="mt-[23px] overflow-hidden rounded-[10px] border border-[#292C33] bg-[#1B1D23]">
            <div className="flex items-center justify-between border-b border-[#2A2D34] px-[18px] py-[12px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                EQUIPMENT
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.equipment}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2D34] px-[18px] py-[12px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                DIFFICULTY
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2D34] px-[18px] py-[12px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                SETS
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.sets}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2D34] px-[18px] py-[12px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                REPS
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.reps}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2D34] px-[18px] py-[12px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                DURATION
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.duration} min
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2D34] px-[18px] py-[12px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                CALORIES
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex items-center justify-between px-[18px] py-[12px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#92959D]">
                RATING
              </span>

              <span className="text-[13px] font-medium text-[#F0F1F2]">
                {workout.rating}
              </span>
            </div>
          </div>

          {/* =:= INSTRUCTIONS =:= */}
          <div className="mt-[26px]">
            <h2 className="font-display text-[18px] font-bold uppercase text-white">
              INSTRUCTIONS
            </h2>

            <ol className="mt-[14px] space-y-[10px] text-[13px] leading-[1.65] text-[#A5A7AE]">
              {workout.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-[10px]">
                  <span className="shrink-0 font-semibold text-white">
                    {index + 1}.
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* =:= BUTTONS =:= */}
          <div className="mt-[28px] flex flex-col items-center justify-center gap-[12px] sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
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
                cursor: addButtonDisabled ? "not-allowed" : "pointer",
              }}
              className={
                addButtonDisabled
                  ? "inline-flex h-[43px] w-[82%] max-w-[260px] items-center justify-center gap-[7px] rounded-[6px] bg-[#34363D] px-[26px] text-[12px] font-bold text-[#92949A] opacity-70 sm:w-[235px]"
                  : "inline-flex h-[43px] w-[82%] max-w-[260px] items-center justify-center gap-[7px] rounded-[6px] bg-[#C7FF00] px-[26px] text-[12px] font-bold text-black transition-colors hover:bg-[#D5FF3F] sm:w-[235px]"
              }
            >
              <Plus size={15} strokeWidth={2.2} />

              {alreadyInPlan
                ? "Already in Plan"
                : planFull
                  ? "Plan Full"
                  : "Add to today's plan"}
            </button>

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
                cursor: saveButtonDisabled ? "not-allowed" : "pointer",
              }}
              className={
                saveButtonDisabled
                  ? "inline-flex h-[43px] w-[82%] max-w-[260px] items-center justify-center gap-[7px] rounded-[6px] border border-[#34363D] bg-[#34363D] px-[26px] text-[12px] font-semibold text-[#92949A] opacity-70 sm:w-[205px]"
                  : "inline-flex h-[43px] w-[82%] max-w-[260px] items-center justify-center gap-[7px] rounded-[6px] border border-[#34363D] bg-[#17181D] px-[26px] text-[12px] font-semibold text-[#E5E6E8] transition-colors hover:border-[#555860] sm:w-[205px]"
              }
            >
              <Bookmark size={14} strokeWidth={2} />

              {alreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
