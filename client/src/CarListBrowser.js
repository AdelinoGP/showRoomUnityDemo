import React, { useEffect, useState } from 'react';
import Axios from "axios";

import './App.css';

function CarListBrowser(props) {
    let shouldRender = props.shouldRender;
    let [carList, setCarList] = useState([]);

    function changeCamera(cameraNum) {
        if (cameraNum >= 0 && cameraNum <= 4)
            props.unityContext.send('GameObject', 'ChangeCamera', cameraNum);
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
            setCarList(response.data);
        })
    });

    function renderCarList(){
        return carList.map((val) => {
            return (
                <tr key={val.carId} className='button' onClick={() => {
                    let stringableVal = val;
                    delete stringableVal.carId;
                    delete stringableVal.ownerName;
                    delete stringableVal.email;
                    props.unityContext.send('GameObject', 'CopyFromJSON', JSON.stringify(stringableVal));
                }}>
                    <th>{val.ownerName}</th>
                    <th>{val.email} </th>
                    <th>{val.wheelColor}</th>
                    <th>{val.paintColor}</th>
                    <th>{val.secondaryPaintColor}</th>
                    <th>{val.interior}</th>
                    <th>{val.seat}</th>
                    <th>{val.decal.length === [] ? "empty" : "Not Empty"}</th>
                </tr>
            )
        })
    }

    if (shouldRender === false)
        return null;
    return (
        <div className='carListBrowser'>
            <section className="flex">
                <div className="button" onClick={() => { changeCamera(0); }}>Camera 1</div>
                <div className="button" onClick={() => { changeCamera(1); }}>Camera 2</div>
                <div className="button" onClick={() => { changeCamera(2); }}>Camera 3</div>
                <div className="button" onClick={() => { changeCamera(3); }}>Camera 4</div>
            </section>
            <div className='table-wrapper'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-MaiL</th>
                            <th>Wheel Color</th>
                            <th>Paint Color</th>
                            <th>Secondary Paint Color</th>
                            <th>Interior</th>
                            <th>Seat</th>
                            <th>HasDecal</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(Array.isArray(carList) && carList.length > 0) ? renderCarList() : '' }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default CarListBrowser;