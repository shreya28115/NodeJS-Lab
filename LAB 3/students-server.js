const http = require('http');

// Student Directory
const students = [
    { id: 1, name: "Gauri", course: "BCA", semester: "VII" },
    { id: 2, name: "Kanak", course: "BCA", semester: "VII" },
    { id: 3, name: "Nisha", course: "BCA", semester: "VII" },
    { id: 4, name: "Pragya", course: "BCA", semester: "VII" },
    { id: 5, name: "Kashyap", course: "BCA", semester: "VII" },
    { id: 6, name: "Shreya", course: "BCA", semester: "VII" },
    { id: 7, name: "Mikki", course: "BCA", semester: "VII" },
    { id: 8, name: "Bhaskar", course: "BCA", semester: "VII" },
    { id: 9, name: "Yadev", course: "BCA", semester: "VII" },
    { id: 10, name: "Ayush", course: "BCA", semester: "VII" },
    { id: 11, name: "Rishab", course: "BCA", semester: "VII" },
    { id: 12, name: "Sayon", course: "BCA", semester: "VII" }
];

// My Own Directory: Programming Items
const items = [
    { id: 1, name: "JavaScript", category: "Programming" },
    { id: 2, name: "Node.js", category: "Backend Development" },
    { id: 3, name: "Python", category: "Programming" },
    { id: 4, name: "MySQL", category: "Database" },
    { id: 5, name: "HTML", category: "Web Development" }
];

// Create Server
const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    // 1. Return all students
    if (req.url === '/students') {

        res.writeHead(200);
        res.end(JSON.stringify(students));
    }

    // 2. Return only BCA students
    else if (req.url === '/students/course/BCA') {

        const bcaStudents = students.filter(
            student => student.course === 'BCA'
        );

        res.writeHead(200);
        res.end(JSON.stringify(bcaStudents));
    }

    // 3. Return student by ID
    else if (req.url.startsWith('/students/')) {

        const idText = req.url.split('/')[2];

        // Check if ID is numeric
        if (isNaN(idText)) {

            res.writeHead(400);
            res.end(JSON.stringify({
                error: "Student ID must be a number"
            }));

            return;
        }

        const id = Number(idText);

        const student = students.find(
            student => student.id === id
        );

        if (student) {

            res.writeHead(200);
            res.end(JSON.stringify(student));

        } else {

            res.writeHead(404);
            res.end(JSON.stringify({
                error: "Student not found"
            }));
        }
    }

    // 4. Return all items
    else if (req.url === '/items') {

        res.writeHead(200);
        res.end(JSON.stringify(items));
    }

    // 5. Return item by ID
    else if (req.url.startsWith('/items/')) {

        const idText = req.url.split('/')[2];

        // Check if ID is numeric
        if (isNaN(idText)) {

            res.writeHead(400);
            res.end(JSON.stringify({
                error: "Item ID must be a number"
            }));

            return;
        }

        const id = Number(idText);

        const item = items.find(
            item => item.id === id
        );

        if (item) {

            res.writeHead(200);
            res.end(JSON.stringify(item));

        } else {

            res.writeHead(404);
            res.end(JSON.stringify({
                error: "Item not found"
            }));
        }
    }

    // 6. Unknown route
    else {

        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Route not found"
        }));
    }
});

// Start Server
server.listen(3000, () => {
    console.log("Server running on port 3000");
});