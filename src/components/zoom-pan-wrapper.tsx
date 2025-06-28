"use client";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ReactNode } from "react";

interface ZoomPanWrapperProps {
  children: ReactNode;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
  className?: string;
}

export function ZoomPanWrapper({
  children,
  minScale = 0.5,
  maxScale = 3,
  initialScale = 1,
  className = "",
}: ZoomPanWrapperProps) {
  return (
    <div className={className}>
      <TransformWrapper
        minScale={minScale}
        maxScale={maxScale}
        initialScale={initialScale}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="flex gap-2 mb-2">
              <button onClick={() => zoomIn()} className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700">+</button>
              <button onClick={() => zoomOut()} className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700">-</button>
              <button onClick={() => resetTransform()} className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700">Reset</button>
            </div>
            <TransformComponent wrapperClass="!w-full">
              {children}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}