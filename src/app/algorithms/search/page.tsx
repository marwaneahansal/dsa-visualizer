import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SearchVisualizer from "@/components/algorithms/search/search-visualizer";

export const metadata = {
  title: 'Search Algorithms Visualizer',
  description: 'Interactive visualization of common search algorithms including Linear Search, Binary Search, and Jump Search.',
};

export default function SearchAlgorithmsPage() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Algorithms</h1>
        <p className="text-muted-foreground">
          Visualize and understand how different search algorithms work step by step.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About Search Algorithms</CardTitle>
          <CardDescription>
            Search algorithms are methods for finding a specific element within a collection of data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This visualization tool helps you understand how different search algorithms locate an element 
            in an array. You can control the search process step by step, change the array size, and select 
            different algorithms to compare their efficiency and behavior.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-md">
              <h3 className="font-semibold mb-1">Linear Search</h3>
              <p className="text-sm text-muted-foreground">
                Sequentially checks each element until a match is found or the whole array is searched.
                Time Complexity: O(n)
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-md">
              <h3 className="font-semibold mb-1">Binary Search</h3>
              <p className="text-sm text-muted-foreground">
                Divides the search interval in half repeatedly until the target value is found or the interval is empty.
                Time Complexity: O(log n)
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-md">
              <h3 className="font-semibold mb-1">Jump Search</h3>
              <p className="text-sm text-muted-foreground">
                Jumps ahead by fixed steps and then uses linear search to find the element.
                Time Complexity: O(√n)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <SearchVisualizer />
    </div>
  );
}
