import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterByTemperament, getDogs, getTemperaments } from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card";
import Paginado from "./Paginado";
import "../components/Styles/Card.css"
import TemperamentsSelect from "./TemperamentsSelect";

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)

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
        dispatch(getTemperaments())
    },[dispatch]);

    const handleFilterByTemperament = (e) => {
        dispatch(FilterByTemperament(e.target.value))
    }
    

    return (
        <div>
            <Link to= "/dogs">Crear perro</Link>
            <h1>DOGS</h1>
            <div>
                <TemperamentsSelect 
                allTemperaments={allTemperaments} 
                handleFilterByTemperament={handleFilterByTemperament}/>

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