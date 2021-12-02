import React from "react";
import "../components/Styles/Card.css"
import { Link } from "react-router-dom";

export default function Card({ image, name, temperaments, weight, key }) {
    let fixedTemps = []
    temperaments?.forEach((el) => fixedTemps.push(el.name))

    
    return (
        
            <div className="card">
                <img className="card-image" src={image} alt="img not found" />
                
                    <h2>{name}</h2>
                    <p>{fixedTemps?.join(", ")}</p>
                    <h5>Entre {weight[0]} y {weight[1]} Kg</h5>
                    <a href="">See Details</a>
                
            </div>
        
    )
}