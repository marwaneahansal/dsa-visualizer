"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence } from "motion/react";
import { SearchElement } from "@/lib/types/algorithms";
import { SearchElementVisual } from "./search-element-visual";
import { useSearchVisualization } from "@/hooks/use-search-visualization";
import { ZoomPanWrapper } from "@/components/zoom-pan-wrapper";

interface SearchVisualizationProps {
  elements: SearchElement[];
  description: string;
  currentStep: number;
  totalSteps: number;
  searchResult: { found: boolean; index: number | null };
}

export default function SearchVisualization({
  elements,
  description,
  currentStep,
  totalSteps,
  searchResult,
}: SearchVisualizationProps) {
  const {
    elementWidth,
    svgWidth,
    svgHeight,
    getElementX,
    getElementHeight,
    getElementY,
  } = useSearchVisualization(elements);

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
              {/* Elements */}
              <AnimatePresence mode="popLayout">
                {elements.map((element) => (
                  <SearchElementVisual
                    key={element.id}
                    element={element}
                    getElementX={getElementX}
                    getElementY={getElementY}
                    getElementHeight={getElementHeight}
                    elementWidth={elementWidth}
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
                  No elements to search
                </text>
              )}
            </svg>
          </ZoomPanWrapper>
        </div>

        <SearchInfo 
          description={description} 
          currentStep={currentStep} 
          totalSteps={totalSteps}
          searchResult={searchResult}
        />
      </CardContent>
    </Card>
  );
}

interface SearchInfoProps {
  description: string;
  currentStep: number;
  totalSteps: number;
  searchResult: { found: boolean; index: number | null };
}

// Component to show info about the search process below the visualization
function SearchInfo({ description, currentStep, totalSteps, searchResult }: SearchInfoProps) {
  return (
    <div className="mt-6 space-y-2">
      <div className="p-3 bg-muted/50 rounded-md">
        <p className="text-sm">{description}</p>
        
        {currentStep === totalSteps - 1 && (
          <div className={`mt-2 text-sm p-2 rounded ${searchResult.found ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
            {searchResult.found 
              ? `Target found at index ${searchResult.index}` 
              : 'Target not found in the array'}
          </div>
        )}
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
