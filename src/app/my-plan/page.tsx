"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Suspense,
  useState,
} from "react";

import {
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Star,
  X,
} from "lucide-react";

import { usePlan } from "@/context/PlanContext";
import {
  PlanWorkout,
  Workout,
} from "@/types";


type SortType =
  | "duration"
  | "calories"
  | "rating";


function MyPlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    plan,
    saved,
    isHydrated,

    addToPlan,

    removeFromPlan,
    removeFromSaved,

    markAsDone,

    metrics,
  } = usePlan();


  /* =:= ACTIVE TAB =:= */

  const activeTab =
    searchParams.get("tab") === "saved"
      ? "saved"
      : "today";


  const changeTab = (
    tab: "today" | "saved"
  ) => {
    router.replace(
      `/my-plan?tab=${tab}`,
      {
        scroll: false,
      }
    );
  };


  /* =:= SORT =:= */

  const [sortBy, setSortBy] =
    useState<SortType>("duration");


  const currentList:
    | PlanWorkout[]
    | Workout[] =
    activeTab === "today"
      ? plan
      : saved;


  const sortedList = [
    ...currentList,
  ].sort((a, b) => {
    if (sortBy === "duration") {
      return (
        a.duration - b.duration
      );
    }

    if (sortBy === "calories") {
      return (
        b.caloriesBurned -
        a.caloriesBurned
      );
    }

    if (sortBy === "rating") {
      return (
        b.rating - a.rating
      );
    }

    return 0;
  });


  /* =:= CHECK PLAN =:= */

  const isInPlan = (
    id: number
  ) => {
    return plan.some(
      (item) =>
        String(item.id) ===
        String(id)
    );
  };


  return (
    <section
      className="
        site-container

        pb-20
        pt-11.5

        sm:pt-13

        lg:pt-14.5
      "
    >

      {/* =:= TITLE =:= */}

      <div>
        <h1
          className="
            font-display

            text-[36px]
            font-bold
            uppercase
            leading-none

            text-white

            sm:text-[40px]
          "
        >
          MY PLAN
        </h1>


        <p
          className="
            mt-2.5

            text-[13px]
            text-[#9DA2AD]

            sm:text-[14px]
          "
        >
          Cap of five lifts for today.
          Finish them, then load more.
        </p>
      </div>


      {/* =:= METRICS =:= */}

      <div
        className="
          mt-8.5

          grid
          grid-cols-1

          gap-5

          sm:grid-cols-3

          lg:gap-6
        "
      >

        <div
          className="
            rounded-2xl

            border
            border-[#292C32]

            bg-[#17191E]

            px-6
            py-5.5
          "
        >
          <p
            className="
              text-[13px]
              text-[#A1A8B5]
            "
          >
            Exercises
          </p>

          <p
            className="
              font-display

              mt-2.25

              text-[34px]
              font-bold
              leading-none

              text-[#C7FF00]
            "
          >
            {metrics.exercises}
          </p>
        </div>


        <div
          className="
            rounded-2xl

            border
            border-[#292C32]

            bg-[#17191E]

            px-6
            py-5.5
          "
        >
          <p className="text-[13px] text-[#A1A8B5]">
            Minutes
          </p>

          <p
            className="
              font-display

              mt-2.25

              text-[34px]
              font-bold
              leading-none

              text-white
            "
          >
            {metrics.minutes}
          </p>
        </div>


        <div
          className="
            rounded-2xl

            border
            border-[#292C32]

            bg-[#17191E]

            px-6
            py-5.5
          "
        >
          <p className="text-[13px] text-[#A1A8B5]">
            Calories
          </p>

          <p
            className="
              font-display

              mt-2.25

              text-[34px]
              font-bold
              leading-none

              text-white
            "
          >
            {metrics.calories}
          </p>
        </div>

      </div>


      {/* =:= TABS + SORT =:= */}

      <div
        className="
          mt-9.5

          flex
          flex-col

          gap-3.75

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        {/* =:= TAB CONTAINER =:= */}
        <div
          className="
            flex
            w-fit

            items-center

            rounded-[10px]

            border
            border-[#292B31]

            bg-[#1A1B1F]

            p-1
          "
        >

          <button
            type="button"

            onClick={() =>
              changeTab("today")
            }

            className={`
              rounded-[7px]

              px-5.5
              py-2.25

              text-[12px]
              font-medium

              transition-colors
              duration-200

              ${
                activeTab === "today"
                  ? `
                    bg-[#18270D]
                    text-[#C7FF00]
                  `
                  : `
                    text-[#A8ADBA]
                  `
              }
            `}
          >
            Today&apos;s Plan
          </button>


          <button
            type="button"

            onClick={() =>
              changeTab("saved")
            }

            className={`
              rounded-[7px]

              px-5.5
              py-2.25

              text-[12px]
              font-medium

              transition-colors
              duration-200

              ${
                activeTab === "saved"
                  ? `
                    bg-[#2A2C31]
                    text-white
                  `
                  : `
                    text-[#A8ADBA]
                  `
              }
            `}
          >
            Saved
          </button>

        </div>


        {/* =:= SORT =:= */}
        <div
          className="
            flex
            items-center
            gap-2.5
          "
        >
          <span
            className="
              text-[12px]
              text-[#9EA4AF]
            "
          >
            Sort By
          </span>


          <div className="relative">

            <select
              value={sortBy}

              onChange={(event) =>
                setSortBy(
                  event.target
                    .value as SortType
                )
              }

              className="
                appearance-none

                rounded-lg

                border
                border-[#343740]

                bg-[#17191E]

                py-2.25
                pl-3.75
                pr-9

                text-[12px]
                font-semibold

                text-white

                outline-none
              "
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>


            <ChevronDown
              size={14}

              className="
                pointer-events-none

                absolute
                right-2.75
                top-1/2

                -translate-y-1/2

                text-white
              "
            />

          </div>
        </div>

      </div>


      {/* =:= LOADING =:= */}

      {!isHydrated && (
        <div
          className="
            flex
            min-h-70

            items-center
            justify-center
          "
        >
          <p className="text-[13px] text-[#9EA1A9]">
            Loading workouts...
          </p>
        </div>
      )}


      {/* =:= EMPTY =:= */}

      {isHydrated &&
        sortedList.length === 0 && (

          <div
            className="
              mt-8

              flex
              min-h-75

              flex-col

              items-center
              justify-center

              rounded-[14px]

              border
              border-[#24272D]

              bg-[#111216]

              text-center
            "
          >
            <h2
              className="
                font-display

                text-[24px]
                font-bold
                uppercase

                text-white
              "
            >
              NOTHING HERE YET
            </h2>


            <p
              className="
                mt-2.25

                text-[12px]
                text-[#969AA4]
              "
            >
              Browse the library and add a
              lift to get today moving.
            </p>


            <Link
              href="/"

              className="
                mt-4.25

                rounded-md

                bg-[#C7FF00]

                px-4.75
                py-2.25

                text-[11px]
                font-bold

                text-black!
              "
            >
              Go to workouts
            </Link>

          </div>
        )}


      {/* =:= WORKOUT ROWS =:= */}

      {isHydrated &&
        sortedList.length > 0 && (

          <div
            className="
              mt-8

              flex
              flex-col

              gap-4
            "
          >
            {sortedList.map(
              (item) => {

                const itemDone =
  activeTab === "today"
    ? (item as PlanWorkout).isDone
    : false;

                const alreadyInPlan =
                  isInPlan(item.id);


                const planFull =
                  plan.length >= 5;


                return (
                  <div
                    key={item.id}

                    className="
                      rounded-2xl

                      border
                      border-[#292C32]

                      bg-[#17191E]

                      px-4.5
                      py-4.5
                    "
                  >

                    <div
                      className="
                        flex
                        flex-col

                        gap-4.5

                        md:flex-row
                        md:items-center
                        md:justify-between
                      "
                    >

                      {/* =:= LEFT SIDE =:= */}

                      <div
                        className="
                          flex
                          min-w-0

                          items-center

                          gap-4.5
                        "
                      >

                        {/* =:= IMAGE =:= */}
                        <div
                          className="
                            relative

                            h-24
                            w-37.5

                            shrink-0

                            overflow-hidden

                            rounded-xl

                            bg-[#202228]
                          "
                        >
                          <Image
                            src={item.image}
                            alt={item.name}

                            fill

                            sizes="150px"

                            className="
                              object-cover
                            "
                          />
                        </div>


                        {/* =:= DETAILS =:= */}
                        <div className="min-w-0">

                          <h3
                            className="
                              font-display

                              text-[20px]
                              font-bold
                              uppercase
                              leading-[1.1]

                              text-white
                            "
                          >
                            {item.name}
                          </h3>


                          <p
                            className="
                              mt-1.5

                              text-[12px]

                              text-[#A0A5AF]
                            "
                          >
                            {item.equipment}
                          </p>


                          {/* =:= STATS =:= */}
                          <div
                            className="
                              mt-2.75

                              flex
                              flex-wrap

                              gap-x-4.25
                              gap-y-1.5

                              text-[11px]
                              text-[#E1E2E5]
                            "
                          >

                            <span
                              className="
                                flex
                                items-center
                                gap-1.25
                              "
                            >
                              <Clock3
                                size={13}
                                className="text-[#C7FF00]"
                              />

                              {item.duration} min
                            </span>


                            <span
                              className="
                                flex
                                items-center
                                gap-1.25
                              "
                            >
                              <Flame
                                size={13}
                                className="text-[#C7FF00]"
                              />

                              {
                                item.caloriesBurned
                              }{" "}
                              kcal
                            </span>


                            <span
                              className="
                                flex
                                items-center
                                gap-1.25
                              "
                            >
                              <Star
                                size={13}
                                className="text-[#C7FF00]"
                              />

                              {item.rating}
                            </span>

                          </div>

                        </div>

                      </div>


                      {/* =:= BUTTONS =:= */}

                      <div
                        className="
                          flex
                          flex-wrap

                          items-center

                          gap-3

                          md:shrink-0
                          md:justify-end
                        "
                      >

                        {/* =:= VIEW DETAILS =:= */}
                        <Link
                          href={`/workout/${item.id}`}

                          className="
                            inline-flex

                            h-11

                            items-center
                            justify-center

                            rounded-full

                            border
                            border-[#363940]

                            px-5.25

                            text-[12px]
                            font-semibold

                            text-white!

                            transition-colors
                            duration-200

                            hover:border-[#C7FF00]
                            hover:text-[#C7FF00]!
                          "
                        >
                          View Details
                        </Link>


                        {/* =:= TODAY'S PLAN BUTTON =:= */}

                        {activeTab === "today" && (

                          <button
                            type="button"

                            disabled={itemDone}

                            onClick={() => {
                              if (itemDone) {
                                return;
                              }

                              markAsDone(
                                item.id
                              );
                            }}

                            style={{
                              cursor: itemDone
                                ? "not-allowed"
                                : "pointer",
                            }}

                            className={`
                              inline-flex

                              h-11

                              items-center
                              justify-center

                              gap-1.75

                              rounded-full

                              px-5.25

                              text-[12px]
                              font-bold

                              transition-colors

                              ${
                                itemDone
                                  ? `
                                    bg-[#2B2E34]
                                    text-[#C7FF00]
                                  `
                                  : `
                                    bg-[#C7FF00]
                                    text-black
                                    hover:bg-[#D4FF32]
                                  `
                              }
                            `}
                          >
                            <Check
                              size={15}
                              strokeWidth={2}
                            />

                            {itemDone
                              ? "Done"
                              : "Mark as Done"}
                          </button>

                        )}


                        {/* =:= SAVED TAB ADD BUTTON =:= */}

                        {activeTab === "saved" && (

                          <button
                            type="button"

                            disabled={
                              alreadyInPlan ||
                              planFull
                            }

                            onClick={() => {
                              if (
                                alreadyInPlan ||
                                planFull
                              ) {
                                return;
                              }

                              addToPlan(item);
                            }}

                            style={{
                              cursor:
                                alreadyInPlan ||
                                planFull
                                  ? "not-allowed"
                                  : "pointer",
                            }}

                            className={`
                              inline-flex

                              h-11

                              min-w-29.5

                              items-center
                              justify-center

                              rounded-full

                              px-5.25

                              text-[12px]
                              font-bold

                              transition-colors

                              ${
                                alreadyInPlan ||
                                planFull
                                  ? `
                                    bg-[#2B2E34]
                                    text-[#727783]
                                  `
                                  : `
                                    bg-[#C7FF00]
                                    text-black
                                    hover:bg-[#D4FF32]
                                  `
                              }
                            `}
                          >
                            {alreadyInPlan
                              ? "Already in Plan"
                              : planFull
                              ? "Plan Full"
                              : "Add to Plan"}
                          </button>

                        )}


                        {/* =:= REMOVE =:= */}
                        <button
                          type="button"

                          onClick={() => {
                            if (
                              activeTab ===
                              "today"
                            ) {
                              removeFromPlan(
                                item.id
                              );
                            } else {
                              removeFromSaved(
                                item.id
                              );
                            }
                          }}

                          className="
                            flex

                            h-9.5
                            w-9.5

                            items-center
                            justify-center

                            rounded-full

                            text-[#757B87]

                            transition-colors
                            duration-200

                            hover:bg-[#292C33]
                            hover:text-white
                          "

                          aria-label="Remove workout"
                        >
                          <X
                            size={17}
                            strokeWidth={1.8}
                          />
                        </button>

                      </div>

                    </div>

                  </div>
                );
              }
            )}
          </div>
        )}

    </section>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="site-container flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-7.5 w-7.5 animate-spin rounded-full border-[3px] border-[#34363D] border-t-[#C7FF00]" />

            <p className="text-[13px] text-[#9EA1A9]">
              Loading workouts...
            </p>
          </div>
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}