import Image from "next/image";
import Link from "next/link";

import {
  Clock3,
  Flame,
  Star,
} from "lucide-react";

import { Workout } from "@/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="
        group
        block

        overflow-hidden

        rounded-[10px]

        border
        border-[#202228]

        bg-[#15161B]

        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:border-[#34373E]
      "
    >

      {/* =:= IMAGE =:= */}

      <div
        className="
          relative
          aspect-video
          w-full
          overflow-hidden
          bg-[#1A1B20]
        "
      >
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
          className="
            object-cover

            transition-transform
            duration-300

            group-hover:scale-[1.025]
          "
        />
      </div>


      {/* =:= CONTENT =:= */}

      <div className="p-4.5">

        {/* =:= TAGS =:= */}

        <div
          className="
            mb-3.5

            flex
            flex-wrap
            gap-1.5
          "
        >
          {workout.muscleGroups.map(
            (muscle) => (
              <span
                key={muscle}
                className="
                  rounded-full

                  bg-[#C7FF00]

                  px-2.5
                  py-1

                  text-[10px]
                  font-bold
                  uppercase
                  leading-none

                  text-[#08090B]
                "
              >
                {muscle}
              </span>
            )
          )}
        </div>


        {/* =:= NAME =:= */}

        <h3
          className="
            font-display

            text-[21px]
            font-bold
            uppercase

            leading-[1.15]

            text-white

            sm:text-[22px]
          "
        >
          {workout.name}
        </h3>


        {/* =:= EQUIPMENT =:= */}

        <p
          className="
            mt-2

            text-[13px]
            font-normal

            text-[#A0A2A9]
          "
        >
          {workout.equipment}
        </p>


        {/* =:= DIVIDER =:= */}

        <div
          className="
            my-3.75

            h-px
            w-full

            bg-[#25272D]
          "
        />


        {/* =:= STATS =:= */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-x-4.75
            gap-y-2

            text-[12px]
            text-[#A6A8AF]
          "
        >

          <div className="flex items-center gap-1.5">
            <Clock3
              size={14}
              strokeWidth={1.8}
              className="text-[#C7FF00]"
            />

            <span>
              {workout.duration} min
            </span>
          </div>


          <div className="flex items-center gap-1.5">
            <Flame
              size={14}
              strokeWidth={1.8}
              className="text-[#C7FF00]"
            />

            <span>
              {workout.caloriesBurned} kcal
            </span>
          </div>


          <div className="flex items-center gap-1.5">
            <Star
              size={14}
              strokeWidth={1.8}
              className="text-[#C7FF00]"
            />

            <span>
              {workout.rating}
            </span>
          </div>

        </div>

      </div>

    </Link>
  );
}