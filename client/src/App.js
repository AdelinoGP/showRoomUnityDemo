import React from 'react';
import Axios from "axios";
import Unity, { UnityContext } from "react-unity-webgl";
import './App.css';

const unityContext = new UnityContext({
  loaderUrl: "./build/WebGL.loader.js",
  dataUrl: "./build/WebGL.data",
  frameworkUrl: "./build/WebGL.framework.js",
  codeUrl: "./build/WebGL.wasm",
});
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
              unityContext.send('GameObject', 'ChangeMaterial', carPart + "," + desiredMaterial);
              this[carPart] = desiredMaterial;
              console.log(this);
          }
      }
  }
  changeOwnerName(desiredName) {
      if (nameTest.test(desiredName)) {
          unityContext.send('GameObject', 'ChangeWheelColor' , desiredName);
          this.ownerName = desiredName;
      }
  }
  changeWheelColor(desiredWheelColor) {
      if (hexRGBTest.test(desiredWheelColor)) {
          unityContext.send('GameObject', 'ChangeWheelColor' , desiredWheelColor);
          this.wheelColor = desiredWheelColor;
      }
  }
  changePaintColor(desiredPaintColor) {
      if (hexRGBTest.test(desiredPaintColor)) {
          unityContext.send('GameObject', 'ChangePaintColor', desiredPaintColor);
          this.paintColor = desiredPaintColor;
      }
  }
}


function changeCamera(cameraNum) {
   if(cameraNum >= 0 && cameraNum <= 4) unityContext.send('GameObject', 'ChangeCamera' , cameraNum);
}

var copyJSON = function () {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", document.getElementById("json").value);
}

var importJSON = function () {
  var exportedJSON = document.getElementById("json").value;

  unityContext.send('GameObject', 'CopyFromJSON',exportedJSON);
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
  unityContext.send('GameObject', 'ChangeDecal',dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
}

function App() {

  const carro = new Carro();

  const submitCarName = () => {
    Axios.post("http://localhost:3001/api/insert", {
      ownerName: carro.ownerName,
      wheelColor: carro.wheelColor,
      paintColor: carro.paintColor,
      interior: carro.interior,
      seat: carro.seat
    }).then(() => { alert("successful insert"); });
  };

  return (
    <div className="App">
      <h1> ShowRoom </h1>
      <div>
        <p></p>
        {/* <input type="file" onChange = {CarDemo.loadImage(this)}/>*/}
        <section className="flex">
          <div className="button" onClick={() => {changeCamera(0);}}>Camera 1</div>
          <div className="button" onClick={() => {changeCamera(1);}}>Camera 2</div>
          <div className="button" onClick={() => {changeCamera(2);}}>Camera 3</div>
          <div className="button" onClick={() => {changeCamera(3);}}>Camera 4</div>
        </section>
        <section className="flex">
          <div className="button" onClick={(e) => { submitCarName() }}>Mudar Nome do Dono</div>
          <input type="text" className="select"  name="ownerName"  onChange={(e) => { carro.changeOwnerName(e.target.value); }}/>
          <div className="button" onClick={() => { carro.changePaintColor(document.getElementById('paintColor').value);}}>Mudar Pintura</div>
          <input type="color" name="Cor Da Pintura" id="paintColor"/>
          <div className="button" onClick= {() => { carro.changeWheelColor(document.getElementById('wheelColor').value );}}>Mudar Cor da Roda</div>
          <input type="color" name="Cor Da Roda" id="wheelColor" />
        </section>
        <section className="flex">
          <div className="button" onClick= {() => { carro.changeMaterial(document.getElementById('carPart').value, document.getElementById('material').value);}}>Mudar o Interior</div>
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
          <div className="button" onClick={() => { exportJSON(carro);}}>Exportar JSON</div>
          <input className="select" type="text" name="json" id="json" placeholder="JSON de exemplo"/>
          <div className="button" onClick= {() => {  importJSON();}}>Importar JSON</div>
          <div className="button" onClick={() => {copyJSON();}}>Copiar JSON</div>
        </section>
        <Unity unityContext={unityContext} />
        {/* <canvas id="canvas" height="1200" width="1200" ></canvas> */}
      </div>
    </div>
    


  );
}



export default App;
