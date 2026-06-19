const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "assets/certificate-template.png";

const params = new URLSearchParams(window.location.search);

const trackCode =
    (params.get('track') || '').toUpperCase();

const trackNames = {

    GENAI: "BUILD AN AGENT IN 45 MINS",

    JAVA: "JAVA MODERNIZATION WITH BOB",

    REALWORLD: "BOB ON A REAL-WORLD APPLICATION",

    SECURE: "SECURE DEVELOPMENT WITH IBM BOB"
};

const trackName = trackNames[trackCode];

if (!trackName) {

    document.body.innerHTML = `
        <div style="padding:40px;font-family:Arial">
            <h2>Invalid certificate link</h2>
            <p>Please use the event-provided certificate URL.</p>
        </div>
    `;

    throw new Error("Invalid track");
}

document.getElementById("trackDisplay").textContent =
    "🔒 " + trackName;

function generateCertificate() {

    const name =
        document
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

document
    .getElementById("downloadBtn")
    .addEventListener("click", () => {

        const name =
            document
                .getElementById("nameInput")
                .value
                .trim();

        const link =
            document.createElement("a");

        link.download =
            `IBM-BOB-Dev-Day-Ottawa-${name}-${trackCode}.png`;

        link.href =
            canvas.toDataURL("image/png");

        link.click();
    });
