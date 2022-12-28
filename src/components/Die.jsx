import React from "react";
import "./Die.css";

function Die(props) {
    return (
        <div 
            className={`die-face ${props.isHeld && "green-bg"}`}
            onClick={props.handleClick}
        >
            <h2 className="die-value">{props.value}</h2>
        </div>
    )
}

export default Die;