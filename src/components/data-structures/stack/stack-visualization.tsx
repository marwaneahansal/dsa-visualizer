"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence } from "motion/react";
import { StackElement } from "@/lib/types/data-structures";
import { StackElementVisual } from "./stack-element-visual";
import { useStackVisualization } from "@/hooks/use-stack-visualization";
import { ZoomPanWrapper } from "@/components/zoom-pan-wrapper";

interface StackVisualizationProps {
  stackElements: StackElement[];
  isAnimating: boolean;
}

export default function StackVisualization({
  stackElements,
}: StackVisualizationProps) {
  const {
    elementWidth,
    elementHeight,
    horizontalCenter,
    svgHeight,
    svgWidth,
    getElementY,
  } = useStackVisualization(stackElements);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="overflow-hidden">
          <ZoomPanWrapper className="w-full">
            <svg
              width={svgWidth}
              height={svgHeight}
              className="mx-auto"
              style={{ minHeight: "300px" }}
            >
              {/* Stack container outline */}
              <rect
                x={horizontalCenter - elementWidth / 2 - 5}
                y={Math.min(svgHeight - 270, svgHeight - 80 - (stackElements.length * (elementHeight + 10)))}
                width={elementWidth + 10}
                height={Math.max(200, stackElements.length * (elementHeight + 10) + 10)}
                rx={10}
                className="fill-none stroke-muted-foreground stroke-dashed stroke-1"
              />

              {/* Base of stack */}
              <rect
                x={horizontalCenter - elementWidth / 2 - 5}
                y={svgHeight - 70}
                width={elementWidth + 10}
                height={10}
                className="fill-muted-foreground/30"
              />
              
              {/* Stack label */}
              <text
                x={horizontalCenter}
                y={svgHeight - 30}
                textAnchor="middle"
                className="text-sm fill-muted-foreground"
              >
                Stack Base
              </text>

              {/* Stack elements */}
              <AnimatePresence mode="popLayout">
                {stackElements.map((element, index) => (
                  <StackElementVisual
                    key={element.id}
                    element={element}
                    horizontalCenter={horizontalCenter}
                    getElementY={getElementY}
                    elementWidth={elementWidth}
                    elementHeight={elementHeight}
                    isTop={index === stackElements.length - 1}
                  />
                ))}
              </AnimatePresence>

              {/* Empty stack message */}
              {stackElements.length === 0 && (
                <text
                  x={horizontalCenter}
                  y={svgHeight - 170}
                  textAnchor="middle"
                  className="text-base fill-muted-foreground"
                >
                  Stack is Empty
                </text>
              )}
            </svg>
          </ZoomPanWrapper>
        </div>

        <StackInfo stackElements={stackElements} />
      </CardContent>
    </Card>
  );
}

function StackInfo({ stackElements }: { stackElements: StackElement[] }) {
  return (
    <div className="mt-6 text-center">
      <div className="inline-flex items-center space-x-6 text-sm">
        <span>Size: {stackElements.length}</span>
        <span>•</span>
        <span>
          Top:{" "}
          {stackElements.length > 0
            ? stackElements[stackElements.length - 1].value
            : "None"}
        </span>
      </div>
    </div>
  );
}
