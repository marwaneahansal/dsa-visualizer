"use client";

import SortingControls from "./sorting-controls";
import SortingVisualization from "./sorting-visualization";
import useSortingOperations from "@/hooks/use-sorting-operations";

export default function SortingVisualizer() {
  const {
    algorithm,
    setAlgorithm,
    elements,
    steps,
    currentStep,
    arraySize,
    setArraySize,
    delay,
    setDelay,
    isSorting,
    isPaused,
    isCompleted,
    currentDescription,
    sortArray,
    resetArray,
    nextStep,
    prevStep,
    pauseSort,
    resumeSort,
    stopSort,
  } = useSortingOperations();

  return (
    <div className="max-w-screen-xl mx-auto">
      <SortingControls 
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        arraySize={arraySize}
        setArraySize={setArraySize}
        delay={delay}
        setDelay={setDelay}
        isSorting={isSorting}
        isPaused={isPaused}
        isCompleted={isCompleted}
        sortArray={sortArray}
        resetArray={resetArray}
        nextStep={nextStep}
        prevStep={prevStep}
        pauseSort={pauseSort}
        resumeSort={resumeSort}
        stopSort={stopSort}
        currentStep={currentStep}
        totalSteps={steps.length}
      />
      
      <SortingVisualization 
        elements={elements}
        description={currentDescription}
        currentStep={currentStep}
        totalSteps={steps.length}
      />
    </div>
  );
}
