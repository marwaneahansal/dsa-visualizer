export interface SortingElement {
  id: string;
  value: number;
  index: number;
  isComparing?: boolean;
  isSwapping?: boolean;
  isSorted?: boolean;
  isCurrent?: boolean;
  isPivot?: boolean;
}

export type SortingAlgorithm = 
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick";

export interface SortingStep {
  elements: SortingElement[];
  description: string;
  stepIndex: number;
}

export interface SortingConfig {
  algorithmName: string;
  algorithmKey: SortingAlgorithm;
  complexity: {
    time: {
      best: string;
      average: string;
      worst: string;
    };
    space: string;
  };
  stable: boolean;
  description: string;
}

export const ALGORITHM_CONFIGS: Record<SortingAlgorithm, SortingConfig> = {
  bubble: {
    algorithmName: "Bubble Sort",
    algorithmKey: "bubble",
    complexity: {
      time: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
    },
    stable: true,
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
  },
  selection: {
    algorithmName: "Selection Sort",
    algorithmKey: "selection",
    complexity: {
      time: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
    },
    stable: false,
    description: "Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.",
  },
  insertion: {
    algorithmName: "Insertion Sort",
    algorithmKey: "insertion",
    complexity: {
      time: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
    },
    stable: true,
    description: "Builds the sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position.",
  },
  merge: {
    algorithmName: "Merge Sort",
    algorithmKey: "merge",
    complexity: {
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      space: "O(n)",
    },
    stable: true,
    description: "Divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
  },
  quick: {
    algorithmName: "Quick Sort",
    algorithmKey: "quick",
    complexity: {
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      space: "O(log n)",
    },
    stable: false,
    description: "Selects a 'pivot' element and partitions the array around it, recursively sorting the sub-arrays.",
  },
};
