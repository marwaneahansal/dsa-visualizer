import QueueVisualizer from "@/components/data-structures/queue/queue-visualizer";

export default function QueuePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Queue Visualization</h1>
      <p className="text-muted-foreground mb-8">
        A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle.
        Elements are added at the rear and removed from the front of the queue.
      </p>

      <QueueVisualizer />
    </div>
  );
}
