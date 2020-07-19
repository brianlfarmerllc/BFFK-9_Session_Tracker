import React from 'react';
import './grid.css';

export function Container(props) {
    return (
        <div className="container-fluid main-container">
            {props.children}
        </div>
    )
}

export function MainRow(props) {
    return (
        <div className="row main-row">
            {props.children}
        </div>
    )
}

export function SideCol(props) {
    return (
        <div className="col-lg-4 col-xl-3 side-col">
            {props.children}
        </div>
    )
}

export function MainCol(props) {
    return (
        <div className="col main-col">
            {props.children}
        </div>
    )
}

export function Row (props) {
    return (
        <div {...props}>
            {props.children}
        </div>
    )
}

export function Col (props) {
    return (
        <div {...props}>
            {props.children}
        </div>
    )
}
export function Cont (props) {
    return (
        <div {...props}>
            {props.children}
        </div>
    )
}
