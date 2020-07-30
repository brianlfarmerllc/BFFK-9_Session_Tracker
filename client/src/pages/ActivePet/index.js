import React, { useState, useEffect } from 'react';
import "./active_pet.css"
import moment from 'moment';
import API from "../../API"
import { Container, MainRow, MainCol } from '../../components/Grid';
import Modal from "../../components/Modal"
import TimePicker from 'react-time-picker';




const ActivePet = ({ session, allSessions, getSessions }) => {
    const [block, setBlock] = useState({})
    const [activeSession, setActiveSession] = useState([])
    const [updateBlock, setUpdateBlock] = useState({})
    const [dailySummary, setDailySummary] = useState({})
    const [timeToEdit, setTimeToEdit] = useState({})
    const [editState, setEditState] = useState(false)

    let timeArray = []
    let daysTime;

    useEffect(() => {
        getSessions()
        const active = allSessions.filter(allSession => allSession._id === session);
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

    // function to format mongo db date
    function formatDate(date) {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return new Date(date).toLocaleDateString(options);
    }

    // function to sum the total session time for the day
    function totalTime() {
        if (activeSession.length > 0) {
            for (let i = 0; i < activeSession[0].training_block.length; i++) {
                const time = timeDiff(activeSession[0].training_block[i].start, activeSession[0].training_block[i].end);
                const split = time.split(':')
                const seconds = (split[0]) * 60 * 60 + (split[1]) * 60
                timeArray.push(seconds)
                const totalSeconds = timeArray.reduce((a, b) => a + b, 0)
                daysTime = new Date(totalSeconds * 1000).toISOString().substr(11, 5)
            }
        };
    };

    totalTime()

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
        API.sessionBlock(session, block)
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
        const blockId = e.target.closest('button').id
        API.updateSessionBlock(blockId, activeSession[0]._id, updateBlock)
            .then(res => setActiveSession([res]))
            .catch(err => console.log(err))
    };

    function handleEdit(e) {
        e.preventDefault()
        const blockId = e.target.closest('button').id
        const selectTimeBlock = activeSession[0].training_block.filter(session => session._id === blockId)
        setTimeToEdit(selectTimeBlock)
        setEditState(true)
    }

    return (
        <>
            <Container>
                <MainRow>
                    <MainCol className="col main-col active-pet-main-col">
                        <div className="row header-row">
                            <h4>Enter New Training Session Details</h4>
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
                            <div className="row header-row" style={{ marginTop: "2rem" }}>
                                <h4>{formatDate(activeSession[0].day)} Training Details</h4>
                            </div>
                            : null}


                        {activeSession.length > 0 ?

                            activeSession[0].training_block.map((timeBlock, index) => (
                                <div className="row time-block" key={index}>
                                    <h5 >
                                        Session {index + 1} - Time: {timeDiff(timeBlock.start, timeBlock.end)}
                                    </h5>
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
                                        name="training_block.$.session_notes"
                                        defaultValue={timeBlock.session_notes}
                                        onChange={updateHandleChange}
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
                                    <h4 >Daily Summary </h4>
                                </div>
                                <div className="row time-block">
                                    <textarea
                                        className="col description"
                                        placeholder="Days Notes"
                                        name="days_notes"
                                        defaultValue={dailySummary.days_notes || activeSession[0].days_notes}
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
                                    <h4>Daily Training Time {daysTime}</h4>
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
                        </MainCol>
                    </Modal>
                    : null
            }
        </>

    );
}

export default ActivePet;