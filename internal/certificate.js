const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();

// certificate.html is inside /internal,
// so the template is inside /internal/assets/
image.src = "assets/certificate-template.png";

const nameInput = document.getElementById("nameInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");


// ------------------------------------------------------------
// Generate Certificate
// ------------------------------------------------------------
function generateCertificate() {

    const name = nameInput.value.trim();

    if (!name) {
        alert("Please enter your full name.");
        return;
    }

    const drawCertificate = () => {

        // Use the exact dimensions of the certificate template
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // Draw certificate template
        ctx.drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height
        );

        // ----------------------------------------------------
        // Attendee Name
        // ----------------------------------------------------
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000000";

        // Start with the standard font size
        let fontSize = 52;
        const maxWidth = canvas.width * 0.75;

        // Automatically reduce font size for long names
        do {
            ctx.font = `bold ${fontSize}px Georgia`;

            if (ctx.measureText(name.toUpperCase()).width <= maxWidth) {
                break;
            }

            fontSize -= 2;

        } while (fontSize > 24);

        ctx.fillText(
            name.toUpperCase(),
            canvas.width / 2,
            750
        );

        // Show generated certificate
        canvas.style.display = "block";
        downloadBtn.style.display = "inline-block";
    };


    // If image has already loaded
    if (image.complete && image.naturalWidth > 0) {
        drawCertificate();
    } else {
        image.onload = drawCertificate;
    }
}


// ------------------------------------------------------------
// Download Certificate
// ------------------------------------------------------------
downloadBtn.addEventListener("click", () => {

    const attendeeName = nameInput.value.trim();

    if (!attendeeName) {
        return;
    }

    const safeName = attendeeName
        .replace(/\s+/g, "-")
        .replace(/[^A-Za-z0-9-]/g, "");

    const link = document.createElement("a");

    link.download =
        `IBM-BOB-Internal-Dev-Day-2026-${safeName}.png`;

    link.href = canvas.toDataURL("image/png");

    link.click();
});
