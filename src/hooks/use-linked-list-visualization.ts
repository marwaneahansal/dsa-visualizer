"use client";

import { useMemo } from "react";
import { LinkedListNode } from "@/lib/types/data-structures";

export function useLinkedListVisualization(nodes: LinkedListNode[]) {
  const nodeWidth = 60;
  const nodeHeight = 60;
  const arrowWidth = 40;
  const horizontalSpacing = nodeWidth + arrowWidth;
  const verticalCenter = 100;
  const leftOffset = 50;
  
  // Calculate the total width needed for the visualization
  const svgWidth = useMemo(() => 
    Math.max(500, leftOffset + nodes.length * horizontalSpacing + 50),
    [nodes.length, horizontalSpacing, leftOffset]
  );
  
  // Calculate x position for each node
  const getNodeX = (position: number) => 
    leftOffset + position * horizontalSpacing;
  
  // Calculate x position for arrows
  const getArrowX = (position: number) => 
    leftOffset + nodeWidth + position * horizontalSpacing;
  
  return {
    nodeWidth,
    nodeHeight,
    arrowWidth,
    horizontalSpacing,
    verticalCenter,
    svgWidth,
    getNodeX,
    getArrowX
  };
}
