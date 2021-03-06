import React from 'react';
import "./training_card.css"

const TrainingCard = (props) => {
    return (
        <div onClick={props.findDay} id={props.id} className="card" >
            <div className="card-body">
                <h6 className="card-title">{props.date} </h6>
                <h6 className="card-subtitle mb-3">Day {props.day} - Time Training: {props.sessionTime}</h6>
                <h6 className="card-text">Daily Notes:</h6>
                <p className="card-text">{props.days_notes}</p>
            </div>
        </div>
    );
}

export default TrainingCard;