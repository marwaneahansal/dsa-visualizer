"use client";

import { useMemo } from "react";
import { QueueElement } from "@/lib/types/data-structures";

export function useQueueVisualization(elements: QueueElement[]) {
  const elementWidth = 60;
  const elementHeight = 60;
  const horizontalSpacing = elementWidth + 20;
  const horizontalPadding = 50;
  const verticalCenter = 100;
  
  // Calculate the total width needed for the visualization
  const svgWidth = useMemo(() => 
    Math.max(500, horizontalPadding * 2 + elements.length * horizontalSpacing),
    [elements.length, horizontalSpacing]
  );
  
  // Calculate x position for each element
  const getElementX = (position: number) => 
    horizontalPadding + position * horizontalSpacing;
  
  const svgHeight = 200; // Fixed height
  
  return {
    elementWidth,
    elementHeight,
    horizontalSpacing,
    horizontalPadding,
    verticalCenter,
    svgWidth,
    svgHeight,
    getElementX
  };
}
