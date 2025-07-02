"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightFromLine, ArrowRightToLine, ListOrdered, RotateCcw } from "lucide-react";
import { QueueElement } from "@/lib/types/data-structures";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface QueueControlsProps {
  isAnimating: boolean;
  elements: QueueElement[];
  enqueueValue: string;
  setEnqueueValue: (value: string) => void;
  handleEnqueue: () => void;
  handleDequeue: () => void;
  resetQueue: () => void;
  clearQueue: () => void;
  isEmpty: boolean;
  isFull: boolean;
}

export default function QueueControls({
  isAnimating,
  elements,
  enqueueValue,
  setEnqueueValue,
  handleEnqueue,
  handleDequeue,
  resetQueue,
  clearQueue,
  isEmpty,
  isFull,
}: QueueControlsProps) {
  const tabs = [
    {
      name: "Enqueue",
      value: "enqueue",
      icon: ArrowRightToLine,
    },
    {
      name: "Dequeue",
      value: "dequeue",
      icon: ArrowRightFromLine,
    },
    {
      name: "Reset",
      value: "reset",
      icon: RotateCcw,
    },
  ] as const;

  type TabValue = typeof tabs[number]["value"];

  const [activeTab, setActiveTab] = useState<TabValue>("enqueue");

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="font-semibold flex items-center">
            <ListOrdered className="w-4 h-4 mr-2" />
            Queue Controls
          </CardTitle>
          <CardDescription>
            Manage your queue with enqueue, dequeue, and reset operations.
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
        {activeTab === "enqueue" && (
          <EnqueueControl
            isAnimating={isAnimating}
            enqueueValue={enqueueValue}
            setEnqueueValue={setEnqueueValue}
            handleEnqueue={handleEnqueue}
            isFull={isFull}
          />
        )}
        {activeTab === "dequeue" && (
          <DequeueControl
            isAnimating={isAnimating}
            handleDequeue={handleDequeue}
            isEmpty={isEmpty}
            frontValue={elements[0]?.value}
          />
        )}
        {activeTab === "reset" && (
          <ResetControl
            isAnimating={isAnimating}
            resetQueue={resetQueue}
            clearQueue={clearQueue}
          />
        )}
      </div>
    </div>
  );
}

interface EnqueueControlProps {
  isAnimating: boolean;
  enqueueValue: string;
  setEnqueueValue: (value: string) => void;
  handleEnqueue: () => void;
  isFull: boolean;
}

function EnqueueControl({
  isAnimating,
  enqueueValue,
  setEnqueueValue,
  handleEnqueue,
  isFull,
}: EnqueueControlProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Enqueue</CardTitle>
        <CardDescription>
          Add a new element to the rear of the queue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="enqueue-value" className="block text-sm font-medium mb-1">
              Value
            </label>
            <div className="flex">
              <Input
                id="enqueue-value"
                type="number"
                placeholder="Enter a number"
                value={enqueueValue}
                onChange={(e) => setEnqueueValue(e.target.value)}
                min={0}
                max={999}
                disabled={isFull}
                className="flex-1"
              />
              <Button
                className="ml-2"
                variant="default"
                onClick={handleEnqueue}
                disabled={isAnimating || !enqueueValue || isFull}
              >
                <ArrowRightToLine className="mr-2 h-4 w-4" />
                Enqueue
              </Button>
            </div>
          </div>
          
          {isFull && (
            <div className="text-destructive text-sm">
              Queue is full! Dequeue an element before adding more.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface DequeueControlProps {
  isAnimating: boolean;
  handleDequeue: () => void;
  isEmpty: boolean;
  frontValue: number | undefined;
}

function DequeueControl({
  isAnimating,
  handleDequeue,
  isEmpty,
  frontValue,
}: DequeueControlProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Dequeue</CardTitle>
        <CardDescription>
          Remove an element from the front of the queue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            {!isEmpty ? (
              <div className="bg-muted p-4 rounded-md mb-4">
                <div className="text-sm">Next element to dequeue:</div>
                <div className="text-2xl font-bold">{frontValue}</div>
              </div>
            ) : (
              <div className="bg-muted p-4 rounded-md mb-4 text-muted-foreground">
                Queue is empty
              </div>
            )}
            
            <Button
              className="w-full"
              variant="default"
              onClick={handleDequeue}
              disabled={isAnimating || isEmpty}
            >
              <ArrowRightFromLine className="mr-2 h-4 w-4" />
              Dequeue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ResetControlProps {
  isAnimating: boolean;
  resetQueue: () => void;
  clearQueue: () => void;
}

function ResetControl({
  isAnimating,
  resetQueue,
  clearQueue,
}: ResetControlProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Reset Queue</CardTitle>
        <CardDescription>
          Reset your queue to the initial state or clear it entirely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={resetQueue} disabled={isAnimating} className="w-full">
            Reset to Initial
          </Button>
          <Button onClick={clearQueue} disabled={isAnimating} variant="outline" className="w-full">
            Clear Queue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
