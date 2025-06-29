export interface ArrayElement {
  id: string;
  value: number;
  index: number;
}

export interface StackElement {
  id: string;
  value: number;
  position: number; // Position from bottom (0 is bottom)
}

export interface LinkedListNode {
  id: string;
  value: number;
  position: number; // Position from head (0 is head)
  isHead?: boolean;
  isTail?: boolean;
}

export interface QueueElement {
  id: string;
  value: number;
  position: number; // Position in queue (0 is front)
  isFront?: boolean;
  isRear?: boolean;
}