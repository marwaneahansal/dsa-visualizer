"use client";

import { useMemo } from "react";
import { SortingElement } from "@/lib/types/algorithms";

export function useSortingVisualization(elements: SortingElement[]) {
  const barMaxHeight = 300;
  const barWidth = 50;
  const barMargin = 10;
  const svgPadding = 40;
  
  // Calculate maximum value in the array to scale bars
  const maxValue = useMemo(() => {
    return elements.length > 0 
      ? Math.max(...elements.map(el => el.value)) 
      : 100;
  }, [elements]);
  
  // Calculate the total width needed for the visualization
  const svgWidth = useMemo(() => {
    return Math.max(500, (barWidth + barMargin) * elements.length + svgPadding * 2);
  }, [elements.length]);
  
  // Calculate the height needed for the visualization
  const svgHeight = useMemo(() => {
    return barMaxHeight + svgPadding * 2;
  }, []);
  
  // Calculate the x position for each bar
  const getBarX = (index: number) => {
    return svgPadding + index * (barWidth + barMargin);
  };
  
  // Calculate the height of a bar based on its value
  const getBarHeight = (value: number) => {
    return (value / maxValue) * barMaxHeight;
  };
  
  // Calculate the y position for a bar (from top)
  const getBarY = (value: number) => {
    return svgHeight - svgPadding - getBarHeight(value);
  };
  
  return {
    barWidth,
    barMaxHeight,
    barMargin,
    svgPadding,
    svgWidth,
    svgHeight,
    getBarX,
    getBarHeight,
    getBarY
  };
}
