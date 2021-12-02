import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import  FormInput  from "./FormInput"
import "../components/Styles/FormSelect.css"
import "../components/Styles/CreatingDogDiv.css"

export default function CreatingDog () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const temperaments = useSelector((state) => state.temperaments)

    const [error, setError] = useState(true)


    const [form, setForm] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperaments: []
    })

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch]);

    useEffect(()=>{
        if (form.name.length > 0 && form.height.length > 0 && form.weight.length > 0) setError(false)
        else setError(true)
    }, [form, setError])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSelect = (e) => {
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(form));
        alert("Perro creado con éxito!");
        setForm({
            name: "",
            height: "",
            weight: "",
            life_span: "",
            image: "",
            temperaments: []
        });
        navigate("/home")
    }

    const handleDelete = (el) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter(temp => temp !== el)
        })
    }


    return (
        <div className="CreatingDogDiv">
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea tu perro!</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                type="text"
                value={form.name}
                name ="name"
                onChange={handleChange}
                placeholder="Name..."
                />
                <FormInput
                type="text"
                value={form.height}
                name ="height"
                onChange={handleChange}
                placeholder="Height... ej: 15 - 20"
                />
                <FormInput
                type="text"
                value={form.weight}
                name ="weight"
                onChange={handleChange}
                placeholder="Weight... ej: 20 - 30"
                />
                <FormInput
                type="text"
                value={form.life_span}
                name ="life_span"
                onChange={handleChange}
                placeholder="Lifespan... ej: 14 - 16"
                />
                <FormInput
                type="text"
                value={form.image}
                name ="image"
                onChange={handleChange}
                placeholder="Image URL"
                />
                <select className="formSelect" onChange={handleSelect}>
                    {temperaments.map(d => (
                    <option value={d.name}>{d.name}</option>
                    ))}
                </select>
                
                <br />
                
                <button disabled={error} type="submit">Create Dog</button>

            </form>
            {form.temperaments.map(el =>
                    <div className="divTemps">
                        <p>{el}</p>
                        <button className="botonX" onClick={() => handleDelete(el)}>X</button>
                        </div>
                )}
        </div>
    )
}