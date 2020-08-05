import React from 'react';
import logo from "../../bffk91024.png"
import "./header.css"
import { Link } from 'react-router-dom';

const Header = ({ selectClient }) => {
    return (
        <header className="container-fluid header-basic-light">

            <div className="row justify-content-between header-limiter">

                <div className="col-12 col-lg-6 header-col">

                    <h1><a href="/">
                        {/* <img src={logo} alt="best foot forward k9 training company logo" /> */}
                    Session<span>Tracker</span>
                    </a>
                    </h1>

                </div>

                <div className="col-12 col-lg-6 header-col">

                    <nav>
                        <ul>
                            {/* <li><Link to="/">Home</Link></li> */}
                            <li><Link to="/">Clients</Link></li>
                            {
                                selectClient.length > 0 ?
                                    <li><Link to="/clients/home">Current</Link></li>
                                    :
                                    <li><Link to="/clients">Current</Link></li>
                            }

                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;