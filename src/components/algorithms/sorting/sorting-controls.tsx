"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Square, 
  BarChart, 
  Pause,
  Shuffle
} from "lucide-react";
import { SortingAlgorithm, ALGORITHM_CONFIGS } from "@/lib/types/algorithms";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortingControlsProps {
  algorithm: SortingAlgorithm;
  setAlgorithm: (algorithm: SortingAlgorithm) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  delay: number;
  setDelay: (delay: number) => void;
  isSorting: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  sortArray: () => void;
  resetArray: () => void;
  nextStep: () => void;
  prevStep: () => void;
  pauseSort: () => void;
  resumeSort: () => void;
  stopSort: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function SortingControls({
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  delay,
  setDelay,
  isSorting,
  isPaused,
  isCompleted,
  sortArray,
  resetArray,
  nextStep,
  prevStep,
  pauseSort,
  resumeSort,
  stopSort,
  currentStep,
  totalSteps,
}: SortingControlsProps) {

  return (
    <div className="mb-8">
      <Tabs defaultValue="controls" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="info">Algorithm Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="controls">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Settings</CardTitle>
                <CardDescription>
                  Configure the sorting algorithm and array.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Algorithm selection */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Algorithm
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={isSorting}>
                      <Button variant="outline" className="w-full justify-between">
                        {ALGORITHM_CONFIGS[algorithm].algorithmName}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select Algorithm</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {Object.entries(ALGORITHM_CONFIGS).map(([key, config]) => (
                        <DropdownMenuItem 
                          key={key}
                          onClick={() => setAlgorithm(key as SortingAlgorithm)}
                          className={cn(
                            "cursor-pointer",
                            algorithm === key && "bg-primary/10"
                          )}
                        >
                          {config.algorithmName}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Array size */}
                <div>
                  <label htmlFor="array-size" className="block text-sm font-medium mb-1">
                    Array Size: {arraySize}
                  </label>
                  <Input
                    id="array-size"
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={arraySize}
                    onChange={(e) => setArraySize(parseInt(e.target.value))}
                    disabled={isSorting}
                    className="w-full"
                  />
                </div>
                
                {/* Animation speed */}
                <div>
                  <label htmlFor="animation-speed" className="block text-sm font-medium mb-1">
                    Animation Speed: {Math.round(1000 / delay)} steps/sec
                  </label>
                  <Input
                    id="animation-speed"
                    type="range"
                    min={50}
                    max={1000}
                    step={50}
                    value={delay}
                    onChange={(e) => setDelay(1000 - parseInt(e.target.value) + 50)}
                    className="w-full"
                  />
                </div>
                
                {/* Array reset */}
                <Button 
                  onClick={resetArray} 
                  variant="outline" 
                  className="w-full"
                  disabled={isSorting && !isCompleted}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate New Array
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sorting Controls</CardTitle>
                <CardDescription>
                  Start and control the sorting process.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main control buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {!isSorting ? (
                    <Button 
                      onClick={sortArray} 
                      variant="default" 
                      className="w-full"
                      disabled={isCompleted}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Sort Array
                    </Button>
                  ) : (
                    <>
                      {isPaused ? (
                        <Button 
                          onClick={resumeSort} 
                          variant="default" 
                          className="w-full"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Resume
                        </Button>
                      ) : (
                        <Button 
                          onClick={pauseSort} 
                          variant="outline" 
                          className="w-full"
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      )}
                    </>
                  )}
                  
                  <Button 
                    onClick={stopSort} 
                    variant="destructive" 
                    className="w-full"
                    disabled={!isSorting && !isCompleted}
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
                
                {/* Step controls */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={prevStep} 
                    variant="outline" 
                    className="w-full"
                    disabled={currentStep <= 0 || (!isPaused && isSorting)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button 
                    onClick={nextStep} 
                    variant="outline" 
                    className="w-full"
                    disabled={currentStep >= totalSteps - 1 || (!isPaused && isSorting)}
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Next
                  </Button>
                </div>
                
                {/* Progress info */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    Step {currentStep >= 0 ? currentStep + 1 : 0} of {totalSteps}
                  </p>
                  {isCompleted && (
                    <p className="text-success mt-2">Sorting Complete!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="info">
          <AlgorithmInfo algorithm={algorithm} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AlgorithmInfo({ algorithm }: { algorithm: SortingAlgorithm }) {
  const config = ALGORITHM_CONFIGS[algorithm];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold flex items-center">
          <BarChart className="w-4 h-4 mr-2" />
          {config.algorithmName}
        </CardTitle>
        <CardDescription>
          Learn about {config.algorithmName} algorithm characteristics.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{config.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Time Complexity</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Best case:</span> 
                <span className="font-mono">{config.complexity.time.best}</span>
              </li>
              <li className="flex justify-between">
                <span>Average case:</span> 
                <span className="font-mono">{config.complexity.time.average}</span>
              </li>
              <li className="flex justify-between">
                <span>Worst case:</span> 
                <span className="font-mono">{config.complexity.time.worst}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Characteristics</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Space complexity:</span> 
                <span className="font-mono">{config.complexity.space}</span>
              </li>
              <li className="flex justify-between">
                <span>Stable:</span> 
                <span>{config.stable ? "Yes" : "No"}</span>
              </li>
              <li className="flex justify-between">
                <span>Type:</span> 
                <span>{getAlgorithmType(algorithm)}</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to get algorithm type
function getAlgorithmType(algorithm: SortingAlgorithm): string {
  switch (algorithm) {
    case "bubble":
    case "selection":
    case "insertion":
      return "Comparison-based";
    case "merge":
      return "Divide and Conquer";
    case "quick":
      return "Divide and Conquer, Partitioning";
    default:
      return "Unknown";
  }
}
