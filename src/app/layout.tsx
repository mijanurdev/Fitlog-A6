import type { Metadata } from "next";

import {
  Inter,
  Oswald,
} from "next/font/google";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import Navbar from "@/components/Navbar";

import {
  PlanProvider,
} from "@/context/PlanContext";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});


export const metadata: Metadata = {
  title: "FitLog",

  description:
    "A dark, no-nonsense workout library and fitness planner.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`
          ${inter.variable}
          ${oswald.variable}
        `}
      >

        <PlanProvider>

          <Navbar />


          {/* =:= SOFT LIME LINE =:= */}
          <div
            className="
              h-px
              w-full
              bg-[rgba(199,255,0,0.22)]
            "
          />


          <main className="min-h-screen">
            {children}
          </main>


          {/* =:= TOASTIFY =:= */}
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

        </PlanProvider>

      </body>

    </html>
  );
}