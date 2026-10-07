const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const { execFile } = require("child_process");

const slugify = require("slugify");

const labs = require("./labs");
const { logger } = require("./modules/logger");

const PORT = process.env.PORT || 3000;

function send(res, statusCode, data, contentType = "application/json") {
    res.writeHead(statusCode, {
        "Content-Type": `${contentType}; charset=utf-8`
    });

    if (typeof data === "string") {
        res.end(data);
    } else {
        res.end(JSON.stringify(data, null, 2));
    }
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function findLab(id) {
    return labs.find(lab => lab.id === id);
}

function getEnvironment() {
    return process.env.RENDER
        ? "live (Render)"
        : "local";
}

async function runScriptLab(lab) {

    const filePath = path.resolve(__dirname, lab.file);

    return new Promise((resolve) => {

        execFile(
            process.execPath,
            [filePath],
            {
                timeout: 5000,
                cwd: path.dirname(filePath)
            },
            (error, stdout, stderr) => {

                resolve({
                    ok: !error,
                    output: stdout,
                    error: stderr || (error ? error.message : "")
                });
            }
        );
    });
}

async function handleServerLab(req, res, lab, parsedUrl) {

    const prefix = `/labs/${lab.id}/app`;

    let forwardedPath = parsedUrl.pathname.substring(prefix.length);

    if (!forwardedPath) {
        forwardedPath = "/";
    }

    if (!forwardedPath.startsWith("/")) {
        forwardedPath = "/" + forwardedPath;
    }

    const queryString = parsedUrl.search || "";

    const originalUrl = req.url;

    req.url = forwardedPath + queryString;

    try {

        const handler = require(
            path.resolve(__dirname, lab.file)
        );

        if (typeof handler !== "function") {
            send(res, 500, {
                error: "Lab server does not export a request handler"
            });
            return;
        }

        handler(req, res);

    } catch (error) {

        console.error(error);

        if (!res.headersSent) {
            send(res, 500, {
                error: "Failed to load lab server",
                message: error.message
            });
        }
    } finally {
        req.url = originalUrl;
    }
}

async function handleRequest(req, res) {

    logger.emit("request", req.method, req.url);

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // HOME
    if (pathname === "/") {

        const labLinks = labs.map(lab => {

            const action =
                lab.type === "server"
                    ? `<a href="/labs/${lab.id}/app/">Open App</a>`
                    : `<a href="/labs/${lab.id}/run">Run Lab</a>`;

            return `
                <li>
                    <strong>${lab.title}</strong>
                    <span>${lab.topic}</span>
                    ${action}
                </li>
            `;
        }).join("");

        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Node.js Integrated Lab Server</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4eee8;
            color: #3e2723;
            margin: 0;
        }

        header {
            background: #4e342e;
            color: white;
            padding: 35px;
            text-align: center;
        }

        main {
            max-width: 900px;
            margin: 30px auto;
            padding: 20px;
        }

        .card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.12);
        }

        li {
            list-style: none;
            padding: 18px;
            margin: 12px 0;
            border: 1px solid #ddd;
            border-radius: 10px;
        }

        li span {
            display: block;
            margin: 6px 0 12px;
            color: #666;
        }

        a {
            color: #6d4c41;
            font-weight: bold;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .links {
            margin-top: 20px;
        }

        .links a {
            margin-right: 20px;
        }
    </style>
</head>

<body>

<header>
    <h1>Node.js Integrated Lab Server</h1>
    <p>LAB 01 - LAB 07 Integration</p>
    <p>Environment: ${getEnvironment()}</p>
</header>

<main>

    <div class="card">

        <h2>Available Labs</h2>

        <ul>
            ${labLinks}
        </ul>

        <div class="links">
            <a href="/about">About</a>
            <a href="/health">Health</a>
            <a href="/labs">Labs API</a>
            <a href="/api/dashboard">Dashboard API</a>
        </div>

    </div>

</main>

</body>
</html>
        `;

        send(res, 200, html, "text/html");
        return;
    }

    // ABOUT
    if (pathname === "/about") {

        send(res, 200, {
            project: "Node.js Integrated Lab Server",
            student: process.env.STUDENT_NAME || "Shreya Singh",
            numberOfLabs: labs.length
        });

        return;
    }

    // HEALTH
    if (pathname === "/health") {

        send(res, 200, {
            status: "ok",
            environment: getEnvironment(),
            uptimeSeconds: Math.floor(process.uptime())
        });

        return;
    }

    // LABS LIST
    if (pathname === "/labs") {

        const result = labs.map(lab => ({
            id: lab.id,
            title: lab.title,
            topic: lab.topic,
            type: lab.type,
            slug: slugify(lab.title, {
                lower: true
            })
        }));

        send(res, 200, result);
        return;
    }

    // LAB ROUTES
    const labMatch = pathname.match(/^\/labs\/([^/]+)(\/.*)?$/);

    if (labMatch) {

        const labId = labMatch[1];
        const subPath = labMatch[2] || "";

        const lab = findLab(labId);

        if (!lab) {
            send(res, 404, {
                error: "Lab not found",
                labId
            });
            return;
        }

        // RUN SCRIPT
        if (subPath === "/run") {

            if (lab.type !== "script") {
                send(res, 400, {
                    error: "This lab is a server lab. Use /app instead."
                });
                return;
            }

            const result = await runScriptLab(lab);

            send(res, 200, result);
            return;
        }

        // SERVER APP
        if (subPath === "/app" || subPath.startsWith("/app/")) {

            if (lab.type !== "server") {
                send(res, 400, {
                    error: "This lab is a script lab. Use /run instead."
                });
                return;
            }

            await handleServerLab(req, res, lab, parsedUrl);
            return;
        }

        // LAB DETAIL PAGE
        if (subPath === "") {

            const filePath = path.resolve(__dirname, lab.file);

            try {

                const source = await fs.promises.readFile(
                    filePath,
                    "utf8"
                );

                const safeSource = escapeHtml(source);

                const action =
                    lab.type === "server"
                        ? `<a href="/labs/${lab.id}/app/">Open Lab App</a>`
                        : `<a href="/labs/${lab.id}/run">Run Lab</a>`;

                const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${lab.title}</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4eee8;
            color: #3e2723;
            padding: 30px;
        }

        .container {
            max-width: 1000px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
        }

        pre {
            background: #272222;
            color: #f5f5f5;
            padding: 20px;
            overflow-x: auto;
            border-radius: 8px;
        }

        a {
            color: #6d4c41;
            font-weight: bold;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>${lab.title}</h1>

    <p><strong>Topic:</strong> ${lab.topic}</p>
    <p><strong>Type:</strong> ${lab.type}</p>

    <p>${action}</p>

    <h2>Source Code</h2>

    <pre>${safeSource}</pre>

    <p>
        <a href="/">← Back to Home</a>
    </p>

</div>

</body>
</html>
                `;

                send(res, 200, html, "text/html");

            } catch (error) {

                send(res, 500, {
                    error: "Unable to read lab source",
                    message: error.message
                });
            }

            return;
        }

        send(res, 404, {
            error: "Lab route not found"
        });

        return;
    }

    // SCREENSHOTS
    const screenshotMatch =
        pathname.match(/^\/screenshots\/(.+)$/);

    if (screenshotMatch) {

        const fileName = path.basename(screenshotMatch[1]);

        const extension =
            path.extname(fileName).toLowerCase();

        if (![".png", ".jpg", ".jpeg"].includes(extension)) {

            send(res, 400, {
                error: "Only PNG and JPG screenshots are allowed"
            });

            return;
        }

        const filePath = path.join(
            __dirname,
            "public",
            "screenshots",
            fileName
        );

        try {

            const image = await fs.promises.readFile(filePath);

            res.writeHead(200, {
                "Content-Type":
                    extension === ".png"
                        ? "image/png"
                        : "image/jpeg"
            });

            res.end(image);

        } catch (error) {

            send(res, 404, {
                error: "Screenshot not found"
            });
        }

        return;
    }

    // DASHBOARD API
    if (pathname === "/api/dashboard") {

        try {

            const logFile = path.join(
                __dirname,
                "logs",
                "server.log"
            );

            const screenshotDir = path.join(
                __dirname,
                "public",
                "screenshots"
            );

            const [logData, screenshotFiles] =
                await Promise.all([

                    fs.promises
                        .readFile(logFile, "utf8")
                        .catch(() => ""),

                    fs.promises
                        .readdir(screenshotDir)
                        .catch(() => [])
                ]);

            send(res, 200, {
                environment: getEnvironment(),
                labs: labs.length,
                screenshots: screenshotFiles,
                recentLogs: logData
                    .trim()
                    .split("\n")
                    .filter(Boolean)
                    .slice(-20)
            });

        } catch (error) {

            send(res, 500, {
                error: "Dashboard error",
                message: error.message
            });
        }

        return;
    }

    // 404
    send(res, 404, {
        error: "Route not found",
        path: pathname
    });
}

const server = http.createServer((req, res) => {

    Promise.resolve(handleRequest(req, res))
        .catch(error => {

            console.error("Unexpected server error:", error);

            if (!res.headersSent) {
                send(res, 500, {
                    error: "Internal Server Error"
                });
            }
        });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Integrated Lab Server running on port ${PORT}`);
});