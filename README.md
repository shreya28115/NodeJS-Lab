# Lab Assignment – 02

## Building Your First Node.js Server

### Student Information

**Student Name:** Shreya Singh
**Scholar Number:** 23145022  
**Course:** BCA  
**Semester:** VII  
**Subject:** CS403NOD – Node.js  
**Lab Number:** 02  
**Date:** 07 August 2026  

## Objective

The objective of this practical is to understand how Node.js handles HTTP requests using the core http module. In this practical, a basic HTTP server was created and multiple routes were handled. Plain text and JSON responses were also implemented. The practical also introduced the request and response objects, environment variables, HTTP status codes, and basic Node.js architecture.

## Brief Description

In this practical, a Node.js HTTP server was created using the built-in http module. The server runs on port 3000 by default and handles different routes such as the home page, about page, college page, and profile page.

The profile route returns student information in JSON format. An unknown route returns a 404 status with the message "Page Not Found". The server port was configured using an environment variable with port 3000 as the default value.

## Routes

| Route | Response |
|---|---|
| `/` | Displays welcome message, name, scholar number and course |
| `/about` | Displays a short message about the student |
| `/college` | Displays college name and semester |
| `/profile` | Returns student information in JSON format |
| Unknown route | Returns 404 status with "Page Not Found" |

## Tasks Completed

- Created Lab-02 project folder
- Initialized Node.js project using npm
- Created an HTTP server using the http module
- Added multiple routes
- Added JSON response
- Added 404 handling
- Used an environment variable for the server port
- Created architecture notes

## Result

The Node.js HTTP server was successfully created and tested. Multiple routes were handled successfully, JSON data was returned from the profile route, and unknown routes returned a 404 response.

## Problems Faced

No major problems were faced during this practical.

## Lab Assignment – 03

### Student Directory API

**Student Name:** Shreya Singh  
**Scholar Number:** 23145022  
**Course:** BCA  
**Semester:** VII  
**Subject:** CS403NOD – Node.js  
**Lab Number:** 03  
**Date:** 10 August 2026

### Brief Description

This practical demonstrates how to create a Student Directory API using Node.js and the core HTTP module. Dynamic routes are used to return specific student and item data based on the ID provided in the URL. The practical also demonstrates the use of find() and filter() array methods and handling of not found and invalid ID cases.

### Routes Added

| Route | Description |
|---|---|
| /students | Returns the complete list of 12 students |
| /students/1 | Returns the student with ID 1 |
| /students/2 | Returns the student with ID 2 |
| /students/99 | Returns "Student not found" |
| /students/course/BCA | Returns only students from the BCA course |
| /students/abc | Returns an error for a non-numeric student ID |
| /items | Returns the complete list of items |
| /items/1 | Returns the item with ID 1 |
| /items/99 | Returns "Item not found" |

### req.url.split()

The req.url.split('/') method divides the URL into parts using the slash character, and split('/')[2] is used to extract the ID from a URL such as /students/1.

## Problems Faced

No major problems were faced during the completion of this lab.