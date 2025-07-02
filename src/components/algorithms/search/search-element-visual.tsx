"use client";

import { motion } from "motion/react";
import { SearchElement } from "@/lib/types/algorithms";

interface SearchElementVisualProps {
  element: SearchElement;
  getElementX: (index: number) => number;
  getElementY: (value: number) => number;
  getElementHeight: (value: number) => number;
  elementWidth: number;
}

export function SearchElementVisual({
  element,
  getElementX,
  getElementY,
  getElementHeight,
  elementWidth,
}: SearchElementVisualProps) {
  const elementX = getElementX(element.index);
  const elementHeight = getElementHeight(element.value);
  const elementY = getElementY(element.value);

  // Determine element color based on its state
  const getElementColor = () => {
    if (element.isFound) return "fill-primary";
    if (element.isComparing) return "fill-chart-2";
    if (element.isChecked) return "fill-secondary/50";
    if (element.isCurrent) return "fill-chart-5";
    return "fill-muted-foreground";
  };

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
        duration: 0.4,
      }}
      className="cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      {/* Element */}
      <rect
        width={elementWidth}
        height={elementHeight}
        rx={3}
        className={`${getElementColor()} transition-colors duration-300`}
      />

      {/* Value label */}
      <text
        x={elementWidth / 2}
        y={elementHeight / 2}
        dy={elementHeight > 30 ? 0 : -15} // Display above element if it's too small
        textAnchor="middle"
        dominantBaseline="middle"
        className={`text-xs font-medium ${
          elementHeight > 30 ? "fill-background" : "fill-foreground"
        }`}
      >
        {element.value}
      </text>
    </motion.g>
  );
}
