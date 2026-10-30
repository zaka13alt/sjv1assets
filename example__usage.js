
"use strict";

const form = document.getElementById("e-form");
const address = document.getElementById("e-address");
const searchEngine = document.getElementById("e-search-engine");
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

if (!form || !address) {
    throw new Error("elements missing.");
}

form.onsubmit = function(e) {
    e.preventDefault();
    return false;
};


let connection;

try {
    connection = new __68256.__68256Connection("/w.js");
} catch (err) {
    showError("[connection] failed: " + err);
    throw err;
}


const ry = "wss://zakaon.top/api/";

let transportReady = false;

async function initializeTransport() {
    try {
        await connection.setTransport("/t/ep.mjs", [
            { wisp: ry }
        ]);

        transportReady = true;
        logDebug("[loaded]");

    } catch (err) {
        transportReady = false;
        showError("initialization failed: " + err);
        throw err;
    }
}


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

logDebug("[init] successfully.");

const transportPromise = initializeTransport();


form.addEventListener("submit", async function(event) {
    event.preventDefault();

    try {
        // 
        await transportPromise;

        if (!transportReady) {
            throw new Error("transport is not ready.");
        }

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
            } else {
                if (
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

        // Validate destination
        const parsedUrl = new URL(url);

        if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
        ) {
            throw new Error("Unsupported URL protocol.");
        }

        // Remove existing frame
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
