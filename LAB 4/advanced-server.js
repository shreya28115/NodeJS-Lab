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

function handler(req, res) {

    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathName === '/students') {

        let result = [...students];

        if (query.course) {
            result = result.filter(
                student =>
                    student.course.toLowerCase() ===
                    query.course.toLowerCase()
            );
        }

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

        if (query.search) {

            const searchText = query.search.toLowerCase();

            result = result.filter(
                student =>
                    student.name.toLowerCase().includes(searchText)
            );
        }

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

        res.writeHead(200);
        res.end(JSON.stringify(result, null, 2));

    } else {

        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Route not found"
        }));
    }
}

module.exports = handler;

// Run independently only when this file is executed directly
if (require.main === module) {
    const server = http.createServer(handler);

    server.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}