import React, { Component } from "react";
import {Link} from "react-router-dom";
import "../components/Styles/LandingPage.css"

export default class LandingPage extends Component {
    render() {
        return (
            <div className="landing">
                <Link to = "/home">
                    <button className="button" >Ingresar</button>
                </Link>
            </div>
        )
    }
};