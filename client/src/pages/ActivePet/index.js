import React, { useState, useEffect } from 'react';
import "./active_pet.css"
import moment from 'moment';
import API from "../../API"
import { Container, MainRow, MainCol } from '../../components/Grid';
import TimePicker from 'react-time-picker';




const ActivePet = ({ session, allSessions }) => {
    const [block, setBlock] = useState({})
    const [activeSession, setActiveSession] = useState([])
    const [updateBlock, setUpdateBlock] = useState({})
    const [sessionToUpdate, setSessionToUpdate] = useState([])
    const [editState, setEditState] = useState(false)

    useEffect(() => {
        const active = allSessions.filter(allSession => allSession._id === session)
        setActiveSession(active)
    }, [])

    function convert(input) {
        return moment(input, 'HH:mm').format('h:mm A');
    }

    function formatDate(date) {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return new Date(date).toLocaleDateString(options);
    }

    // handles the on change when creating new
    function startTime(time) {
        setBlock({ ...block, start: time })
    };

    function endTime(time) {
        setBlock({ ...block, end: time })
    };

    function handleChange(e) {
        const { name, value } = e.target
        setBlock({ ...block, [name]: value })
    };

    // handles the on change when updating
    function updateStartTime(time) {
        setUpdateBlock({ ...updateBlock, start: time })
    };

    function updateEndTime(time) {
        setUpdateBlock({ ...updateBlock, end: time })
    };

    function updateHandleChange(e) {
        const { name, value } = e.target
        setUpdateBlock({ ...updateBlock, [name]: value })
    };

    function handleSubmit(e) {
        e.preventDefault()
        API.sessionBlock(session, block)
            .then(res => {
                setActiveSession([res])
                setBlock({})
            })
            .catch(err => console.log(err))
    };

    function handleUpdate(e) {
        e.preventDefault()
        const blockId = e.target.closest('button')
        API.updateSessionBlock(blockId, activeSession[0]._id, updateBlock)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };

    return (
        <>
            <Container>
                <MainRow>
                    <MainCol className="col main-col active-pet-main-col">
                        <h2>Enter New Training Session Details</h2>
                        <div className="row time-block">
                            <div className="col time start_time">
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
                                value={block.session_notes || ""}
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


                        {activeSession.length > 0 ? <h2>{formatDate(activeSession[0].day)} Training Details</h2> : null}

                        {activeSession.length > 0 ?

                            activeSession[0].training_block.map((timeBlock, index) => (
                                <div key={index} className="row time-block">
                                    <div className="col time">
                                        <h6 style={{ marginTop: "5px" }}>{convert(timeBlock.start)}</h6>
                                        <TimePicker
                                            disableClock={true}
                                            clearIcon={null}
                                            onChange={updateStartTime}
                                        />
                                    </div>
                                    <div className="col time">
                                        <h6 style={{ marginTop: "5px" }}>{convert(timeBlock.end)}</h6>
                                        <TimePicker
                                            disableClock={true}
                                            clearIcon={null}
                                            onChange={updateEndTime}
                                        />
                                    </div>
                                    <textarea
                                        className="col description"
                                        placeholder="Session Notes"
                                        name="session_notes"
                                        defaultValue={timeBlock.session_notes}
                                        onChange={updateHandleChange}
                                    >
                                    </textarea>
                                    <button
                                        type="submit"
                                        id={timeBlock._id}
                                        onClick={handleUpdate}
                                        className="btn saveBtn col"
                                    >
                                        <i className="fas fa-save"></i>
                                    </button>
                                </div>
                            ))
                            : null
                        }
                    </MainCol>
                </MainRow>
            </Container>
        </>

    );
}

export default ActivePet;