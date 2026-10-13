const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");
const image = new Image();
image.src = "assets/certificate-template.png";

const params = new URLSearchParams(window.location.search);
const trackCode = (params.get('track') || 'A').toUpperCase();

const trackNames = {
    'A': 'BUILD AN AGENT WITH IBM BOB',
    'B': 'BUILD EVENT DRIVEN APPS WITH BOB & CONFLUENT ',
    'C': 'SECURE DEVELOPMENT WITH BOB',
    'D': "MODERNIZE IBM i WITH BOB",
    'E': 'ACCELERATE MONGODB DEVELOPMENT WITH BOB'
};

document.getElementById('trackDisplay').textContent = '🔒 ' + trackNames[trackCode];

function generateCertificate() {
    const name = document.getElementById("nameInput").value.trim().toUpperCase();
    
    if (!name) {
        alert("Please enter your name");
        return;
    }
    
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        
        ctx.drawImage(image, 0, 0);
        
        // Draw attendee name (much lower, below "PRESENTED TO")
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 60px Georgia";
        ctx.fillText(name, canvas.width / 2, 770);
        
        // Draw track name (between recognition and thank you text)
        ctx.font = "bold 44px Georgia";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(trackNames[trackCode], canvas.width / 2, 1000);
        
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
