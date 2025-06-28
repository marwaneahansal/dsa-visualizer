"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, PlusCircle, MinusCircle, RotateCcw } from "lucide-react";
import { LinkedListNode } from "@/lib/types/data-structures";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LinkedListControlsProps {
  isAnimating: boolean;
  nodes: LinkedListNode[];
  insertValue: string;
  insertPosition: string;
  insertIndex: string;
  removePosition: string;
  removeIndex: string;
  setInsertValue: (value: string) => void;
  setInsertPosition: (position: string) => void;
  setInsertIndex: (index: string) => void;
  setRemovePosition: (position: string) => void;
  setRemoveIndex: (index: string) => void;
  handleInsert: () => void;
  handleRemove: () => void;
  resetList: () => void;
  clearList: () => void;
  isEmpty: boolean;
}

export default function LinkedListControls({
  isAnimating,
  nodes,
  insertValue,
  insertPosition,
  insertIndex,
  removePosition,
  removeIndex,
  setInsertValue,
  setInsertPosition,
  setInsertIndex,
  setRemovePosition,
  setRemoveIndex,
  handleInsert,
  handleRemove,
  resetList,
  clearList,
  isEmpty,
}: LinkedListControlsProps) {
  const tabs = [
    {
      name: "Insert",
      value: "insert",
      icon: PlusCircle,
    },
    {
      name: "Remove",
      value: "remove",
      icon: MinusCircle,
    },
    {
      name: "Reset",
      value: "reset",
      icon: RotateCcw,
    },
  ] as const;

  type TabValue = typeof tabs[number]["value"];

  const [activeTab, setActiveTab] = useState<TabValue>("insert");

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="font-semibold flex items-center">
            <Link2 className="w-4 h-4 mr-2" />
            Linked List Controls
          </CardTitle>
          <CardDescription>
            Manage your linked list with insert, remove, and reset operations.
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
        {activeTab === "insert" && (
          <InsertControl
            isAnimating={isAnimating}
            insertValue={insertValue}
            insertPosition={insertPosition}
            insertIndex={insertIndex}
            setInsertValue={setInsertValue}
            setInsertPosition={setInsertPosition}
            setInsertIndex={setInsertIndex}
            handleInsert={handleInsert}
            nodesLength={nodes.length}
          />
        )}
        {activeTab === "remove" && (
          <RemoveControl
            isAnimating={isAnimating}
            removePosition={removePosition}
            removeIndex={removeIndex}
            setRemovePosition={setRemovePosition}
            setRemoveIndex={setRemoveIndex}
            handleRemove={handleRemove}
            isEmpty={isEmpty}
            nodesLength={nodes.length}
          />
        )}
        {activeTab === "reset" && (
          <ResetControl
            isAnimating={isAnimating}
            resetList={resetList}
            clearList={clearList}
          />
        )}
      </div>
    </div>
  );
}

interface InsertControlProps {
  isAnimating: boolean;
  insertValue: string;
  insertPosition: string;
  insertIndex: string;
  setInsertValue: (value: string) => void;
  setInsertPosition: (position: string) => void;
  setInsertIndex: (index: string) => void;
  handleInsert: () => void;
  nodesLength: number;
}

