# Lab Assignment – 07

## Implementing EventEmitter — Event-Driven Programming

**Course:** CS403NOD – Node.js  
**Semester:** BCA VII  
**Lab Number:** 07  
**Date:** 03 October 2026

## Objective

The objective of this lab is to understand event-driven programming in Node.js using the EventEmitter class. This lab demonstrates custom events, multiple listeners, one-time listeners, error handling, custom EventEmitter classes, and a Real-Time Order Tracking System.

## Files and Their Purpose

1. **events-basic.js** – Demonstrates creating and triggering a custom event using EventEmitter.
2. **order-system.js** – Demonstrates multiple independent listeners responding to the same order event.
3. **once-vs-on.js** – Explains the difference between once() and on() listeners.
4. **error-handling.js** – Demonstrates handling the error event safely.
5. **notification-center.js** – Demonstrates extending EventEmitter using a custom NotificationCenter class.
6. **order-tracker.js** – Implements a Real-Time Order Tracking System with order placement, preparation, delivery, notifications, and a first-order bonus.
7. **reflection-notes.txt** – Contains reflections on EventEmitter, the Observer Pattern, and the Node.js HTTP Server API.

## How to Run

Open a terminal inside the LAB 07 folder.

Run each program separately:

```bash
node events-basic.js
node order-system.js
node once-vs-on.js
node error-handling.js
node notification-center.js
node order-tracker.js
```

Note: error-handling.js should first be tested without an error listener to observe the error, then with the listener to demonstrate safe handling.

## Important Concepts

### EventEmitter

EventEmitter allows objects to emit named events and notify registered listeners.

### on()

Registers a listener that runs whenever the specified event is emitted.

### once()

Registers a listener that runs only once.

### emit()

Triggers an event and passes any supplied arguments to its listeners.

### Error Handling

Registering an error listener helps handle emitted errors instead of allowing an unhandled error to terminate the process.

### Extending EventEmitter

A custom class can extend EventEmitter to provide event-driven functionality.

## Mini Project: Real-Time Order Tracking System

The order-tracker.js program simulates an order lifecycle:

1. Order placed.
2. Order confirmation notification sent.
3. First-order bonus granted.
4. Order prepared.
5. Preparation notification sent.
6. Order delivered.
7. Delivery notification sent.

The project uses multiple listeners, a one-time listener, an error listener, and setTimeout() to simulate delays.

## Screenshots

- **error-event-output.png** – Demonstrates error handling before and after registering an error listener.
- **order-tracker-output.png** – Shows the complete order tracking lifecycle.

## Problems Faced

Document any actual problems encountered while completing the lab, including the task number, error message, attempted solution, and relevant screenshot.

## Conclusion

This lab helped me understand event-driven programming in Node.js. I learned how to create custom events, register multiple listeners, use once() and on(), handle errors, and extend EventEmitter through a custom class. I also implemented a simple order tracking system using these concepts.