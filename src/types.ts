export type NavigationTab =
  | 'home'
  | 'playground'
  | 'data-structures'
  | 'algorithms'
  | 'tools'
  | 'examples';

export interface CallStackFrame {
  id: string;
  name: string;
  line: number;
  params?: string;
}

export interface VariableState {
  name: string;
  value: string;
  type: string;
  scope?: string;
}

export interface StackMemoryBlock {
  address: string;
  name: string;
  value: string;
}

export interface HeapMemoryObject {
  address: string;
  type: string;
  value: string;
  references?: string[];
}

export interface ExecutionStep {
  stepNumber: number;
  line: number;
  codeLine: string;
  callStack: CallStackFrame[];
  variables: VariableState[];
  stackMemory: StackMemoryBlock[];
  heapMemory: HeapMemoryObject[];
  consoleOutput?: string;
  explanation: string;
  activeVariables?: string[];
}

export interface PresetCode {
  id: string;
  name: string;
  language: 'python' | 'javascript' | 'c' | 'cpp' | 'java' | 'typescript';
  description: string;
  code: string;
  steps: ExecutionStep[];
}

// Data Structure Node States
export type NodeState = 'default' | 'comparing' | 'found' | 'inserting' | 'removing' | 'swapping' | 'peeking';

export interface ArrayElement {
  id: string;
  value: number;
  index: number;
  state: NodeState;
}

export interface LinkedListNode {
  id: string;
  value: number;
  nextId: string | null;
  state: NodeState;
}

export interface StackItem {
  id: string;
  value: number;
  isTop?: boolean;
}

export interface QueueItem {
  id: string;
  value: number;
  isFront?: boolean;
  isRear?: boolean;
}

export interface BSTNode {
  id: string;
  value: number;
  leftId: string | null;
  rightId: string | null;
  x?: number;
  y?: number;
  state: NodeState;
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  state: NodeState;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
  highlighted?: boolean;
}

export interface HashMapBucket {
  index: number;
  entries: { key: string; value: string }[];
}

export interface HeapElement {
  value: number;
  index: number;
  state: NodeState;
}

// Challenge Types
export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Call Stack' | 'Pointers' | 'Data Structures' | 'Recursion';
  question: string;
  codeSnippet: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
