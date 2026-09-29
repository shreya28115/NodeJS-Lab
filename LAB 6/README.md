# Lab Assignment – 06

## Working With The File System (fs) Module

**Lab Number:** 06  
**Semester:** BCA VII  
**Date:** 29 September 2026

## Objective

The objective of this lab is to understand how Node.js works with files using the fs module. The lab covers asynchronous and synchronous file reading, writing, appending, deleting files, async/await with fs.promises, and a small command-line Notes App.

## Files and Their Purpose

1. **sample.txt** – Contains sample text used for file-reading operations.
2. **read-async.js** – Demonstrates asynchronous file reading using fs.readFile().
3. **read-sync.js** – Demonstrates synchronous file reading using fs.readFileSync().
4. **write-file.js** – Demonstrates writing and overwriting file content using fs.writeFile().
5. **append-file.js** – Demonstrates adding new content using fs.appendFile().
6. **delete-file.js** – Demonstrates deleting a file using fs.unlink().
7. **async-await-version.js** – Demonstrates reading and writing files using fs.promises and async/await.
8. **add-note.js** – Adds a command-line note to notes.txt.
9. **read-notes.js** – Reads and displays all saved notes.
10. **reflection-notes.txt** – Contains observations about asynchronous file operations and concurrent file access.

## How to Run

Open the terminal inside the LAB 6 folder and run:

```bash
node read-async.js
node read-sync.js
node write-file.js
node append-file.js
node delete-file.js
node async-await-version.js
node add-note.js "Submit Lab 06 by Friday"
node read-notes.js