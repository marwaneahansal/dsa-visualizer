import SortingVisualizer from "@/components/algorithms/sorting/sorting-visualizer";

export default function SortingAlgorithmsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Sorting Algorithm Visualization</h1>
      <p className="text-muted-foreground mb-8">
        Visualize and understand various sorting algorithms and their step-by-step execution.
        Compare algorithms by their time complexity, space complexity, and visualization.
      </p>

      <SortingVisualizer />
    </div>
  );
}
