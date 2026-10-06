"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { usePlan } from "@/context/PlanContext";

type ActiveNav = "workouts" | null;

export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = usePlan();

  const [activeNav, setActiveNav] =
    useState<ActiveNav>(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  // =:= NAVIGATION STATE =:=
  const workoutSelected =
    pathname.startsWith("/workout") ||
    (pathname === "/" &&
      activeNav === "workouts");

  const planSelected =
    pathname.startsWith("/my-plan");

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-[#17181C]
        bg-black
      "
    >
      <div className="site-container relative">

        {/* =:= MAIN NAVBAR =:= */}
        <div
          className="
            flex
            h-19
            items-center
            justify-between

            lg:h-22
          "
        >

          {/* =:= LOGO =:= */}
          <Link
            href="/"
            onClick={() => {
              setActiveNav(null);
              setMenuOpen(false);
            }}
            className="
              flex
              items-center
              gap-2.25
            "
          >
            <Image
              src="/assets/logo.png"
              alt="FitLog logo"
              width={34}
              height={34}
              priority
              className="
                h-7.5
                w-7.5
                object-contain

                lg:h-8.5
                lg:w-8.5
              "
            />

            <span
              className="
                font-display
                text-[17px]
                font-bold
                uppercase
                leading-none
                tracking-[0.3px]
                text-white

                lg:text-[18px]
              "
            >
              FITLOG
            </span>
          </Link>


          {/* =:= DESKTOP MENU =:= */}
          <nav
            className="
              absolute
              left-1/2
              hidden
              -translate-x-1/2
              items-center
              gap-2

              lg:flex
            "
          >

            <Link
              href="/"
              onClick={() =>
                setActiveNav("workouts")
              }
              style={{
                color: workoutSelected
                  ? "#C7FF00"
                  : "#B7B8BD",
              }}
              className={`
                rounded-full

                px-5
                py-2.25

                text-[14px]
                font-medium

                transition-colors
                duration-200

                hover:bg-[#1B260D]

                ${
                  workoutSelected
                    ? "bg-[#1B260D]"
                    : ""
                }
              `}
            >
              Workouts
            </Link>


            <Link
              href="/my-plan"
              style={{
                color: planSelected
                  ? "#C7FF00"
                  : "#B7B8BD",
              }}
              className={`
                rounded-full

                px-5
                py-2.25

                text-[14px]
                font-medium

                transition-colors
                duration-200

                hover:bg-[#1B260D]

                ${
                  planSelected
                    ? "bg-[#1B260D]"
                    : ""
                }
              `}
            >
              My Plan
            </Link>

          </nav>


          {/* =:= DESKTOP COUNTERS =:= */}
          <div
            className="
              hidden
              items-center
              gap-5.75

              lg:flex
            "
          >

            <Link
              href="/my-plan"
              className="flex items-center gap-2.25
            >
              <span className="text-[13px] font-medium text-[#B8BAC0]">
                Plan
              </span>

              <span
                className="
                  flex
                  h-7.25
                  min-w-7.25
                  items-center
                  justify-center

                  rounded-[5px]

                  bg-[#C7FF00]

                  px-1.75

                  text-[13px]
                  font-bold
                  text-black
                "
              >
                {plan.length}
              </span>
            </Link>


            <Link
              href="/my-plan"
              className="flex items-center gap-2.25"
            >
              <span className="text-[13px] font-medium text-[#B8BAC0]">
                Saved
              </span>

              <span
                className="
                  flex
                  h-7.25
                  min-w-7.25
                  items-center
                  justify-center

                  rounded-[5px]

                  border
                  border-[#303238]

                  bg-[#08090B]

                  px-1.75

                  text-[13px]
                  font-bold
                  text-white
                "
              >
                {saved.length}
              </span>
            </Link>

          </div>


          {/* =:= MOBILE + TABLET HAMBURGER =:= */}
          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (previous) => !previous
              )
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-[7px]

              border
              border-[#25272C]

              bg-[#111216]

              lg:hidden
            "
            aria-label="Menu"
          >
            <Image
              src="/assets/hamburger.png"
              alt="Menu"
              width={24}
              height={24}
              className="
                h-5.75
                w-5.75
                object-contain
              "
            />
          </button>

        </div>


        {/* =:= MOBILE + TABLET RIGHT MENU =:= */}
        {menuOpen && (
          <div
            className="
              absolute
              right-0
              top-17.5
              z-60

              w-55

              rounded-[10px]

              border
              border-[#292B31]

              bg-[#111216]

              p-2.5

              shadow-xl

              lg:hidden
            "
          >

            <Link
              href="/"
              onClick={() => {
                setActiveNav("workouts");
                setMenuOpen(false);
              }}
              style={{
                color: workoutSelected
                  ? "#C7FF00"
                  : "#B7B8BD",
              }}
              className={`
                block
                rounded-[7px]

                px-3.5
                py-2.5

                text-[14px]
                font-medium

                hover:bg-[#1B260D]

                ${
                  workoutSelected
                    ? "bg-[#1B260D]"
                    : ""
                }
              `}
            >
              Workouts
            </Link>


            <Link
              href="/my-plan"
              onClick={() =>
                setMenuOpen(false)
              }
              style={{
                color: planSelected
                  ? "#C7FF00"
                  : "#B7B8BD",
              }}
              className={`
                mt-1

                block
                rounded-[7px]

                px-3.5
                py-2.5

                text-[14px]
                font-medium

                hover:bg-[#1B260D]

                ${
                  planSelected
                    ? "bg-[#1B260D]"
                    : ""
                }
              `}
            >
              My Plan
            </Link>


            <div
              className="
                my-2.25
                h-px
                bg-[#292B31]
              "
            />


            <Link
              href="/my-plan"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                flex
                items-center
                justify-between

                rounded-[7px]

                px-3.5
                py-2.25

                hover:bg-[#181A1F]
              "
            >
              <span className="text-[13px] text-[#B8BAC0]">
                Plan
              </span>

              <span
                className="
                  flex
                  h-6.75
                  min-w-6.75
                  items-center
                  justify-center

                  rounded-[5px]

                  bg-[#C7FF00]

                  px-1.5

                  text-[12px]
                  font-bold
                  text-black
                "
              >
                {plan.length}
              </span>
            </Link>


            <Link
              href="/my-plan"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                mt-0.75

                flex
                items-center
                justify-between

                rounded-[7px]

                px-3.5
                py-2.25

                hover:bg-[#181A1F]
              "
            >
              <span className="text-[13px] text-[#B8BAC0]">
                Saved
              </span>

              <span
                className="
                  flex
                  h-6.75
                  min-w-6.75
                  items-center
                  justify-center

                  rounded-[5px]

                  border
                  border-[#303238]

                  bg-[#08090B]

                  px-1.5

                  text-[12px]
                  font-bold
                  text-white
                "
              >
                {saved.length}
              </span>
            </Link>

          </div>
        )}

      </div>
    </header>
  );
}