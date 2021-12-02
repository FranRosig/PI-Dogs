import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function DogDetails (props) {
    const dispatch = useDispatch()
    let { id } = useParams
    console.log(id)
    
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch])

    const dog = useSelector((state) => state.detail)

    let fixedTemps = []
    dog.temperaments?.forEach((el) => fixedTemps.push(el.name))

    return (
        <div>
            {
                dog.length > 0 ? 
                    <div>
                        <Link to="/home">Volver</Link>
                        <img src={dog[0].image} alt="Imagen" />
                        <h1>{dog[0].name}</h1>
                        <p>{fixedTemps}</p>
                        <h5>Entre {dog.height[0]} y {dog.height[1]} cm</h5>
                        <h5>Entre {dog.weight[0]} y {dog.weight[1]} Kg</h5>
                        <h5>{dog[0].life_span}</h5>
                    </div> : 

                    <p>Loading...</p>
            }
        </div>
    )
}