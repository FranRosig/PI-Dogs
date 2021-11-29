import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card";
import Paginado from "./Paginado";
import "../components/Styles/Card.css"

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)

    const [CurrentPage, setCurrentPage] = useState(1);
    const [DogsOnPage, setDogsOnPage] = useState(8);
    const indexLastDog = CurrentPage * DogsOnPage;
    const indexFirstDog = indexLastDog - DogsOnPage;
    const CurrentDogs = allDogs.slice(indexFirstDog, indexLastDog);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getDogs());
    },[dispatch]);

    

    return (
        <div>
            <Link to= "/dogs">Crear perro</Link>
            <h1>DOGS</h1>
            <div>
                <select>
                    <option value ="asc" >Ascendente</option>
                    <option value ="desc" >Descendente</option>
                </select>
                <div className="flex">
                {
                    CurrentDogs?.slice(0,4).map(d => (
                        <Card
                        key={d.name} 
                        name={d.name} 
                        image={d.image} 
                        temperaments={d.temperaments} 
                        weight={d.weight}/>    
                    ))
                }
                </div>
                <div className="flex">
                {
                    CurrentDogs?.slice(4,8).map(d => (
                        <Card 
                        key={d.name}
                        name={d.name} 
                        image={d.image} 
                        temperaments={d.temperaments} 
                        weight={d.weight}/>    
                    ))
                }
                </div>
                <Paginado
                DogsOnPage={DogsOnPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
            </div>
        </div>

        
    )
}