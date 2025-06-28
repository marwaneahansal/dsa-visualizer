import LinkedListVisualizer from "@/components/data-structures/linked-list/linked-list-visualizer";

export default function LinkedListPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Linked List Visualization</h1>
      <p className="text-muted-foreground mb-8">
        A linked list is a linear data structure where each element points to the next.
        Unlike arrays, linked lists don&apos;t need to be stored contiguously in memory, enabling dynamic memory allocation.
      </p>

      <LinkedListVisualizer />
    </div>
  );
}
