import React, { useState, useEffect } from 'react';
import "./active_pet.css"
import API from "../../API"
import { Container, MainRow, MainCol } from '../../components/Grid';
import TimePicker from 'react-time-picker';




const ActivePet = ({ session, allSessions }) => {
    const [block, setBlock] = useState({})
    const [activeSession, setActiveSession] = useState([])

    useEffect(() => {
        const active = allSessions.filter(allSession => allSession._id === session)
        setActiveSession(active)
    }, [])

    function startTime(time) {
        setBlock({ ...block, start: time })
    }

    function endTime(time) {
        setBlock({ ...block, end: time })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setBlock({ ...block, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        API.sessionBlock(session, block)
            .then(res => {
                setActiveSession([res])
                setBlock({})
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <MainRow>
                <MainCol className="col main-col active-pet-main-col">
                    <h2>Enter New Training Session Details</h2>
                    <div className="row time-block">
                        <div className="col time">
                            <h6 style={{ marginTop: "5px" }}>Start Time</h6>
                            <TimePicker
                                disableClock={true}
                                clearIcon={null}
                                value={block.start || ""}
                                onChange={startTime}
                            />
                        </div>
                        <div className="col time">
                            <h6 style={{ marginTop: "5px" }}>End Time</h6>
                            <TimePicker
                                disableClock={true}
                                clearIcon={null}
                                value={block.end || ""}
                                onChange={endTime}
                            />
                        </div>
                        <textarea
                            className="col description"
                            placeholder="Session Notes"
                            name="session_notes"
                            value={block.session_notes || "This is some text"}
                            onChange={handleChange}
                        >
                        </textarea>
                        <button
                            disabled={!(block.start && block.end && block.session_notes)}
                            type="submit"
                            onClick={handleSubmit}
                            className="btn saveBtn col"
                        >
                            <i className="fas fa-save"></i>
                        </button>
                    </div>
                </MainCol>
            </MainRow>
        </Container>
    );
}

export default ActivePet;