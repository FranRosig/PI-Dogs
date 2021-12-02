import React from "react";
import "../components/Styles/FormInput.css"

export default function FormInput ({ type, value, name, onChange, placeholder}) {
    return (
        <div className="inputDiv">
            <input className ="input" autocomplete="off"
                    type={type}
                    value={value}
                    name ={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    />
        </div>
    )
}