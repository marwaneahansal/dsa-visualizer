"use client";

import { motion } from "motion/react";

interface LinkedListArrowVisualProps {
  nodeId: string;
  fromX: number;
  toX: number;
  verticalCenter: number;
}

export function LinkedListArrowVisual({
  nodeId,
  fromX,
  toX,
  verticalCenter,
}: LinkedListArrowVisualProps) {
  // const arrowWidth = toX - fromX;
  const arrowY = verticalCenter;
  
  return (
    <motion.g
      key={`arrow-${nodeId}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Arrow line */}
      <line
        x1={fromX}
        y1={arrowY}
        x2={toX - 10}
        y2={arrowY}
        className="stroke-border stroke-2"
        strokeLinecap="round"
      />
      
      {/* Arrow head */}
      <polygon
        points={`${toX - 10},${arrowY - 6} ${toX},${arrowY} ${toX - 10},${arrowY + 6}`}
        className="fill-border stroke-border"
      />
    </motion.g>
  );
}
