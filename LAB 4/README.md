# Lab Assignment 04 – Advanced Search, Filter & Sort API

## Objective

The objective of this lab is to build a Node.js API that supports advanced filtering, searching, sorting, query parameters, and input validation.

## Task 1 – Setup

Created the following file:

* advanced-server.js
* advanced-output.png
* README.md

The server uses the built-in `http` and `url` modules.

## Task 2 – Student Data

Created a student array containing student objects with the following fields:

* id
* name
* course
* marks

The data contains multiple courses and different marks so that filtering and sorting can be tested properly.

## Task 3 – Multi-Field Filtering

The API supports the following query parameters:

### course

Filters students according to their course.

Example:

`/students?course=BCA`

Only students from the BCA course are returned.

### minMarks

Filters students according to their minimum marks.

Example:

`/students?minMarks=60`

Only students having marks greater than or equal to 60 are returned.

### Combining course and minMarks

Both parameters can be used together.

Example:

`/students?course=BCA&minMarks=60`

The result contains students who belong to BCA AND have marks greater than or equal to 60.

## Task 4 – Partial Text Search

The `search` parameter searches for text contained anywhere in a student's name.

The search is case-insensitive.

Example:

`/students?search=an`

This can match names containing `an`, regardless of uppercase or lowercase letters.

## Task 5 – Sorting

The API supports two sorting fields:

* name
* marks

### Sort by marks

Example:

`/students?sort=marks&order=desc`

Returns students from highest marks to lowest marks.

### Sort by name

Example:

`/students?sort=name&order=asc`

Returns students in alphabetical order.

If the `order` parameter is not provided, ascending order is used by default.

Only `name` and `marks` are accepted as valid values for the `sort` parameter.

## Task 6 – Combining Everything

Multiple query parameters can be used in one request.

Example:

`/students?course=BCA&minMarks=60&search=a&sort=marks&order=desc`

The server first applies the filters and search, and then sorts the filtered result.

## Task 7 – Input Validation

The server validates the `minMarks`, `sort`, and `order` parameters.

If `minMarks` is not a valid number, the server returns HTTP status 400 with an error message.

For example:

`/students?minMarks=abc`

If an invalid sort field or order is provided, the server also returns status 400 with a clear JSON error message instead of silently ignoring the input.

## Task 8 – Bonus Challenge

The course can also be provided as part of the route.

Example:

`/students/course/BCA?minMarks=60&sort=marks&order=desc`

This route combines the course from the URL with query parameters.

## Query Parameters Summary

| Parameter | Purpose                       | Example                         |
| --------- | ----------------------------- | ------------------------------- |
| course    | Filters students by course    | /students?course=BCA            |
| minMarks  | Filters by minimum marks      | /students?minMarks=60           |
| search    | Searches student names        | /students?search=a              |
| sort      | Sorts by name or marks        | /students?sort=marks            |
| order     | Sorts ascending or descending | /students?sort=marks&order=desc |

## Testing Checklist

The following requests were tested:

1. `/students`
2. `/students?course=BCA`
3. `/students?minMarks=60`
4. `/students?search=a`
5. `/students?sort=marks&order=desc`
6. `/students?sort=xyz`
7. `/students?minMarks=abc`
8. `/students?course=BCA&minMarks=60&search=a&sort=marks&order=desc`

## Problems Faced

No major problem was faced while completing this lab.

## GitHub Submission

Repository: NodeJS-Lab

Commit message:

`Lab 04 - Advanced Search, Filter and Sort API`
