const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "assets/certificate-template.png";

// ------------------------------------------------------------
// Track configuration
// URL format:
// certificate.html?track=A
// ------------------------------------------------------------
const params = new URLSearchParams(window.location.search);
const trackCode = (params.get("track") || "").toUpperCase();

const trackNames = {
    A: "BUILD AN AGENT IN 45 MINUTES",
    B: "BOB ON A REAL-WORLD APPLICATION",
    C: "SECURE DEVELOPMENT WITH IBM BOB"
};

const trackName = trackNames[trackCode];

const trackDisplay = document.getElementById("trackDisplay");
const nameInput = document.getElementById("nameInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

// ------------------------------------------------------------
// Validate track
// ------------------------------------------------------------
if (!trackName) {
    trackDisplay.innerHTML = "❌ Invalid or missing certificate link.";
    nameInput.disabled = true;
    generateBtn.disabled = true;
} else {
    trackDisplay.innerHTML = `
        <strong>Track ${trackCode}</strong><br>
        ${trackName}
    `;
}

// ------------------------------------------------------------
// Generate Certificate
// ------------------------------------------------------------
function generateCertificate() {
    if (!trackName) return;

    const name = nameInput.value.trim().toUpperCase();

    if (!name) {
        alert("Please enter your full name.");
        return;
    }

    const drawCertificate = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        // ==========================
        // Attendee Name
        // ==========================
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 60px Georgia";

        ctx.fillText(
            name,
            canvas.width / 2,
            770
        );

        // ==========================
        // Track Name
        // ==========================
        ctx.font = "bold 44px Georgia";

        ctx.fillText(
            trackName,
            canvas.width / 2,
            1000
        );

        canvas.style.display = "block";
        downloadBtn.style.display = "inline-block";
    };

    if (image.complete) {
        drawCertificate();
    } else {
        image.onload = drawCertificate;
    }
}

// ------------------------------------------------------------
// Download
// ------------------------------------------------------------
downloadBtn.addEventListener("click", () => {
    const attendeeName = nameInput.value.trim();

    if (!attendeeName) return;

    const safeName = attendeeName
        .replace(/\s+/g, "-")
        .replace(/[^A-Za-z0-9-]/g, "");

    const link = document.createElement("a");

    link.download =
        `IBM-BOB-Developer-Day-Halifax-2026-${safeName}-Track-${trackCode}.png`;

    link.href = canvas.toDataURL("image/png");
    link.click();
});
