"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <footer className="w-full bg-black">
      {/* =:= SOFT LIME SEPARATOR =:= */}
      <div className="h-px w-full bg-[rgba(199,255,0,0.22)]" />

      <div
        className={`
          site-container

          min-h-18.5
          py-5

          ${
            isHome
              ? `
                flex
                flex-col
                items-center
                justify-center
                gap-3

                sm:flex-row
                sm:justify-between
              `
              : `
                flex
                flex-col
                items-center
                justify-center
                gap-2.25

                sm:flex-row
                sm:gap-4
              `
          }
        `}
      >
        {/* =:= FITLOG BRAND =:= */}

        <Link
          href="/"
          className="
            flex
            shrink-0
            items-center
            gap-1.75
          "
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={25}
            height={25}
            className="
              h-6
              w-6
              object-contain

              sm:h-6.25
              sm:w-6.25
            "
          />

          <span
            className="
              font-display

              text-[14px]
              font-bold
              uppercase
              leading-none
              tracking-[0.2px]

              text-white
            "
          >
            FITLOG
          </span>
        </Link>

        {/* =:= COPYRIGHT =:= */}

        <p
          className={`
            text-[10px]
            leading-[1.6]

            text-[#858890]

            sm:text-[11px]

            ${
              isHome
                ? `
                  text-center
                  sm:text-right
                `
                : `
                  text-center
                `
            }
          `}
        >
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
