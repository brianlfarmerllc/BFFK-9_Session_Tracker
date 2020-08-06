
import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <input className="form-control"
                type={props.type}
                name={props.name}
                onChange={props.handleChange}
                value={props.value}
                defaultValue={props.defaultValue} />
        </div>
    );
}

export function FormBtn(props) {
    return (
        <div className="form-group">
            <button {...props} type="submit">
                {props.children}
            </button>
        </div>
    );
}

export function Text(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <textarea className="form-control"
                type={props.type}
                name={props.name}
                onChange={props.handleChange}
                value={props.value}
                rows={props.rows} />
        </div>
    );
}

export function Select(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <select className="form-select"
                type={props.type}
                name={props.name}
                onChange={props.handleChange}
            >
                <option value="">Choose {props.choose}</option>
                {props.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
               
            </select>
        </div>
    );
}