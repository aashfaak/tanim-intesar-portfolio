"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="container-editorial pt-14 md:pt-20 pb-16 md:pb-24">
      <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        <div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-wide text-muted mb-6"
          >
            Student · Business · Life · Ideas
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] text-ink"
          >
            Learning, living, and making sense of the world.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-muted max-w-md leading-relaxed"
          >
            An IBA student documenting university life, ideas, travels,
            everyday moments, and the things worth thinking about.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/journal" variant="primary">
              Explore the journal
            </Button>
            <Button href="/blog" variant="secondary">
              Read my stories
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/hero.jpeg"              alt="Campus corridor, morning light"
              fill
              priority
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 hidden sm:block bg-paper border border-line px-5 py-4 max-w-[220px]">
            <p className="text-xs text-muted mb-1">Currently exploring</p>
            <p className="text-sm text-ink font-medium">
              Business · Culture · Travel
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
