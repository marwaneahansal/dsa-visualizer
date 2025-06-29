"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence } from "motion/react";
import { QueueElement } from "@/lib/types/data-structures";
import { QueueElementVisual } from "./queue-element-visual";
import { useQueueVisualization } from "@/hooks/use-queue-visualization";
import { ZoomPanWrapper } from "@/components/zoom-pan-wrapper";

interface QueueVisualizationProps {
  elements: QueueElement[];
  isAnimating: boolean;
}

export default function QueueVisualization({
  elements,
}: QueueVisualizationProps) {
  const {
    elementWidth,
    elementHeight,
    verticalCenter,
    svgHeight,
    svgWidth,
    getElementX,
  } = useQueueVisualization(elements);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="overflow-hidden">
          <ZoomPanWrapper className="w-full">
            <svg
              width={svgWidth}
              height={svgHeight}
              className="mx-auto"
              style={{ minHeight: "200px" }}
            >
              {/* Queue container outline */}
              <rect
                x={10}
                y={verticalCenter - elementHeight/2 - 10}
                width={svgWidth - 20}
                height={elementHeight + 20}
                rx={10}
                className="fill-none stroke-muted-foreground stroke-dashed stroke-1"
              />
              
              {/* Direction arrow */}
              {elements.length > 1 && (
                <g className="fill-muted-foreground opacity-50">
                  <path 
                    d="M 50,150 H 150 L 140,145 V 155 L 150,150" 
                    className="stroke-muted-foreground stroke-2 fill-none" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x={100} y={170} textAnchor="middle" fontSize="14">
                    Dequeue ← Enqueue
                  </text>
                </g>
              )}

              {/* Queue elements */}
              <AnimatePresence mode="popLayout">
                {elements.map((element) => (
                  <QueueElementVisual
                    key={element.id}
                    element={element}
                    getElementX={getElementX}
                    verticalCenter={verticalCenter}
                    elementWidth={elementWidth}
                    elementHeight={elementHeight}
                  />
                ))}
              </AnimatePresence>

              {/* Empty queue message */}
              {elements.length === 0 && (
                <text
                  x={svgWidth / 2}
                  y={verticalCenter}
                  textAnchor="middle"
                  className="text-base fill-muted-foreground"
                >
                  Queue is Empty
                </text>
              )}
            </svg>
          </ZoomPanWrapper>
        </div>

        <QueueInfo elements={elements} />
      </CardContent>
    </Card>
  );
}

// Component to show info about the queue below the visualization
function QueueInfo({ elements }: { elements: QueueElement[] }) {
  return (
    <div className="mt-6 text-sm text-muted-foreground">
      <div className="flex justify-between">
        <div>
          <span className="font-semibold">Queue Size:</span> {elements.length} elements
        </div>
        {elements.length > 0 && (
          <div className="text-right">
            <span className="font-semibold">Front Value:</span> {elements[0]?.value}
            {" • "}
            <span className="font-semibold">Rear Value:</span> {elements[elements.length - 1]?.value}
          </div>
        )}
      </div>
    </div>
  );
}
