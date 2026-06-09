const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "assets/certificate-template.png";

const TRACKS = {
    "java-modernization": "Java Modernization with Bob",
    "agent-builder": "Build an Agent in 45 Minutes",
    "real-world-app": "Bob on a Real-World App",
    "cursor-migration": "Already Use Cursor? What You're Missing",
    "testing-ci": "AI-Assisted Testing & CI",
    "governance": "The Governance Lane"
};

function generateCertificate() {

    const name = document
        .getElementById("nameInput")
        .value
        .trim();

    if (!name) {
        alert("Please enter your full name");
        return;
    }

    const params =
        new URLSearchParams(window.location.search);

    const trackKey =
        params.get("track");

    const trackName =
        TRACKS[trackKey] ||
        "IBM Bob Developer Day";

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    //
    // Attendee Name
    //
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 70px Georgia";

    ctx.fillText(
        name,
        canvas.width / 2,
        770
    );

    //
    // Track Name
    //
    ctx.fillStyle = "#4DA6FF";
    ctx.font = "bold 36px Arial";

    ctx.fillText(
        trackName,
        canvas.width / 2,
        925
    );

    document
        .getElementById("downloadBtn")
        .style.display = "inline-block";
}

document
.getElementById("downloadBtn")
.addEventListener("click", () => {

    const params =
        new URLSearchParams(window.location.search);

    const trackKey =
        params.get("track") ||
        "ibm-bob-dev-day";

    const name =
        document
        .getElementById("nameInput")
        .value
        .trim()
        .replace(/\s+/g, "-");

    const link =
        document.createElement("a");

    link.download =
        `${name}-${trackKey}-certificate.png`;

    link.href =
        canvas.toDataURL("image/png");

    link.click();
});
