import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrayElement, NodeState, StackItem, QueueItem, NavigationTab } from '../types';
import {
  Database,
  Plus,
  Trash2,
  Search,
  Shuffle,
  RotateCcw,
  Layers,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Workflow,
  Sparkles,
  Play,
  Eye
} from 'lucide-react';

interface BSTNode {
  value: number;
  left?: BSTNode;
  right?: BSTNode;
}

function insertBST(root: BSTNode | undefined, value: number): BSTNode {
  if (!root) return { value };
  if (value < root.value) {
    return { ...root, left: insertBST(root.left, value) };
  } else if (value > root.value) {
    return { ...root, right: insertBST(root.right, value) };
  }
  return root;
}

function deleteBST(root: BSTNode | undefined, value: number): BSTNode | undefined {
  if (!root) return undefined;
  if (value < root.value) {
    return { ...root, left: deleteBST(root.left, value) };
  } else if (value > root.value) {
    return { ...root, right: deleteBST(root.right, value) };
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let minNode = root.right;
    while (minNode.left) minNode = minNode.left;
    return {
      ...root,
      value: minNode.value,
      right: deleteBST(root.right, minNode.value)
    };
  }
}

function inOrderBST(root: BSTNode | undefined, res: number[] = []): number[] {
  if (!root) return res;
  inOrderBST(root.left, res);
  res.push(root.value);
  inOrderBST(root.right, res);
  return res;
}

function preOrderBST(root: BSTNode | undefined, res: number[] = []): number[] {
  if (!root) return res;
  res.push(root.value);
  preOrderBST(root.left, res);
  preOrderBST(root.right, res);
  return res;
}

function postOrderBST(root: BSTNode | undefined, res: number[] = []): number[] {
  if (!root) return res;
  postOrderBST(root.left, res);
  postOrderBST(root.right, res);
  res.push(root.value);
  return res;
}

function searchBSTPath(root: BSTNode | undefined, target: number, path: number[] = []): { found: boolean; path: number[] } {
  if (!root) return { found: false, path };
  path.push(root.value);
  if (root.value === target) return { found: true, path };
  if (target < root.value) return searchBSTPath(root.left, target, path);
  return searchBSTPath(root.right, target, path);
}

interface FlatBSTNode {
  id: string;
  value: number;
  x: number;
  y: number;
  px?: number;
  py?: number;
}

function computeBSTFlatNodes(
  node: BSTNode | undefined,
  x: number,
  y: number,
  gap: number,
  px?: number,
  py?: number,
  acc: FlatBSTNode[] = []
): FlatBSTNode[] {
  if (!node) return acc;
  acc.push({ id: `bst-${node.value}`, value: node.value, x, y, px, py });
  if (node.left) {
    computeBSTFlatNodes(node.left, x - gap, y + 55, Math.max(22, gap / 1.8), x, y, acc);
  }
  if (node.right) {
    computeBSTFlatNodes(node.right, x + gap, y + 55, Math.max(22, gap / 1.8), x, y, acc);
  }
  return acc;
}

interface HeapTreeNode {
  id: number;
  value: number;
  x: number;
  y: number;
  px?: number;
  py?: number;
}

function computeHeapTreeNodes(arr: number[]): HeapTreeNode[] {
  if (!arr || arr.length === 0) return [];
  const nodes: HeapTreeNode[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      nodes.push({ id: 0, value: arr[0], x: 280, y: 40 });
    } else {
      const parentIdx = Math.floor((i - 1) / 2);
      const parentNode = nodes[parentIdx];
      const level = Math.floor(Math.log2(i + 1));
      const offset = Math.max(22, 130 / Math.pow(2, level - 1));
      const isLeft = i === 2 * parentIdx + 1;
      const x = isLeft ? parentNode.x - offset : parentNode.x + offset;
      const y = parentNode.y + 55;
      nodes.push({
        id: i,
        value: arr[i],
        x,
        y,
        px: parentNode.x,
        py: parentNode.y
      });
    }
  }
  return nodes;
}

const defaultBSTRoot: BSTNode = {
  value: 50,
  left: {
    value: 30,
    left: { value: 20 },
    right: { value: 40 }
  },
  right: {
    value: 70,
    left: { value: 60 },
    right: { value: 80 }
  }
};

interface DataStructuresViewProps {
  setCurrentTab: (tab: NavigationTab) => void;
  isDarkMode?: boolean;
}

