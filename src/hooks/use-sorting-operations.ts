"use client";

import { useState, useCallback, useEffect } from 'react';
import { SortingAlgorithm, SortingElement, SortingStep, ALGORITHM_CONFIGS } from '@/lib/types/algorithms';

export default function useSortingOperations() {
  // Generate a random array of a given size
  const generateRandomArray = useCallback((size: number): SortingElement[] => {
    const newArray = Array.from({ length: size }, (_, i) => ({
      id: `element-${i}`,
      value: Math.floor(Math.random() * 100) + 1, // 1-100
      index: i,
    }));
    return newArray;
  }, []);
  
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [elements, setElements] = useState<SortingElement[]>(() => generateRandomArray(10));
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [arraySize, setArraySize] = useState<number>(10);
  const [delay, setDelay] = useState<number>(500); // ms between steps
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);


  // Reset the array with new random values
  const resetArray = useCallback(() => {
    setElements(generateRandomArray(arraySize));
    setSteps([]);
    setCurrentStep(-1);
    setIsCompleted(false);
  }, [arraySize, generateRandomArray]);

  // Reset when array size changes
  useEffect(() => {
    resetArray();
  }, [arraySize, resetArray]);

  // Implement Bubble Sort algorithm with steps
  const bubbleSort = useCallback((arr: SortingElement[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const n = arr.length;
    const sortingArray = JSON.parse(JSON.stringify(arr)); // deep clone
    
    steps.push({
      elements: JSON.parse(JSON.stringify(sortingArray)),
      description: 'Starting Bubble Sort',
      stepIndex: steps.length
    });

    for (let i = 0; i < n; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Mark elements being compared
        sortingArray[j].isComparing = true;
        sortingArray[j + 1].isComparing = true;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(sortingArray)),
          description: `Comparing elements at indices ${j} and ${j+1}`,
          stepIndex: steps.length
        });
        
        if (sortingArray[j].value > sortingArray[j + 1].value) {
          // Mark elements being swapped
          sortingArray[j].isSwapping = true;
          sortingArray[j + 1].isSwapping = true;
          
          steps.push({
            elements: JSON.parse(JSON.stringify(sortingArray)),
            description: `Swapping elements at indices ${j} and ${j+1}`,
            stepIndex: steps.length
          });
          
          // Perform the swap
          [sortingArray[j], sortingArray[j + 1]] = [sortingArray[j + 1], sortingArray[j]];
          // Update indices after swap
          sortingArray[j].index = j;
          sortingArray[j + 1].index = j + 1;
          
          swapped = true;
          
          // Show after swap
          steps.push({
            elements: JSON.parse(JSON.stringify(sortingArray)),
            description: `Swapped elements at indices ${j} and ${j+1}`,
            stepIndex: steps.length
          });
        }
        
        // Reset comparison and swap flags
        sortingArray[j].isComparing = false;
        sortingArray[j].isSwapping = false;
        sortingArray[j + 1].isComparing = false;
        sortingArray[j + 1].isSwapping = false;
      }
      
      // Mark the last element as sorted
      sortingArray[n - i - 1].isSorted = true;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(sortingArray)),
        description: `Element at index ${n-i-1} is now in its sorted position`,
        stepIndex: steps.length
      });
      
      // If no swaps occurred, the array is sorted
      if (!swapped) {
        // Mark remaining elements as sorted
        for (let k = 0; k < n - i - 1; k++) {
          sortingArray[k].isSorted = true;
        }
        
        steps.push({
          elements: JSON.parse(JSON.stringify(sortingArray)),
          description: 'No swaps occurred, array is sorted',
          stepIndex: steps.length
        });
        
        break;
      }
    }
    
    return steps;
  }, []);

  // Implement Selection Sort algorithm with steps
  const selectionSort = useCallback((arr: SortingElement[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const n = arr.length;
    const sortingArray = JSON.parse(JSON.stringify(arr)); // deep clone
    
    steps.push({
      elements: JSON.parse(JSON.stringify(sortingArray)),
      description: 'Starting Selection Sort',
      stepIndex: steps.length
    });
    
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      sortingArray[i].isCurrent = true;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(sortingArray)),
        description: `Looking for minimum element starting from index ${i}`,
        stepIndex: steps.length
      });
      
      for (let j = i + 1; j < n; j++) {
        // Mark element being compared
        sortingArray[j].isComparing = true;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(sortingArray)),
          description: `Comparing with element at index ${j}`,
          stepIndex: steps.length
        });
        
        if (sortingArray[j].value < sortingArray[minIndex].value) {
          // Reset previous minimum
          if (minIndex !== i) {
            sortingArray[minIndex].isComparing = false;
          }
          minIndex = j;
          sortingArray[minIndex].isComparing = true;
          
          steps.push({
            elements: JSON.parse(JSON.stringify(sortingArray)),
            description: `Found new minimum at index ${j}`,
            stepIndex: steps.length
          });
        } else {
          sortingArray[j].isComparing = false;
        }
      }
      
      if (minIndex !== i) {
        // Mark elements being swapped
        sortingArray[i].isSwapping = true;
        sortingArray[minIndex].isSwapping = true;
        sortingArray[minIndex].isComparing = false;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(sortingArray)),
          description: `Swapping elements at indices ${i} and ${minIndex}`,
          stepIndex: steps.length
        });
        
        // Perform the swap
        [sortingArray[i], sortingArray[minIndex]] = [sortingArray[minIndex], sortingArray[i]];
        // Update indices after swap
        sortingArray[i].index = i;
        sortingArray[minIndex].index = minIndex;
        
        // Reset flags
        sortingArray[i].isSwapping = false;
        sortingArray[minIndex].isSwapping = false;
      }
      
      // Mark current element as sorted
      sortingArray[i].isCurrent = false;
      sortingArray[i].isSorted = true;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(sortingArray)),
        description: `Element at index ${i} is now in its sorted position`,
        stepIndex: steps.length
      });
    }
    
    // Mark the last element as sorted
    sortingArray[n - 1].isSorted = true;
    
    steps.push({
      elements: JSON.parse(JSON.stringify(sortingArray)),
      description: 'Array is sorted',
      stepIndex: steps.length
    });
    
    return steps;
  }, []);

  // Implement Insertion Sort algorithm with steps
  const insertionSort = useCallback((arr: SortingElement[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const n = arr.length;
    const sortingArray = JSON.parse(JSON.stringify(arr)); // deep clone
    
    steps.push({
      elements: JSON.parse(JSON.stringify(sortingArray)),
      description: 'Starting Insertion Sort',
      stepIndex: steps.length
    });
    
    // Mark first element as sorted
    sortingArray[0].isSorted = true;
    
    steps.push({
      elements: JSON.parse(JSON.stringify(sortingArray)),
      description: 'First element is considered sorted',
      stepIndex: steps.length
    });
    
    for (let i = 1; i < n; i++) {
      // Current element to insert
      const key = { ...sortingArray[i] };
      sortingArray[i].isCurrent = true;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(sortingArray)),
        description: `Inserting element at index ${i} into sorted portion`,
        stepIndex: steps.length
      });
      
      let j = i - 1;
      
      while (j >= 0 && sortingArray[j].value > key.value) {
        // Mark element being compared
        sortingArray[j].isComparing = true;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(sortingArray)),
          description: `Comparing with element at index ${j}`,
          stepIndex: steps.length
        });
        
        // Move element one position ahead
        sortingArray[j + 1] = { ...sortingArray[j], index: j + 1 };
        sortingArray[j + 1].isComparing = false;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(sortingArray)),
          description: `Moving element from index ${j} to index ${j+1}`,
          stepIndex: steps.length
        });
        
        j--;
      }
      
      // Place current element in its correct position
      sortingArray[j + 1] = { ...key, index: j + 1 };
      sortingArray[j + 1].isCurrent = false;
      sortingArray[j + 1].isSorted = true;
      
      // Mark all elements in the sorted portion
      for (let k = 0; k <= i; k++) {
        sortingArray[k].isSorted = true;
      }
      
      steps.push({
        elements: JSON.parse(JSON.stringify(sortingArray)),
        description: `Inserted element at correct position ${j+1}`,
        stepIndex: steps.length
      });
    }
    
    steps.push({
      elements: JSON.parse(JSON.stringify(sortingArray)),
      description: 'Array is sorted',
      stepIndex: steps.length
    });
    
    return steps;
  }, []);

  // Function to sort the array based on the selected algorithm
  const sortArray = useCallback(() => {
    setIsSorting(true);
    setIsPaused(false);
    setIsCompleted(false);
    setCurrentStep(-1);
    
    let sortingSteps: SortingStep[] = [];
    
    switch (algorithm) {
      case 'bubble':
        sortingSteps = bubbleSort(elements);
        break;
      case 'selection':
        sortingSteps = selectionSort(elements);
        break;
      case 'insertion':
        sortingSteps = insertionSort(elements);
        break;
      case 'merge':
        // To be implemented
        sortingSteps = [{ elements, description: 'Merge Sort not yet implemented', stepIndex: 0 }];
        break;
      case 'quick':
        // To be implemented
        sortingSteps = [{ elements, description: 'Quick Sort not yet implemented', stepIndex: 0 }];
        break;
      default:
        sortingSteps = bubbleSort(elements);
    }
    
    setSteps(sortingSteps);
    
  }, [algorithm, elements, bubbleSort, selectionSort, insertionSort]);

  // Step through the sorting process
  useEffect(() => {
    if (!isSorting || isPaused || steps.length === 0 || currentStep >= steps.length - 1) {
      if (currentStep >= steps.length - 1 && steps.length > 0) {
        setIsCompleted(true);
        setIsSorting(false);
      }
      return;
    }
    
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isSorting, isPaused, currentStep, steps.length, delay]);

  // Update elements when step changes
  useEffect(() => {
    if (currentStep >= 0 && steps[currentStep]) {
      setElements(steps[currentStep].elements);
    }
  }, [currentStep, steps]);

  // Controls for the sorting visualization
  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      setIsSorting(false);
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const pauseSort = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeSort = useCallback(() => {
    setIsPaused(false);
  }, []);

  const stopSort = useCallback(() => {
    setIsSorting(false);
    setIsPaused(false);
    setCurrentStep(-1);
    resetArray();
  }, [resetArray]);

  return {
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
    currentDescription: steps[currentStep]?.description || 'Ready to sort',
    algorithmConfig: ALGORITHM_CONFIGS[algorithm],
    sortArray,
    resetArray,
    nextStep,
    prevStep,
    pauseSort,
    resumeSort,
    stopSort,
  };
}
