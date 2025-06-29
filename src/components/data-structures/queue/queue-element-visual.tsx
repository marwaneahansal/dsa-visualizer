"use client";

import { motion } from "motion/react";
import { QueueElement } from "@/lib/types/data-structures";

interface QueueElementVisualProps {
  element: QueueElement;
  getElementX: (position: number) => number;
  verticalCenter: number;
  elementWidth: number;
  elementHeight: number;
}

export function QueueElementVisual({
  element,
  getElementX,
  verticalCenter,
  elementWidth,
  elementHeight,
}: QueueElementVisualProps) {
  const elementX = getElementX(element.position);
  const elementY = verticalCenter - elementHeight / 2;

  return (
    <motion.g
      key={element.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: elementX,
        y: elementY,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      }}
      className="cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      {/* Element background */}
      <rect
        width={elementWidth}
        height={elementHeight}
        rx={8}
        className={`
          ${element.isFront ? "fill-primary stroke-primary" : 
            element.isRear ? "fill-accent stroke-accent" : 
            "fill-muted stroke-border"}
          stroke-2
        `}
      />

      {/* Element value */}
      <text
        x={elementWidth / 2}
        y={elementHeight / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-lg font-bold fill-foreground"
      >
        {element.value}
      </text>

      {/* Element labels */}
      {element.isFront && (
        <text
          x={elementWidth / 2}
          y={-10}
          textAnchor="middle"
          className="text-xs fill-primary font-medium"
        >
          FRONT
        </text>
      )}
      {element.isRear && (
        <text
          x={elementWidth / 2}
          y={elementHeight + 20}
          textAnchor="middle"
          className="text-xs fill-accent font-medium"
        >
          REAR
        </text>
      )}
    </motion.g>
  );
}
