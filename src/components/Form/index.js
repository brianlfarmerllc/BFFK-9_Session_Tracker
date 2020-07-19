import React from 'react'
import "./form.css"


const Form = (props) => {
    return (
        <>
            <div className="form-header">
                <h2>{props.header}</h2>
            </div>
            <div className="form-content">
                <form>
                    {props.children}
                </form>
            </div>
        </>
    )
}

export default Form