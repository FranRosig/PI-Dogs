import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterByTemperament, getDogs, getTemperaments, FilterBySource, OrderByName, OrderByWeight } from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card";
import Paginado from "./Paginado";
import "../components/Styles/Card.css"
import TemperamentsSelect from "./TemperamentsSelect";
import SearchBar from "./SearchBar";

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)

    const [CurrentPage, setCurrentPage] = useState(1);
    const [DogsOnPage, setDogsOnPage] = useState(8);
    const indexLastDog = CurrentPage * DogsOnPage;
    const indexFirstDog = indexLastDog - DogsOnPage;
    const CurrentDogs = allDogs.slice(indexFirstDog, indexLastDog);
    const [orden, setOrden] = useState("")

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

    const handleFilterBySource = (e) => {
        dispatch(FilterBySource(e.target.value))
    }

    const handleOrderByName = (e) => {
        dispatch(OrderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleOrderByWeight = (e) => {
        dispatch(OrderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    

    return (
        
        <div>
            
            <Link to= "/dog">Crear perro</Link>
            <SearchBar/>
            <h1>DOGS</h1>
            <div>
                <select onChange={handleOrderByName}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select onChange={handleOrderByWeight}>
                    <option value="max_weight">max_weight</option>
                    <option value="min_weight">min_weight</option>
                </select>
                <select onChange={handleFilterBySource} >
                    <option value="Todos">All</option>
                    <option value="createdInDB">Created</option>
                    <option value="api">API</option>
                </select>
                
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