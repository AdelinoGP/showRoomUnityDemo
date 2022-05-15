var materials = ["Wood", "CarbonFiber", "Cloth", "GreenLeather", "BlackLeather", "Jeans"];
var parts = ["interior", "seat"];
var hexRGBTest = /^#([0-9a-f]{3}){1,2}$/i;
var nameTest = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i;

class Carro {
    constructor() {
        this.ownerName = "Nome Do Dono";
        this.wheelColor = "#5C5C5C";
        this.paintColor = "#FFFFFF";
        this.interior = "Wood";
        this.seat = "Cloth";
    }

    changeMaterial(carPart, desiredMaterial) {
        if (parts.indexOf(carPart) >= 0) {
            if (materials.indexOf(desiredMaterial) >= 0) {
                //unityInstance.SendMessage('GameObject', 'ChangeMaterial', carPart + "," + desiredMaterial);
                this[carPart] = desiredMaterial;
                console.log(this);
            }
        }
    }
    changeOwnerName(desiredName) {
        if (nameTest.test(desiredName)) {
            //unityInstance.SendMessage('GameObject', 'ChangeWheelColor' , desiredName);
            this.ownerName = desiredName;
        }
    }
    changeWheelColor(desiredWheelColor) {
        if (hexRGBTest.test(desiredWheelColor)) {
            //unityInstance.SendMessage('GameObject', 'ChangeWheelColor' , desiredWheelColor);
            this.wheelColor = desiredWheelColor;
        }
    }
    changePaintColor(desiredPaintColor) {
        if (hexRGBTest.test(desiredPaintColor)) {
            //unityInstance.SendMessage('GameObject', 'ChangePaintColor', desiredPaintColor);
            this.paintColor = desiredPaintColor;
        }
    }
}

function changeCamera(cameraNum) {
    // if(cameraNum >= 0 && cameraNum <= 4) unityInstance.SendMessage('GameObject', 'ChangeCamera' , cameraNum);
}

var copyJSON = function () {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", document.getElementById("json").value);
}

var importJSON = function () {
    var exportedJSON = document.getElementById("json").value;

    //unityInstance.SendMessage('GameObject', 'CopyFromJSON',exportedJSON);
}

function exportJSON(carro) {
    document.getElementById('json').value = JSON.stringify(carro);
}

function loadImage(input) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    let imgSrc = '';
    if (input.value !== '') {
        imgSrc = window.URL.createObjectURL(input.files[0]);
    }
    const img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0);
    };
    img.src = imgSrc;
    var dataURL = canvas.toDataURL();
    //unityInstance.SendMessage('GameObject', 'ChangeDecal',dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
}



