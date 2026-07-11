import React from "react";
import "../Css/Navbar.css";

function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="navbar">

            <h2>

                Welcome,

                {user?.name}

            </h2>

        </div>

    );

}

export default Navbar;