
"use strict";

const form = document.getElementById("e-form");
const address = document.getElementById("e-address");
const searchEngine = document.getElementById("e-search-engine");
const transportSelect = document.getElementById("e-transport");

const error = document.getElementById("e-error");
const errorCode = document.getElementById("e-error-code");

function logDebug(msg) {
    console.log(`log ${msg}`);
}

function showError(err) {
    console.error("ERROR:", err);

    if (error) {
        error.textContent = "failed";
    }

    if (errorCode) {
        errorCode.textContent =
            err?.stack || err?.message || String(err);
    }
}

function clearError() {
    if (error) error.textContent = "";
    if (errorCode) errorCode.textContent = "";
}

if (!form || !address || !transportSelect) {
    throw new Error("Required elements missing.");
}

form.onsubmit = function(e) {
    e.preventDefault();
    return false;
};

// Initialize b3reMux
let connection;

try {
    connection = new __68256.__68256Connection("/w.js");
} catch (err) {
    showError(err);
    throw err;
}

// Transport configuration
const ry = "wss://zakaon.top/api/";

// Default b3re server URL
const n4L9b = "https://tompbare-78.zaka.deno.net/api/b/";

const transports = {
    licurl: {
        path: "/t/l1.mjs",
        args: [{ wisp: ry }]
    },

    ep0xy: {
        path: "/t/ep.js",
        args: [{ wisp: ry }]
    },

    b3re: {
        path: "/t/b.mjs",
        args: [n4L9b]
    }
};

let activeTransport = null;

// Initialize selected transport
async function setTransport(name) {
    const config = transports[name];

    if (!config) {
        throw new Error("Unknown transport: " + name);
    }

    if (activeTransport === name) {
        return;
    }

    logDebug("Loading transport: " + name);

    await connection.setTransport(
        config.path,
        config.args
    );

    activeTransport = name;

    logDebug("Transport initialized: " + name);
}

// Initialize Scramjet
const { __99416Controller } = __99416LoadController();

const __99416 = new __99416Controller({
    prefix: "/s/",
    files: {
        wasm: "/172ab3.wasm",
        all: "/s.js",
        sync: "/sync.js"
    }
});

__99416.init();

logDebug("Scramjet initialized.");

// Initialize default transport: licurl
const initialTransport = setTransport("licurl");

// Handle initialization errors
initialTransport.catch(err => {
    showError(err);
});

// Navigation handler
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    clearError();

    try {
        // Initialize selected transport
        await setTransport(transportSelect.value);

        // Register service worker
        if (typeof registerh === "function") {
            await registerh();
        } else {
            throw new Error("registerh() is not available.");
        }

        // Get input
        let url = address.value.trim();

        if (!url) {
            throw new Error("Please enter a URL.");
        }

        // Search engine handling
        try {
            if (typeof search === "function") {
                url = search(url, searchEngine.value);
            } else if (
                !url.startsWith("http://") &&
                !url.startsWith("https://")
            ) {
                if (url.includes(".") && !url.includes(" ")) {
                    url = "https://" + url;
                } else {
                    url =
                        "https://google.com/search?q=" +
                        encodeURIComponent(url);
                }
            }
        } catch (searchError) {
            console.error("Search error:", searchError);

            if (
                !url.startsWith("http://") &&
                !url.startsWith("https://")
            ) {
                url = "https://" + url;
            }
        }

        // Validate URL
        const parsedUrl = new URL(url);

        if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
        ) {
            throw new Error("Unsupported URL protocol.");
        }

        // Remove previous frame
        const oldFrame = document.getElementById("e-frame");

        if (oldFrame) {
            oldFrame.remove();
        }

        // Create Scramjet frame
        const frame = __99416.createFrame();

        frame.frame.id = "e-frame";

        frame.frame.style =
            "position:fixed;" +
            "top:0;" +
            "left:0;" +
            "width:100%;" +
            "height:100%;" +
            "border:none;" +
            "z-index:99999;" +
            "background:white;";

        document.body.appendChild(frame.frame);

        // Navigate
        frame.go(url);

        logDebug("Navigated to " + url);

    } catch (err) {
        showError(err);
    }
});

logDebug("Production script initialized.");
