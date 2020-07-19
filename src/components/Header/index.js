import React from 'react';
import logo from "../../bffk91024.png"
import "./header.css"

const Header = () => {
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
                        <a href="/">Dashboard</a>
                        <a href="/clients">Clients</a>
                        <a href="/current">Current</a>
                    </nav>

                </div>


            </div>

        </header>
    );
}

export default Header;