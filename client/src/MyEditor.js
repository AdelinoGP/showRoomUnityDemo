import React from 'react';
import Axios from "axios";
import './MyEditor.css';


const materials = ["Wood", "CarbonFiber", "Cloth", "GreenLeather", "BlackLeather", "Jeans"];
const parts = ["interior", "seat"];
const hexRGBTest = /^#([0-9a-f]{3}){1,2}$/i;
const nameTest = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i;
const emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;



class MyEditor extends React.Component {

    email = "string";

    carro = {
        wheelColor: "#5C5C5C",
        paintColor: "#FFFFFF",
        secondaryPaintColor: "#000001",
        interior: "Wood",
        seat: "Cloth",
        decal: ""
    }
    
    changeMaterial(carPart, desiredMaterial) {
        if (parts.indexOf(carPart) >= 0) {
            if (materials.indexOf(desiredMaterial) >= 0) {
                this.props.unityContext.send('GameObject', 'ChangeMaterial', carPart + "," + desiredMaterial);
                this.carro[carPart] = desiredMaterial;
            }
        }
    }
    changeWheelColor(desiredWheelColor) {
        if (hexRGBTest.test(desiredWheelColor)) {
            this.props.unityContext.send('GameObject', 'ChangeWheelColor', desiredWheelColor);
            this.carro.wheelColor = desiredWheelColor;
        }
    }
    changePaintColor(desiredPaintColor) {
        if (hexRGBTest.test(desiredPaintColor)) {
            this.props.unityContext.send('GameObject', 'ChangePaintColor', desiredPaintColor);
            this.carro.paintColor = desiredPaintColor;
        }
    }
    changeSecondPaintColor(desiredPaintColor) {
        if (hexRGBTest.test(desiredPaintColor)) {
            this.props.unityContext.send('GameObject', 'ChangeSecondPaintColor', desiredPaintColor);
            this.carro.secondaryPaintColor = desiredPaintColor;
        }
    }

    changeCamera(cameraNum) {
        if (cameraNum >= 0 && cameraNum <= 4) this.props.unityContext.send('GameObject','ChangeCamera', cameraNum );
    }

    copyJSON() {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", document.getElementById("json").value);
    }
    importJSON() {
        var exportedJSON = document.getElementById("json").value;

        this.props.unityContext.send('GameObject', 'CopyFromJSON', exportedJSON);
    }

    exportJSON(carro) {
        document.getElementById('json').value = JSON.stringify(carro);
    }

    convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    changeDecal = async (e) => {
        const file = e.target.files[0];
        let base64 = await this.convertToBase64(file);
        base64 = base64.replace("data:image/png;base64,", "");
        this.carro.decal = base64;
        if (base64.length < 140420){
            this.props.unityContext.send('GameObject', 'ChangeDecal', base64 );
        }
        else
            alert("Image upload Unsuccessful, use a smaller image");
    }

    submitCar = () => {
        let email = document.getElementById("email").value;
        let ownerName = document.getElementById("ownerName").value;
        console.log(this.carro.decal)
        if (nameTest.test(ownerName)) {
            if (emailTest.test(email))
                Axios.post("http://localhost:3001/api/insert", {
                    ownerName: ownerName,
                    wheelColor: this.carro.wheelColor,
                    paintColor: this.carro.paintColor,
                    secondaryPaintColor: this.carro.secondaryPaintColor,
                    interior: this.carro.interior,
                    seat: this.carro.seat,
                    email: email,
                    decal: this.carro.decal
                }).then(() => { alert("successful insert"); });
            else
                alert("Invalid E-Mail")
        }
        else
            alert("Only valid names allowed, Between 3 and 30 letters");
    };

    render() {
        if (!this.props.shouldRender)
            return null;

        return (
            <div className="myEditor">
                <div>
                    <section className="flex">
                        <div>Change Door Decal,PNG max 512x512</div>
                        <input type="file" label="decal" name="myDecal" accept=".png" onChange={(e) => this.changeDecal(e)} />
                    </section>
                    <section className="flex">
                        <div className="button" onClick={() => { this.changeCamera(0); }}>Camera 1</div>
                        <div className="button" onClick={() => { this.changeCamera(1); }}>Camera 2</div>
                        <div className="button" onClick={() => { this.changeCamera(2); }}>Camera 3</div>
                        <div className="button" onClick={() => { this.changeCamera(3); }}>Camera 4</div>
                    </section>
                    <section className="flex">
                        <div className="button" onClick={() => { this.changePaintColor(document.getElementById('paintColor').value); }}>Mudar Pintura</div>
                        <input type="color" name="Cor Da Pintura" id="paintColor" />
                        <div className="button" onClick={() => { this.changeSecondPaintColor(document.getElementById('secondaryPaintColor').value); }}>Mudar Pintura Secundária</div>
                        <input type="color" name="Cor Secundária" id="secondaryPaintColor" />
                        <div className="button" onClick={() => { this.changeWheelColor(document.getElementById('wheelColor').value); }}>Mudar Cor da Roda</div>
                        <input type="color" name="Cor Da Roda" id="wheelColor" />
                    </section>
                    <section className="flex">
                        <div className="button" onClick={() => { this.changeMaterial(document.getElementById('carPart').value, document.getElementById('material').value); }}>Mudar o Interior</div>
                        <label htmlFor="carPart" className="select">Parte do Carro:</label>
                        <select name="Parte do Carro" id="carPart" className="select">
                            <option value="interior">Painel</option>
                            <option value="seat">Estofamentos</option>
                        </select>
                        <label htmlFor="material" className="select">Material:</label>
                        <select name="Material" id="material" className="select">
                            <option value="Wood">Madeira</option>
                            <option value="CarbonFiber">Fibra De Carbono</option>
                            <option value="Cloth">Tecido</option>
                            <option value="GreenLeather">Couro Verde</option>
                            <option value="BlackLeather">Couro Preto</option>
                            <option value="Jeans">Jeans</option>
                        </select>
                    </section>
                    <section className="flex">
                        <div className="button" onClick={() => { this.exportJSON(this.carro); }}>Exportar JSON</div>
                        <input className="select" type="text" name="json" id="json" placeholder="JSON de exemplo" />
                        <div className="button" onClick={() => { this.importJSON(); }}>Importar JSON</div>
                        <div className="button" onClick={() => { this.copyJSON(); }}>Copiar JSON</div>
                    </section>
                    <section className="flex">
                        <label htmlFor="ownerName" className="select">Seu Nome:</label>
                        <input type="text" className="select" name="ownerName" id="ownerName" />
                        <label htmlFor="email" className="select">E-Mail:</label>
                        <input className="select" type="text" name="email" id="email" />
                        <div className="button" onClick={(e) => { this.submitCar() }}>Submit Car</div>
                    </section>
                </div>
            </div>
        )
    }
}



export default MyEditor;
