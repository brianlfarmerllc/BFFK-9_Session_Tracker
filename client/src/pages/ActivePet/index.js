import React, { useState, useEffect } from 'react'; 
import { useHistory } from "react-router-dom";
import "./active_pet.css"
import moment from 'moment';
import API from "../../API"
import { Container, MainRow, MainCol } from '../../components/Grid';
import Modal from "../../components/Modal"
import TimePicker from 'react-time-picker';




const ActivePet = ({ session, trainingSessions }) => {
    const [block, setBlock] = useState({})
    const [activeSession, setActiveSession] = useState([])
    const [updateBlock, setUpdateBlock] = useState({})
    const [dailySummary, setDailySummary] = useState({})
    const [timeToEdit, setTimeToEdit] = useState({})
    const [editState, setEditState] = useState(false)
    const [deleteState, setDeleteState] = useState(false)

    const history = useHistory();

    useEffect(() => {
        const active = trainingSessions.filter(trainingSession => trainingSession._id === session);
        setActiveSession(active);
    }, [])

    // function to get diff between start and stop times
    function timeDiff(startTime, endTime) {
        var start = moment.utc(startTime, "HH:mm");
        var end = moment.utc(endTime, "HH:mm");
        var d = moment.duration(end.diff(start));
        return moment.utc(+d).format('H:mm');
    }

    // function to convert militay time to standard time
    function convert(input) {
        return moment(input, 'HH:mm').format('h:mm A');
    }

    function totalTime(time) {
        return new Date(time * 1000).toISOString().substr(11, 5)
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

    function handleDailyNotes(e) {
        const { name, value } = e.target
        setDailySummary({ ...dailySummary, [name]: value })
    };

    // handles the on change when updating
    function updateStartTime(time) {
        setUpdateBlock({ ...updateBlock, "training_block.$.start": time })
        setTimeToEdit({ ...timeToEdit, start: time })
    };

    function updateEndTime(time) {
        setUpdateBlock({ ...updateBlock, "training_block.$.end": time })
        setTimeToEdit({ ...timeToEdit, end: time })
    };

    function updateHandleChange(e) {
        const { name, value } = e.target
        setUpdateBlock({ ...updateBlock, [name]: value })
        setTimeToEdit({ ...timeToEdit, session_notes: value })
    };

    // handles submits
    function handleSubmit(e) {
        e.preventDefault()
        const time = timeDiff(block.start, block.end).split(":")
        const seconds = (time[0]) * 60 * 60 + (time[1]) * 60
        API.sessionBlock(session, { ...block, sec: seconds })
            .then(res => {
                setActiveSession([res])
                setBlock({})
            })
            .catch(err => console.log(err))
    };

    function handleSubmitDailyNotes(e) {
        e.preventDefault();
        API.submitNotes(dailySummary, activeSession[0]._id)
            .then(res => setActiveSession([res]))
            .catch(err => console.log(err))
    };

    // handles update of new timeblock 
    function handleUpdate(e) {
        e.preventDefault()
        const time = timeDiff(timeToEdit.start, timeToEdit.end).split(":")
        const seconds = (time[0]) * 60 * 60 + (time[1]) * 60
        const blockId = e.target.closest('button').id
        API.updateSessionBlock(blockId, activeSession[0]._id, { ...updateBlock, "training_block.$.sec": seconds })
            .then(res => {
                setActiveSession([res])
                setEditState(false)
            })
            .catch(err => console.log(err))
    };

    function handleEdit(e) {
        e.preventDefault()
        const blockId = e.target.closest('button').id
        const selectTimeBlock = activeSession[0].training_block.filter(session => session._id === blockId)
        setTimeToEdit(selectTimeBlock)
        setEditState(true)
    }

    function handleDelete(e) {
        e.preventDefault()
        const blockId = e.target.closest('button').id
        API.deleteSessionBlock(blockId, activeSession[0]._id)
            .then(res => {
                setActiveSession([res])
                setEditState(false)
            })
            .catch(err => console.log(err))
    }
    function handleDeleteDay(e) {
        e.preventDefault()
        API.deleteDay(activeSession[0]._id)
            .then(res => {
                history.push("/clients/home")
                setDeleteState(false)
            })
            .catch(err => console.log(err))
    }

    function handleAlert(e) {
        e.preventDefault()
        setDeleteState(true)
    }

    function handleCancel(e) {
        e.preventDefault()
        setEditState(false)
        setDeleteState(false)
    }

    return (
        <>
            <Container>
                <MainRow>
                    <MainCol className="col main-col active-pet-main-col">
                        <div className="row header-row">
                            <div className="col header-col">
                                <h4>Enter Session Details</h4>
                            </div>

                            <button
                                type="button"
                                onClick={handleAlert}
                                className="btn delete_button col"
                            >
                                <p>Delete Day</p>
                            </button>

                        </div>
                        <div className="row time-block">
                            <div className="col time start_time">
                                <h6 style={{ marginTop: "5px" }}>Start Time</h6>
                                <TimePicker
                                    autoFocus={true}
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

                        {activeSession.length > 0 ?

                            activeSession[0].training_block.map((timeBlock, index) => (
                                <div className="row time-block" key={index}>
                                    <h5 >
                                        Session {index + 1} - Time: {timeDiff(timeBlock.start, timeBlock.end)}
                                    </h5>
                                    <div className="col time">
                                        <h6 style={{ marginTop: "15px" }}>Start Time</h6>
                                        <h6 style={{ marginTop: "5px" }}>{convert(timeBlock.start)}</h6>
                                    </div>
                                    <div className="col time">
                                        <h6 style={{ marginTop: "15px" }}>End Time</h6>
                                        <h6 style={{ marginTop: "5px" }}>{convert(timeBlock.end)}</h6>
                                    </div>
                                    <textarea
                                        className="col description"
                                        name="training_block.$.session_notes"
                                        value={timeBlock.session_notes}
                                        readOnly={true}
                                    >
                                    </textarea>
                                    <button
                                        type="submit"
                                        id={timeBlock._id}
                                        onClick={handleEdit}
                                        className="btn saveBtn col"
                                    >
                                        <p>Edit</p>
                                    </button>
                                </div>
                            ))
                            : null
                        }

                        {activeSession.length > 0 ?
                            <>
                                <div className="row header-row" style={{ marginTop: "2rem" }}>
                                    <h4 style={{ marginBottom: "16px" }}>Daily Summary Time {totalTime(activeSession[0].total_sec)} </h4>
                                    {/* <h4>Daily Training Time {totalTime(activeSession[0].total_sec)}</h4> */}
                                </div>
                                <div className="row time-block">
                                    <textarea
                                        className="col description"
                                        placeholder="Days Notes"
                                        name="days_notes"
                                        defaultValue={activeSession[0].days_notes || dailySummary.days_notes}
                                        onChange={handleDailyNotes}
                                    >
                                    </textarea>
                                    <button
                                        disabled={!(dailySummary.days_notes)}
                                        type="submit"
                                        onClick={handleSubmitDailyNotes}
                                        className="btn saveBtn col"
                                    >
                                        <p>Edit</p>
                                    </button>
                                </div>
                                <div className="row header-row" style={{ paddingTop: "0", marginBottom: "1em" }}>

                                </div>
                            </>
                            : null
                        }
                    </MainCol>
                </MainRow>
            </Container>

            {
                editState === true ?
                    <Modal>
                        <MainCol className="col main-col active-pet-main-col">
                            <div className="row header-row">
                                <h4>Edit Session Details</h4>
                            </div>
                            <div className="row time-block">
                                <div className="col time start_time">
                                    <h6 style={{ marginTop: "5px" }}>{convert(timeToEdit[0].start)}</h6>
                                    <TimePicker
                                        disableClock={true}
                                        clearIcon={null}
                                        onChange={updateStartTime}
                                    />
                                </div>
                                <div className="col time">
                                    <h6 style={{ marginTop: "5px" }}>{convert(timeToEdit[0].end)}</h6>
                                    <TimePicker
                                        disableClock={true}
                                        clearIcon={null}
                                        onChange={updateEndTime}
                                    />
                                </div>
                                <textarea
                                    className="col description"
                                    placeholder="Session Notes"
                                    name="training_block.$.session_notes"
                                    defaultValue={timeToEdit[0].session_notes}
                                    onChange={updateHandleChange}
                                >
                                </textarea>
                                <div className="col btn">
                                    <button
                                        disabled={!(timeToEdit.start && timeToEdit.end && timeToEdit.session_notes)}
                                        type="submit"
                                        id={timeToEdit[0]._id}
                                        onClick={handleUpdate}
                                        className="btn saveBtn col"
                                    >
                                        <i className="fas fa-save"></i>
                                    </button>
                                </div>
                                <div className="col btn">
                                    <button
                                        type="submit"
                                        id={timeToEdit[0]._id}
                                        onClick={handleDelete}
                                        className="btn saveBtn col"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                                <div className="col btn">
                                    <button
                                        type="submit"
                                        id={timeToEdit[0]._id}
                                        onClick={handleCancel}
                                        className="btn saveBtn col"
                                    >
                                        <p>Cancel</p>
                                    </button>
                                </div>
                            </div>
                        </MainCol>
                    </Modal>
                    : null
            }

            {
                deleteState === true ?
                    <Modal>
                        <MainCol className="col main-col active-pet-main-col" style={{margin: "auto auto"}}>
                            <div className="row header-row">
                                <h4>Are you sure you want to delete the entire day? Deleting the day will also remove all this days session info.</h4>
                            </div>
                            <div className="row time-block">
                                <div className="col btn">
                                    <button
                                        type="submit"
                                        onClick={handleCancel}
                                        className="btn saveBtn col"
                                    >
                                        <p>Cancel</p>
                                    </button>
                                </div>
                                <div className="col btn">
                                    <button
                                        type="submit"
                                        onClick={handleDeleteDay}
                                        className="btn saveBtn col"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </MainCol>
                    </Modal>
                    : null
            }
        </>

    );
}

export default ActivePet;