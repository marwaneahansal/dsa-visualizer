import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

interface Link {
  href: string;
  label: string;
  description: string;
}

const dsLinks: Link[] = [
  {
    href: "/data-structures/array",
    label: "Array",
    description: "Visualize array operations like insertion, deletion, and searching.",
  },
  {
    href: "/data-structures/linked-list",
    label: "Linked List",
    description: "Explore linked list operations with interactive animations.",
  },
  {
    href: "/data-structures/stack",
    label: "Stack",
    description: "Understand stack operations like push, pop, and peek with visual aids.",
  },
  {
    href: "/data-structures/queue",
    label: "Queue",
    description: "Visualize queue operations such as enqueue, dequeue, and peek.",
  },
];

const algoLinks: Link[] = [
  {
    href: "/algorithms/sorting",
    label: "Sorting Algorithms",
    description: "Learn about various sorting algorithms with step-by-step visualizations.",
  },
  {
    href: "/algorithms/search",
    label: "Searching Algorithms",
    description: "Explore searching algorithms like binary search with interactive examples.",
  },
]

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/">Home</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Data Structures</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-2 md:w-[400px] lg:w-[500px]">
            <li className="row-span-2">
              <NavigationMenuLink asChild>
                <Link
                  className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                  href="/data-structures"
                >
                  <div className="mt-4 mb-2 text-lg font-medium">Data Structures</div>
                  <p className="text-muted-foreground text-sm leading-tight">
                    Explore a variety of data structures with interactive visualizations and explanations.
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            {dsLinks.map((link) => (
              <ListItem href={link.href} title={link.label} key={link.href}>
                {link.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Algorithms</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-2 md:w-[400px] lg:w-[500px]">
            <li className="row-span-2">
              <NavigationMenuLink asChild>
                <Link
                  className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                  href="/algorithms"
                >
                  <div className="mt-4 mb-2 text-lg font-medium">Algorithms</div>
                  <p className="text-muted-foreground text-sm leading-tight">
                    Explore a variety of algorithms with interactive visualizations and explanations.
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            {algoLinks.map((link) => (
              <ListItem href={link.href} title={link.label} key={link.href}>
                {link.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}