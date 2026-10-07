# Node.js Integrated Lab Server

## Student Details

Name: Shreya Singh
Roll No.: 23145022
Class: BCA VII
Department: Computer Science

## Project Description

This project integrates LAB 01 to LAB 07 into one Node.js server. The project reuses the previous lab programs and provides a common server to view source code, run script-based labs, access server-based labs, check health status, view the lab list and display dashboard information.

The integrated server can be run locally and has also been deployed on Render.

## Labs Included

| Lab    | Topic                                    | Type   |
| ------ | ---------------------------------------- | ------ |
| LAB 01 | Node.js Basics and Console Output        | Script |
| LAB 02 | Node.js HTTP Server and Routing          | Server |
| LAB 03 | Student Directory API                    | Server |
| LAB 04 | Advanced Search, Filter and Sort API     | Server |
| LAB 05 | Callbacks, Promises and Async JavaScript | Script |
| LAB 06 | Node.js File System                      | Script |
| LAB 07 | Node.js EventEmitter                     | Script |

## Routes

| Route                | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `/`                  | Displays the integrated lab server home page               |
| `/about`             | Displays project and student information                   |
| `/health`            | Shows server health and environment status                 |
| `/labs`              | Returns the list of all integrated labs                    |
| `/labs/:id`          | Displays details and source code of a lab                  |
| `/labs/:id/run`      | Runs a script-based lab                                    |
| `/labs/:id/app/...`  | Accesses a server-based lab application                    |
| `/screenshots/:name` | Displays a lab screenshot                                  |
| `/api/dashboard`     | Returns dashboard information, screenshots and recent logs |

## Technologies Used

* Node.js
* HTTP module
* File System (`fs`)
* Child Process (`child_process`)
* EventEmitter
* URL module
* slugify
* GitHub
* Render

## Running Locally

Open PowerShell in the project root and run:

```text
cd "LAB 8"
npm install
node server.js
```

The integrated server will run on:

```text
http://localhost:3000
```

## Live Deployment

The integrated server is deployed on Render.

Live URL:

https://nodejs-lab-71jz.onrender.com

## Screenshots

The required local and live screenshots for LAB 01 to LAB 07 are stored in:

```text
public/screenshots/
```

The screenshots include local and live outputs of the integrated labs.

## What I Learned

Through this lab, I learned how to integrate multiple Node.js labs into one server using `require()` and `module.exports`. I also learned how to create a lab registry, handle different routes, execute script files using child processes, use EventEmitter for logging, serve screenshots, handle errors and deploy a Node.js application on Render.

## Conclusion

The previous Node.js labs have been integrated into a single server that works locally and is deployed live on Render.
