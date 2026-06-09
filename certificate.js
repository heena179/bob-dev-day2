const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");
const image = new Image();
image.src = "assets/certificate-template.png";

// Read track from URL parameter (?track=A)
const params = new URLSearchParams(window.location.search);
const trackCode = (params.get('track') || 'A').toUpperCase();

// Map track codes to full names
const trackNames = {
    'A': 'Track A — Java Modernization with Bob',
    'B': 'Track B — Build an Agent in 45 Minutes',
    'C': 'Track C — Bob vs. a Real-World App',
    'D': "Track D — Already Use Cursor? What You're Missing",
    'E': 'Track E — AI-Assisted Testing & CI',
    'F': 'Track F — The Governance Lane'
};

// Display locked track in the UI
document.getElementById('trackDisplay').textContent = '🔒 ' + trackNames[trackCode];

function generateCertificate() {
    const name = document.getElementById("nameInput").value.trim();
    
    if (!name) {
        alert("Please enter your name");
        return;
    }
    
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        
        // Draw the template image
        ctx.drawImage(image, 0, 0);
        
        // Draw the attendee name
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 70px Georgia";
        ctx.fillText(name, canvas.width / 2, 770);
        
        // Draw the track name (replace {{TRACK_NAME}} placeholder)
        ctx.font = "bold 28px Georgia";
        ctx.fillStyle = "#4589FF";  // IBM Blue Light
        ctx.fillText(trackNames[trackCode], canvas.width / 2, 920);
        
        // Show download button and canvas
        canvas.style.display = "block";
        document.getElementById("downloadBtn").style.display = "inline-block";
    };
    
    if (image.complete) {
        image.onload();
    }
}

document.getElementById("downloadBtn").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const link = document.createElement("a");
    link.download = `IBM-BOB-Dev-Day-Certificate-${name}-${trackCode}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
});
