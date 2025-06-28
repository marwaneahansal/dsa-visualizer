"use client";

import { motion } from "motion/react";
import { LinkedListNode } from "@/lib/types/data-structures";

interface LinkedListNodeVisualProps {
  node: LinkedListNode;
  getNodeX: (position: number) => number;
  verticalCenter: number;
  nodeWidth: number;
  nodeHeight: number;
}

export function LinkedListNodeVisual({
  node,
  getNodeX,
  verticalCenter,
  nodeWidth,
  nodeHeight,
}: LinkedListNodeVisualProps) {
  const nodeX = getNodeX(node.position);
  const nodeY = verticalCenter - nodeHeight / 2;

  return (
    <motion.g
      key={node.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: nodeX,
        y: nodeY,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      }}
      className="cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      {/* Node background */}
      <rect
        width={nodeWidth}
        height={nodeHeight}
        rx={8}
        className={`
          ${node.isHead ? "fill-primary stroke-primary" : 
            node.isTail ? "fill-accent stroke-accent" : 
            "fill-muted stroke-border"}
          stroke-2
        `}
      />

      {/* Node value */}
      <text
        x={nodeWidth / 2}
        y={nodeHeight / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-lg font-bold fill-foreground"
      >
        {node.value}
      </text>

      {/* Node labels */}
      {node.isHead && (
        <text
          x={nodeWidth / 2}
          y={-10}
          textAnchor="middle"
          className="text-xs fill-primary font-medium"
        >
          HEAD
        </text>
      )}
      {node.isTail && (
        <text
          x={nodeWidth / 2}
          y={nodeHeight + 20}
          textAnchor="middle"
          className="text-xs fill-accent font-medium"
        >
          TAIL
        </text>
      )}
    </motion.g>
  );
}
