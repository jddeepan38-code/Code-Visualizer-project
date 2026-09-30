import { PresetCode, Challenge } from '../types';

export const PRESET_CODES: PresetCode[] = [
  {
    id: 'py-fibonacci-memo',
    name: 'Recursive Fibonacci with Memoization',
    language: 'python',
    description: 'Calculates Fibonacci numbers efficiently using memoization dictionary in Python.',
    code: `# Python - Recursive Fibonacci with Memoization
def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    
    result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    memo[n] = result
    return result

# Calculate first 10 Fibonacci numbers
for i in range(10):
    result = fibonacci(i)
    print(f"fib({i}) = {result}")

print("Done!")`,
    steps: [
      {
        stepNumber: 1,
        line: 2,
        codeLine: 'def fibonacci(n, memo={}):',
        callStack: [{ id: 'f1', name: '<module>', line: 2 }],
        variables: [{ name: 'fibonacci', value: '<function fibonacci>', type: 'function' }],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{} (memo cache)' }],
        consoleOutput: '',
        explanation: 'Defined function fibonacci with default memoization dictionary at heap 0x00A1.'
      },
      {
        stepNumber: 2,
        line: 13,
        codeLine: 'for i in range(10):',
        callStack: [{ id: 'f1', name: '<module>', line: 13 }],
        variables: [
          { name: 'fibonacci', value: '<function fibonacci>', type: 'function' },
          { name: 'i', value: '0', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        consoleOutput: '',
        explanation: 'Entering for-loop with index i = 0.'
      },
      {
        stepNumber: 3,
        line: 14,
        codeLine: 'result = fibonacci(i)',
        callStack: [
          { id: 'f1', name: '<module>', line: 14 },
          { id: 'f2', name: 'fibonacci', line: 3, params: 'n=0, memo={}' }
        ],
        variables: [
          { name: 'i', value: '0', type: 'int' },
          { name: 'n', value: '0', type: 'int', scope: 'fibonacci' }
        ],
        stackMemory: [
          { address: '0x7ffd10', name: '<module>', value: 'Frame' },
          { address: '0x7ffd28', name: 'fibonacci(n=0)', value: 'Frame' }
        ],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        consoleOutput: '',
        explanation: 'Called fibonacci(n=0). Allocated new frame on Call Stack.'
      },
      {
        stepNumber: 4,
        line: 5,
        codeLine: 'if n <= 1:',
        callStack: [
          { id: 'f1', name: '<module>', line: 14 },
          { id: 'f2', name: 'fibonacci', line: 5, params: 'n=0' }
        ],
        variables: [{ name: 'n', value: '0', type: 'int', scope: 'fibonacci' }],
        stackMemory: [
          { address: '0x7ffd10', name: '<module>', value: 'Frame' },
          { address: '0x7ffd28', name: 'fibonacci(n=0)', value: 'Frame' }
        ],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Base case evaluated: 0 <= 1 is True.'
      },
      {
        stepNumber: 5,
        line: 6,
        codeLine: 'return n',
        callStack: [{ id: 'f1', name: '<module>', line: 14 }],
        variables: [
          { name: 'i', value: '0', type: 'int' },
          { name: 'result', value: '0', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Returned 0. Popped fibonacci(n=0) frame from Call Stack.'
      },
      {
        stepNumber: 6,
        line: 15,
        codeLine: 'print(f"fib({i}) = {result}")',
        callStack: [{ id: 'f1', name: '<module>', line: 15 }],
        variables: [
          { name: 'i', value: '0', type: 'int' },
          { name: 'result', value: '0', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        consoleOutput: 'fib(0) = 0',
        explanation: 'Printed "fib(0) = 0" to standard stdout console.'
      },
      {
        stepNumber: 7,
        line: 13,
        codeLine: 'for i in range(10):',
        callStack: [{ id: 'f1', name: '<module>', line: 13 }],
        variables: [
          { name: 'i', value: '1', type: 'int' },
          { name: 'result', value: '0', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Loop iteration i = 1.'
      },
      {
        stepNumber: 8,
        line: 14,
        codeLine: 'result = fibonacci(i)',
        callStack: [
          { id: 'f1', name: '<module>', line: 14 },
          { id: 'f2', name: 'fibonacci', line: 3, params: 'n=1, memo={}' }
        ],
        variables: [
          { name: 'i', value: '1', type: 'int' },
          { name: 'n', value: '1', type: 'int', scope: 'fibonacci' }
        ],
        stackMemory: [
          { address: '0x7ffd10', name: '<module>', value: 'Frame' },
          { address: '0x7ffd3c', name: 'fibonacci(n=1)', value: 'Frame' }
        ],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Called fibonacci(n=1).'
      },
      {
        stepNumber: 9,
        line: 6,
        codeLine: 'return n',
        callStack: [{ id: 'f1', name: '<module>', line: 14 }],
        variables: [
          { name: 'i', value: '1', type: 'int' },
          { name: 'result', value: '1', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        consoleOutput: 'fib(1) = 1',
        explanation: 'Base case n=1 returned 1.'
      },
      {
        stepNumber: 10,
        line: 13,
        codeLine: 'for i in range(10):',
        callStack: [{ id: 'f1', name: '<module>', line: 13 }],
        variables: [
          { name: 'i', value: '2', type: 'int' },
          { name: 'result', value: '1', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Loop iteration i = 2.'
      },
      {
        stepNumber: 11,
        line: 8,
        codeLine: 'result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)',
        callStack: [
          { id: 'f1', name: '<module>', line: 14 },
          { id: 'f2', name: 'fibonacci', line: 8, params: 'n=2' },
          { id: 'f3', name: 'fibonacci', line: 3, params: 'n=1' }
        ],
        variables: [
          { name: 'n', value: '2', type: 'int' },
          { name: 'memo[n]', value: 'result', type: 'dict' },
          { name: 'result', value: 'fibonacci(n-1) + fibonacci(n-2)', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffd10', name: '<module>', value: 'Frame' },
          { address: '0x7ffd28', name: 'fibonacci(n=2)', value: 'Frame' },
          { address: '0x7ffd40', name: 'fibonacci(n=1)', value: 'Frame' }
        ],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{2: 1}' }],
        consoleOutput: 'fib(2) = 1',
        explanation: 'Computed fib(2) = 1, stored result in memo[2] = 1 on heap.'
      },
      {
        stepNumber: 12,
        line: 17,
        codeLine: 'print("Done!")',
        callStack: [{ id: 'f1', name: '<module>', line: 17 }],
        variables: [
          { name: 'i', value: '9', type: 'int' },
          { name: 'result', value: '34', type: 'int' },
          { name: 'memo', value: '{2:1, 3:2, 4:3, 5:5, 6:8, 7:13, 8:21, 9:34}', type: 'dict' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '8 cached values' }],
        consoleOutput: 'Done!',
        explanation: 'Execution complete. Garbage collection ready.'
      }
    ]
  },
  {
    id: 'js-event-loop',
    name: 'JavaScript Event Loop & Microtasks',
    language: 'javascript',
    description: 'Visualizes synchronous execution vs Promise Microtask queue and setTimeout Task queue.',
    code: `// JavaScript Event Loop & Task Queue
console.log("Start");

setTimeout(() => {
  console.log("Timeout Task 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise Microtask 1");
});

console.log("End");`,
    steps: [
      {
        stepNumber: 1,
        line: 2,
        codeLine: 'console.log("Start");',
        callStack: [{ id: 'f1', name: 'main()', line: 2 }],
        variables: [],
        stackMemory: [{ address: '0x0100', name: 'CallStack', value: 'main()' }],
        heapMemory: [],
        consoleOutput: 'Start',
        explanation: 'Synchronous execution: console.log("Start") executed immediately.'
      },
      {
        stepNumber: 2,
        line: 4,
        codeLine: 'setTimeout(..., 0)',
        callStack: [{ id: 'f1', name: 'main()', line: 4 }],
        variables: [{ name: 'Web API', value: 'Timer(0ms)', type: 'Timer' }],
        stackMemory: [{ address: '0x0100', name: 'CallStack', value: 'main()' }],
        heapMemory: [{ address: '0x08A0', type: 'TaskQueue', value: '[cb1]' }],
        explanation: 'Registered setTimeout callback to Web API Timer; queued into MacroTask Queue.'
      },
      {
        stepNumber: 3,
        line: 8,
        codeLine: 'Promise.resolve().then(...)',
        callStack: [{ id: 'f1', name: 'main()', line: 8 }],
        variables: [{ name: 'Microtasks', value: '1 pending', type: 'Queue' }],
        stackMemory: [{ address: '0x0100', name: 'CallStack', value: 'main()' }],
        heapMemory: [{ address: '0x08B0', type: 'MicrotaskQueue', value: '[Promise.then]' }],
        explanation: 'Promise resolved immediately. Added callback to Microtask Queue (Higher priority!).'
      },
      {
        stepNumber: 4,
        line: 12,
        codeLine: 'console.log("End");',
        callStack: [{ id: 'f1', name: 'main()', line: 12 }],
        variables: [],
        stackMemory: [{ address: '0x0100', name: 'CallStack', value: 'main()' }],
        heapMemory: [],
        consoleOutput: 'End',
        explanation: 'Printed "End". Call Stack is now empty.'
      },
      {
        stepNumber: 5,
        line: 9,
        codeLine: 'console.log("Promise Microtask 1");',
        callStack: [{ id: 'f2', name: 'microtaskCallback', line: 9 }],
        variables: [],
        stackMemory: [{ address: '0x0120', name: 'CallStack', value: 'microtask' }],
        heapMemory: [],
        consoleOutput: 'Promise Microtask 1',
        explanation: 'Event Loop flushed Microtask Queue FIRST before MacroTask Queue!'
      },
      {
        stepNumber: 6,
        line: 5,
        codeLine: 'console.log("Timeout Task 1");',
        callStack: [{ id: 'f3', name: 'timerCallback', line: 5 }],
        variables: [],
        stackMemory: [{ address: '0x0130', name: 'CallStack', value: 'timer' }],
        heapMemory: [],
        consoleOutput: 'Timeout Task 1',
        explanation: 'Event Loop pulled Task 1 from MacroTask Queue into Call Stack.'
      }
    ]
  },
  {
    id: 'cpp-pointers',
    name: 'C++ Pointers & Heap Memory Allocation',
    language: 'cpp',
    description: 'Traces stack vs heap pointer referencing, dereferencing, and delete memory deallocation.',
    code: `// C++ Pointer & Heap Memory Allocation
#include <iostream>

int main() {
    int a = 42;
    int* ptr = &a; // Pointer to stack variable
    
    int* heapPtr = new int(100); // Heap allocation
    
    *heapPtr = *ptr + 10;
    
    std::cout << "Heap Value: " << *heapPtr << std::endl;
    
    delete heapPtr; // Deallocate heap
    return 0;
}`,
    steps: [
      {
        stepNumber: 1,
        line: 5,
        codeLine: 'int a = 42;',
        callStack: [{ id: 'f1', name: 'main()', line: 5 }],
        variables: [{ name: 'a', value: '42', type: 'int' }],
        stackMemory: [{ address: '0x7ffc01', name: 'a', value: '42' }],
        heapMemory: [],
        explanation: 'Allocated 4 bytes on Stack frame for variable a = 42.'
      },
      {
        stepNumber: 2,
        line: 6,
        codeLine: 'int* ptr = &a;',
        callStack: [{ id: 'f1', name: 'main()', line: 6 }],
        variables: [
          { name: 'a', value: '42', type: 'int' },
          { name: 'ptr', value: '0x7ffc01', type: 'int*' }
        ],
        stackMemory: [
          { address: '0x7ffc01', name: 'a', value: '42' },
          { address: '0x7ffc08', name: 'ptr', value: '0x7ffc01 (&a)' }
        ],
        heapMemory: [],
        explanation: 'Pointer ptr assigned address of a (&a = 0x7ffc01).'
      },
      {
        stepNumber: 3,
        line: 8,
        codeLine: 'int* heapPtr = new int(100);',
        callStack: [{ id: 'f1', name: 'main()', line: 8 }],
        variables: [
          { name: 'a', value: '42', type: 'int' },
          { name: 'ptr', value: '0x7ffc01', type: 'int*' },
          { name: 'heapPtr', value: '0x00FE90', type: 'int*' }
        ],
        stackMemory: [
          { address: '0x7ffc01', name: 'a', value: '42' },
          { address: '0x7ffc08', name: 'ptr', value: '0x7ffc01' },
          { address: '0x7ffc10', name: 'heapPtr', value: '0x00FE90' }
        ],
        heapMemory: [{ address: '0x00FE90', type: 'int', value: '100' }],
        explanation: 'Dynamically allocated 4 bytes on HEAP at address 0x00FE90 with value 100.'
      },
      {
        stepNumber: 4,
        line: 10,
        codeLine: '*heapPtr = *ptr + 10;',
        callStack: [{ id: 'f1', name: 'main()', line: 10 }],
        variables: [
          { name: 'a', value: '42', type: 'int' },
          { name: 'heapPtr', value: '0x00FE90', type: 'int*' }
        ],
        stackMemory: [
          { address: '0x7ffc01', name: 'a', value: '42' },
          { address: '0x7ffc10', name: 'heapPtr', value: '0x00FE90' }
        ],
        heapMemory: [{ address: '0x00FE90', type: 'int', value: '52' }],
        explanation: 'Dereferenced ptr (*ptr=42), added 10 = 52, updated Heap block at 0x00FE90.'
      },
      {
        stepNumber: 5,
        line: 14,
        codeLine: 'delete heapPtr;',
        callStack: [{ id: 'f1', name: 'main()', line: 14 }],
        variables: [
          { name: 'a', value: '42', type: 'int' },
          { name: 'heapPtr', value: '0x00FE90 (freed)', type: 'int*' }
        ],
        stackMemory: [{ address: '0x7ffc01', name: 'a', value: '42' }],
        heapMemory: [],
        consoleOutput: 'Heap Value: 52',
        explanation: 'Explicitly freed heap memory at 0x00FE90 using delete operator.'
      }
    ]
  },
  {
    id: 'c-for-loop',
    name: 'C - Simple For Loop (Sum Calculation)',
    language: 'c',
    description: 'Calculates cumulative sum from 1 to 5 using a standard C for-loop.',
    code: `// C - Simple For Loop Example
#include <stdio.h>

int main() {
    int sum = 0;
    int n = 5;
    
    printf("Starting sum calculation...\n");
    for (int i = 1; i <= n; i++) {
        sum += i;
        printf("i = %d, current sum = %d\n", i, sum);
    }
    
    printf("Final Sum = %d\n", sum);
    return 0;
}`,
    steps: [
      {
        stepNumber: 1,
        line: 5,
        codeLine: 'int sum = 0;',
        callStack: [{ id: 'f1', name: 'main()', line: 5 }],
        variables: [{ name: 'sum', value: '0', type: 'int' }],
        stackMemory: [{ address: '0x7ffc00', name: 'sum', value: '0' }],
        heapMemory: [],
        consoleOutput: '',
        explanation: 'Initialized local stack variable sum = 0.'
      },
      {
        stepNumber: 2,
        line: 6,
        codeLine: 'int n = 5;',
        callStack: [{ id: 'f1', name: 'main()', line: 6 }],
        variables: [
          { name: 'sum', value: '0', type: 'int' },
          { name: 'n', value: '5', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc00', name: 'sum', value: '0' },
          { address: '0x7ffc04', name: 'n', value: '5' }
        ],
        heapMemory: [],
        explanation: 'Initialized limit variable n = 5.'
      },
      {
        stepNumber: 3,
        line: 8,
        codeLine: 'printf("Starting sum calculation...\\n");',
        callStack: [{ id: 'f1', name: 'main()', line: 8 }],
        variables: [
          { name: 'sum', value: '0', type: 'int' },
          { name: 'n', value: '5', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc00', name: 'sum', value: '0' },
          { address: '0x7ffc04', name: 'n', value: '5' }
        ],
        heapMemory: [],
        consoleOutput: 'Starting sum calculation...',
        explanation: 'Printed header message to stdout.'
      },
      {
        stepNumber: 4,
        line: 9,
        codeLine: 'for (int i = 1; i <= n; i++)',
        callStack: [{ id: 'f1', name: 'main()', line: 9 }],
        variables: [
          { name: 'sum', value: '0', type: 'int' },
          { name: 'n', value: '5', type: 'int' },
          { name: 'i', value: '1', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc00', name: 'sum', value: '0' },
          { address: '0x7ffc04', name: 'n', value: '5' },
          { address: '0x7ffc08', name: 'i', value: '1' }
        ],
        heapMemory: [],
        explanation: 'For loop started: initialized loop variable i = 1 (1 <= 5 is True).'
      },
      {
        stepNumber: 5,
        line: 10,
        codeLine: 'sum += i;',
        callStack: [{ id: 'f1', name: 'main()', line: 10 }],
        variables: [
          { name: 'sum', value: '1', type: 'int' },
          { name: 'n', value: '5', type: 'int' },
          { name: 'i', value: '1', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc00', name: 'sum', value: '1' },
          { address: '0x7ffc04', name: 'n', value: '5' },
          { address: '0x7ffc08', name: 'i', value: '1' }
        ],
        heapMemory: [],
        consoleOutput: 'i = 1, current sum = 1',
        explanation: 'Added i=1 to sum. Updated sum = 1.'
      },
      {
        stepNumber: 6,
        line: 10,
        codeLine: 'sum += i; // i = 2',
        callStack: [{ id: 'f1', name: 'main()', line: 10 }],
        variables: [
          { name: 'sum', value: '3', type: 'int' },
          { name: 'n', value: '5', type: 'int' },
          { name: 'i', value: '2', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc00', name: 'sum', value: '3' },
          { address: '0x7ffc04', name: 'n', value: '5' },
          { address: '0x7ffc08', name: 'i', value: '2' }
        ],
        heapMemory: [],
        consoleOutput: 'i = 2, current sum = 3',
        explanation: 'Loop iteration i=2: sum becomes 1 + 2 = 3.'
      },
      {
        stepNumber: 7,
        line: 10,
        codeLine: 'sum += i; // i = 5',
        callStack: [{ id: 'f1', name: 'main()', line: 10 }],
        variables: [
          { name: 'sum', value: '15', type: 'int' },
          { name: 'n', value: '5', type: 'int' },
          { name: 'i', value: '5', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc00', name: 'sum', value: '15' },
          { address: '0x7ffc04', name: 'n', value: '5' },
          { address: '0x7ffc08', name: 'i', value: '5' }
        ],
        heapMemory: [],
        consoleOutput: 'i = 5, current sum = 15',
        explanation: 'Final iteration i=5: sum becomes 10 + 5 = 15.'
      },
      {
        stepNumber: 8,
        line: 13,
        codeLine: 'printf("Final Sum = %d\\n", sum);',
        callStack: [{ id: 'f1', name: 'main()', line: 13 }],
        variables: [
          { name: 'sum', value: '15', type: 'int' },
          { name: 'n', value: '5', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc00', name: 'sum', value: '15' },
          { address: '0x7ffc04', name: 'n', value: '5' }
        ],
        heapMemory: [],
        consoleOutput: 'Final Sum = 15',
        explanation: 'For loop finished (i=6 > 5). Printed final sum = 15.'
      }
    ]
  },
  {
    id: 'c-while-loop',
    name: 'C - Simple While Loop (Factorial Countdown)',
    language: 'c',
    description: 'Computes factorial using a C while loop and decrements countdown variable.',
    code: `// C - Simple While Loop Example
#include <stdio.h>

int main() {
    int count = 5;
    int factorial = 1;
    
    printf("Calculating factorial of %d using while loop...\n", count);
    while (count > 0) {
        factorial *= count;
        printf("count = %d, partial factorial = %d\n", count, factorial);
        count--;
    }
    
    printf("Result: %d\n", factorial);
    return 0;
}`,
    steps: [
      {
        stepNumber: 1,
        line: 5,
        codeLine: 'int count = 5;',
        callStack: [{ id: 'f1', name: 'main()', line: 5 }],
        variables: [
          { name: 'count', value: '5', type: 'int' },
          { name: 'factorial', value: '1', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc10', name: 'count', value: '5' },
          { address: '0x7ffc14', name: 'factorial', value: '1' }
        ],
        heapMemory: [],
        consoleOutput: '',
        explanation: 'Initialized local variables count = 5 and factorial = 1.'
      },
      {
        stepNumber: 2,
        line: 9,
        codeLine: 'while (count > 0)',
        callStack: [{ id: 'f1', name: 'main()', line: 9 }],
        variables: [
          { name: 'count', value: '5', type: 'int' },
          { name: 'factorial', value: '1', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc10', name: 'count', value: '5' },
          { address: '0x7ffc14', name: 'factorial', value: '1' }
        ],
        heapMemory: [],
        consoleOutput: 'Calculating factorial of 5 using while loop...',
        explanation: 'While loop condition evaluated: count (5) > 0 is True.'
      },
      {
        stepNumber: 3,
        line: 10,
        codeLine: 'factorial *= count;',
        callStack: [{ id: 'f1', name: 'main()', line: 10 }],
        variables: [
          { name: 'count', value: '5', type: 'int' },
          { name: 'factorial', value: '5', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc10', name: 'count', value: '5' },
          { address: '0x7ffc14', name: 'factorial', value: '5' }
        ],
        heapMemory: [],
        consoleOutput: 'count = 5, partial factorial = 5',
        explanation: 'Multiplied factorial by count (1 * 5 = 5).'
      },
      {
        stepNumber: 4,
        line: 12,
        codeLine: 'count--;',
        callStack: [{ id: 'f1', name: 'main()', line: 12 }],
        variables: [
          { name: 'count', value: '4', type: 'int' },
          { name: 'factorial', value: '5', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc10', name: 'count', value: '4' },
          { address: '0x7ffc14', name: 'factorial', value: '5' }
        ],
        heapMemory: [],
        explanation: 'Decremented count to 4.'
      },
      {
        stepNumber: 5,
        line: 10,
        codeLine: 'factorial *= count; // count = 1',
        callStack: [{ id: 'f1', name: 'main()', line: 10 }],
        variables: [
          { name: 'count', value: '1', type: 'int' },
          { name: 'factorial', value: '120', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc10', name: 'count', value: '1' },
          { address: '0x7ffc14', name: 'factorial', value: '120' }
        ],
        heapMemory: [],
        consoleOutput: 'count = 1, partial factorial = 120',
        explanation: 'Final iteration: factorial reached 5 * 4 * 3 * 2 * 1 = 120.'
      },
      {
        stepNumber: 6,
        line: 15,
        codeLine: 'printf("Result: %d\\n", factorial);',
        callStack: [{ id: 'f1', name: 'main()', line: 15 }],
        variables: [
          { name: 'count', value: '0', type: 'int' },
          { name: 'factorial', value: '120', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffc10', name: 'count', value: '0' },
          { address: '0x7ffc14', name: 'factorial', value: '120' }
        ],
        heapMemory: [],
        consoleOutput: 'Result: 120',
        explanation: 'While loop terminated (count = 0). Printed result: 120.'
      }
    ]
  },
  {
    id: 'c-singly-linked-list',
    name: 'C - Singly Linked List (struct Node & malloc)',
    language: 'c',
    description: 'Dynamic memory allocation with malloc and struct Node pointer linking in C.',
    code: `// C - Singly Linked List Implementation
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* createNode(int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    return newNode;
}

int main() {
    struct Node* head = createNode(10);
    head->next = createNode(20);
    head->next->next = createNode(30);

    printf("Traversing Singly Linked List:\n");
    struct Node* curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\n");
    return 0;
}`,
    steps: [
      {
        stepNumber: 1,
        line: 19,
        codeLine: 'struct Node* head = createNode(10);',
        callStack: [
          { id: 'f1', name: 'main()', line: 19 },
          { id: 'f2', name: 'createNode', line: 11, params: 'val=10' }
        ],
        variables: [{ name: 'val', value: '10', type: 'int' }],
        stackMemory: [
          { address: '0x7ffc20', name: 'head', value: '0x00A100' },
          { address: '0x7ffc28', name: 'createNode frame', value: 'Active' }
        ],
        heapMemory: [{ address: '0x00A100', type: 'struct Node', value: '{ data: 10, next: NULL }' }],
        explanation: 'Called malloc(sizeof(struct Node)). Allocated 16 bytes on Heap at address 0x00A100.'
      },
      {
        stepNumber: 2,
        line: 20,
        codeLine: 'head->next = createNode(20);',
        callStack: [{ id: 'f1', name: 'main()', line: 20 }],
        variables: [{ name: 'head', value: '0x00A100', type: 'struct Node*' }],
        stackMemory: [{ address: '0x7ffc20', name: 'head', value: '0x00A100' }],
        heapMemory: [
          { address: '0x00A100', type: 'struct Node', value: '{ data: 10, next: 0x00A110 }' },
          { address: '0x00A110', type: 'struct Node', value: '{ data: 20, next: NULL }' }
        ],
        explanation: 'Allocated second node at Heap 0x00A110. Linked head->next = 0x00A110.'
      },
      {
        stepNumber: 3,
        line: 21,
        codeLine: 'head->next->next = createNode(30);',
        callStack: [{ id: 'f1', name: 'main()', line: 21 }],
        variables: [{ name: 'head', value: '0x00A100', type: 'struct Node*' }],
        stackMemory: [{ address: '0x7ffc20', name: 'head', value: '0x00A100' }],
        heapMemory: [
          { address: '0x00A100', type: 'struct Node', value: '{ data: 10, next: 0x00A110 }' },
          { address: '0x00A110', type: 'struct Node', value: '{ data: 20, next: 0x00A120 }' },
          { address: '0x00A120', type: 'struct Node', value: '{ data: 30, next: NULL }' }
        ],
        explanation: 'Allocated third node at Heap 0x00A120. Linked 2nd node -> 3rd node.'
      },
      {
        stepNumber: 4,
        line: 24,
        codeLine: 'struct Node* curr = head;',
        callStack: [{ id: 'f1', name: 'main()', line: 24 }],
        variables: [
          { name: 'head', value: '0x00A100', type: 'struct Node*' },
          { name: 'curr', value: '0x00A100', type: 'struct Node*' }
        ],
        stackMemory: [
          { address: '0x7ffc20', name: 'head', value: '0x00A100' },
          { address: '0x7ffc28', name: 'curr', value: '0x00A100' }
        ],
        heapMemory: [
          { address: '0x00A100', type: 'struct Node', value: '10' },
          { address: '0x00A110', type: 'struct Node', value: '20' },
          { address: '0x00A120', type: 'struct Node', value: '30' }
        ],
        consoleOutput: 'Traversing Singly Linked List:',
        explanation: 'Initialized traversal pointer curr = head (0x00A100).'
      },
      {
        stepNumber: 5,
        line: 26,
        codeLine: 'printf("%d -> ", curr->data);',
        callStack: [{ id: 'f1', name: 'main()', line: 26 }],
        variables: [
          { name: 'curr', value: '0x00A100', type: 'struct Node*' },
          { name: 'curr->data', value: '10', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffc28', name: 'curr', value: '0x00A100' }],
        heapMemory: [{ address: '0x00A100', type: 'struct Node', value: '10' }],
        consoleOutput: '10 -> 20 -> 30 -> NULL',
        explanation: 'Traversed all 3 nodes printing values 10 -> 20 -> 30 -> NULL.'
      }
    ]
  },
  {
    id: 'c-stack-implementation',
    name: 'C - Stack Implementation (Array & Top Pointer)',
    language: 'c',
    description: 'Implements LIFO Stack data structure using array and top index pointer in C.',
    code: `// C - Stack Implementation (LIFO)
#include <stdio.h>

#define MAX 5

int stack[MAX];
int top = -1;

void push(int val) {
    if (top < MAX - 1) {
        top++;
        stack[top] = val;
        printf("Pushed: %d (top=%d)\n", val, top);
    }
}

int pop() {
    if (top >= 0) {
        int val = stack[top];
        top--;
        printf("Popped: %d\n", val);
        return val;
    }
    return -1;
}

int main() {
    push(10);
    push(20);
    push(30);
    pop();
    printf("Current Top Element: %d\n", stack[top]);
    return 0;
}`,
    steps: [
      {
        stepNumber: 1,
        line: 7,
        codeLine: 'int top = -1;',
        callStack: [{ id: 'f1', name: 'main()', line: 28 }],
        variables: [
          { name: 'top', value: '-1', type: 'int (global)' },
          { name: 'stack', value: '[0, 0, 0, 0, 0]', type: 'int[5]' }
        ],
        stackMemory: [{ address: '0x601020', name: 'top', value: '-1' }],
        heapMemory: [],
        consoleOutput: '',
        explanation: 'Initialized global Stack buffer array[5] and empty top pointer index top = -1.'
      },
      {
        stepNumber: 2,
        line: 28,
        codeLine: 'push(10);',
        callStack: [
          { id: 'f1', name: 'main()', line: 28 },
          { id: 'f2', name: 'push', line: 11, params: 'val=10' }
        ],
        variables: [
          { name: 'val', value: '10', type: 'int' },
          { name: 'top', value: '0', type: 'int' },
          { name: 'stack[0]', value: '10', type: 'int' }
        ],
        stackMemory: [
          { address: '0x601020', name: 'top', value: '0' },
          { address: '0x601024', name: 'stack[0]', value: '10' }
        ],
        heapMemory: [],
        consoleOutput: 'Pushed: 10 (top=0)',
        explanation: 'Incremented top to 0. Stored 10 at stack[0].'
      },
      {
        stepNumber: 3,
        line: 29,
        codeLine: 'push(20);',
        callStack: [
          { id: 'f1', name: 'main()', line: 29 },
          { id: 'f2', name: 'push', line: 11, params: 'val=20' }
        ],
        variables: [
          { name: 'top', value: '1', type: 'int' },
          { name: 'stack[1]', value: '20', type: 'int' }
        ],
        stackMemory: [
          { address: '0x601020', name: 'top', value: '1' },
          { address: '0x601028', name: 'stack[1]', value: '20' }
        ],
        heapMemory: [],
        consoleOutput: 'Pushed: 20 (top=1)',
        explanation: 'Pushed 20 onto stack at index top = 1.'
      },
      {
        stepNumber: 4,
        line: 30,
        codeLine: 'push(30);',
        callStack: [
          { id: 'f1', name: 'main()', line: 30 },
          { id: 'f2', name: 'push', line: 11, params: 'val=30' }
        ],
        variables: [
          { name: 'top', value: '2', type: 'int' },
          { name: 'stack[2]', value: '30', type: 'int' }
        ],
        stackMemory: [
          { address: '0x601020', name: 'top', value: '2' },
          { address: '0x60102c', name: 'stack[2]', value: '30' }
        ],
        heapMemory: [],
        consoleOutput: 'Pushed: 30 (top=2)',
        explanation: 'Pushed 30 onto stack at index top = 2.'
      },
      {
        stepNumber: 5,
        line: 31,
        codeLine: 'pop();',
        callStack: [
          { id: 'f1', name: 'main()', line: 31 },
          { id: 'f2', name: 'pop', line: 20 }
        ],
        variables: [
          { name: 'poppedVal', value: '30', type: 'int' },
          { name: 'top', value: '1', type: 'int' }
        ],
        stackMemory: [{ address: '0x601020', name: 'top', value: '1' }],
        heapMemory: [],
        consoleOutput: 'Popped: 30',
        explanation: 'LIFO Pop: retrieved top element 30 from stack[2], decremented top to 1.'
      },
      {
        stepNumber: 6,
        line: 32,
        codeLine: 'printf("Current Top Element: %d\\n", stack[top]);',
        callStack: [{ id: 'f1', name: 'main()', line: 32 }],
        variables: [
          { name: 'top', value: '1', type: 'int' },
          { name: 'stack[top]', value: '20', type: 'int' }
        ],
        stackMemory: [{ address: '0x601020', name: 'top', value: '1' }],
        heapMemory: [],
        consoleOutput: 'Current Top Element: 20',
        explanation: 'Peeked current top element stack[1] = 20.'
      }
    ]
  },
  {
    id: 'c-queue-implementation',
    name: 'C - Queue Implementation (FIFO Front & Rear)',
    language: 'c',
    description: 'Implements FIFO Queue data structure with front & rear pointers in C.',
    code: `// C - Queue Implementation (FIFO)
#include <stdio.h>

#define SIZE 5

int queue[SIZE];
int front = -1, rear = -1;

void enqueue(int val) {
    if (rear < SIZE - 1) {
        if (front == -1) front = 0;
        rear++;
        queue[rear] = val;
        printf("Enqueued: %d\n", val);
    }
}

int dequeue() {
    if (front != -1 && front <= rear) {
        int val = queue[front];
        printf("Dequeued: %d\n", val);
        front++;
        return val;
    }
    return -1;
}

int main() {
    enqueue(100);
    enqueue(200);
    enqueue(300);
    dequeue();
    printf("Front Element: %d\n", queue[front]);
    return 0;
}`,
    steps: [
      {
        stepNumber: 1,
        line: 7,
        codeLine: 'int front = -1, rear = -1;',
        callStack: [{ id: 'f1', name: 'main()', line: 28 }],
        variables: [
          { name: 'front', value: '-1', type: 'int' },
          { name: 'rear', value: '-1', type: 'int' }
        ],
        stackMemory: [
          { address: '0x601030', name: 'front', value: '-1' },
          { address: '0x601034', name: 'rear', value: '-1' }
        ],
        heapMemory: [],
        consoleOutput: '',
        explanation: 'Initialized empty Queue pointers front = -1 and rear = -1.'
      },
      {
        stepNumber: 2,
        line: 28,
        codeLine: 'enqueue(100);',
        callStack: [
          { id: 'f1', name: 'main()', line: 28 },
          { id: 'f2', name: 'enqueue', line: 10, params: 'val=100' }
        ],
        variables: [
          { name: 'front', value: '0', type: 'int' },
          { name: 'rear', value: '0', type: 'int' },
          { name: 'queue[0]', value: '100', type: 'int' }
        ],
        stackMemory: [
          { address: '0x601030', name: 'front', value: '0' },
          { address: '0x601034', name: 'rear', value: '0' }
        ],
        heapMemory: [],
        consoleOutput: 'Enqueued: 100',
        explanation: 'First element enqueued: set front = 0, rear = 0, stored 100 at queue[0].'
      },
      {
        stepNumber: 3,
        line: 29,
        codeLine: 'enqueue(200);',
        callStack: [
          { id: 'f1', name: 'main()', line: 29 },
          { id: 'f2', name: 'enqueue', line: 10, params: 'val=200' }
        ],
        variables: [
          { name: 'front', value: '0', type: 'int' },
          { name: 'rear', value: '1', type: 'int' },
          { name: 'queue[1]', value: '200', type: 'int' }
        ],
        stackMemory: [
          { address: '0x601030', name: 'front', value: '0' },
          { address: '0x601034', name: 'rear', value: '1' }
        ],
        heapMemory: [],
        consoleOutput: 'Enqueued: 200',
        explanation: 'Enqueued 200 at rear index = 1.'
      },
      {
        stepNumber: 4,
        line: 30,
        codeLine: 'enqueue(300);',
        callStack: [
          { id: 'f1', name: 'main()', line: 30 },
          { id: 'f2', name: 'enqueue', line: 10, params: 'val=300' }
        ],
        variables: [
          { name: 'front', value: '0', type: 'int' },
          { name: 'rear', value: '2', type: 'int' },
          { name: 'queue[2]', value: '300', type: 'int' }
        ],
        stackMemory: [
          { address: '0x601030', name: 'front', value: '0' },
          { address: '0x601034', name: 'rear', value: '2' }
        ],
        heapMemory: [],
        consoleOutput: 'Enqueued: 300',
        explanation: 'Enqueued 300 at rear index = 2.'
      },
      {
        stepNumber: 5,
        line: 31,
        codeLine: 'dequeue();',
        callStack: [
          { id: 'f1', name: 'main()', line: 31 },
          { id: 'f2', name: 'dequeue', line: 18 }
        ],
        variables: [
          { name: 'dequeuedVal', value: '100', type: 'int' },
          { name: 'front', value: '1', type: 'int' }
        ],
        stackMemory: [
          { address: '0x601030', name: 'front', value: '1' },
          { address: '0x601034', name: 'rear', value: '2' }
        ],
        heapMemory: [],
        consoleOutput: 'Dequeued: 100',
        explanation: 'FIFO Dequeue: removed oldest element 100 from front (queue[0]), incremented front to 1.'
      },
      {
        stepNumber: 6,
        line: 32,
        codeLine: 'printf("Front Element: %d\\n", queue[front]);',
        callStack: [{ id: 'f1', name: 'main()', line: 32 }],
        variables: [
          { name: 'front', value: '1', type: 'int' },
          { name: 'queue[front]', value: '200', type: 'int' }
        ],
        stackMemory: [{ address: '0x601030', name: 'front', value: '1' }],
        heapMemory: [],
        consoleOutput: 'Front Element: 200',
        explanation: 'Peeked new front element queue[1] = 200.'
      }
    ]
  },
  {
    id: 'c-binary-tree',
    name: 'C - Binary Tree & In-Order Traversal',
    language: 'c',
    description: 'Constructs binary tree with struct TreeNode, malloc, and recursive in-order traversal in C.',
    code: `// C - Binary Tree & In-Order Traversal
#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int data;
    struct TreeNode* left;
    struct TreeNode* right;
};

struct TreeNode* createTreeNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->data = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

void inorder(struct TreeNode* root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

int main() {
    struct TreeNode* root = createTreeNode(50);
    root->left = createTreeNode(30);
    root->right = createTreeNode(70);

    printf("In-Order Traversal of Tree: ");
    inorder(root);
    printf("\n");
    return 0;
}`,
    steps: [
      {
        stepNumber: 1,
        line: 26,
        codeLine: 'struct TreeNode* root = createTreeNode(50);',
        callStack: [{ id: 'f1', name: 'main()', line: 26 }],
        variables: [{ name: 'root', value: '0x00B000', type: 'struct TreeNode*' }],
        stackMemory: [{ address: '0x7ffc40', name: 'root', value: '0x00B000' }],
        heapMemory: [{ address: '0x00B000', type: 'TreeNode', value: '{ data: 50, left: NULL, right: NULL }' }],
        explanation: 'Allocated root node on Heap at 0x00B000 with value 50.'
      },
      {
        stepNumber: 2,
        line: 27,
        codeLine: 'root->left = createTreeNode(30);',
        callStack: [{ id: 'f1', name: 'main()', line: 27 }],
        variables: [{ name: 'root->left', value: '0x00B010', type: 'struct TreeNode*' }],
        stackMemory: [{ address: '0x7ffc40', name: 'root', value: '0x00B000' }],
        heapMemory: [
          { address: '0x00B000', type: 'TreeNode', value: '{ data: 50, left: 0x00B010, right: NULL }' },
          { address: '0x00B010', type: 'TreeNode', value: '{ data: 30, left: NULL, right: NULL }' }
        ],
        explanation: 'Allocated left child node at Heap 0x00B010 with value 30.'
      },
      {
        stepNumber: 3,
        line: 28,
        codeLine: 'root->right = createTreeNode(70);',
        callStack: [{ id: 'f1', name: 'main()', line: 28 }],
        variables: [{ name: 'root->right', value: '0x00B020', type: 'struct TreeNode*' }],
        stackMemory: [{ address: '0x7ffc40', name: 'root', value: '0x00B000' }],
        heapMemory: [
          { address: '0x00B000', type: 'TreeNode', value: '{ data: 50, left: 0x00B010, right: 0x00B020 }' },
          { address: '0x00B010', type: 'TreeNode', value: '{ data: 30, left: NULL, right: NULL }' },
          { address: '0x00B020', type: 'TreeNode', value: '{ data: 70, left: NULL, right: NULL }' }
        ],
        explanation: 'Allocated right child node at Heap 0x00B020 with value 70.'
      },
      {
        stepNumber: 4,
        line: 31,
        codeLine: 'inorder(root);',
        callStack: [
          { id: 'f1', name: 'main()', line: 31 },
          { id: 'f2', name: 'inorder', line: 18, params: 'root=0x00B000 (50)' },
          { id: 'f3', name: 'inorder', line: 18, params: 'root=0x00B010 (30)' }
        ],
        variables: [{ name: 'root->data', value: '30', type: 'int' }],
        stackMemory: [
          { address: '0x7ffc40', name: 'root', value: '0x00B000' },
          { address: '0x7ffc48', name: 'inorder(50)', value: 'Frame' },
          { address: '0x7ffc50', name: 'inorder(30)', value: 'Frame' }
        ],
        heapMemory: [
          { address: '0x00B000', type: 'TreeNode', value: '50' },
          { address: '0x00B010', type: 'TreeNode', value: '30' },
          { address: '0x00B020', type: 'TreeNode', value: '70' }
        ],
        consoleOutput: 'In-Order Traversal of Tree: ',
        explanation: 'Recursive call inorder(left): traversed to left child 30.'
      },
      {
        stepNumber: 5,
        line: 21,
        codeLine: 'printf("%d ", root->data);',
        callStack: [{ id: 'f1', name: 'main()', line: 31 }],
        variables: [{ name: 'root', value: '0x00B000', type: 'struct TreeNode*' }],
        stackMemory: [{ address: '0x7ffc40', name: 'root', value: '0x00B000' }],
        heapMemory: [],
        consoleOutput: '30 50 70',
        explanation: 'In-Order traversal complete: printed Left-Root-Right sequence: 30 50 70.'
      }
    ]
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    title: 'Identify the Maximum Call Stack Depth',
    difficulty: 'Easy',
    category: 'Recursion',
    question: 'When calling factorial(4), what is the maximum number of stack frames on the Call Stack simultaneously?',
    codeSnippet: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

factorial(4)`,
    options: ['3 frames', '4 frames', '5 frames', '6 frames'],
    correctAnswerIndex: 2, // 5 frames: main + factorial(4) + factorial(3) + factorial(2) + factorial(1)
    explanation: 'The call stack grows to 5 active frames: <module>, factorial(4), factorial(3), factorial(2), and factorial(1) before returning!'
  },
  {
    id: 'ch-2',
    title: 'Spot the Dangling Pointer',
    difficulty: 'Medium',
    category: 'Pointers',
    question: 'Which line of C++ code causes an invalid pointer reference to a deallocated memory region?',
    codeSnippet: `int* ptr = new int(10);
delete ptr;
std::cout << *ptr; // Line 3
ptr = nullptr;     // Line 4`,
    options: ['Line 1', 'Line 2', 'Line 3', 'Line 4'],
    correctAnswerIndex: 2,
    explanation: 'Line 3 dereferences `*ptr` after calling `delete ptr;`, reading from freed heap memory (dangling pointer).'
  },
  {
    id: 'ch-3',
    title: 'JS Event Loop Priority',
    difficulty: 'Medium',
    category: 'Call Stack',
    question: 'What is the exact printed order of standard logs in this JavaScript snippet?',
    codeSnippet: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
    options: ['A, B, C, D', 'A, D, C, B', 'A, C, D, B', 'A, D, B, C'],
    correctAnswerIndex: 1,
    explanation: 'A and D run synchronously. Then Microtasks (Promise C) run before Macrotasks (setTimeout B), giving A, D, C, B!'
  }
];
