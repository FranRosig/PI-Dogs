import React from "react";
import "../components/Styles/Card.css"

export default function Card({ image, name, temperaments, weight }) {
    let fixedTemps = []
    temperaments?.forEach((el) => fixedTemps.push(el.name))
    return (
        
            <div className="Card">
                <img className="Img" src={image} alt="img not found" />
                <div className="Container">
                    <h3>{name}</h3>
                    <h5>{fixedTemps?.join(", ")}</h5>
                    <h5>Entre {weight[0]} y {weight[1]} Kg</h5>
                </div>
            </div>
        
    )
}