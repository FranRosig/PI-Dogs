import React from "react";

export default function Card({ image, name, temperament, weight }) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <h5>{weight}</h5>
            <img src={image} alt="img not found" width="200px" height="250px" />
        </div>
    )
}