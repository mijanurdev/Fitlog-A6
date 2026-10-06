import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="
        site-container

        flex
        min-h-[70vh]
        flex-col
        items-center
        justify-center

        px-5
        py-17.5

        text-center
      "
    >
      {/* =:= 404 =:= */}
      <p
        className="
          font-display

          text-[90px]
          font-bold
          leading-none

          text-[#C7FF00]

          sm:text-[115px]
          lg:text-[135px]
        "
      >
        404
      </p>

      {/* =:= TITLE =:= */}
      <h1
        className="
          font-display

          mt-3.5

          text-[27px]
          font-bold
          uppercase
          leading-[1.1]

          text-white

          sm:text-[32px]
        "
      >
        PAGE NOT FOUND
      </h1>

      <p
        className="
          mt-3

          max-w-107.5

          text-[13px]
          leading-[1.7]

          text-[#999DA6]

          sm:text-[14px]
        "
      >
        The page you are looking for does not exist.
        Head back to the workout library and keep training.
      </p>

      {/* =:= BUTTON =:= */}
      <Link
        href="/"
        className="
          mt-6

          inline-flex
          h-10.5

          items-center
          justify-center

          rounded-md

          bg-[#C7FF00]

          px-5.5

          text-[12px]
          font-bold
          uppercase

          text-black!

          transition-colors
          duration-200

          hover:bg-[#D5FF3F]
        "
      >
        Back to Home
      </Link>
    </section>
  );
}