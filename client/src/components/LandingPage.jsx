import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <h1>Wellcome Motherfuckers</h1>
                <Link to = "/home">
                    <button>Ingresar</button>
                </Link>
            </div>
        )
    }
};