import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../actions";

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getDogsByName(name))
    }

    return (
        <div style={{backgroundColor: 'white'}}>
            <input 
            type="text"
            placeholder = "Search..."
            onChange={(e) => handleInput(e)}
            
            />
            <button onClick={(e) => handleSubmit(e)} type="submit">Search</button>
        </div>
    )
}