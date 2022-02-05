import React from "react";
import CardCSS from "./Card.module.css"

export default function Card({ image, name, temperaments, weight, id }) {
    
    let fixedTemps = []
    temperaments?.forEach((el) => fixedTemps.push(el.name))
    
    return (
            <div className={CardCSS.container}>
                <img className={CardCSS.img} src={image} alt="img not found" />
                    <div className={CardCSS.overlay}>
                        <h2>{name}</h2>
                        <p>{fixedTemps?.join(", ")}</p>
                        <h5>Between {weight[0]} and {weight[1]} Kg</h5>
                        <a href={`http://localhost:3000/dogs/${id}`}>See Details</a>
                    </div>
            </div>
    );
};