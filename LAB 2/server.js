const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        res.end(
            'Welcome to my Node.js Server\n' +
            'Name: Shreya Singh\n' +
            'Scholar Number: 23145022\n' +
            'Course: BCA'
        );

    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        res.end(
            'About Me\n' +
            'I am a BCA student learning Node.js and backend development.'
        );

    } else if (req.url === '/college') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        res.end(
            'College: Dev Sanskriti Vishwavidyalaya\n' +
            'Semester: VII'
        );

    } else if (req.url === '/profile') {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        const profile = {
            name: 'Shreya Singh',
            scholarNumber: '23145022',
            course: 'BCA',
            semester: 'VII',
            college: 'Dev Sanskriti Vishwavidyalaya'
        };

        res.end(JSON.stringify(profile));

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});