import React, { useEffect, useState } from 'react';
import Axios from "axios";

import './App.css';

function CarListBrowser(props) {
    let shouldRender = props.shouldRender;
    let [carList, setCarList] = useState([]);

    function changeCamera(cameraNum) {
        if (cameraNum >= 0 && cameraNum <= 4) props.unityContext.send('GameObject', 'ChangeCamera', cameraNum);
    }

    function importJSON() {
        var exportedJSON = document.getElementById("json").value;

        props.unityContext.send('GameObject', 'CopyFromJSON', exportedJSON);
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
            setCarList(response.data);
        })
    });

    if (shouldRender === false)
        return null;
    return (
        <div>
            {carList.map((val) => {

                return (
                    <div key={val.carId} className='button' onClick={() => {
                        let stringableVal = val;
                        delete stringableVal.carId;
                        delete stringableVal.ownerName;
                        delete stringableVal.email;
                        // if (stringableVal.decal !== null)
                        //     stringableVal.decal = stringableVal.decal.data.toString();
                        console.log(JSON.stringify(stringableVal));
                        props.unityContext.send('GameObject', 'CopyFromJSON', JSON.stringify(stringableVal));
                        }}>
                        Owner Name: {val.ownerName} |  E-Mail: {val.email} |  Wheel Color: {val.wheelColor} |  Paint Color: {val.paintColor} |  Secondary Paint Color: {val.secondaryPaintColor} |  Interior: {val.interior} |  Seat: {val.seat} |  Decal: {val.decal.data === []? "empty" : "Not Empty"}
                    </div>
                )
            })}
        </div>
    )
}

export default CarListBrowser;