import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mt-4.5 md:mt-7.5">
      <div className="site-container">
        <div className="overflow-hidden rounded-2xl bg-[#16171C]">

          <div
            className="
              grid
              grid-cols-1
              items-center

              px-5

              sm:px-7

              md:min-h-107.5
              md:grid-cols-2
              md:px-8

              lg:min-h-111.25
              lg:px-10.5
            "
          >

            {/* =:= IMAGE =:= */}

            <div
              className="
                order-1

                flex
                min-h-55
                items-center
                justify-center

                pt-5.5

                sm:min-h-62.5

                md:order-2
                md:min-h-107.5
                md:items-end
                md:justify-end
                md:pt-0

                lg:min-h-111.25
              "
            >
              <Image
                src="/assets/banner.png"
                alt="Workout illustration"
                width={520}
                height={520}
                priority
                className="
                  h-auto
                  w-51.25

                  select-none
                  object-contain

                  sm:w-58.75

                  md:w-82.5

                  lg:w-95

                  xl:w-102.5
                "
              />
            </div>


            {/* =:= TEXT CONTENT =:= */}

            <div
              className="
                order-2

                flex
                flex-col
                items-center

                pb-8.5
                pt-1

                text-center

                md:order-1
                md:items-start
                md:py-13
                md:pr-8.5
                md:text-left

                lg:py-14.5
                lg:pr-12.5
              "
            >

              <p
                className="
                  mb-4

                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.2px]

                  text-[#C7FF00]

                  sm:text-[12px]

                  md:mb-6
                  md:text-[14px]
                "
              >
                WORKOUT LIBRARY
              </p>


              <h1
                className="
                  font-display

                  max-w-172.5

                  text-[30px]
                  font-bold
                  uppercase

                  leading-[1.05]
                  tracking-[-0.4px]

                  text-white

                  sm:text-[36px]

                  md:text-[48px]

                  lg:text-[55px]

                  xl:text-[58px]
                "
              >
                <span className="block">
                  TRAIN WITH INTENT.
                </span>

                <span className="block md:hidden">
                  LOG EVERY SET.
                </span>

                <span className="hidden md:block">
                  LOG EVERY SET.
                </span>
              </h1>


              <p
                className="
                  mt-4

                  max-w-71.25

                  text-[11px]
                  font-normal
                  leading-[1.7]

                  text-[#A7A9B0]

                  sm:max-w-90
                  sm:text-[13px]

                  md:mt-5.5
                  md:max-w-152.5
                  md:text-[15px]

                  lg:text-[16px]
                "
              >
                FitLog is a dark, no-nonsense gym companion:
                pick a lift, lock it into today&apos;s plan, and
                watch the week&apos;s work add up.
              </p>


              {/* =:= BROWSE BUTTON =:= */}
              <div
                className="
                  mt-5

                  flex
                  w-full
                  justify-center

                  md:mt-6.5
                  md:w-auto
                  md:justify-start
                "
              >
                <a
                  href="#library"
                  className="
                    inline-flex
                    h-10

                    items-center
                    justify-center

                    gap-1.75

                    rounded-[5px]

                    bg-[#C7FF00]

                    px-4.5

                    text-[11px]
                    font-bold
                    uppercase

                    text-[#050505]!

                    transition-colors
                    duration-200

                    hover:bg-[#D5FF3F]

                    md:h-10.5
                    md:px-5.25
                    md:text-[13px]
                  "
                >
                  BROWSE WORKOUTS

                  <ArrowDown
                    size={14}
                    strokeWidth={2}
                    className="hidden md:block"
                  />
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}