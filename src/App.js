import React from 'react';
import './App.css';
//import CarDemo from './carDemo';

function App() {
  return (
    <div className="App">
      <h1> ShowRoom </h1>
      <div>
        <p></p>
        {/* <input type="file" onChange = {CarDemo.loadImage(this)} ></input> */}
        <section className="flex">
          <div className="button" /*onclick="changeCamera(0)"*/>Camera 1</div>
          <div className="button" /*onclick="changeCamera(1)"*/>Camera 2</div>
          <div className="button" /*onclick="changeCamera(2)"*/>Camera 3</div>
          <div className="button" /*onclick="changeCamera(3)"*/>Camera 4</div>
        </section>
        <section className="flex">
          <div className="button" /*onclick="carro.changeOwnerName(document.getElementById('nomeOwner').value)"*/>Mudar Nome do Dono</div>
          {/* <input className="select" type="text" name="Nome do Dono" id="nomeOwner" placeholder="Nome do Dono"> </input> */}
          <div className="button" /*onclick="carro.changePaintColor(document.getElementById('paintColor').value)"*/>Mudar Pintura</div>
          {/* <input type="color" name="Cor Da Pintura" id="paintColor"></input> */}
          <div className="button" /*onclick="carro.changeWheelColor(document.getElementById('wheelColor').value )"*/>Mudar Cor da Roda</div>
          {/* <input type="color" name="Cor Da Roda" id="wheelColor"></input> */}
        </section>
        <section className="flex">
          <div className="button" /*onclick="carro.changeMaterial(document.getElementById('carPart').value, document.getElementById('material').value)"*/>Mudar o Interior</div>
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
          <div className="button" /*onclick="exportJSON()"*/>Exportar JSON</div>
          {/* <input className="select" type="text" name="json" id="json" placeholder="JSON de exemplo"></input> */}
          <div className="button" /*onclick="importJSON()"*/>Importar JSON</div>
          <div className="button" /*onclick="copyJSON()"*/>Copiar JSON</div>
        </section>
        <canvas id="canvas" height="1200" width="1200" ></canvas>
      </div>
    </div>


  );
}



export default App;
