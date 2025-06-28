"use client";

import { motion } from "motion/react";
import { StackElement } from "@/lib/types/data-structures";

interface StackElementVisualProps {
  element: StackElement;
  horizontalCenter: number;
  getElementY: (position: number) => number;
  elementWidth: number;
  elementHeight: number;
  isTop: boolean;
}

export function StackElementVisual({
  element,
  horizontalCenter,
  getElementY,
  elementWidth,
  elementHeight,
  isTop,
}: StackElementVisualProps) {
  const x = horizontalCenter - elementWidth / 2;
  const y = getElementY(element.position);

  return (
    <motion.g
      key={element.id}
      initial={{ opacity: 0, scale: 0.8, y: y - 60 }}
      animate={{
        opacity: 1,
        scale: 1,
        x,
        y,
      }}
      exit={{ opacity: 0, scale: 0.8, y: y - 60 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      }}
      layout
    >
      {/* Element box */}
      <motion.rect
        width={elementWidth}
        height={elementHeight}
        rx={8}
        className={`fill-primary/70 stroke-primary stroke-2 ${isTop ? 'fill-primary' : ''}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      />

      {/* Element value */}
      <motion.text
        x={elementWidth / 2}
        y={elementHeight / 2 + 6} // Vertically center the text
        textAnchor="middle"
        className="text-lg font-bold fill-white"
      >
        {element.value}
      </motion.text>

      {/* Top indicator */}
      {isTop && (
        <motion.text
          x={elementWidth + 10}
          y={elementHeight / 2 + 6}
          className="text-sm font-medium fill-primary-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ← TOP
        </motion.text>
      )}
    </motion.g>
  );
}
