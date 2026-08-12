const http = require('http');
const url = require('url');

const students = [
    { id: 1, name: "Gauri", course: "BCA", marks: 85 },
    { id: 2, name: "Kanak", course: "BCA", marks: 72 },
    { id: 3, name: "Nisha", course: "BCA", marks: 91 },
    { id: 4, name: "Pragya", course: "BCA", marks: 64 },
    { id: 5, name: "Kashyap", course: "BIT", marks: 78 },
    { id: 6, name: "Shreya", course: "BCA", marks: 88 },
    { id: 7, name: "Mikki", course: "BIT", marks: 55 },
    { id: 8, name: "Bhaskar", course: "BCA", marks: 69 },
    { id: 9, name: "Yadev", course: "BIT", marks: 82 },
    { id: 10, name: "Ayush", course: "BCA", marks: 73 },
    { id: 11, name: "Rishab", course: "BIT", marks: 61 },
    { id: 12, name: "Sayon", course: "BCA", marks: 95 }
];

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Only /students route
    if (pathName === '/students') {

        let result = [...students];

        // Task 3 - Course filter
        if (query.course) {
            result = result.filter(
                student => student.course.toLowerCase() === query.course.toLowerCase()
            );
        }

        // Task 3 & 7 - Minimum marks filter
        if (query.minMarks) {

            const minMarks = Number(query.minMarks);

            if (isNaN(minMarks)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "minMarks must be a number"
                }));
                return;
            }

            result = result.filter(
                student => student.marks >= minMarks
            );
        }

        // Task 4 - Search by name
        if (query.search) {

            const searchText = query.search.toLowerCase();

            result = result.filter(
                student => student.name.toLowerCase().includes(searchText)
            );
        }

        // Task 5 - Sorting
        if (query.sort) {

            if (query.sort !== 'name' && query.sort !== 'marks') {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "Invalid sort field. Use 'name' or 'marks'"
                }));
                return;
            }

            const order = query.order || 'asc';

            if (order !== 'asc' && order !== 'desc') {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "Invalid order. Use 'asc' or 'desc'"
                }));
                return;
            }

            result.sort((a, b) => {

                let comparison;

                if (query.sort === 'name') {
                    comparison = a.name.localeCompare(b.name);
                } else {
                    comparison = a.marks - b.marks;
                }

                return order === 'desc'
                    ? -comparison
                    : comparison;
            });
        }

        // Return final result
        res.end(JSON.stringify(result, null, 2));
    }

    // Unknown route
    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Route not found"
        }));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});