const express = require("express");
const path = require("path");
const fs = require("fs");
const { execFile } = require("child_process");

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const LABS_PATH = path.join(__dirname, "..");

// GitHub repository
const GITHUB_USER = "shreya28115";
const GITHUB_REPO = "NodeJS-Lab";
const GITHUB_BRANCH = "main";


// =========================
// AVAILABLE LABS
// =========================

const allowedLabs = [
    "LAB 1",
    "LAB 2",
    "LAB 3",
    "LAB 4",
    "LAB 5",
    "LAB 6",
    "LAB 7"
];


// =========================
// SERVE LAB SCREENSHOTS
// =========================

app.get("/screenshots/:lab/:filename", (req, res) => {

    const lab = req.params.lab;
    const filename = req.params.filename;

    if (!allowedLabs.includes(lab)) {
        return res.status(404).send("Lab not found");
    }

    const labPath = path.join(LABS_PATH, lab);
    const filePath = path.join(labPath, filename);

    if (!filePath.startsWith(labPath)) {
        return res.status(400).send("Invalid file.");
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("Screenshot not found.");
    }

    res.sendFile(filePath);

});


// =========================
// HOME
// =========================

app.get("/", (req, res) => {

    res.render("home", {
        labs: allowedLabs
    });

});


// =========================
// LAB TOPICS
// =========================

function getLabTopic(lab) {

    const topics = {

        "LAB 1":
            "Node.js Basics and Console Output",

        "LAB 2":
            "Node.js HTTP Server and Routing",

        "LAB 3":
            "Student Management HTTP Server",

        "LAB 4":
            "URL Routing, Filtering and Sorting",

        "LAB 5":
            "Callbacks, Promises and Async JavaScript",

        "LAB 6":
            "Node.js File System",

        "LAB 7":
            "Node.js EventEmitter"

    };

    return topics[lab] || "Node.js Practical";

}


// =========================
// INDIVIDUAL LAB PAGE
// =========================

app.get("/lab/:lab", (req, res) => {

    const lab = req.params.lab;

    if (!allowedLabs.includes(lab)) {
        return res.status(404).send("Lab not found");
    }

    const labPath = path.join(LABS_PATH, lab);

    if (!fs.existsSync(labPath)) {
        return res.status(404).send("Lab folder not found");
    }


    // =========================
    // JAVASCRIPT FILES
    // =========================

    const files = fs.readdirSync(labPath)
        .filter(file =>
            file.toLowerCase().endsWith(".js")
        );


    // =========================
    // READ SOURCE CODE
    // =========================

    const codeFiles = files.map(file => {

        let code = "";

        try {

            code = fs.readFileSync(
                path.join(labPath, file),
                "utf8"
            );

        } catch (error) {

            code = "Unable to read source code.";

        }

        return {

            name: file,
            code: code

        };

    });


    // =========================
    // ALL FILES
    // =========================

    const allFiles = fs.readdirSync(labPath);


    // =========================
    // README / TASK
    // =========================

    const readmeFile = allFiles.find(
        file =>
            file.toLowerCase() === "readme.md"
    );

    let readme = "";

    if (readmeFile) {

        try {

            readme = fs.readFileSync(
                path.join(labPath, readmeFile),
                "utf8"
            );

        } catch (error) {

            readme = "";

        }

    }


    // =========================
    // SCREENSHOTS
    // =========================

    const screenshots = allFiles.filter(file =>
        /\.(png|jpg|jpeg|webp)$/i.test(file)
    );


    // =========================
    // GITHUB
    // =========================

    const githubUrl =
        `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/tree/${GITHUB_BRANCH}/${encodeURIComponent(lab)}`;


    // =========================
    // RENDER LAB PAGE
    // =========================

    res.render("lab", {

        lab: lab,

        topic:
            getLabTopic(lab),

        files: files,

        codeFiles: codeFiles,

        readme: readme,

        screenshots: screenshots,

        githubUrl: githubUrl

    });

});


// =========================
// RUN JAVASCRIPT FILE
// =========================

app.post("/run", (req, res) => {

    const { lab, filename } = req.body;


    // Check lab
    if (!allowedLabs.includes(lab)) {

        return res.status(400).json({

            success: false,
            output: "Invalid lab."

        });

    }


    // Check filename
    if (!filename || !filename.endsWith(".js")) {

        return res.status(400).json({

            success: false,
            output:
                "Only JavaScript files can be executed."

        });

    }


    const labPath =
        path.join(LABS_PATH, lab);

    const filePath =
        path.join(labPath, filename);


    // Security check
    if (!filePath.startsWith(labPath)) {

        return res.status(400).json({

            success: false,
            output: "Invalid file."

        });

    }


    // Check file exists
    if (!fs.existsSync(filePath)) {

        return res.status(404).json({

            success: false,
            output: "File not found."

        });

    }


    // Run Node.js file
    execFile(

        "node",

        [filePath],

        {
            timeout: 15000
        },

        (error, stdout, stderr) => {

            let output = "";


            if (stdout) {

                output += stdout;

            }


            if (stderr) {

                output += "\n" + stderr;

            }


            if (error && error.killed) {

                output +=
                    "\n\nProgram stopped after 15 seconds.";

            }


            res.json({

                success:
                    !error || error.killed,

                output:
                    output ||
                    "Program executed successfully."

            });

        }

    );

});


// =========================
// VIEW SOURCE FILE
// =========================

app.get("/file/:lab/:filename", (req, res) => {

    const lab = req.params.lab;
    const filename = req.params.filename;


    if (!allowedLabs.includes(lab)) {

        return res.status(404).send(
            "Lab not found"
        );

    }


    const labPath =
        path.join(LABS_PATH, lab);

    const filePath =
        path.join(labPath, filename);


    if (!filePath.startsWith(labPath)) {

        return res.status(400).send(
            "Invalid file."
        );

    }


    if (!fs.existsSync(filePath)) {

        return res.status(404).send(
            "File not found"
        );

    }


    if (!filename.endsWith(".js")) {

        return res.status(400).send(
            "Invalid file type."
        );

    }


    fs.readFile(
        filePath,
        "utf8",
        (err, data) => {

            if (err) {

                return res
                    .status(500)
                    .send(
                        "Unable to read file"
                    );

            }


            res.send(`

                <!DOCTYPE html>

                <html>

                <head>

                    <title>
                        ${escapeHtml(filename)}
                    </title>

                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    >

                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                    >

                </head>


                <body class="bg-light">

                    <div class="container py-5">

                        <div
                            class="d-flex justify-content-between align-items-center mb-4"
                        >

                            <h2>
                                ${escapeHtml(filename)}
                            </h2>

                            <button
                                onclick="history.back()"
                                class="btn btn-secondary"
                            >
                                ← Back
                            </button>

                        </div>


                        <div class="card shadow-sm">

                            <div class="card-body">

                                <pre
                                    class="bg-dark text-light p-4 rounded"
                                    style="white-space: pre-wrap;"
                                >${escapeHtml(data)}</pre>

                            </div>

                        </div>

                    </div>

                </body>

                </html>

            `);

        }

    );

});


// =========================
// ESCAPE HTML
// =========================

function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `Frontend running at http://localhost:${PORT}`
    );

});