import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence } from "motion/react";
import { ArrayElement } from "@/lib/types/data-structures";
import { ArrayElementVisual } from "./array-element-visual";
import { useArrayVisualization } from "@/hooks/use-array-visualization";
import { ZoomPanWrapper } from "@/components/zoom-pan-wrapper";

interface ArrayVisualizationProps {
  arrayElements: ArrayElement[];
  isAnimating: boolean;
}

export default function ArrayVisualization({ arrayElements }: ArrayVisualizationProps) {
  const { elementWidth, elementHeight, getElementX, svgWidth } =
    useArrayVisualization(arrayElements);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <ZoomPanWrapper className="w-full">
            <svg width={svgWidth} height={200} className="mx-auto">
              {/* Index labels */}
              {arrayElements.map((_, index) => (
                <text
                  key={`index-${index}`}
                  x={getElementX(index) + elementWidth / 2}
                  y={55}
                  textAnchor="middle"
                  className="text-sm fill-muted-foreground"
                >
                  [{index}]
                </text>
              ))}

              {/* Array elements */}
              <AnimatePresence mode="popLayout">
                {arrayElements.map((element) => (
                  <ArrayElementVisual
                    key={element.id}
                    element={element}
                    getElementX={getElementX}
                    elementWidth={elementWidth}
                    elementHeight={elementHeight}
                  />
                ))}
              </AnimatePresence>
            </svg>
          </ZoomPanWrapper>
        </div>

        <ArrayInfo arrayElements={arrayElements} />
      </CardContent>
    </Card>
  );
}

function ArrayInfo({ arrayElements }: { arrayElements: ArrayElement[] }) {
  return (
    <div className="mt-6 text-center">
      <div className="inline-flex items-center space-x-6 text-sm">
        <span>Length: {arrayElements.length}</span>
        <span>•</span>
        <span>Values: [{arrayElements.map((el) => el.value).join(", ")}]</span>
      </div>
    </div>
  );
}
