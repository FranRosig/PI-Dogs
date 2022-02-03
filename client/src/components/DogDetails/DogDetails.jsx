import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";

export default function DogDetails () {
    const dispatch = useDispatch()
    let { id } = useParams()
    console.log(id)
    
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch])

    const dog = useSelector((state) => state.detail)
    console.log(dog)

    let fixedTemps = []
    dog[0]?.temperaments?.forEach((el) => fixedTemps.push(el.name))

    return (
        <div>
            {
                dog.length > 0 ? 
                    <div className="detail_container">
                        <Link to="/home">Volver</Link>
                        <div className="details">
                            <div className="title"><h1>{dog[0].name}</h1></div>
                            <div className="detail_temperaments">{fixedTemps.map(el => <div className="temp">{el}</div>)}</div>
                            <div className="details2">
                                <div className="info"><h2>Height:</h2><h4>Between {dog[0].height[0]} and {dog[0].height[1]} cms</h4></div>
                                <div className="info"><h2>Weight:</h2><h4>Between {dog[0].weight[0]} and {dog[0].weight[1]} Kg</h4></div>
                                <div className="info"><h2>Lifespan:</h2><h4>Between {dog[0].life_span} years</h4></div>
                            </div>
                        </div>
                        <div className="image">
                            <img src={dog[0].image} alt="Imagen" />
                        </div>
                    </div> : 

                    <p>Loading...</p>
            }
        </div>
    )
}