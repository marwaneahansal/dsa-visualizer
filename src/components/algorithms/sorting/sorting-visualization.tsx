"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence } from "motion/react";
import { SortingElement } from "@/lib/types/algorithms";
import { BarVisual } from "./bar-visual";
import { useSortingVisualization } from "@/hooks/use-sorting-visualization";
import { ZoomPanWrapper } from "@/components/zoom-pan-wrapper";

interface SortingVisualizationProps {
  elements: SortingElement[];
  description: string;
  currentStep: number;
  totalSteps: number;
}

export default function SortingVisualization({
  elements,
  description,
  currentStep,
  totalSteps,
}: SortingVisualizationProps) {
  const {
    barWidth,
    svgWidth,
    svgHeight,
    getBarX,
    getBarHeight,
    getBarY,
  } = useSortingVisualization(elements);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="overflow-hidden">
          <ZoomPanWrapper className="w-full">
            <svg
              width={svgWidth}
              height={svgHeight}
              className="mx-auto"
              style={{ minHeight: "350px" }}
            >
              {/* Bars */}
              <AnimatePresence mode="popLayout">
                {elements.map((element) => (
                  <BarVisual
                    key={element.id}
                    element={element}
                    getBarX={getBarX}
                    getBarY={getBarY}
                    getBarHeight={getBarHeight}
                    barWidth={barWidth}
                  />
                ))}
              </AnimatePresence>
              
              {/* Empty array message */}
              {elements.length === 0 && (
                <text
                  x={svgWidth / 2}
                  y={svgHeight / 2}
                  textAnchor="middle"
                  className="text-base fill-muted-foreground"
                >
                  No elements to sort
                </text>
              )}
            </svg>
          </ZoomPanWrapper>
        </div>

        <SortingInfo 
          description={description} 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
      </CardContent>
    </Card>
  );
}

interface SortingInfoProps {
  description: string;
  currentStep: number;
  totalSteps: number;
}

// Component to show info about the sorting process below the visualization
function SortingInfo({ description, currentStep, totalSteps }: SortingInfoProps) {
  return (
    <div className="mt-6 space-y-2">
      <div className="p-3 bg-muted/50 rounded-md">
        <p className="text-sm">{description}</p>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <div>
          <span className="font-semibold">Step:</span>{" "}
          {currentStep >= 0 ? currentStep + 1 : 0} of {totalSteps}
        </div>
      </div>
    </div>
  );
}
