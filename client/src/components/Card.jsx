import React from "react";
import "../components/Styles/Card.css"

export default function Card({ image, name, temperaments, weight }) {
    return (
        
            <div className="Card">
                <img className="Img" src={image} alt="img not found" />
                <div className="Container">
                    <h3>{name}</h3>
                    <h5>{temperaments}</h5>
                    <h5>Entre {weight} Kg</h5>
                </div>
            </div>
        
    )
}