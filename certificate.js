const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");
const image = new Image();
image.src = "assets/certificate-template.png";

const eventConfig = {
    markham: {
        tracks: {
            JAVA: "JAVA MODERNIZATION WITH BOB",
            GENAI: "BUILD AN AGENT IN 45 MINS",
            REALWORLD: "BOB vs. A REAL-WORLD APP",
            CURSOR: "ALREADY USE CURSOR? WHAT YOU'RE MISSING",
            TESTING: "AI-ASSISTED TESTING & CI",
            GOVERNANCE: "THE GOVERNANCE LANE"
        }
    },

    ottawa: {
        tracks: {
            GENAI: "BUILD AN AGENT IN 45 MINS",
            JAVA: "JAVA MODERNIZATION WITH BOB",
            REALWORLD: "BOB ON A REAL-WORLD APPLICATION",
            SECURE: "SECURE DEVELOPMENT WITH IBM BOB"
        }
    },

    calgary: {
        tracks: {}
    },

    winnipeg: {
        tracks: {}
    },

    montreal: {
        tracks: {}
    }
};

function getCityFromPath() {
    const path = window.location.pathname.toLowerCase();

    if (path.includes('/ottawa/')) return 'ottawa';
    if (path.includes('/calgary/')) return 'calgary';
    if (path.includes('/winnipeg/')) return 'winnipeg';
    if (path.includes('/montreal/')) return 'montreal';

    return 'markham';
}

const city = getCityFromPath();

const params = new URLSearchParams(window.location.search);
const trackCode = (params.get('track') || '').toUpperCase();

const trackName =
    eventConfig[city]?.tracks?.[trackCode];

if (!trackName) {
    document.body.innerHTML =
        "<h2>Invalid certificate link</h2>";
}

document.getElementById('trackDisplay').textContent =
    '🔒 ' + trackName;

function generateCertificate() {

    const name = document
        .getElementById("nameInput")
        .value
        .trim()
        .toUpperCase();

    if (!name) {
        alert("Please enter your name");
        return;
    }

    image.onload = () => {

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";

        ctx.font = "bold 60px Georgia";
        ctx.fillText(
            name,
            canvas.width / 2,
            770
        );

        ctx.font = "bold 44px Georgia";
        ctx.fillText(
            trackName,
            canvas.width / 2,
            1000
        );

        canvas.style.display = "block";

        document
            .getElementById("downloadBtn")
            .style.display = "inline-block";
    };

    if (image.complete) {
        image.onload();
    }
}

document.getElementById("downloadBtn")
.addEventListener("click", () => {

    const name =
        document
            .getElementById("nameInput")
            .value
            .trim();

    const link =
        document.createElement("a");

    link.download =
        `IBM-BOB-Dev-Day-${city}-${name}-${trackCode}.png`;

    link.href =
        canvas.toDataURL("image/png");

    link.click();
});
