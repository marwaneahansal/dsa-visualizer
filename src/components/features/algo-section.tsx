import { ArrowRight, ChartColumnIncreasing, Search } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export const AlgoSections = () => {
  const algorithms = [
    {
      name: "Sorting Algorithms",
      description: "Visualize various sorting algorithms like Quick Sort, Merge Sort, and more.",
      icon: ChartColumnIncreasing,
      link: "/algorithms/sorting",
    },
    {
      name: "Searching Algorithms",
      description: "Explore searching algorithms such as Binary Search and Linear Search.",
      icon: Search,
      link: "/algorithms/search",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-2">Algorithms</h2>
        <p className="text-center mb-4">
          Dive into the world of algorithms and see how they work through interactive
          visualizations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {algorithms.map((algo, index) => (
            <Card
              key={algo.name}
              className="relative group border-dark-border hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={algo.link} className="absolute inset-0 w-full h-full z-10" />
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 group-hover:text-primary rounded-lg flex items-center mb-4 transition-colors`}
                >
                  <algo.icon className={`h-6 w-6`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {algo.name}
                </h3>
                <p className="text-accent-foreground mb-4 text-sm group-hover:text-primary/90 transition-colors">
                  {algo.description}
                </p>
                <div className="flex items-center text-accent-foreground group-hover:text-primary transition-colors">
                  <span className="text-sm font-medium">Try it out</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
          {/* <Card
            className="group border-dark-border hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ animationDelay: `${algorithms.length * 0.1}s` }}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <p>More algorithms coming soon!</p>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </section>
  );
};
export default AlgoSections;