function InsertControl({
  isAnimating,
  insertValue,
  insertPosition,
  insertIndex,
  setInsertValue,
  setInsertPosition,
  setInsertIndex,
  handleInsert,
  nodesLength,
}: InsertControlProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Insert Node</CardTitle>
        <CardDescription>
          Add a new node to the linked list at a specified position.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="insert-value" className="block text-sm font-medium mb-1">
              Value
            </label>
            <Input
              id="insert-value"
              type="number"
              placeholder="Enter a number"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              min={0}
              max={999}
            />
          </div>

          <div>
            <label htmlFor="insert-position" className="block text-sm font-medium mb-1">
              Position
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={insertPosition === "head" ? "default" : "outline"}
                size="sm"
                onClick={() => setInsertPosition("head")}
              >
                Head
              </Button>
              <Button
                variant={insertPosition === "tail" ? "default" : "outline"}
                size="sm"
                onClick={() => setInsertPosition("tail")}
              >
                Tail
              </Button>
              <Button
                variant={insertPosition === "index" ? "default" : "outline"}
                size="sm"
                onClick={() => setInsertPosition("index")}
              >
                At Index
              </Button>
            </div>
          </div>

          {insertPosition === "index" && (
            <div>
              <label htmlFor="insert-index" className="block text-sm font-medium mb-1">
                Index
              </label>
              <div className="flex">
                <Input
                  id="insert-index"
                  type="number"
                  placeholder={`0-${nodesLength}`}
                  value={insertIndex}
                  onChange={(e) => setInsertIndex(e.target.value)}
                  min={0}
                  max={nodesLength}
                  className="flex-1"
                />
                <Button
                  className="ml-2"
                  variant="default"
                  onClick={handleInsert}
                  disabled={isAnimating || !insertValue || (insertPosition === "index" && !insertIndex)}
                >
                  Insert
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Valid indices: 0 (head) to {nodesLength} (tail)
              </p>
            </div>
          )}

          {insertPosition !== "index" && (
            <Button
              className="w-full"
              variant="default"
              onClick={handleInsert}
              disabled={isAnimating || !insertValue}
            >
              Insert at {insertPosition === "head" ? "Head" : "Tail"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface RemoveControlProps {
  isAnimating: boolean;
  removePosition: string;
  removeIndex: string;
  setRemovePosition: (position: string) => void;
  setRemoveIndex: (index: string) => void;
  handleRemove: () => void;
  isEmpty: boolean;
  nodesLength: number;
}

function RemoveControl({
  isAnimating,
  removePosition,
  removeIndex,
  setRemovePosition,
  setRemoveIndex,
  handleRemove,
  isEmpty,
  nodesLength,
}: RemoveControlProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Remove Node</CardTitle>
        <CardDescription>
          Remove a node from the linked list at a specified position.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="remove-position" className="block text-sm font-medium mb-1">
              Position
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={removePosition === "head" ? "default" : "outline"}
                size="sm"
                onClick={() => setRemovePosition("head")}
                disabled={isEmpty}
              >
                Head
              </Button>
              <Button
                variant={removePosition === "tail" ? "default" : "outline"}
                size="sm"
                onClick={() => setRemovePosition("tail")}
                disabled={isEmpty}
              >
                Tail
              </Button>
              <Button
                variant={removePosition === "index" ? "default" : "outline"}
                size="sm"
                onClick={() => setRemovePosition("index")}
                disabled={isEmpty}
              >
                At Index
              </Button>
            </div>
          </div>

          {removePosition === "index" && (
            <div>
              <label htmlFor="remove-index" className="block text-sm font-medium mb-1">
                Index
              </label>
              <div className="flex">
                <Input
                  id="remove-index"
                  type="number"
                  placeholder={`0-${nodesLength - 1}`}
                  value={removeIndex}
                  onChange={(e) => setRemoveIndex(e.target.value)}
                  min={0}
                  max={nodesLength - 1}
                  className="flex-1"
                  disabled={isEmpty}
                />
                <Button
                  className="ml-2"
                  variant="default"
                  onClick={handleRemove}
                  disabled={isAnimating || isEmpty || (removePosition === "index" && !removeIndex)}
                >
                  Remove
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {isEmpty 
                  ? "List is empty" 
                  : `Valid indices: 0 (head) to ${nodesLength - 1} (tail)`
                }
              </p>
            </div>
          )}

          {removePosition !== "index" && (
            <Button
              className="w-full"
              variant="default"
              onClick={handleRemove}
              disabled={isAnimating || isEmpty}
            >
              Remove from {removePosition === "head" ? "Head" : "Tail"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ResetControlProps {
  isAnimating: boolean;
  resetList: () => void;
  clearList: () => void;
}

function ResetControl({
  isAnimating,
  resetList,
  clearList,
}: ResetControlProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Reset List</CardTitle>
        <CardDescription>
          Reset your linked list to the initial state or clear it entirely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={resetList}
            disabled={isAnimating}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Initial State
          </Button>

          <Button
            className="w-full"
            variant="destructive"
            onClick={clearList}
            disabled={isAnimating}
          >
            <MinusCircle className="mr-2 h-4 w-4" />
            Clear List
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
