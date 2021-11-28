import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card";

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)

    useEffect(()=>{
        dispatch(getDogs());
    },[dispatch]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <Link to= "/dogs">Crear perro</Link>
            <h1>DOGS</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los perros
            </button>
            <div>
                <select>
                    <option value ="asc" >Ascendente</option>
                    <option value ="desc" >Descendente</option>
                </select>
                {
                    allDogs?.map(d => (
                        <Card 
                        name={d.name} 
                        image={d.image} 
                        temperament={d.temperament} 
                        weight={d.temperament}/>    
                    ))
                }
            </div>
        </div>

        
    )
}