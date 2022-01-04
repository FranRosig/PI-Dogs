import React from "react";
import "../components/Styles/Home.css"


export default function Card({ image, name, temperaments, weight, id }) {
    let fixedTemps = []
    temperaments?.forEach((el) => fixedTemps.push(el.name))
    console.log(id)
    
    return (
        
            <div className="card">
                <img className="card-image" src={image} alt="img not found" />

                    <h2>{name}</h2>
                    <p>{fixedTemps?.join(", ")}</p>
                    <h5>Between {weight[0]} and {weight[1]} Kg</h5>
                    <a href={`http://localhost:3000/dogs/${id}`}>See Details</a>
                
            </div>
        
    )
}