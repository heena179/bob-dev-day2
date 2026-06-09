const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();

image.src = "assets/certificate-template.png";

function generateCertificate() {

    const name =
        document.getElementById("nameInput")
        .value
        .trim();

    if(!name){
        alert("Please enter your name");
        return;
    }

    image.onload = () => {

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image,0,0);

        ctx.textAlign = "center";

        ctx.fillStyle = "#1d1d1d";

        ctx.font =
            "bold 100px Georgia";
        ctx.strokeStyle = "red";
ctx.lineWidth = 4;

ctx.beginPath();
ctx.moveTo(0, 690);
ctx.lineTo(canvas.width, 690);
ctx.stroke();

        ctx.fillText(
            name,
            canvas.width / 2,
            690
        );

        document
            .getElementById("downloadBtn")
            .style.display = "inline-block";
    };

    if(image.complete){
        image.onload();
    }
}

document
.getElementById("downloadBtn")
.addEventListener("click",()=>{

    const link =
        document.createElement("a");

    link.download =
        "IBM-BOB-Dev-Day-Certificate.png";

    link.href =
        canvas.toDataURL("image/png");

    link.click();
});
