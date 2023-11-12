import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className="App">
            <Link className="navbar__link" to="/time">
                Узнать время
            </Link>
            <Link className="navbar__link" to="/weather">
                Узнать погоду
            </Link>
        </div>
    );
};

export default Navbar;
