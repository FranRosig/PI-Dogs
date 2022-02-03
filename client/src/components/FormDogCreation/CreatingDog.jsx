import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postDog, getTemperaments } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const validate = (form) => {
    let errors = {}
    if(!form.name) {
        errors.name = "Name is required, it should not contain numbers"
    }
    if(!form.min_height || !form.max_height) {
        errors.height = "Height is required"
    }
    if(!form.min_weight || !form.max_weight) {
        errors.weight = "Weight is required"
    }
    if(!form.life_span) {
        errors.life_span = "Lifespan is required, type only numbers separated by a dash (-)"
    }
    return errors
}

export default function CreatingDog () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const temperaments = useSelector((state) => state.temperaments)

    const [button, setButton] = useState(true)
    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: []
    })

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch]);

    useEffect(()=>{
        if (form.name.length > 0 && form.min_height.length > 0  && form.max_height.length > 0 && form.min_weight.length > 0 && form.max_weight.length > 0) setButton(false)
        else setButton(true)
    }, [form, setButton])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        setErrors(validate({
            ...form,
            [e.target.name] : e.target.value
        }))
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
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
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
        <div className="containerDC">
            <Link to="/home"><button>Home</button></Link>
            <h1>Create your dog!</h1>
            <form onSubmit={handleSubmit}>
                <div className="input_container">
                    <input className ="input" autoComplete="off"
                        type="text"
                        value={form.name}
                        name ="name"
                        onChange={(e) => handleChange(e)}
                        placeholder="Name..."
                        />
                    </div>
                <div className="error">{errors.name && <p>{errors.name}</p>}</div>
                
                <div className="height_container">
                <div className="input_container min_height">
                    <input className ="input input-n" autoComplete="off"
                        type="text"
                        value={form.min_height}
                        name ="min_height"
                        onChange={(e) => handleChange(e)}
                        placeholder="Min height..."
                        />
                    </div>
                

                <div className="input_container max_height">
                    <input className ="input input-n" autoComplete="off"
                        type="text"
                        value={form.max_height}
                        name ="max_height"
                        onChange={(e) => handleChange(e)}
                        placeholder="Max height..."
                        />
                    </div>
                
                </div>
                <div className="error">{errors.height && <p>{errors.height}</p>}</div>
                
                <div className="weight_container">
                <div className="input_container min_weight">
                    <input className ="input input-n" autoComplete="off"
                        type="text"
                        value={form.min_weight}
                        name ="min_weight"
                        onChange={(e) => handleChange(e)}
                        placeholder="Min weight..."
                        />
                    </div>
                

                <div className="input_container max_weight">
                    <input className ="input input-n" autoComplete="off"
                        type="text"
                        value={form.max_weight}
                        name ="max_weight"
                        onChange={(e) => handleChange(e)}
                        placeholder="Max weight..."
                        />
                    </div>
                
                </div>
                <div className="error">{errors.weight && <p>{errors.weight}</p>}</div>
                
                <div className="input_container">
                    <input className ="input" autoComplete="off"
                        type="text"
                        value={form.life_span}
                        name ="life_span"
                        onChange={(e) => handleChange(e)}
                        placeholder="Expected lifespan... ex: 14 - 16"
                        />
                    </div>
                <div className="error">{errors.life_span && <p>{errors.life_span}</p>}</div>
                
                <div className="input_container">
                    <input className ="input" autoComplete="off"
                        type="text"
                        value={form.image}
                        name ="image"
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL..."
                        />
                </div>
                <h2 className="h2">Select Temperaments</h2>
                <select className="temperaments_select" onChange={handleSelect}>
                    <option disabled selected>Temperaments</option>
                    {temperaments.map(d => (
                    
                    <option value={d.name}>{d.name}</option>
                    ))}
                </select>
                
                <br />
                
                <button className="submit_button" disabled={button} type="submit">Create Dog</button>

            </form>
            
            <div className="added_temperaments">{form.temperaments.map(el =>
                    <div className="temperaments">
                        <p>{el}</p>
                        <button className="botonX" onClick={() => handleDelete(el)}>X</button>
                    </div>
                )}
            </div>
        </div>
    )
}