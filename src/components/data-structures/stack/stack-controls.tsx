"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Layers, RotateCcw } from "lucide-react";
import { StackElement } from "@/lib/types/data-structures";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StackControlsProps {
  isAnimating: boolean;
  stackElements: StackElement[];
  pushValue: string;
  setPushValue: (value: string) => void;
  handlePush: () => void;
  handlePop: () => void;
  resetStack: () => void;
  clearStack: () => void;
  isEmpty: boolean;
  isFull: boolean;
}

export default function StackControls({
  isAnimating,
  stackElements,
  pushValue,
  setPushValue,
  handlePush,
  handlePop,
  resetStack,
  clearStack,
  isEmpty,
  isFull,
}: StackControlsProps) {
  const tabs = [
    {
      name: "Push",
      value: "push",
      icon: ArrowDown,
    },
    {
      name: "Pop",
      value: "pop",
      icon: ArrowUp,
    },
    {
      name: "Reset",
      value: "reset",
      icon: RotateCcw,
    },
  ] as const;

  type TabValue = typeof tabs[number]["value"];

  const [activeTab, setActiveTab] = useState<TabValue>("push");

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="font-semibold flex items-center">
            <Layers className="w-4 h-4 mr-2" />
            Stack Controls
          </CardTitle>
          <CardDescription>
            Manage your stack with push, pop, and reset operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 bg-muted p-2 rounded-lg">
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? "outline" : "ghost"}
                className={cn(
                  "font-semibold w-full justify-start border-0",
                  activeTab === tab.value && "shadow-sm dark:border-1"
                )}
                onClick={() => setActiveTab(tab.value as TabValue)}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="col-span-1 md:col-span-2">
        {activeTab === "push" && (
          <PushControl
            isAnimating={isAnimating}
            pushValue={pushValue}
            setPushValue={setPushValue}
            handlePush={handlePush}
            isFull={isFull}
          />
        )}
        {activeTab === "pop" && (
          <PopControl
            isAnimating={isAnimating}
            handlePop={handlePop}
            isEmpty={isEmpty}
            topValue={stackElements.length > 0 ? stackElements[stackElements.length - 1].value : undefined}
          />
        )}
        {activeTab === "reset" && (
          <ResetControl 
            isAnimating={isAnimating} 
            resetStack={resetStack} 
            clearStack={clearStack} 
          />
        )}
      </div>
    </div>
  );
}

// Sub-components for each control group
interface PushControlProps {
  isAnimating: boolean;
  pushValue: string;
  setPushValue: (value: string) => void;
  handlePush: () => void;
  isFull: boolean;
}

function PushControl({
  isAnimating,
  pushValue,
  setPushValue,
  handlePush,
  isFull,
}: PushControlProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-semibold flex items-center">
          <ArrowDown className="w-4 h-4 mr-2" />
          Push Element
        </CardTitle>
        <CardDescription>
          Add a new element to the top of the stack.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center h-full">
        <div className="space-y-2 w-full">
          <Input
            placeholder="Value"
            value={pushValue}
            onChange={(e) => setPushValue(e.target.value)}
            type="number"
            disabled={isAnimating || isFull}
          />
          <Button
            onClick={handlePush}
            disabled={isAnimating || !pushValue || isFull}
            className="w-full"
          >
            Push
          </Button>
          {isFull && (
            <div className="text-sm text-destructive mt-2">
              Stack is full. Pop elements to make space.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface PopControlProps {
  isAnimating: boolean;
  handlePop: () => void;
  isEmpty: boolean;
  topValue?: number;
}

function PopControl({
  isAnimating,
  handlePop,
  isEmpty,
  topValue,
}: PopControlProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-semibold flex items-center">
          <ArrowUp className="w-4 h-4 mr-2" />
          Pop Element
        </CardTitle>
        <CardDescription>
          Remove the element from the top of the stack.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full">
        <div className="space-y-4 w-full text-center">
          {!isEmpty ? (
            <>
              <div className="text-lg font-medium">
                Current Top: <span className="font-bold">{topValue}</span>
              </div>
              <Button
                onClick={handlePop}
                disabled={isAnimating || isEmpty}
                className="w-full"
              >
                Pop
              </Button>
            </>
          ) : (
            <div className="text-sm text-destructive mt-2">
              Stack is empty. Push elements first.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ResetControlProps {
  isAnimating: boolean;
  resetStack: () => void;
  clearStack: () => void;
}

function ResetControl({
  isAnimating,
  resetStack,
  clearStack,
}: ResetControlProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-semibold flex items-center">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Stack
        </CardTitle>
        <CardDescription>
          Reset the stack to its initial state or clear all elements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={resetStack} disabled={isAnimating} className="w-full">
            Reset to Initial
          </Button>
          <Button onClick={clearStack} disabled={isAnimating} variant="outline" className="w-full">
            Clear Stack
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
