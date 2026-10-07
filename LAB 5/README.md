# Lab Assignment – 05

## Simulating a Food Delivery Tracker

**Lab Number:** 05
**Date:** 31 August 2026
**Semester:** BCA VII

### Objective

The main objective of this lab is to understand asynchronous JavaScript using callbacks, Promises and async/await. It also helps in understanding Promise chaining, error handling, Promise.all() and the Event Loop.

### Files and Their Purpose

1. **callback-version.js**
   This file demonstrates how callbacks can be used to handle different steps of a food order.

2. **promise-version.js**
   This file demonstrates Promises and shows both successful and failed operations using `.then()` and `.catch()`.

3. **chaining-version.js**
   This file demonstrates Promise chaining where the order moves through different stages one after another.

4. **async-await-version.js**
   This file demonstrates the same order process using async/await with try/catch.

5. **concurrent-orders.js**
   This file demonstrates how `Promise.all()` can run multiple orders at the same time.

### How to Run

Open the terminal inside the `LAB 5` folder and run each file using:

```bash
node callback-version.js
```

```bash
node promise-version.js
```

```bash
node chaining-version.js
```

```bash
node async-await-version.js
```

```bash
node concurrent-orders.js
```

### Promise.all()

`Promise.all()` runs multiple asynchronous operations at the same time. It waits for all the operations to finish. Therefore, its total time is usually close to the longest individual delay instead of the sum of all delays.

### Reflection

While `setTimeout` is waiting, Node.js does not stop completely. It can continue doing other tasks while the timer is running. After the timer finishes, its callback is handled by the Event Loop.

`Promise.all()` is faster because all three orders can start at the same time. If we use separate await statements one after another, each order waits for the previous one to finish.

## Problems Faced

### Task No.: 2

**Issue:** The callback version was difficult to understand because the callbacks became nested.

**Attempted Solution:** I checked the order of the functions and understood how one callback calls the next function.

### Task No.: 3

**Issue:** The output was sometimes successful and sometimes showed an error.

**Attempted Solution:** I understood that `Math.random()` gives around an 80% chance of success, so I ran the program multiple times to see both outcomes.

### Conclusion

This lab helped me understand different ways of handling asynchronous operations in Node.js. I also learned the difference between callbacks, Promises and async/await. I understood how Promise chaining and `Promise.all()` work with asynchronous tasks.

