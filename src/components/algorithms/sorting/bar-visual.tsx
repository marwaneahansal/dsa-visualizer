"use client";

import { motion } from "motion/react";
import { SortingElement } from "@/lib/types/algorithms";

interface BarVisualProps {
  element: SortingElement;
  getBarX: (index: number) => number;
  getBarY: (value: number) => number;
  getBarHeight: (value: number) => number;
  barWidth: number;
}

export function BarVisual({
  element,
  getBarX,
  getBarY,
  getBarHeight,
  barWidth,
}: BarVisualProps) {
  const barX = getBarX(element.index);
  const barHeight = getBarHeight(element.value);
  const barY = getBarY(element.value);

  // Determine bar color based on its state
  const getBarColor = () => {
    if (element.isSwapping) return "fill-destructive";
    if (element.isComparing) return "fill-warning";
    if (element.isPivot) return "fill-purple-500";
    if (element.isSorted) return "fill-success";
    if (element.isCurrent) return "fill-primary";
    return "fill-muted-foreground";
  };

  return (
    <motion.g
      key={element.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: barX,
        y: barY,
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
      {/* Bar */}
      <rect
        width={barWidth}
        height={barHeight}
        rx={3}
        className={`${getBarColor()} transition-colors duration-300`}
      />

      {/* Value label */}
      <text
        x={barWidth / 2}
        y={barHeight / 2}
        dy={barHeight > 30 ? 0 : -15} // Display above bar if bar is too small
        textAnchor="middle"
        dominantBaseline="middle"
        className={`text-xs font-medium ${
          barHeight > 30 ? "fill-background" : "fill-foreground"
        }`}
      >
        {element.value}
      </text>
    </motion.g>
  );
}