export const DataStructuresView: React.FC<DataStructuresViewProps> = ({ setCurrentTab, isDarkMode = true }) => {
  const [activeDs, setActiveDs] = useState<
    'array' | 'linked-list' | 'stack-queue' | 'bst' | 'graph' | 'hash-map' | 'heap'
  >('array');

  // ARRAY STATE
  const [array, setArray] = useState<ArrayElement[]>([
    { id: '1', value: 10, index: 0, state: 'default' },
    { id: '2', value: 25, index: 1, state: 'default' },
    { id: '3', value: 7, index: 2, state: 'default' },
    { id: '4', value: 42, index: 3, state: 'default' },
    { id: '5', value: 18, index: 4, state: 'default' },
    { id: '6', value: 33, index: 5, state: 'default' },
    { id: '7', value: 5, index: 6, state: 'default' },
    { id: '8', value: 29, index: 7, state: 'default' }
  ]);
  const [inputValue, setInputValue] = useState<string>('15');
  const [inputIndex, setInputIndex] = useState<string>('2');
  const [statusMessage, setStatusMessage] = useState<string>('Array initialized with 8 elements.');

  // STACK & QUEUE STATE
  const [stack, setStack] = useState<StackItem[]>([
    { id: 's1', value: 10 },
    { id: 's2', value: 25 },
    { id: 's3', value: 7 }
  ]);
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: 'q1', value: 15 },
    { id: 'q2', value: 30 },
    { id: 'q3', value: 8 }
  ]);
  const [stackValInput, setStackValInput] = useState<string>('99');
  const [queueValInput, setQueueValInput] = useState<string>('45');
  
  // Action state tracking for operational colors (green = insert, red = delete, blue = peek)
  const [stackAction, setStackAction] = useState<{ idx: number; type: 'insert' | 'delete' | 'peek' } | null>(null);
  const [stackStatusMsg, setStackStatusMsg] = useState<string>('Stack initialized.');

  const [queueAction, setQueueAction] = useState<{ idx: number; type: 'insert' | 'delete' | 'peek' } | null>(null);
  const [queueStatusMsg, setQueueStatusMsg] = useState<string>('Queue initialized.');

  // LINKED LIST STATE & TYPES
  const [llType, setLlType] = useState<'singly' | 'doubly' | 'circular'>('singly');
  const [linkedList, setLinkedList] = useState<number[]>([12, 45, 78, 34]);
  const [llInputVal, setLlInputVal] = useState<string>('99');
  const [llInputIndex, setLlInputIndex] = useState<string>('1');
  const [llAction, setLlAction] = useState<{ idx: number; type: 'insert' | 'delete' | 'peek' | 'search' } | null>(null);
  const [llStatusMsg, setLlStatusMsg] = useState<string>('Singly Linked List initialized.');

  // LINKED LIST HANDLERS
  const handleLLInsertHead = () => {
    const val = parseInt(llInputVal) || Math.floor(Math.random() * 90) + 10;
    setLinkedList([val, ...linkedList]);
    setLlAction({ idx: 0, type: 'insert' });
    setLlStatusMsg(`Inserted ${val} (Head) with GREEN animation.`);
    setTimeout(() => setLlAction(null), 900);
  };

  const handleLLInsertTail = () => {
    const val = parseInt(llInputVal) || Math.floor(Math.random() * 90) + 10;
    const newIdx = linkedList.length;
    setLinkedList([...linkedList, val]);
    setLlAction({ idx: newIdx, type: 'insert' });
    setLlStatusMsg(`Inserted ${val} (Tail) with GREEN animation.`);
    setTimeout(() => setLlAction(null), 900);
  };

  const handleLLInsertAt = () => {
    const val = parseInt(llInputVal) || 50;
    const idx = Math.max(0, Math.min(linkedList.length, parseInt(llInputIndex) || 0));
    const newLL = [...linkedList];
    newLL.splice(idx, 0, val);
    setLinkedList(newLL);
    setLlAction({ idx, type: 'insert' });
    setLlStatusMsg(`Inserted ${val} at Index ${idx} with GREEN animation.`);
    setTimeout(() => setLlAction(null), 900);
  };

  const handleLLDeleteHead = () => {
    if (linkedList.length === 0) return;
    const removed = linkedList[0];
    setLlAction({ idx: 0, type: 'delete' });
    setLlStatusMsg(`Deleting Head node (${removed})... Fading RED!`);
    
    setTimeout(() => {
      setLinkedList((prev) => prev.slice(1));
      setLlAction(null);
      setLlStatusMsg(`Deleted Head node (${removed}).`);
    }, 650);
  };

  const handleLLDeleteTail = () => {
    if (linkedList.length === 0) return;
    const idx = linkedList.length - 1;
    const removed = linkedList[idx];
    setLlAction({ idx, type: 'delete' });
    setLlStatusMsg(`Deleting Tail node (${removed})... Fading RED!`);

    setTimeout(() => {
      setLinkedList((prev) => prev.slice(0, -1));
      setLlAction(null);
      setLlStatusMsg(`Deleted Tail node (${removed}).`);
    }, 650);
  };

  const handleLLDeleteAt = () => {
    if (linkedList.length === 0) return;
    const idx = Math.max(0, Math.min(linkedList.length - 1, parseInt(llInputIndex) || 0));
    const removed = linkedList[idx];
    setLlAction({ idx, type: 'delete' });
    setLlStatusMsg(`Deleting Node at index ${idx} (${removed})... Fading RED!`);

    setTimeout(() => {
      setLinkedList((prev) => prev.filter((_, i) => i !== idx));
      setLlAction(null);
      setLlStatusMsg(`Deleted Node at index ${idx} (${removed}).`);
    }, 650);
  };

  const handleLLDeleteValue = () => {
    const target = parseInt(llInputVal);
    if (isNaN(target)) return;
    const idx = linkedList.indexOf(target);
    if (idx === -1) {
      setLlStatusMsg(`Value ${target} not found in Linked List.`);
      return;
    }
    setLlAction({ idx, type: 'delete' });
    setLlStatusMsg(`Deleting value ${target}... Fading RED!`);

    setTimeout(() => {
      setLinkedList((prev) => prev.filter((v) => v !== target));
      setLlAction(null);
      setLlStatusMsg(`Deleted value ${target}.`);
    }, 650);
  };

  const handleLLPeekHead = () => {
    if (linkedList.length === 0) return;
    setLlAction({ idx: 0, type: 'peek' });
    setLlStatusMsg(`Peek Head: Value is ${linkedList[0]} (BLUE highlight).`);
    setTimeout(() => setLlAction(null), 1300);
  };

  const handleLLPeekTail = () => {
    if (linkedList.length === 0) return;
    const idx = linkedList.length - 1;
    setLlAction({ idx, type: 'peek' });
    setLlStatusMsg(`Peek Tail: Value is ${linkedList[idx]} (BLUE highlight).`);
    setTimeout(() => setLlAction(null), 1300);
  };

  const handleLLSearch = async () => {
    const target = parseInt(llInputVal);
    if (isNaN(target)) return;
    setLlStatusMsg(`Searching for ${target}...`);
    for (let i = 0; i < linkedList.length; i++) {
      setLlAction({ idx: i, type: 'search' });
      await new Promise((r) => setTimeout(r, 450));
      if (linkedList[i] === target) {
        setLlStatusMsg(`Found value ${target} at Node Index ${i}!`);
        return;
      }
    }
    setLlAction(null);
    setLlStatusMsg(`Value ${target} not found in Linked List.`);
  };

  const handleLLTraverse = async () => {
    if (linkedList.length === 0) {
      setLlStatusMsg('Linked list is empty.');
      return;
    }
    setLlStatusMsg(`Traversing ${llType.toUpperCase()} Linked List...`);
    for (let i = 0; i < linkedList.length; i++) {
      setLlAction({ idx: i, type: 'search' });
      await new Promise((r) => setTimeout(r, 450));
    }
    setLlAction(null);
    setLlStatusMsg(`Completed traversal: ${linkedList.join(' → ')}`);
  };

  // HASH MAP STATE
  const [mapBuckets, setMapBuckets] = useState<Array<Array<{ key: string; value: string }>>>([
    [{ key: 'name', value: 'Alice' }, { key: 'city', value: 'Tokyo' }],
    [{ key: 'age', value: '25' }],
    [],
    [{ key: 'role', value: 'Engineer' }],
    [],
    [{ key: 'language', value: 'TypeScript' }],
    [],
    [{ key: 'active', value: 'true' }]
  ]);
  const [mapKeyInput, setMapKeyInput] = useState<string>('score');
  const [mapValInput, setMapValInput] = useState<string>('100');
  const [mapStatusMsg, setMapStatusMsg] = useState<string>('Hash Table with 8 buckets & collision chaining.');
  const [mapActiveBucket, setMapActiveBucket] = useState<number | null>(null);
  const [mapAction, setMapAction] = useState<{ key: string; type: 'insert' | 'delete' | 'peek' } | null>(null);

  const hashKey = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 8;
  };

  const handleMapPut = () => {
    if (!mapKeyInput.trim()) return;
    const key = mapKeyInput.trim();
    const bIdx = hashKey(key);
    setMapActiveBucket(bIdx);
    setMapBuckets((prev) => {
      const copy = prev.map((b) => [...b]);
      const existing = copy[bIdx].findIndex((pair) => pair.key === key);
      if (existing !== -1) {
        copy[bIdx][existing] = { key, value: mapValInput };
      } else {
        copy[bIdx].push({ key, value: mapValInput });
      }
      return copy;
    });
    setMapAction({ key, type: 'insert' });
    setMapStatusMsg(`Inserted key "${key}" into Bucket #${bIdx} (GREEN highlight).`);
    setTimeout(() => setMapAction(null), 1000);
  };

  const handleMapSearch = () => {
    if (!mapKeyInput.trim()) return;
    const key = mapKeyInput.trim();
    const bIdx = hashKey(key);
    setMapActiveBucket(bIdx);
    setMapAction({ key, type: 'peek' });
    const bucket = mapBuckets[bIdx];
    const found = bucket.find((p) => p.key === key);
    if (found) {
      setMapStatusMsg(`Peek/Found key "${found.key}" = "${found.value}" in Bucket #${bIdx} (BLUE highlight).`);
    } else {
      setMapStatusMsg(`Key "${key}" not found in Bucket #${bIdx}.`);
    }
    setTimeout(() => setMapAction(null), 1300);
  };

  const handleMapDelete = () => {
    if (!mapKeyInput.trim()) return;
    const key = mapKeyInput.trim();
    const bIdx = hashKey(key);
    setMapActiveBucket(bIdx);
    setMapAction({ key, type: 'delete' });
    setMapStatusMsg(`Deleting key "${key}" from Bucket #${bIdx}... Fading RED!`);

    setTimeout(() => {
      setMapBuckets((prev) => {
        const copy = prev.map((b) => [...b]);
        copy[bIdx] = copy[bIdx].filter((p) => p.key !== key);
        return copy;
      });
      setMapAction(null);
      setMapStatusMsg(`Deleted key "${key}" from Bucket #${bIdx}.`);
    }, 650);
  };

  // GRAPH STATE & HANDLERS
  const [graphNodes, setGraphNodes] = useState<{ id: string; x: number; y: number }[]>([
    { id: 'A', x: 80, y: 50 },
    { id: 'B', x: 200, y: 40 },
    { id: 'C', x: 100, y: 150 },
    { id: 'D', x: 280, y: 140 },
    { id: 'E', x: 180, y: 220 },
    { id: 'F', x: 340, y: 230 }
  ]);
  const [graphEdges, setGraphEdges] = useState<[string, string][]>([
    ['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'F'], ['E', 'F']
  ]);
  const [graphActiveNode, setGraphActiveNode] = useState<string | null>(null);
  const [graphVisitedNodes, setGraphVisitedNodes] = useState<string[]>([]);
  const [graphStatusMsg, setGraphStatusMsg] = useState<string>('Graph initialized with 6 vertices & 6 edges.');
  const [graphNewNodeId, setGraphNewNodeId] = useState<string>('G');
  const [graphActionNode, setGraphActionNode] = useState<{ id: string; type: 'insert' | 'delete' | 'peek' } | null>(null);

  const handleGraphBFS = async () => {
    setGraphVisitedNodes([]);
    setGraphStatusMsg('Running Breadth-First Search (BFS)...');
    const visited: string[] = [];
    const queue: string[] = ['A'];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (!visited.includes(curr)) {
        visited.push(curr);
        setGraphActiveNode(curr);
        setGraphVisitedNodes([...visited]);
        await new Promise((r) => setTimeout(r, 600));

        const neighbors = graphEdges
          .filter(([u, v]) => u === curr || v === curr)
          .map(([u, v]) => (u === curr ? v : u));

        for (const n of neighbors) {
          if (!visited.includes(n) && !queue.includes(n)) {
            queue.push(n);
          }
        }
      }
    }
    setGraphActiveNode(null);
    setGraphStatusMsg(`BFS Traversal Complete! Order: ${visited.join(' → ')}`);
  };

  const handleGraphDFS = async () => {
    setGraphVisitedNodes([]);
    setGraphStatusMsg('Running Depth-First Search (DFS)...');
    const visited: string[] = [];
    const stack: string[] = ['A'];

    while (stack.length > 0) {
      const curr = stack.pop()!;
      if (!visited.includes(curr)) {
        visited.push(curr);
        setGraphActiveNode(curr);
        setGraphVisitedNodes([...visited]);
        await new Promise((r) => setTimeout(r, 600));

        const neighbors = graphEdges
          .filter(([u, v]) => u === curr || v === curr)
          .map(([u, v]) => (u === curr ? v : u));

        for (const n of neighbors.reverse()) {
          if (!visited.includes(n)) {
            stack.push(n);
          }
        }
      }
    }
    setGraphActiveNode(null);
    setGraphStatusMsg(`DFS Traversal Complete! Order: ${visited.join(' → ')}`);
  };

  const handleGraphAddNode = () => {
    if (!graphNewNodeId || graphNodes.some((n) => n.id === graphNewNodeId)) return;
    const newN = { id: graphNewNodeId.toUpperCase(), x: Math.floor(Math.random() * 260) + 70, y: Math.floor(Math.random() * 160) + 50 };
    setGraphNodes([...graphNodes, newN]);
    const randomExisting = graphNodes[Math.floor(Math.random() * graphNodes.length)];
    if (randomExisting) {
      setGraphEdges([...graphEdges, [newN.id, randomExisting.id]]);
    }
    setGraphActionNode({ id: newN.id, type: 'insert' });
    setGraphStatusMsg(`Added vertex ${newN.id} (GREEN highlight).`);
    setTimeout(() => setGraphActionNode(null), 1000);
  };

  const handleGraphDeleteNode = () => {
    if (graphNodes.length === 0) return;
    const target = graphNewNodeId.toUpperCase() || graphNodes[graphNodes.length - 1].id;
    if (!graphNodes.some((n) => n.id === target)) {
      setGraphStatusMsg(`Vertex ${target} not found.`);
      return;
    }
    setGraphActionNode({ id: target, type: 'delete' });
    setGraphStatusMsg(`Deleting vertex ${target}... Fading RED!`);

    setTimeout(() => {
      setGraphNodes((prev) => prev.filter((n) => n.id !== target));
      setGraphEdges((prev) => prev.filter(([u, v]) => u !== target && v !== target));
      setGraphActionNode(null);
      setGraphStatusMsg(`Deleted vertex ${target}.`);
    }, 650);
  };

  const handleGraphPeekNode = () => {
    const target = graphNewNodeId.toUpperCase() || 'A';
    if (!graphNodes.some((n) => n.id === target)) return;
    setGraphActionNode({ id: target, type: 'peek' });
    setGraphStatusMsg(`Peeked vertex ${target} (BLUE highlight).`);
    setTimeout(() => setGraphActionNode(null), 1300);
  };

  // HEAP STATE & HANDLERS
  const [heapType, setHeapType] = useState<'min' | 'max'>('min');
  const [heapArray, setHeapArray] = useState<number[]>([10, 15, 30, 40, 50, 100, 40]);
  const [heapInputVal, setHeapInputVal] = useState<string>('5');
  const [heapStatusMsg, setHeapStatusMsg] = useState<string>('Min Heap initialized.');
  const [heapAction, setHeapAction] = useState<{ idx: number; idx2?: number; type: 'insert' | 'delete' | 'peek' | 'comparing' | 'swapping' } | null>(null);

  // Helper to re-heapify an entire array into Min or Max Heap
  const heapifyAll = (arr: number[], type: 'min' | 'max'): number[] => {
    const copy = [...arr];
    for (let i = Math.floor(copy.length / 2) - 1; i >= 0; i--) {
      let curr = i;
      while (true) {
        const left = 2 * curr + 1;
        const right = 2 * curr + 2;
        let target = curr;

        if (left < copy.length) {
          const condL = type === 'min' ? copy[left] < copy[target] : copy[left] > copy[target];
          if (condL) target = left;
        }
        if (right < copy.length) {
          const condR = type === 'min' ? copy[right] < copy[target] : copy[right] > copy[target];
          if (condR) target = right;
        }

        if (target !== curr) {
          [copy[curr], copy[target]] = [copy[target], copy[curr]];
          curr = target;
        } else {
          break;
        }
      }
    }
    return copy;
  };

  const handleSetHeapType = (type: 'min' | 'max') => {
    setHeapType(type);
    const heapified = heapifyAll(heapArray, type);
    setHeapArray(heapified);
    const rootLabel = type === 'min' ? 'Smallest' : 'Largest';
    const rootVal = heapified.length > 0 ? heapified[0] : 'None';
    setHeapStatusMsg(`Switched to ${type.toUpperCase()} Heap. ${rootLabel} value (${rootVal}) at Root.`);
  };

  const handleHeapInsert = async () => {
    const val = parseInt(heapInputVal);
    if (isNaN(val)) return;
    const newH = [...heapArray, val];
    setHeapArray(newH);
    let i = newH.length - 1;
    setHeapAction({ idx: i, type: 'insert' });
    setHeapStatusMsg(`Inserted ${val} at end of heap (index ${i}). Starting bubble-up...`);
    await new Promise((r) => setTimeout(r, 600));

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      setHeapAction({ idx: i, idx2: parent, type: 'comparing' });
      setHeapStatusMsg(`Comparing element ${newH[i]} (idx ${i}) with Parent ${newH[parent]} (idx ${parent})...`);
      await new Promise((r) => setTimeout(r, 600));

      const condition = heapType === 'min' ? newH[i] < newH[parent] : newH[i] > newH[parent];
      if (condition) {
        setHeapAction({ idx: i, idx2: parent, type: 'swapping' });
        setHeapStatusMsg(`Swapping index ${i} (${newH[i]}) ↔ index ${parent} (${newH[parent]})...`);
        [newH[i], newH[parent]] = [newH[parent], newH[i]];
        setHeapArray([...newH]);
        await new Promise((r) => setTimeout(r, 600));
        i = parent;
      } else {
        break;
      }
    }

    setHeapAction({ idx: i, type: 'insert' });
    setHeapStatusMsg(`Insertion complete! ${val} correctly placed at index ${i}.`);
    setTimeout(() => setHeapAction(null), 1000);
  };

  const handleHeapExtract = async () => {
    if (heapArray.length === 0) return;
    const rootVal = heapArray[0];
    setHeapAction({ idx: 0, type: 'delete' });
    setHeapStatusMsg(`Extracting Root element (${rootVal})...`);
    await new Promise((r) => setTimeout(r, 600));

    if (heapArray.length === 1) {
      setHeapArray([]);
      setHeapAction(null);
      setHeapStatusMsg(`Extracted root (${rootVal}). Heap is now empty.`);
      return;
    }

    const copy = [...heapArray];
    const last = copy.pop()!;
    copy[0] = last;
    setHeapArray([...copy]);
    setHeapStatusMsg(`Replaced root with last element (${last}). Starting trickle-down...`);
    await new Promise((r) => setTimeout(r, 600));

    let i = 0;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let target = i;

      if (left < copy.length) {
        const condL = heapType === 'min' ? copy[left] < copy[target] : copy[left] > copy[target];
        if (condL) target = left;
      }
      if (right < copy.length) {
        const condR = heapType === 'min' ? copy[right] < copy[target] : copy[right] > copy[target];
        if (condR) target = right;
      }

      if (target !== i) {
        setHeapAction({ idx: i, idx2: target, type: 'comparing' });
        setHeapStatusMsg(`Comparing index ${i} (${copy[i]}) with child index ${target} (${copy[target]})...`);
        await new Promise((r) => setTimeout(r, 600));

        setHeapAction({ idx: i, idx2: target, type: 'swapping' });
        setHeapStatusMsg(`Swapping index ${i} (${copy[i]}) ↔ index ${target} (${copy[target]})...`);
        [copy[i], copy[target]] = [copy[target], copy[i]];
        setHeapArray([...copy]);
        await new Promise((r) => setTimeout(r, 600));
        i = target;
      } else {
        break;
      }
    }

    setHeapAction(null);
    setHeapStatusMsg(`Extracted root (${rootVal}) from ${heapType.toUpperCase()} Heap successfully!`);
  };

  const handleHeapPeekRoot = () => {
    if (heapArray.length === 0) return;
    setHeapAction({ idx: 0, type: 'peek' });
    setHeapStatusMsg(`Peek Root: Root value is ${heapArray[0]} (BLUE highlight).`);
    setTimeout(() => setHeapAction(null), 1300);
  };

  // BST STATE
  const [bstRoot, setBstRoot] = useState<BSTNode | undefined>(defaultBSTRoot);
  const [bstTempRoot, setBstTempRoot] = useState<BSTNode | undefined>(undefined);
  const [bstInputVal, setBstInputVal] = useState<string>('25');
  const [bstSearchVal, setBstSearchVal] = useState<string>('40');
  const [bstActivePath, setBstActivePath] = useState<number[]>([]);
  const [bstFoundVal, setBstFoundVal] = useState<number | null>(null);
  const [bstStatusMsg, setBstStatusMsg] = useState<string>('BST initialized with 7 nodes.');
  const [bstTraversal, setBstTraversal] = useState<{ type: string; sequence: number[] } | null>(null);
  const [bstActionNode, setBstActionNode] = useState<{ value: number; type: 'insert' | 'delete' | 'peek' | 'comparing' | 'successor' | 'swapping' } | null>(null);
  const [bstSwappingPair, setBstSwappingPair] = useState<{ val1: number; val2: number } | null>(null);
  const [isBstAnimating, setIsBstAnimating] = useState<boolean>(false);
  const [bstAnimationSpeed, setBstAnimationSpeed] = useState<'slow' | 'normal' | 'fast'>('slow');

  const getBstDelay = () => {
    if (bstAnimationSpeed === 'slow') return 1200;
    if (bstAnimationSpeed === 'normal') return 800;
    return 400;
  };

  function swapValuesInTree(node: BSTNode | undefined, v1: number, v2: number): BSTNode | undefined {
    if (!node) return undefined;
    let newVal = node.value;
    if (node.value === v1) newVal = v2;
    else if (node.value === v2) newVal = v1;
    return {
      value: newVal,
      left: swapValuesInTree(node.left, v1, v2),
      right: swapValuesInTree(node.right, v1, v2)
    };
  }

  const handleBstInsert = async () => {
    if (isBstAnimating) return;
    const val = parseInt(bstInputVal);
    if (isNaN(val)) return;

    setIsBstAnimating(true);
    setBstTraversal(null);
    setBstFoundVal(null);
    setBstActivePath([]);
    setBstSwappingPair(null);
    setBstTempRoot(undefined);

    if (!bstRoot) {
      setBstRoot({ value: val });
      setBstActionNode({ value: val, type: 'insert' });
      setBstStatusMsg(`Tree was empty. Inserted node ${val} as Root!`);
      setIsBstAnimating(false);
      setTimeout(() => setBstActionNode(null), 1200);
      return;
    }

    let curr: BSTNode | undefined = bstRoot;
    const path: number[] = [];
    let inserted = false;

    setBstStatusMsg(`Starting Insertion of node ${val}. Traversing root...`);

    while (curr) {
      path.push(curr.value);
      setBstActivePath([...path]);
      setBstActionNode({ value: curr.value, type: 'comparing' });

      if (val < curr.value) {
        setBstStatusMsg(`Comparing ${val} with ${curr.value}: ${val} < ${curr.value} → Move LEFT`);
        await new Promise((r) => setTimeout(r, getBstDelay()));

        if (curr.left) {
          curr = curr.left;
        } else {
          setBstStatusMsg(`Found empty LEFT position under node ${curr.value}! Placing node ${val}...`);
          await new Promise((r) => setTimeout(r, getBstDelay()));
          inserted = true;
          break;
        }
      } else if (val > curr.value) {
        setBstStatusMsg(`Comparing ${val} with ${curr.value}: ${val} > ${curr.value} → Move RIGHT`);
        await new Promise((r) => setTimeout(r, getBstDelay()));

        if (curr.right) {
          curr = curr.right;
        } else {
          setBstStatusMsg(`Found empty RIGHT position under node ${curr.value}! Placing node ${val}...`);
          await new Promise((r) => setTimeout(r, getBstDelay()));
          inserted = true;
          break;
        }
      } else {
        setBstStatusMsg(`Value ${val} already exists in BST! Insertion cancelled.`);
        setBstActionNode({ value: curr.value, type: 'peek' });
        await new Promise((r) => setTimeout(r, getBstDelay()));
        setBstActionNode(null);
        setIsBstAnimating(false);
        return;
      }
    }

    if (inserted) {
      setBstRoot((prev) => insertBST(prev, val));
      setBstActivePath([...path, val]);
      setBstFoundVal(val);
      setBstActionNode({ value: val, type: 'insert' });
      setBstStatusMsg(`Successfully inserted node ${val} into BST!`);
      await new Promise((r) => setTimeout(r, getBstDelay()));
      setBstActionNode(null);
    }

    setIsBstAnimating(false);
  };

  const handleBstDelete = async () => {
    if (isBstAnimating) return;
    const val = parseInt(bstInputVal);
    if (isNaN(val) || !bstRoot) return;

    setIsBstAnimating(true);
    setBstTraversal(null);
    setBstFoundVal(null);
    setBstActivePath([]);
    setBstSwappingPair(null);
    setBstTempRoot(undefined);

    let curr: BSTNode | undefined = bstRoot;
    const path: number[] = [];
    let foundNode: BSTNode | null = null;

    setBstStatusMsg(`Deleting node ${val}: Traversing tree step-by-step...`);

    while (curr) {
      path.push(curr.value);
      setBstActivePath([...path]);
      setBstActionNode({ value: curr.value, type: 'comparing' });

      if (val === curr.value) {
        foundNode = curr;
        setBstStatusMsg(`Found target node ${val} to delete! Inspecting subtree children...`);
        await new Promise((r) => setTimeout(r, getBstDelay()));
        break;
      } else if (val < curr.value) {
        setBstStatusMsg(`Comparing ${val} with ${curr.value}: ${val} < ${curr.value} → Search LEFT`);
        await new Promise((r) => setTimeout(r, getBstDelay()));
        curr = curr.left;
      } else {
        setBstStatusMsg(`Comparing ${val} with ${curr.value}: ${val} > ${curr.value} → Search RIGHT`);
        await new Promise((r) => setTimeout(r, getBstDelay()));
        curr = curr.right;
      }
    }

    if (!foundNode) {
      setBstStatusMsg(`Node ${val} not found in BST. Deletion cancelled.`);
      await new Promise((r) => setTimeout(r, getBstDelay()));
      setBstActionNode(null);
      setIsBstAnimating(false);
      return;
    }

    setBstActionNode({ value: foundNode.value, type: 'delete' });

    // Case 1: Leaf Node (0 children)
    if (!foundNode.left && !foundNode.right) {
      setBstStatusMsg(`Node ${val} is a LEAF node (0 children). Directly removing...`);
      await new Promise((r) => setTimeout(r, getBstDelay()));
      setBstRoot((prev) => deleteBST(prev, val));
      setBstStatusMsg(`Deleted leaf node ${val} from BST.`);
    } 
    // Case 2: 1 child
    else if (!foundNode.left || !foundNode.right) {
      const child = foundNode.left || foundNode.right!;
      setBstStatusMsg(`Node ${val} has 1 child (${child.value}). Replacing node ${val} with child ${child.value}...`);
      setBstActionNode({ value: child.value, type: 'successor' });
      await new Promise((r) => setTimeout(r, Math.floor(getBstDelay() * 1.3)));
      setBstRoot((prev) => deleteBST(prev, val));
      setBstStatusMsg(`Deleted node ${val} and re-linked child node ${child.value}.`);
    } 
    // Case 3: 2 children (SWAPPING IN-ORDER SUCCESSOR)
    else {
      setBstStatusMsg(`Node ${val} has 2 children! Step 1: Finding In-Order Successor (min node in right subtree)...`);
      await new Promise((r) => setTimeout(r, getBstDelay()));

      let succ = foundNode.right;
      const succPath: number[] = [...path, succ.value];
      setBstActivePath(succPath);
      setBstActionNode({ value: succ.value, type: 'comparing' });
      setBstStatusMsg(`Stepping into right subtree at node ${succ.value}...`);
      await new Promise((r) => setTimeout(r, getBstDelay()));

      while (succ.left) {
        succ = succ.left;
        succPath.push(succ.value);
        setBstActivePath([...succPath]);
        setBstActionNode({ value: succ.value, type: 'comparing' });
        setBstStatusMsg(`Moving LEFT to find minimum value: Node ${succ.value}...`);
        await new Promise((r) => setTimeout(r, getBstDelay()));
      }

      const successorVal = succ.value;
      setBstActionNode({ value: successorVal, type: 'successor' });
      setBstStatusMsg(`In-Order Successor found: Node ${successorVal}!`);
      await new Promise((r) => setTimeout(r, Math.floor(getBstDelay() * 1.2)));

      // Step 2: SWAPPING
      setBstStatusMsg(`Step 2: SWAPPING values between Target Node ${val} ↔ In-Order Successor ${successorVal}...`);
      setBstSwappingPair({ val1: val, val2: successorVal });
      setBstActionNode({ value: val, type: 'swapping' });

      const swappedTree = swapValuesInTree(bstRoot, val, successorVal);
      setBstTempRoot(swappedTree);
      await new Promise((r) => setTimeout(r, Math.floor(getBstDelay() * 1.8)));

      // Step 3: Delete old successor node
      setBstStatusMsg(`Step 3: Removing duplicate successor node (${val}) from right subtree...`);
      await new Promise((r) => setTimeout(r, getBstDelay()));

      setBstTempRoot(undefined);
      setBstRoot((prev) => deleteBST(prev, val));
      setBstSwappingPair(null);
      setBstStatusMsg(`Successfully deleted node ${val}! Target node updated with value ${successorVal}.`);
    }

    await new Promise((r) => setTimeout(r, getBstDelay()));
    setBstActionNode(null);
    setIsBstAnimating(false);
  };

  const handleBstPeekRoot = () => {
    if (!bstRoot || isBstAnimating) return;
    setBstActionNode({ value: bstRoot.value, type: 'peek' });
    setBstStatusMsg(`Peek Root: Root node is ${bstRoot.value} (BLUE highlight).`);
    setTimeout(() => setBstActionNode(null), 1300);
  };

  const handleBstSearch = () => {
    if (!bstRoot || isBstAnimating) return;
    const val = parseInt(bstSearchVal);
    if (isNaN(val)) return;
    const { found, path } = searchBSTPath(bstRoot, val);
    setBstActivePath(path);
    if (found) {
      setBstFoundVal(val);
      setBstActionNode({ value: val, type: 'peek' });
      setBstStatusMsg(`Found node ${val}! Traversal path: ${path.join(' → ')} (BLUE highlight).`);
      setTimeout(() => setBstActionNode(null), 1300);
    } else {
      setBstFoundVal(null);
      setBstStatusMsg(`Node ${val} not found in BST. Traversal path: ${path.join(' → ')}`);
    }
  };

  const handleBstAnimatedTraversal = async (type: 'In-Order' | 'Pre-Order' | 'Post-Order') => {
    if (!bstRoot || isBstAnimating) return;
    setIsBstAnimating(true);
    let seq: number[] = [];
    if (type === 'In-Order') seq = inOrderBST(bstRoot);
    if (type === 'Pre-Order') seq = preOrderBST(bstRoot);
    if (type === 'Post-Order') seq = postOrderBST(bstRoot);

    setBstTraversal({ type, sequence: seq });
    setBstStatusMsg(`Animating ${type} traversal sequence...`);

    for (let i = 0; i < seq.length; i++) {
      setBstActivePath(seq.slice(0, i + 1));
      setBstFoundVal(seq[i]);
      await new Promise((r) => setTimeout(r, Math.floor(getBstDelay() * 0.7)));
    }
    setBstStatusMsg(`${type} traversal complete!`);
    setIsBstAnimating(false);
  };

  const handleBstReset = () => {
    if (isBstAnimating) return;
    setBstRoot(defaultBSTRoot);
    setBstTempRoot(undefined);
    setBstActivePath([]);
    setBstFoundVal(null);
    setBstTraversal(null);
    setBstActionNode(null);
    setBstSwappingPair(null);
    setIsBstAnimating(false);
    setBstStatusMsg('BST reset to default 7-node balanced tree.');
  };

  // Array operations
  const handlePush = () => {
    const val = parseInt(inputValue) || Math.floor(Math.random() * 90) + 10;
    const newEl: ArrayElement = {
      id: Date.now().toString(),
      value: val,
      index: array.length,
      state: 'inserting'
    };
    setArray([...array, newEl]);
    setStatusMessage(`Pushed element ${val} (GREEN insertion animation).`);

    setTimeout(() => {
      setArray((prev) => prev.map((el) => ({ ...el, state: 'default' })));
    }, 900);
  };

  const handlePop = () => {
    if (array.length === 0) return;
    const last = array[array.length - 1];
    setArray((prev) =>
      prev.map((el, i) => (i === prev.length - 1 ? { ...el, state: 'removing' } : el))
    );
    setStatusMessage(`Popping last element (${last.value})... Fading RED!`);

    setTimeout(() => {
      setArray((prev) => prev.slice(0, prev.length - 1));
      setStatusMessage('Element popped from array.');
    }, 650);
  };

  const handleInsertAt = () => {
    const idx = Math.max(0, Math.min(array.length, parseInt(inputIndex) || 0));
    const val = parseInt(inputValue) || 50;
    const newEl: ArrayElement = { id: Date.now().toString(), value: val, index: idx, state: 'inserting' };
    const newArr = [...array];
    newArr.splice(idx, 0, newEl);
    const reindexed = newArr.map((el, i) => ({ ...el, index: i }));
    setArray(reindexed);
    setStatusMessage(`Inserted ${val} at index ${idx} (GREEN insertion animation).`);

    setTimeout(() => {
      setArray((prev) => prev.map((el) => ({ ...el, state: 'default' })));
    }, 900);
  };

  const handleDeleteAt = () => {
    if (array.length === 0) return;
    const idx = Math.max(0, Math.min(array.length - 1, parseInt(inputIndex) || 0));
    const targetVal = array[idx]?.value;

    setArray((prev) =>
      prev.map((el, i) => (i === idx ? { ...el, state: 'removing' } : el))
    );
    setStatusMessage(`Deleting element at index ${idx} (${targetVal})... Fading RED!`);

    setTimeout(() => {
      setArray((prev) => {
        const filtered = prev.filter((_, i) => i !== idx);
        return filtered.map((el, i) => ({ ...el, index: i, state: 'default' }));
      });
      setStatusMessage(`Deleted element at index ${idx}.`);
    }, 650);
  };

  const handleArrayPeek = () => {
    if (array.length === 0) return;
    const idx = Math.max(0, Math.min(array.length - 1, parseInt(inputIndex) || 0));
    setArray((prev) =>
      prev.map((el, i) => (i === idx ? { ...el, state: 'peeking' } : { ...el, state: 'default' }))
    );
    setStatusMessage(`Peeked element at index ${idx}: value is ${array[idx].value} (BLUE highlight).`);

    setTimeout(() => {
      setArray((prev) => prev.map((el) => ({ ...el, state: 'default' })));
    }, 1300);
  };

  const handleSearch = async () => {
    const target = parseInt(inputValue) || 42;
    setStatusMessage(`Searching for target ${target}...`);

    for (let i = 0; i < array.length; i++) {
      setArray((prev) =>
        prev.map((el, idx) => ({
          ...el,
          state: idx === i ? 'comparing' : 'default'
        }))
      );
      await new Promise((r) => setTimeout(r, 400));

      if (array[i].value === target) {
        setArray((prev) =>
          prev.map((el, idx) => ({ ...el, state: idx === i ? 'found' : 'default' }))
        );
        setStatusMessage(`Target ${target} found at index ${i}!`);
        return;
      }
    }
    setStatusMessage(`Target ${target} not found in array.`);
  };

  const handleShuffle = () => {
    const shuffled = [...array].sort(() => Math.random() - 0.5).map((el, i) => ({
      ...el,
      index: i,
      state: 'default' as NodeState
    }));
    setArray(shuffled);
    setStatusMessage('Shuffled array elements.');
  };

  const handleResetArray = () => {
    setArray([
      { id: '1', value: 10, index: 0, state: 'default' },
      { id: '2', value: 25, index: 1, state: 'default' },
      { id: '3', value: 7, index: 2, state: 'default' },
      { id: '4', value: 42, index: 3, state: 'default' },
      { id: '5', value: 18, index: 4, state: 'default' },
      { id: '6', value: 33, index: 5, state: 'default' },
      { id: '7', value: 5, index: 6, state: 'default' },
      { id: '8', value: 29, index: 7, state: 'default' }
    ]);
    setStatusMessage('Reset array to default state.');
  };

  // Stack & Queue Push/Pop
  const handleStackPush = () => {
    const val = parseInt(stackValInput) || Math.floor(Math.random() * 80) + 10;
    const newStack = [{ id: Date.now().toString(), value: val }, ...stack];
    setStack(newStack);
    setStackAction({ idx: 0, type: 'insert' });
    setStackStatusMsg(`Pushed ${val} onto Stack (GREEN highlight).`);
    setTimeout(() => setStackAction(null), 900);
  };

  const handleStackPop = () => {
    if (stack.length > 0) {
      const popped = stack[0].value;
      setStackAction({ idx: 0, type: 'delete' });
      setStackStatusMsg(`Popping ${popped} from Stack... Fading RED!`);

      setTimeout(() => {
        setStack((prev) => prev.slice(1));
        setStackAction(null);
        setStackStatusMsg(`Popped ${popped} from Stack.`);
      }, 650);
    } else {
      setStackStatusMsg('Stack is empty. Cannot pop.');
    }
  };

  const handleStackPeek = () => {
    if (stack.length === 0) {
      setStackStatusMsg('Stack is empty.');
      return;
    }
    setStackAction({ idx: 0, type: 'peek' });
    setStackStatusMsg(`Peek: TOP element is ${stack[0].value} (BLUE highlight).`);
    setTimeout(() => setStackAction(null), 1300);
  };

  const handleStackSearch = async () => {
    const target = parseInt(stackValInput);
    if (isNaN(target)) {
      setStackStatusMsg('Please enter a valid number in input to search.');
      return;
    }
    setStackStatusMsg(`Searching for ${target} in Stack...`);
    for (let i = 0; i < stack.length; i++) {
      setStackAction({ idx: i, type: 'peek' });
      await new Promise((r) => setTimeout(r, 450));
      if (stack[i].value === target) {
        setStackStatusMsg(`Found value ${target} at Stack position ${i}!`);
        return;
      }
    }
    setStackAction(null);
    setStackStatusMsg(`Value ${target} not found in Stack.`);
  };

  const handleStackTraverse = async () => {
    if (stack.length === 0) {
      setStackStatusMsg('Stack is empty.');
      return;
    }
    const fullPath = stack.map((item) => item.value).join('->');
    setStackStatusMsg(`Traversing Stack from TOP to BOTTOM... Path: ${fullPath}`);
    for (let i = 0; i < stack.length; i++) {
      setStackAction({ idx: i, type: 'peek' });
      const currentStepPath = stack.slice(0, i + 1).map((item) => item.value).join('->');
      setStackStatusMsg(`Traversing Stack: ${currentStepPath}`);
      await new Promise((r) => setTimeout(r, 450));
    }
    setStackAction(null);
    setStackStatusMsg(`Traversal Path: ${fullPath}`);
  };

  const handleQueueEnqueue = () => {
    const val = parseInt(queueValInput) || Math.floor(Math.random() * 80) + 10;
    const newIdx = queue.length;
    setQueue([...queue, { id: Date.now().toString(), value: val }]);
    setQueueAction({ idx: newIdx, type: 'insert' });
    setQueueStatusMsg(`Enqueued ${val} at REAR of Queue (GREEN highlight).`);
    setTimeout(() => setQueueAction(null), 900);
  };

  const handleQueueDequeue = () => {
    if (queue.length > 0) {
      const dequeued = queue[0].value;
      setQueueAction({ idx: 0, type: 'delete' });
      setQueueStatusMsg(`Dequeuing ${dequeued} from FRONT of Queue... Fading RED!`);

      setTimeout(() => {
        setQueue((prev) => prev.slice(1));
        setQueueAction(null);
        setQueueStatusMsg(`Dequeued ${dequeued} from FRONT of Queue.`);
      }, 650);
    } else {
      setQueueStatusMsg('Queue is empty. Cannot dequeue.');
    }
  };

  const handleQueuePeek = () => {
    if (queue.length === 0) {
      setQueueStatusMsg('Queue is empty.');
      return;
    }
    setQueueAction({ idx: 0, type: 'peek' });
    setQueueStatusMsg(`Peek: FRONT element is ${queue[0].value} (BLUE highlight).`);
    setTimeout(() => setQueueAction(null), 1300);
  };

  const handleQueueSearch = async () => {
    const target = parseInt(queueValInput);
    if (isNaN(target)) {
      setQueueStatusMsg('Please enter a valid number in input to search.');
      return;
    }
    setQueueStatusMsg(`Searching for ${target} in Queue...`);
    for (let i = 0; i < queue.length; i++) {
      setQueueAction({ idx: i, type: 'peek' });
      await new Promise((r) => setTimeout(r, 450));
      if (queue[i].value === target) {
        setQueueStatusMsg(`Found value ${target} at Queue position ${i}!`);
        return;
      }
    }
    setQueueAction(null);
    setQueueStatusMsg(`Value ${target} not found in Queue.`);
  };

  const handleQueueTraverse = async () => {
    if (queue.length === 0) {
      setQueueStatusMsg('Queue is empty.');
      return;
    }
    const fullPath = queue.map((item) => item.value).join('->');
    setQueueStatusMsg(`Traversing Queue from FRONT to REAR... Path: ${fullPath}`);
    for (let i = 0; i < queue.length; i++) {
      setQueueAction({ idx: i, type: 'peek' });
      const currentStepPath = queue.slice(0, i + 1).map((item) => item.value).join('->');
      setQueueStatusMsg(`Traversing Queue: ${currentStepPath}`);
      await new Promise((r) => setTimeout(r, 450));
    }
    setQueueAction(null);
    setQueueStatusMsg(`Traversal Path: ${fullPath}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Master Data Structures Visually</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Interactive visualizations of fundamental data structures. Observe operations in real-time with step-by-step animations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCurrentTab('playground')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run in Playground</span>
            </button>
          </div>
        </div>

        {/* Data Structure Selection Pill Bar with Tab Switching Animations */}
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar bg-slate-200/60 dark:bg-slate-900/60 p-2 rounded-2xl border border-slate-300 dark:border-slate-800">
          {[
            { id: 'array', label: 'Array', icon: Database },
            { id: 'linked-list', label: 'Linked List', icon: Workflow },
            { id: 'stack-queue', label: 'Stack & Queue', icon: Layers },
            { id: 'bst', label: 'Binary Search Tree', icon: Workflow },
            { id: 'graph', label: 'Graph', icon: Workflow },
            { id: 'hash-map', label: 'Hash Map', icon: Database },
            { id: 'heap', label: 'Heap', icon: Layers }
          ].map((ds) => {
            const Icon = ds.icon;
            const isActive = activeDs === ds.id;
            return (
              <button
                key={ds.id}
                id={`ds-pill-${ds.id}`}
                onClick={() => setActiveDs(ds.id as any)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/40'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{ds.label}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Tab Switcher Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDs}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* VIEW 1: ARRAY VISUALIZER */}
            {activeDs === 'array' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Array</h2>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Dynamic array with push, pop, insert, delete & peek operations</p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-mono px-3 py-1.5 rounded-xl font-medium">
                      Access: O(1) | Search: O(n)
                    </div>
                  </div>

                  {/* Controls Bar */}
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Value"
                      id="array-value-input"
                      className="w-24 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="number"
                      value={inputIndex}
                      onChange={(e) => setInputIndex(e.target.value)}
                      placeholder="Index"
                      id="array-index-input"
                      className="w-20 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                    />

                    <button
                      onClick={handlePush}
                      id="array-push-btn"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Push</span>
                    </button>

                    <button
                      onClick={handlePop}
                      id="array-pop-btn"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Pop</span>
                    </button>

                    <button
                      onClick={handleInsertAt}
                      id="array-insert-btn"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
                    >
                      <span>Insert At</span>
                    </button>

                    <button
                      onClick={handleDeleteAt}
                      id="array-delete-at-btn"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete At</span>
                    </button>

                    <button
                      onClick={handleArrayPeek}
                      id="array-peek-btn"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Peek</span>
                    </button>

                    <button
                      onClick={handleSearch}
                      id="array-search-btn"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Search</span>
                    </button>

                    <button
                      onClick={handleShuffle}
                      id="array-shuffle-btn"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors ml-auto border border-slate-200 dark:border-slate-700"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>Shuffle</span>
                    </button>

                    <button
                      onClick={handleResetArray}
                      id="array-reset-btn"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Status Message */}
                  <div className="text-xs font-mono text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/20 font-medium">
                    {statusMessage}
                  </div>

                  {/* Visual Canvas Display */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[180px] flex items-center justify-start gap-3 overflow-x-auto">
                    <AnimatePresence>
                      {array.map((el) => {
                        let bgClass = 'bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-500/40 text-slate-900 dark:text-slate-100 shadow-sm';
                        if (el.state === 'comparing') bgClass = 'bg-amber-100 dark:bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200 scale-105';
                        if (el.state === 'found') bgClass = 'bg-emerald-100 dark:bg-emerald-500/30 border-emerald-500 dark:border-emerald-400 text-emerald-900 dark:text-emerald-200 scale-110 shadow-lg shadow-emerald-500/20';
                        if (el.state === 'inserting') bgClass = 'bg-emerald-100 dark:bg-emerald-500/30 border-emerald-500 dark:border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-400 scale-110';
                        if (el.state === 'removing') bgClass = 'bg-rose-100 dark:bg-rose-500/40 border-rose-500 dark:border-rose-400 text-rose-900 dark:text-rose-200 opacity-80 scale-90 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400';
                        if (el.state === 'peeking') bgClass = 'bg-blue-100 dark:bg-blue-500/40 border-blue-500 dark:border-blue-400 text-blue-900 dark:text-blue-200 scale-110 ring-4 ring-blue-400 shadow-lg shadow-blue-500/50';

                        return (
                          <motion.div
                            key={el.id}
                            layout
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                            className="flex flex-col items-center gap-2 group shrink-0"
                          >
                            <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center font-mono font-bold text-lg shadow-md transition-all duration-300 ${bgClass}`}>
                              {el.value}
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">[{el.index}]</span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Color Legend */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-4">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-white dark:bg-slate-900 border border-indigo-500" /> Default</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-400" /> Insertion (Green)</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500/40 border border-rose-400" /> Deletion (Red)</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/40 border border-blue-400" /> Peek (Blue)</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500" /> Comparing</span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: STACK & QUEUE VISUALIZER */}
            {activeDs === 'stack-queue' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Stack & Queue</h2>
                      <p className="text-xs text-slate-600 dark:text-slate-400">LIFO Stack and FIFO Queue side by side with insertion, deletion, and peek animations</p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-mono px-3 py-1.5 rounded-xl font-medium">
                      All operations: O(1)
                    </div>
                  </div>

                  {/* Split Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* STACK (LIFO) */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <ArrowUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Stack <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">(LIFO)</span></h3>
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">size: {stack.length}</span>
                      </div>

                      {/* Stack Controls */}
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="number"
                          value={stackValInput}
                          onChange={(e) => setStackValInput(e.target.value)}
                          id="stack-val-input"
                          placeholder="Value"
                          className="w-16 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none"
                        />
                        <button
                          onClick={handleStackPush}
                          id="stack-push-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                        >
                          + Push
                        </button>
                        <button
                          onClick={handleStackPop}
                          id="stack-pop-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold"
                        >
                          Pop
                        </button>
                        <button
                          onClick={handleStackPeek}
                          id="stack-peek-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                        >
                          Peek
                        </button>
                        <button
                          onClick={handleStackSearch}
                          id="stack-search-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Search className="w-3 h-3" /> Search
                        </button>
                        <button
                          onClick={handleStackTraverse}
                          id="stack-traverse-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 fill-white" /> Traverse
                        </button>
                      </div>

                      {/* Stack Status Message */}
                      <div className="bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200 dark:border-amber-500/30 text-[11px] font-mono text-amber-900 dark:text-amber-200 font-medium">
                        {stackStatusMsg}
                      </div>

                      {/* Stack Container View */}
                      <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex flex-col items-center gap-2 min-h-[220px] justify-end shadow-inner">
                        <AnimatePresence>
                          {stack.length === 0 ? (
                            <span className="text-xs text-slate-500 italic">Stack is empty</span>
                          ) : (
                            stack.map((item, idx) => {
                              const isTop = idx === 0;
                              const isAction = stackAction?.idx === idx;
                              const actionType = isAction ? stackAction.type : null;

                              let styleClasses = 'bg-indigo-50 dark:bg-[#18233c] border border-indigo-200 dark:border-slate-700/80 text-indigo-950 dark:text-slate-100 font-bold shadow-sm';
                              if (actionType === 'insert') {
                                styleClasses = 'bg-emerald-600 border-2 border-emerald-300 text-white shadow-xl ring-4 ring-emerald-400 scale-105';
                              } else if (actionType === 'delete') {
                                styleClasses = 'bg-rose-600 border-2 border-rose-300 text-white shadow-xl ring-4 ring-rose-400 scale-90 opacity-80';
                              } else if (actionType === 'peek') {
                                styleClasses = 'bg-blue-600 border-2 border-blue-300 text-white shadow-xl ring-4 ring-blue-400 scale-105';
                              }

                              return (
                                <motion.div
                                  key={item.id}
                                  layout
                                  initial={{ scale: 0, y: -20, opacity: 0 }}
                                  animate={{ scale: 1, y: 0, opacity: 1 }}
                                  exit={{ scale: 0, y: -20, opacity: 0 }}
                                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                  className="w-full max-w-[200px] relative"
                                >
                                  <div className={`py-2.5 rounded-xl font-mono text-center text-base transition-all duration-300 ${styleClasses}`}>
                                    {item.value}
                                  </div>
                                  {isTop && (
                                    <span className="absolute -right-16 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-[11px] tracking-wide">
                                      ← TOP
                                    </span>
                                  )}
                                </motion.div>
                              );
                            })
                          )}
                        </AnimatePresence>
                        <span className="text-[10px] font-mono text-slate-500 mt-2">— BOTTOM —</span>
                      </div>
                    </div>

                    {/* QUEUE (FIFO) */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <ArrowDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Queue <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">(FIFO)</span></h3>
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">size: {queue.length}</span>
                      </div>

                      {/* Queue Controls */}
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="number"
                          value={queueValInput}
                          onChange={(e) => setQueueValInput(e.target.value)}
                          id="queue-val-input"
                          placeholder="Value"
                          className="w-16 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none"
                        />
                        <button
                          onClick={handleQueueEnqueue}
                          id="queue-enqueue-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                        >
                          + Enqueue
                        </button>
                        <button
                          onClick={handleQueueDequeue}
                          id="queue-dequeue-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold"
                        >
                          Dequeue
                        </button>
                        <button
                          onClick={handleQueuePeek}
                          id="queue-peek-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                        >
                          Peek
                        </button>
                        <button
                          onClick={handleQueueSearch}
                          id="queue-search-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Search className="w-3 h-3" /> Search
                        </button>
                        <button
                          onClick={handleQueueTraverse}
                          id="queue-traverse-btn"
                          className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 fill-white" /> Traverse
                        </button>
                      </div>

                      {/* Queue Status Message */}
                      <div className="bg-cyan-50 dark:bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-200 dark:border-cyan-500/30 text-[11px] font-mono text-cyan-900 dark:text-cyan-200 font-medium">
                        {queueStatusMsg}
                      </div>

                      {/* Queue Container View */}
                      <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex flex-col items-center gap-2 min-h-[220px] justify-center shadow-inner">
                        <span className="text-[10px] font-mono text-slate-500 mb-1">— FRONT (dequeue here) —</span>
                        <AnimatePresence>
                          {queue.length === 0 ? (
                            <span className="text-xs text-slate-500 italic">Queue is empty</span>
                          ) : (
                            queue.map((item, idx) => {
                              const isFront = idx === 0;
                              const isRear = idx === queue.length - 1;
                              const isAction = queueAction?.idx === idx;
                              const actionType = isAction ? queueAction.type : null;

                              let bgStyle = 'bg-indigo-50 dark:bg-[#18233c] border border-indigo-200 dark:border-slate-700/80 text-indigo-950 dark:text-slate-100 font-bold shadow-sm';
                              if (actionType === 'insert') {
                                bgStyle = 'bg-emerald-600 border-2 border-emerald-300 text-white shadow-xl ring-4 ring-emerald-400 scale-105';
                              } else if (actionType === 'delete') {
                                bgStyle = 'bg-rose-600 border-2 border-rose-300 text-white shadow-xl ring-4 ring-rose-400 scale-90 opacity-80';
                              } else if (actionType === 'peek') {
                                bgStyle = 'bg-blue-600 border-2 border-blue-300 text-white shadow-xl ring-4 ring-blue-400 scale-105';
                              }

                              return (
                                <motion.div
                                  key={item.id}
                                  layout
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                  className="w-full max-w-[200px] relative"
                                >
                                  <div className={`py-2.5 rounded-xl font-mono text-center text-base transition-all duration-300 ${bgStyle}`}>
                                    {item.value}
                                  </div>
                                  {isFront && (
                                    <span className="absolute -right-20 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-[11px] tracking-wide">
                                      ← FRONT
                                    </span>
                                  )}
                                  {isRear && (
                                    <span className="absolute -left-20 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[11px] tracking-wide">
                                      REAR →
                                    </span>
                                  )}
                                </motion.div>
                              );
                            })
                          )}
                        </AnimatePresence>
                        <span className="text-[10px] font-mono text-slate-500 mt-1">— REAR (enqueue here) —</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: LINKED LIST VISUALIZER */}
            {activeDs === 'linked-list' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Workflow className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Linked List Visualizer
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Node chain supporting Singly, Doubly & Circular structures with insertion, deletion & peek animations</p>
                  </div>

                  {/* Linked List Type Selection Tabs */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    {(['singly', 'doubly', 'circular'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setLlType(t);
                          setLlStatusMsg(`Switched to ${t.toUpperCase()} Linked List.`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                          llType === t
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Linked List Operations Panel */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      value={llInputVal}
                      onChange={(e) => setLlInputVal(e.target.value)}
                      placeholder="Val"
                      className="w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-1.5 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="number"
                      value={llInputIndex}
                      onChange={(e) => setLlInputIndex(e.target.value)}
                      placeholder="Index"
                      className="w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-1.5 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                    />

                    {/* Insertion Group */}
                    <div className="flex items-center gap-1.5 border-r border-slate-300 dark:border-slate-800 pr-3">
                      <button
                        onClick={handleLLInsertHead}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                      >
                        + Head
                      </button>
                      <button
                        onClick={handleLLInsertTail}
                        className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
                      >
                        + Tail
                      </button>
                      <button
                        onClick={handleLLInsertAt}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                      >
                        + At Index
                      </button>
                    </div>

                    {/* Deletion Group */}
                    <div className="flex items-center gap-1.5 border-r border-slate-300 dark:border-slate-800 pr-3">
                      <button
                        onClick={handleLLDeleteHead}
                        className="px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold"
                      >
                        - Head
                      </button>
                      <button
                        onClick={handleLLDeleteTail}
                        className="px-3 py-1.5 rounded-xl bg-red-700/80 hover:bg-red-600 text-white text-xs font-semibold"
                      >
                        - Tail
                      </button>
                      <button
                        onClick={handleLLDeleteAt}
                        className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold"
                      >
                        - At Index
                      </button>
                      <button
                        onClick={handleLLDeleteValue}
                        className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                      >
                        - Val
                      </button>
                    </div>

                    {/* Peek Group */}
                    <div className="flex items-center gap-1.5 border-r border-slate-300 dark:border-slate-800 pr-3">
                      <button
                        onClick={handleLLPeekHead}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Peek Head
                      </button>
                      <button
                        onClick={handleLLPeekTail}
                        className="px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Peek Tail
                      </button>
                    </div>

                    {/* Search & Traversal */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleLLSearch}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Search className="w-3.5 h-3.5" /> Search
                      </button>
                      <button
                        onClick={handleLLTraverse}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" /> Traverse
                      </button>
                    </div>
                  </div>

                  {/* Status Message Banner */}
                  <div className="bg-indigo-50 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 text-xs font-mono text-indigo-900 dark:text-indigo-200 font-medium">
                    {llStatusMsg}
                  </div>
                </div>

                {/* Linked List Render Canvas */}
                <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 overflow-x-auto min-h-[220px] relative">
                  <AnimatePresence>
                    {linkedList.length === 0 ? (
                      <div className="text-slate-500 dark:text-slate-400 italic text-xs mx-auto py-8">Linked List is empty. Use + Head or + Tail to add nodes.</div>
                    ) : (
                      linkedList.map((val, idx) => {
                        const isHead = idx === 0;
                        const isTail = idx === linkedList.length - 1;
                        const isAction = llAction?.idx === idx;
                        const actionType = isAction ? llAction.type : null;

                        // Calculate simulated hex addresses
                        const currAddr = `0x${(0x2000 + idx * 0x10).toString(16).toUpperCase()}`;
                        const prevAddr = idx > 0 ? `0x${(0x2000 + (idx - 1) * 0x10).toString(16).toUpperCase()}` : (llType === 'circular' ? `0x${(0x2000 + (linkedList.length - 1) * 0x10).toString(16).toUpperCase()}` : 'NULL');
                        const nextAddr = idx < linkedList.length - 1 ? `0x${(0x2000 + (idx + 1) * 0x10).toString(16).toUpperCase()}` : (llType === 'circular' ? `0x2000` : 'NULL');

                        let borderClasses = 'border-indigo-300 dark:border-indigo-500/50 bg-white dark:bg-slate-900 shadow-sm';
                        let dataBgClasses = 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-200';
                        let pointerBgClasses = 'bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400';

                        if (actionType === 'insert') {
                          borderClasses = 'border-emerald-500 dark:border-emerald-400 bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-400/50 scale-105';
                          dataBgClasses = 'bg-emerald-700/80 text-white';
                          pointerBgClasses = 'bg-emerald-800/80 text-emerald-100';
                        } else if (actionType === 'delete') {
                          borderClasses = 'border-rose-500 dark:border-rose-400 bg-rose-600 text-white shadow-lg shadow-rose-500/30 ring-4 ring-rose-400/50 scale-90 opacity-80';
                          dataBgClasses = 'bg-rose-700/80 text-white';
                          pointerBgClasses = 'bg-rose-800/80 text-rose-100';
                        } else if (actionType === 'peek') {
                          borderClasses = 'border-blue-500 dark:border-blue-400 bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-400/50 scale-105';
                          dataBgClasses = 'bg-blue-700/80 text-white';
                          pointerBgClasses = 'bg-blue-800/80 text-blue-100';
                        } else if (actionType === 'search') {
                          borderClasses = 'border-amber-500 dark:border-amber-400 bg-amber-500 text-white shadow-lg shadow-amber-500/30 ring-4 ring-amber-400/50 scale-105';
                          dataBgClasses = 'bg-amber-600/80 text-white';
                          pointerBgClasses = 'bg-amber-700/80 text-amber-100';
                        }

                        return (
                          <React.Fragment key={idx}>
                            <motion.div
                              layout
                              initial={{ scale: 0, opacity: 0, y: -10 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              exit={{ scale: 0, opacity: 0, y: 10 }}
                              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                              className="flex flex-col items-center gap-1.5 shrink-0 group"
                            >
                              {/* Top Address & Badges Row */}
                              <div className="flex items-center gap-1.5 h-6">
                                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-semibold">
                                  {currAddr}
                                </span>
                                {isHead && (
                                  <span className="text-[10px] font-mono font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-md shadow-sm animate-pulse">
                                    HEAD
                                  </span>
                                )}
                                {isTail && (
                                  <span className="text-[10px] font-mono font-bold bg-purple-600 text-white px-2 py-0.5 rounded-md shadow-sm">
                                    TAIL
                                  </span>
                                )}
                              </div>

                              {/* Multi-compartment Node Box */}
                              <div
                                className={`flex items-stretch border-2 rounded-2xl overflow-hidden font-mono text-xs transition-all duration-300 hover:-translate-y-1 ${borderClasses}`}
                              >
                                {/* PREV Pointer Compartment (for Doubly Linked List) */}
                                {llType === 'doubly' && (
                                  <div className={`px-2.5 py-3 border-r border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center text-[10px] ${pointerBgClasses}`}>
                                    <span className="text-[9px] uppercase tracking-wider opacity-75">prev</span>
                                    <span className="font-bold text-[10px] font-mono">{prevAddr}</span>
                                  </div>
                                )}

                                {/* DATA Compartment */}
                                <div className={`px-4 py-3 flex flex-col items-center justify-center font-extrabold text-sm min-w-[50px] ${dataBgClasses}`}>
                                  <span className="text-[9px] font-normal uppercase tracking-wider opacity-75 block mb-0.5">data</span>
                                  <span>{val}</span>
                                </div>

                                {/* NEXT Pointer Compartment */}
                                <div className={`px-2.5 py-3 border-l border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center text-[10px] ${pointerBgClasses}`}>
                                  <span className="text-[9px] uppercase tracking-wider opacity-75">next</span>
                                  <span className="font-bold text-[10px] font-mono">{nextAddr}</span>
                                </div>
                              </div>

                              {/* Index Label */}
                              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold">index [{idx}]</span>
                            </motion.div>

                            {/* Pointer Arrow Between Nodes */}
                            {idx < linkedList.length - 1 && (
                              <div className="flex flex-col items-center justify-center px-1 shrink-0">
                                {llType === 'doubly' ? (
                                  <div className="flex flex-col items-center text-indigo-600 dark:text-indigo-400 font-bold text-xs gap-0.5">
                                    <div className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 px-2 py-1 rounded-lg shadow-sm">
                                      <span className="text-[10px] font-mono">next →</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 px-2 py-1 rounded-lg shadow-sm">
                                      <span className="text-[10px] font-mono">← prev</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                                    <span className="h-0.5 w-6 bg-indigo-400 dark:bg-indigo-500 inline-block"></span>
                                    <ArrowRight className="w-5 h-5" />
                                  </div>
                                )}
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </AnimatePresence>

                  {/* End Pointer Representation */}
                  {linkedList.length > 0 && (
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <div className="flex items-center gap-1 text-slate-400 dark:text-slate-600">
                        <span className="h-0.5 w-6 bg-slate-300 dark:bg-slate-700 inline-block"></span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      {llType === 'circular' ? (
                        <span className="font-mono text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center gap-1.5 shadow-sm font-semibold">
                          ⟲ Loop to Head Node (0x2000)
                        </span>
                      ) : (
                        <span className="font-mono text-xs text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 px-2.5 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 font-bold shadow-sm">
                          NULL
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW 4: BINARY SEARCH TREE (BST) VISUALIZER */}
            {activeDs === 'bst' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Workflow className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Binary Search Tree (BST)
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Step-by-step comparisons in insertion & visual swapping in deletion</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Speed Selector */}
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold">
                      <span className="text-slate-500 px-1.5">Speed:</span>
                      {(['slow', 'normal', 'fast'] as const).map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setBstAnimationSpeed(spd)}
                          disabled={isBstAnimating}
                          className={`px-2 py-0.5 rounded-lg capitalize transition-all ${
                            bstAnimationSpeed === spd
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                          }`}
                        >
                          {spd === 'slow' ? 'Slow (1.2s)' : spd === 'normal' ? 'Normal' : 'Fast'}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleBstReset}
                      disabled={isBstAnimating}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 disabled:opacity-50"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Tree</span>
                    </button>
                  </div>
                </div>

                {/* BST Operations Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Insert, Delete & Peek Box */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Node Operations</div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={bstInputVal}
                          onChange={(e) => setBstInputVal(e.target.value)}
                          disabled={isBstAnimating}
                          className="w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                          placeholder="Val"
                        />
                        <button
                          onClick={handleBstInsert}
                          disabled={isBstAnimating}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-emerald-600/20 disabled:opacity-50"
                        >
                          <Plus className="w-3.5 h-3.5" /> Insert
                        </button>
                        <button
                          onClick={handleBstDelete}
                          disabled={isBstAnimating}
                          className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-red-600/20 disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handleBstPeekRoot}
                          disabled={isBstAnimating}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-blue-600/20 disabled:opacity-50"
                        >
                          <Eye className="w-3.5 h-3.5" /> Peek Root
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={bstSearchVal}
                          onChange={(e) => setBstSearchVal(e.target.value)}
                          disabled={isBstAnimating}
                          className="w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                          placeholder="Val"
                        />
                        <button
                          onClick={handleBstSearch}
                          disabled={isBstAnimating}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-purple-600/20 disabled:opacity-50"
                        >
                          <Search className="w-3.5 h-3.5" /> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Traversals Box */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Animated Traversals</div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleBstAnimatedTraversal('In-Order')}
                        disabled={isBstAnimating}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-indigo-600/20 disabled:opacity-50"
                      >
                        <Play className="w-3 h-3 fill-white" /> In-Order
                      </button>
                      <button
                        onClick={() => handleBstAnimatedTraversal('Pre-Order')}
                        disabled={isBstAnimating}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-purple-600/20 disabled:opacity-50"
                      >
                        <Play className="w-3 h-3 fill-white" /> Pre-Order
                      </button>
                      <button
                        onClick={() => handleBstAnimatedTraversal('Post-Order')}
                        disabled={isBstAnimating}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-amber-600/20 disabled:opacity-50"
                      >
                        <Play className="w-3 h-3 fill-white" /> Post-Order
                      </button>
                    </div>
                  </div>
                </div>

                {/* Color Legend */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold bg-slate-100 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Legend:</span>
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <span>Comparing Step</span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                    <span>In-Order Successor</span>
                  </div>
                  <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block animate-pulse"></span>
                    <span>Swapping Node</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    <span>Inserted</span>
                  </div>
                  <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                    <span>Deleting</span>
                  </div>
                </div>

                {/* Status Banner */}
                <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 font-mono text-xs text-indigo-900 dark:text-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-medium shadow-inner">
                  <div className="flex items-center gap-2">
                    {isBstAnimating && <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping inline-block"></span>}
                    <span>{bstStatusMsg}</span>
                  </div>
                  {bstTraversal && (
                    <span className="text-[11px] bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-300 dark:border-indigo-500/40 font-bold">
                      [{bstTraversal.type}]: {bstTraversal.sequence.join(', ')}
                    </span>
                  )}
                </div>

                {/* SVG BST Graph Canvas */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto min-h-[300px]">
                  {(() => {
                    const flatNodes = computeBSTFlatNodes(bstTempRoot || bstRoot, 280, 45, 110);
                    return (
                      <svg viewBox="0 0 560 260" className="w-full max-w-2xl h-[260px] select-none">
                        {/* Render Lines */}
                        {flatNodes.map((node) => {
                          if (node.px !== undefined && node.py !== undefined) {
                            const isPathEdge = bstActivePath.includes(node.value);
                            return (
                              <line
                                key={`edge-${node.id}`}
                                x1={node.px}
                                y1={node.py}
                                x2={node.x}
                                y2={node.y}
                                stroke={isPathEdge ? '#a855f7' : isDarkMode ? '#334155' : '#cbd5e1'}
                                strokeWidth={isPathEdge ? '3' : '2'}
                              />
                            );
                          }
                          return null;
                        })}

                        {/* Render Circles & Text */}
                        {flatNodes.map((node) => {
                          const isSwapping = bstSwappingPair && (node.value === bstSwappingPair.val1 || node.value === bstSwappingPair.val2);
                          const isFound = bstFoundVal === node.value;
                          const isInPath = bstActivePath.includes(node.value);
                          const isAction = bstActionNode?.value === node.value;
                          const actionType = isAction ? bstActionNode.type : null;

                          let fill = isDarkMode ? '#1e1b4b' : '#e0e7ff';
                          let stroke = isDarkMode ? '#6366f1' : '#4f46e5';
                          let textFill = isDarkMode ? '#ffffff' : '#1e1b4b';
                          let labelText = null;

                          if (isSwapping || actionType === 'swapping') {
                            fill = isDarkMode ? '#831843' : '#fce7f3';
                            stroke = isDarkMode ? '#f472b6' : '#db2777';
                            textFill = isDarkMode ? '#ffffff' : '#831843';
                            labelText = 'SWAP';
                          } else if (actionType === 'comparing') {
                            fill = isDarkMode ? '#78350f' : '#fef3c7';
                            stroke = isDarkMode ? '#fbbf24' : '#d97706';
                            textFill = isDarkMode ? '#ffffff' : '#78350f';
                            labelText = 'COMPARE';
                          } else if (actionType === 'successor') {
                            fill = isDarkMode ? '#164e63' : '#cffafe';
                            stroke = isDarkMode ? '#22d3ee' : '#0891b2';
                            textFill = isDarkMode ? '#ffffff' : '#164e63';
                            labelText = 'SUCCESSOR';
                          } else if (actionType === 'insert') {
                            fill = isDarkMode ? '#065f46' : '#d1fae5';
                            stroke = isDarkMode ? '#34d399' : '#10b981';
                            textFill = isDarkMode ? '#ffffff' : '#065f46';
                            labelText = 'INSERTED';
                          } else if (actionType === 'delete') {
                            fill = isDarkMode ? '#881337' : '#ffe4e6';
                            stroke = isDarkMode ? '#f43f5e' : '#e11d48';
                            textFill = isDarkMode ? '#ffffff' : '#881337';
                            labelText = 'TARGET';
                          } else if (actionType === 'peek') {
                            fill = isDarkMode ? '#1e3a8a' : '#dbeafe';
                            stroke = isDarkMode ? '#60a5fa' : '#2563eb';
                            textFill = isDarkMode ? '#ffffff' : '#1e3a8a';
                            labelText = 'PEEK';
                          } else if (isFound) {
                            fill = isDarkMode ? '#065f46' : '#d1fae5';
                            stroke = isDarkMode ? '#34d399' : '#059669';
                            textFill = isDarkMode ? '#ffffff' : '#065f46';
                            labelText = 'ACTIVE';
                          } else if (isInPath) {
                            fill = isDarkMode ? '#581c87' : '#f3e8ff';
                            stroke = isDarkMode ? '#c084fc' : '#9333ea';
                            textFill = isDarkMode ? '#ffffff' : '#581c87';
                          }

                          return (
                            <g key={node.id}>
                              <circle
                                cx={node.x}
                                cy={node.y}
                                r="20"
                                fill={fill}
                                stroke={stroke}
                                strokeWidth="3"
                                className="transition-colors duration-300 filter drop-shadow-md"
                              />
                              <text
                                x={node.x}
                                y={node.y + 4}
                                textAnchor="middle"
                                fill={textFill}
                                fontSize="12"
                                fontWeight="bold"
                                fontFamily="monospace"
                              >
                                {node.value}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* VIEW 5: GRAPH VISUALIZER */}
            {activeDs === 'graph' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Workflow className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Graph Visualizer
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Vertices and Edges with insertion, deletion & peek animations</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleGraphBFS}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" /> Run BFS
                    </button>
                    <button
                      onClick={handleGraphDFS}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" /> Run DFS
                    </button>
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={graphNewNodeId}
                      onChange={(e) => setGraphNewNodeId(e.target.value.toUpperCase())}
                      maxLength={2}
                      className="w-16 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-2.5 py-1 text-base sm:text-xs font-mono text-center text-slate-900 dark:text-slate-200 focus:outline-none"
                      placeholder="Node"
                    />
                    <button
                      onClick={handleGraphAddNode}
                      className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Vertex
                    </button>
                    <button
                      onClick={handleGraphDeleteNode}
                      className="px-3 py-1 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Vertex
                    </button>
                    <button
                      onClick={handleGraphPeekNode}
                      className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Peek
                    </button>
                  </div>

                  <div className="text-xs font-mono text-indigo-900 dark:text-indigo-300 font-medium">
                    Visited Order: [{graphVisitedNodes.join(', ')}]
                  </div>
                </div>

                {/* Graph Legend Bar */}
                <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Graph Legend:</span>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Current / Visiting</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-400 border border-purple-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Visited Path</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Inserted Vertex</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-400 border border-rose-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Deleted Vertex</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-400 border border-blue-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Peek</span></div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 text-xs font-mono text-indigo-900 dark:text-indigo-200 font-medium">
                  {graphStatusMsg}
                </div>

                {/* SVG Graph Canvas */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto min-h-[300px]">
                  <svg viewBox="0 0 420 280" className="w-full max-w-xl h-[280px] select-none">
                    {/* Edges */}
                    {graphEdges.map(([u, v], i) => {
                      const nodeU = graphNodes.find((n) => n.id === u);
                      const nodeV = graphNodes.find((n) => n.id === v);
                      if (!nodeU || !nodeV) return null;

                      const isVisitedEdge = graphVisitedNodes.includes(u) && graphVisitedNodes.includes(v);

                      return (
                        <line
                          key={`edge-${i}`}
                          x1={nodeU.x}
                          y1={nodeU.y}
                          x2={nodeV.x}
                          y2={nodeV.y}
                          stroke={isVisitedEdge ? '#a855f7' : '#94a3b8'}
                          strokeWidth={isVisitedEdge ? '3' : '2'}
                        />
                      );
                    })}

                    {/* Vertices */}
                    {graphNodes.map((node) => {
                      const isActive = graphActiveNode === node.id;
                      const isVisited = graphVisitedNodes.includes(node.id);
                      const isAction = graphActionNode?.id === node.id;
                      const actionType = isAction ? graphActionNode.type : null;

                      let fill = isDarkMode ? '#1e1b4b' : '#e0e7ff';
                      let stroke = isDarkMode ? '#6366f1' : '#4f46e5';
                      let textFill = isDarkMode ? '#ffffff' : '#1e1b4b';

                      if (actionType === 'insert') {
                        fill = isDarkMode ? '#065f46' : '#d1fae5';
                        stroke = isDarkMode ? '#34d399' : '#10b981';
                        textFill = isDarkMode ? '#ffffff' : '#065f46';
                      } else if (actionType === 'delete') {
                        fill = isDarkMode ? '#881337' : '#ffe4e6';
                        stroke = isDarkMode ? '#f43f5e' : '#e11d48';
                        textFill = isDarkMode ? '#ffffff' : '#881337';
                      } else if (actionType === 'peek') {
                        fill = isDarkMode ? '#1e3a8a' : '#dbeafe';
                        stroke = isDarkMode ? '#60a5fa' : '#2563eb';
                        textFill = isDarkMode ? '#ffffff' : '#1e3a8a';
                      } else if (isActive) {
                        fill = isDarkMode ? '#78350f' : '#fef3c7';
                        stroke = isDarkMode ? '#fbbf24' : '#d97706';
                        textFill = isDarkMode ? '#ffffff' : '#78350f';
                      } else if (isVisited) {
                        fill = isDarkMode ? '#581c87' : '#f3e8ff';
                        stroke = isDarkMode ? '#c084fc' : '#9333ea';
                        textFill = isDarkMode ? '#ffffff' : '#581c87';
                      }

                      return (
                        <g key={node.id}>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="20"
                            fill={fill}
                            stroke={stroke}
                            strokeWidth="3"
                            className="transition-colors duration-300 filter drop-shadow-md"
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fill={textFill}
                            fontSize="12"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            {node.id}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            )}

            {/* VIEW 6: HASH MAP VISUALIZER */}
            {activeDs === 'hash-map' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Hash Table / Hash Map
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">8 Buckets with collision resolution & operation color animations</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-mono px-3 py-1.5 rounded-xl font-medium">
                    Average Lookup: O(1)
                  </div>
                </div>

                {/* HashMap Operations Bar */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      value={mapKeyInput}
                      onChange={(e) => setMapKeyInput(e.target.value)}
                      placeholder="Key"
                      className="w-28 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-1.5 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={mapValInput}
                      onChange={(e) => setMapValInput(e.target.value)}
                      placeholder="Value"
                      className="w-28 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-1.5 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                    />

                    <button
                      onClick={handleMapPut}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Put (Insert)
                    </button>
                    <button
                      onClick={handleMapSearch}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Get (Peek)
                    </button>
                    <button
                      onClick={handleMapDelete}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 text-xs font-mono text-indigo-900 dark:text-indigo-200 font-medium">
                    {mapStatusMsg}
                  </div>
                </div>

                {/* Bucket Chaining Grid */}
                <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  {mapBuckets.map((bucket, bIdx) => {
                    const isActive = mapActiveBucket === bIdx;
                    return (
                      <div
                        key={bIdx}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          isActive
                            ? 'bg-indigo-100 dark:bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-400/40'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="w-20 font-mono text-xs font-bold text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-center shrink-0">
                          Bucket #{bIdx}
                        </div>

                        <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                          <AnimatePresence>
                            {bucket.length === 0 ? (
                              <span className="text-slate-400 dark:text-slate-600 text-xs font-mono italic">empty</span>
                            ) : (
                              bucket.map((pair, pIdx) => {
                                const isAction = mapAction?.key === pair.key;
                                const actionType = isAction ? mapAction.type : null;

                                let cardClasses = 'bg-indigo-50 dark:bg-indigo-950 border-indigo-300 dark:border-indigo-500/50 text-indigo-950 dark:text-indigo-200 shadow-sm';
                                if (actionType === 'insert') {
                                  cardClasses = 'bg-emerald-600 dark:bg-emerald-950 border-emerald-400 text-white ring-2 ring-emerald-400 scale-105';
                                } else if (actionType === 'delete') {
                                  cardClasses = 'bg-rose-600 dark:bg-rose-950 border-rose-400 text-white ring-2 ring-rose-400 scale-90 opacity-70';
                                } else if (actionType === 'peek') {
                                  cardClasses = 'bg-blue-600 dark:bg-blue-950 border-blue-400 text-white ring-2 ring-blue-400 scale-105';
                                }

                                return (
                                  <React.Fragment key={pair.key}>
                                    <motion.div
                                      layout
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      exit={{ scale: 0, opacity: 0 }}
                                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                      className={`px-3 py-1.5 border rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm transition-all duration-300 ${cardClasses}`}
                                    >
                                      <span className="text-purple-700 dark:text-purple-300 font-bold">{pair.key}:</span>
                                      <span className="text-amber-800 dark:text-amber-300">"{pair.value}"</span>
                                    </motion.div>
                                    {pIdx < bucket.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                                  </React.Fragment>
                                );
                              })
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW 7: HEAP VISUALIZER */}
            {activeDs === 'heap' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Binary Heap (Min & Max Heap)
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Complete Binary Tree rendered alongside contiguous Array storage</p>
                  </div>

                  {/* Min/Max Heap Selector */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => handleSetHeapType('min')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        heapType === 'min' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      Min Heap (Small → Large)
                    </button>
                    <button
                      onClick={() => handleSetHeapType('max')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        heapType === 'max' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      Max Heap (Large → Small)
                    </button>
                  </div>
                </div>

                {/* Heap Controls */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={heapInputVal}
                      onChange={(e) => setHeapInputVal(e.target.value)}
                      className="w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 focus:outline-none"
                      placeholder="Val"
                    />
                    <button
                      onClick={handleHeapInsert}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Insert Value
                    </button>
                    <button
                      onClick={handleHeapExtract}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      Extract Root
                    </button>
                    <button
                      onClick={handleHeapPeekRoot}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Peek Root
                    </button>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 text-xs font-mono text-indigo-900 dark:text-indigo-200 font-medium flex-1">
                    {heapStatusMsg}
                  </div>
                </div>

                {/* Heap Legend Bar */}
                <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Heap Legend:</span>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Comparing</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-pink-400 border border-pink-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Swapping</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Inserted</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-400 border border-rose-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Extracted Root</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-400 border border-blue-600"></span><span className="text-[11px] text-slate-600 dark:text-slate-400">Peek Root</span></div>
                </div>

                {/* Complete Binary Tree View */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {heapType === 'min' ? 'Min Heap Complete Binary Tree (Smallest at Root)' : 'Max Heap Complete Binary Tree (Largest at Root)'}:
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
                      Root: {heapType === 'min' ? 'Min' : 'Max'} ({heapArray[0] ?? 'N/A'})
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto min-h-[260px]">
                    {heapArray.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">Heap is empty</span>
                    ) : (
                      (() => {
                        const treeNodes = computeHeapTreeNodes(heapArray);
                        return (
                          <svg viewBox="0 0 560 260" className="w-full max-w-2xl h-[260px] select-none">
                            {/* Render Edge Lines */}
                            {treeNodes.map((node) => {
                              if (node.px !== undefined && node.py !== undefined) {
                                return (
                                  <line
                                    key={`edge-${node.id}`}
                                    x1={node.px}
                                    y1={node.py}
                                    x2={node.x}
                                    y2={node.y}
                                    stroke={isDarkMode ? '#334155' : '#cbd5e1'}
                                    strokeWidth="2"
                                  />
                                );
                              }
                              return null;
                            })}

                            {/* Render Nodes */}
                            {treeNodes.map((node) => {
                              const isAction = heapAction?.idx === node.id || heapAction?.idx2 === node.id;
                              const actionType = isAction ? heapAction.type : null;

                              let fill = isDarkMode ? '#1e1b4b' : '#e0e7ff';
                              let stroke = isDarkMode ? '#6366f1' : '#4f46e5';
                              let textFill = isDarkMode ? '#ffffff' : '#1e1b4b';

                              if (actionType === 'comparing') {
                                fill = isDarkMode ? '#78350f' : '#fef3c7';
                                stroke = isDarkMode ? '#fbbf24' : '#d97706';
                                textFill = isDarkMode ? '#ffffff' : '#78350f';
                              } else if (actionType === 'swapping') {
                                fill = isDarkMode ? '#881337' : '#fce7f3';
                                stroke = isDarkMode ? '#f472b6' : '#db2777';
                                textFill = isDarkMode ? '#ffffff' : '#881337';
                              } else if (actionType === 'insert') {
                                fill = isDarkMode ? '#065f46' : '#d1fae5';
                                stroke = isDarkMode ? '#34d399' : '#10b981';
                                textFill = isDarkMode ? '#ffffff' : '#065f46';
                              } else if (actionType === 'delete') {
                                fill = isDarkMode ? '#881337' : '#ffe4e6';
                                stroke = isDarkMode ? '#f43f5e' : '#e11d48';
                                textFill = isDarkMode ? '#ffffff' : '#881337';
                              } else if (actionType === 'peek') {
                                fill = isDarkMode ? '#1e3a8a' : '#dbeafe';
                                stroke = isDarkMode ? '#60a5fa' : '#2563eb';
                                textFill = isDarkMode ? '#ffffff' : '#1e3a8a';
                              }

                              return (
                                <g key={`node-${node.id}`}>
                                  <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r="18"
                                    fill={fill}
                                    stroke={stroke}
                                    strokeWidth="2.5"
                                    className="transition-colors duration-300"
                                  />
                                  <text
                                    x={node.x}
                                    y={node.y + 4}
                                    textAnchor="middle"
                                    fill={textFill}
                                    fontSize="12"
                                    fontWeight="bold"
                                    fontFamily="monospace"
                                  >
                                    {node.value}
                                  </text>
                                  {/* Root Indicator */}
                                  {node.id === 0 && (
                                    <text
                                      x={node.x}
                                      y={node.y - 23}
                                      textAnchor="middle"
                                      fill={heapType === 'min' ? '#10b981' : '#a855f7'}
                                      fontSize="9"
                                      fontWeight="bold"
                                      fontFamily="monospace"
                                    >
                                      {heapType === 'min' ? 'MIN ROOT' : 'MAX ROOT'}
                                    </text>
                                  )}
                                  {/* Array index label below */}
                                  <text
                                    x={node.x}
                                    y={node.y + 30}
                                    textAnchor="middle"
                                    fill={isDarkMode ? '#94a3b8' : '#64748b'}
                                    fontSize="9"
                                    fontFamily="monospace"
                                  >
                                    [{node.id}]
                                  </text>
                                </g>
                              );
                            })}
                          </svg>
                        );
                      })()
                    )}
                  </div>
                </div>

                {/* Array Storage View */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Underlying Contiguous Array:</div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
                    <AnimatePresence>
                      {heapArray.map((val, idx) => {
                        const isAction = heapAction?.idx === idx || heapAction?.idx2 === idx;
                        const actionType = isAction ? heapAction.type : null;

                        let styleClasses = 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-500/40 text-slate-900 dark:text-slate-200 shadow-sm';
                        if (actionType === 'comparing') {
                          styleClasses = 'bg-amber-500 border-2 border-amber-300 text-slate-950 ring-2 ring-amber-400';
                        } else if (actionType === 'swapping') {
                          styleClasses = 'bg-pink-600 border-2 border-pink-300 text-white ring-2 ring-pink-400';
                        } else if (actionType === 'insert') {
                          styleClasses = 'bg-emerald-600 border-2 border-emerald-300 text-white shadow-lg shadow-emerald-500/50 ring-2 ring-emerald-400';
                        } else if (actionType === 'delete') {
                          styleClasses = 'bg-rose-600 border-2 border-rose-300 text-white opacity-80 ring-2 ring-rose-400';
                        } else if (actionType === 'peek') {
                          styleClasses = 'bg-blue-600 border-2 border-blue-300 text-white ring-4 ring-blue-400 shadow-lg shadow-blue-500/50';
                        }

                        return (
                          <motion.div
                            key={idx}
                            layout
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                            className="flex flex-col items-center gap-1 shrink-0"
                          >
                            <div
                              className={`w-12 h-12 rounded-xl border-2 font-mono font-bold text-sm flex items-center justify-center transition-all duration-300 ${styleClasses}`}
                            >
                              {val}
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">[{idx}]</span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
