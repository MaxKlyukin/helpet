# helpet  
  
Small library with useful, easy to use functional types and other helpful things.  
Contains helpful classes and corresponding helper functions.  
  
#### **Warning**: The library is not ready for production yet. Use it at your own risk.  
  
Install:  
```
npm install --save helpet
```  

### Classes  

#### `NumberRange`  
Provides similar functionality to python's range function.  
Use it for iterations and to parse/stringify number ranges.  

Helper function: `range(stop: number)`  

Example:  
```typescript
import { range } from 'helpet';

for (const i of range(5)) {
    console.log(i);
}
```  
will print:  
```
0
1
2
3
4
```  
  
#### `Awaiter`  
Provides an elegant way to do the `"sleep"` functionality.  

Helper functions: `forSeconds(amount: number)`, `forMilliseconds(amount: number)`, `tillTime(time: Date)`  

Example: 
```typescript
import { forSeconds } from 'helpet';

async function sayHi() {
    await forSeconds(5);
    console.log('Hello');
}
```  
When `sayHi` called it will print `Hello` after 5 second wait.  

#### `Logger`  
Easy to use logger. Can work in node and browser environments.  

Example:  
```typescript
import { Logger } from 'helpet';

class Foo {
    private readonly logger = Logger.getLogger(Foo);

    logSomething() {
        this.logger.info("Something happened.", {
            some: payload
        });
    }

    logError(error: Error) {
        this.logger.error("An error ocurred.", error);
    } 
}
```  
  
#### `ErrorHandler`  
Basic error handler. Will catch unhandled exceptions and rejected promises and will log them.  

Example:  
```typescript
import { ErrorHandler } from 'helpet';

ErrorHandler.register();

// ErrorHandler.unregister();
```  

#### `Timer`  
Flexible timer. 

Example:  
```typescript
import { Timer } from 'helpet';


const timer = new Timer<Payload>(10);

try {
    const payload = timer.run(() => {
        return getPayload();
    });
} catch (e) {
    if (error instanceof HaltException) {
        console.log("Timer has been halted");
    } else if (error instanceof TimeOutException) {
        console.log("Aciton didn't finish before the timer was up");
    } else {
        console.log("Action completed with an error");
    }
}

const isRunning = timer.isRunning();
const completedBy = timer.getCompletedBy(); // CompletedBy { ACTION, EXCEPTION, TIMEOUT, HALT }
const payload = timer.getResult();
const userExceptions = timer.getException();

await timer.tillTimerCompletes();
timer.halt();
```  

### Types 
 
#### `Option`  
Can be useful, when you don't want to deal with `null`s.  

Helper functions and object: `option(value?)`, `some(value)`, `None`  

Example:  
```typescript
import { option } from 'helpet';

const value = option(receivedValue);

value.forEach(v => console.log(v));

const result = value.map(v => v + 1).filter(v => v > 10).getOrElse(42);
```  
  
#### `Either`  
Use it when a variable can hold a value of one of two types.  

Helper functions: `either(left?, right?)`, `left(value)`, `right(value)`  

Example:  
```typescript
import { it, either } from 'helpet';

const value = either(one, two);

const result = value.fold(l => l + 1, it);
```  
  
#### `Tuple`  
You can avoid creating dummy types when you need to pass some joined data.  

Helper function: `tuple(...values)`  

Example:  
```typescript
import { tuple } from 'helpet';

const tupledOption = valueOption.map(v => tuple(v, compute(v)));
tupledOption.forEach(values => sendBoth(values._1, values._2));
const value = tupledOption.map(v => v.first).getOrNull;
const computed = tupledOption.map(v => v.second).getOrNull;
```  
  
#### `List`  
Type that extends common js array, and adds few useful methods.  

Helper class functions: `List.from(iterable)`, `List.of(...values)`, `List.fromMap(map)`, `List.flatten(arrayOfArrays)`  

Example:  
```typescript
import { List } from 'helpet';

const list = List.of(1, 2, 3, 4, 5, 6, 7);

const empty = list.isEmpty();
const element = list.randomElement();
const shuffledList = list.shuffled();
const [positive, negative] = list.split(v => v >= 0);
const sorted = people.sortedBy(person => person.name);
const partOfList = list.drop(2).take(2);
const allNumbers = list.flatMap(v => List.of(v * 2, v * 3, v * 4));
```  

