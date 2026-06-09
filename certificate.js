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

        ctx.fillStyle = "#FFFFFF";

        ctx.font =
            "bold 70px Georgia";

        ctx.fillText(
            name,
            canvas.width / 2,
            770
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
