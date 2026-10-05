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

const allowedLabs = [
    "LAB 1",
    "LAB 2",
    "LAB 3",
    "LAB 4",
    "LAB 5",
    "LAB 6",
    "LAB 7"
];

// HOME
app.get("/", (req, res) => {
    res.render("home", {
        labs: allowedLabs
    });
});

// LAB PAGE
app.get("/lab/:lab", (req, res) => {

    const lab = req.params.lab;

    if (!allowedLabs.includes(lab)) {
        return res.status(404).send("Lab not found");
    }

    const labPath = path.join(LABS_PATH, lab);

    if (!fs.existsSync(labPath)) {
        return res.status(404).send("Lab folder not found");
    }

    const files = fs.readdirSync(labPath)
        .filter(file => file.endsWith(".js"));

    res.render("lab", {
        lab,
        files
    });
});

// RUN JAVASCRIPT FILE
app.post("/run", (req, res) => {

    const { lab, filename } = req.body;

    if (!allowedLabs.includes(lab)) {
        return res.status(400).json({
            success: false,
            output: "Invalid lab."
        });
    }

    const labPath = path.join(LABS_PATH, lab);
    const filePath = path.join(labPath, filename);

    // Security check
    if (!filePath.startsWith(labPath)) {
        return res.status(400).json({
            success: false,
            output: "Invalid file."
        });
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            success: false,
            output: "File not found."
        });
    }

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
                output += "\n\nProgram stopped after 15 seconds.";
            }

            res.json({
                success: !error || error.killed,
                output: output || "Program executed successfully."
            });
        }
    );
});

// VIEW SOURCE FILE
app.get("/file/:lab/:filename", (req, res) => {

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
        return res.status(404).send("File not found");
    }

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            return res.status(500).send("Unable to read file");
        }

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${escapeHtml(filename)}</title>

                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                >
            </head>

            <body class="bg-light">

                <div class="container py-5">

                    <div class="d-flex justify-content-between align-items-center mb-4">

                        <h2>${escapeHtml(filename)}</h2>

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
    });
});

// Escape HTML
function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

app.listen(PORT, () => {
    console.log(`Frontend running at http://localhost:${PORT}`);
});