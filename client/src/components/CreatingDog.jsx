import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function CreatingDog () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const temperaments = useSelector((state) => state.temperaments)

    const [form, setForm] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperaments: []
    })

    console.log(form)

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch]);

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
        alert("Perro creada con éxito!");
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


    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea tu perro!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                    type="text"
                    value={form.name}
                    name ="name"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input 
                    type="text"
                    value={form.height}
                    name ="height"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input 
                    type="text"
                    value={form.weight}
                    name ="weight"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Life span:</label>
                    <input 
                    type="text"
                    value={form.life_span}
                    name ="life_span"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Imagen</label>
                    <input 
                    type="text"
                    value={form.image}
                    name ="image"
                    onChange={handleChange}
                    />
                </div>
                <select onChange={handleSelect}>
                    {temperaments.map(d => (
                    <option value={d.name}>{d.name}</option>
                    ))}
                </select>
                <ul><li>{form.temperaments.map((el) => el + " ,")}</li></ul>
                <button type="submit">Create Dog</button>
            </form>
        </div>
    )
}