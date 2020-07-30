import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import logo from "../../bffk91024.png"
import "./header.css"

const Header = ({ selectClient }) => {
    return (
        <header className="container-fluid header-basic-light">

            <div className="row justify-content-between header-limiter">

                <div className="col-12 col-lg-6">

                    <h1><a href="/">
                        <img src={logo} alt="best foot forward k9 training company logo" />
                    Session<span>Tracker</span>
                    </a>
                    </h1>

                </div>

                <div className="col-12 col-lg-6">

                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/clients">Clients</a></li>
                            {
                                selectClient.length > 0 ?
                                    <li><a href="/clients/home">Current</a></li>
                                    :
                                    <li><a href="/clients">Current</a></li>
                            }

                        </ul>
                    </nav>

                </div>


            </div>

        </header>
    );
}

export default Header;