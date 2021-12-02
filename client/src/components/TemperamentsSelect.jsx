import React from "react";

export default function TemperamentsSelect ({allTemperaments, handleFilterByTemperament}) {
    return (
        <select onChange={handleFilterByTemperament}>
            <option disabled selected>Temperaments</option>
            <option value="Todos">All</option>
            {allTemperaments.map(d => (
                <option value={d.name}>{d.name}</option>
            ))}
        </select>
    )
}