import React from 'react'
import './instructions.css'

function Instructions(props) {
    return (props.trigger) ? (
        <div className="instructions">
            <div className="instructions-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    X
                </button>  
                { props.children }  
            </div>   
        </div>
    ) : "";
}

export default Instructions