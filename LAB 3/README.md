# Lab Assignment 03 – Student Directory API

## Objective

The objective of this lab is to understand route parameters in Node.js and create dynamic routes that return specific data based on the value present in the URL.

## Task 1 – Project Setup

Created the following files inside the LAB 3 folder:

* students-server.js
* students-output.png
* items-output.png
* README.md

## Task 2 – Student Directory Server

Created a Node.js HTTP server using the built-in `http` module.

The server supports the following routes:

### /students

Returns the complete list of students.

### /students/1

Returns the student whose ID is 1.

### /students/2

Returns the student whose ID is 2.

### /students/99

Returns a 404 error with the message:

`Student not found`

### /students/abc

Handles a non-numeric ID and returns a clear error message.

The server uses the `find()` array method to search for a student by ID.

## Task 3 – Own Directory

Created my own directory using programming-related items.

The following routes are supported:

### /items

Returns the complete list of items.

### /items/:id

Returns one item according to its ID.

If the requested item does not exist, the server returns a not found error.

The `find()` array method is used to search for an item by ID.

## Task 4 – Bonus Challenge

Added the following route:

### /students/course/BCA

Returns only the students whose course is BCA.

The `filter()` array method is used to create the filtered list.

The server also handles non-numeric student IDs with a clear error message.

## Important Concept

### What does req.url.split() do?

`req.url.split('/')` divides the URL into separate parts using `/` as the separator. The required ID can then be accessed from the appropriate position in the resulting array.

## Routes Summary

| Route                | Purpose                   |
| -------------------- | ------------------------- |
| /students            | Returns all students      |
| /students/:id        | Returns a student by ID   |
| /students/course/BCA | Returns only BCA students |
| /items               | Returns all items         |
| /items/:id           | Returns an item by ID     |

## HTTP Status Codes

* 200 – Successful request
* 400 – Invalid ID input
* 404 – Student, item, or route not found

## Problems Faced

No major problem was faced while completing this lab.

## GitHub Submission

Repository: NodeJS-Lab

Commit message:

`Lab 03 - Student Directory API`
