"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { LinkedListNode } from "@/lib/types/data-structures";
import { LinkedListNodeVisual } from "./linked-list-node-visual";
import { LinkedListArrowVisual } from "./linked-list-arrow-visual";
import { useLinkedListVisualization } from "@/hooks/use-linked-list-visualization";
import { ZoomPanWrapper } from "@/components/zoom-pan-wrapper";

interface LinkedListVisualizationProps {
  nodes: LinkedListNode[];
  isAnimating: boolean;
}

export default function LinkedListVisualization({
  nodes,
}: LinkedListVisualizationProps) {
  const {
    nodeWidth,
    nodeHeight,
    verticalCenter,
    svgWidth,
    getNodeX,
    getArrowX,
  } = useLinkedListVisualization(nodes);

  const svgHeight = 200;  // Fixed height, adjust as needed

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
              {/* Linked List visualization */}
              <AnimatePresence mode="popLayout">
                {/* Nodes */}
                {nodes.map((node) => (
                  <LinkedListNodeVisual
                    key={node.id}
                    node={node}
                    getNodeX={getNodeX}
                    verticalCenter={verticalCenter}
                    nodeWidth={nodeWidth}
                    nodeHeight={nodeHeight}
                  />
                ))}

                {/* Arrows connecting nodes */}
                {nodes.map((node, index) => {
                  // Don't render an arrow for the last node
                  if (index === nodes.length - 1) return null;
                  
                  const fromX = getNodeX(node.position) + nodeWidth;
                  const toX = getArrowX(node.position) + nodeWidth/2;
                  
                  return (
                    <LinkedListArrowVisual
                      key={`arrow-${node.id}`}
                      nodeId={node.id}
                      fromX={fromX}
                      toX={toX}
                      verticalCenter={verticalCenter}
                    />
                  );
                })}
              </AnimatePresence>

              {/* NULL terminator for the last node */}
              {nodes.length > 0 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg fill-muted-foreground"
                >
                  <text
                    x={getNodeX(nodes.length - 1) + nodeWidth + 20}
                    y={verticalCenter}
                    dominantBaseline="middle"
                    textAnchor="start"
                    className="font-mono"
                  >
                    NULL
                  </text>
                </motion.g>
              )}

              {/* Empty list message */}
              {nodes.length === 0 && (
                <text
                  x={svgWidth / 2}
                  y={verticalCenter}
                  textAnchor="middle"
                  className="text-base fill-muted-foreground"
                >
                  Linked List is Empty
                </text>
              )}
            </svg>
          </ZoomPanWrapper>
        </div>

        <LinkedListInfo nodes={nodes} />
      </CardContent>
    </Card>
  );
}

// Component to show info about the linked list below the visualization
function LinkedListInfo({ nodes }: { nodes: LinkedListNode[] }) {
  return (
    <div className="mt-6 text-sm text-muted-foreground">
      <div className="flex justify-between">
        <div>
          <span className="font-semibold">List Size:</span> {nodes.length} nodes
        </div>
        {nodes.length > 0 && (
          <div className="text-right">
            <span className="font-semibold">Head Value:</span> {nodes[0]?.value}
            {" • "}
            <span className="font-semibold">Tail Value:</span> {nodes[nodes.length - 1]?.value}
          </div>
        )}
      </div>
    </div>
  );
}
