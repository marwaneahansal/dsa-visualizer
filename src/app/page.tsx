"use client";

import AlgoSections from "@/components/features/algo-section";
import DSSection from "@/components/features/ds-section";
import NavbarPage from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarPage />
      <div className="relative flex-1 flex flex-col items-center space-y-4">
        <div className="absolute inset-y-0 left-0 h-full w-px">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px">
          <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>
        <div className="px-4 py-10 md:py-20">
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold md:text-4xl lg:text-7xl">
            {"Master Algorithms Through Visualization".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal"
          >
            Transform complex data structures and algorithms into intuitive, interactive
            visualizations. Learn faster, understand deeper, and code with confidence.
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button size={"lg"} className="text-lg transform font-medium transition-all duration-300 hover:-translate-y-0.5">
              Explore Now
            </Button>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
              delay: 1.2,
            }}
            className="relative z-10 mt-20 rounded-3xl border border-accent bg-accent p-4 shadow-md max-w-4xl"
          >
            <div className="w-full overflow-hidden rounded-xl border border-primary h-96">
              {/* <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            /> */}
            </div>
          </motion.div>
        </div>
        <DSSection />
        <AlgoSections />
      </div>
    </div>
  );
}
