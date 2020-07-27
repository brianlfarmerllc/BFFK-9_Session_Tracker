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
    const [dailySummary, setDailySummary] = useState({})
    const [timeTotals, setTimeTotals] = useState([])

    let timeArray = []

    useEffect(() => {
        const active = allSessions.filter(allSession => allSession._id === session);
        setActiveSession(active);
    }, [])

    // function to get diff between start and stop times
    function timeDiff(startTime, endTime) {
        // parse time using 24-hour clock and use UTC to prevent DST issues
        var start = moment.utc(startTime, "HH:mm");
        var end = moment.utc(endTime, "HH:mm");

        // calculate the duration
        var d = moment.duration(end.diff(start));

        // format a string result
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


    if (activeSession.length > 0) {
        for (let i = 0; i < activeSession[0].training_block.length; i++) {
            const element = timeDiff(activeSession[0].training_block[i].start, activeSession[0].training_block[i].end);
            timeArray.push(element)
            console.log(timeArray)
        }
    };

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
    };

    function updateEndTime(time) {
        setUpdateBlock({ ...updateBlock, "training_block.$.end": time })
    };

    function updateHandleChange(e) {
        const { name, value } = e.target
        setUpdateBlock({ ...updateBlock, [name]: value })
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
    }

    // handles update of new timeblock 
    function handleUpdate(e) {
        e.preventDefault()
        const blockId = e.target.closest('button').id
        API.updateSessionBlock(blockId, activeSession[0]._id, updateBlock)
            .then(res => setActiveSession([res]))
            .catch(err => console.log(err))
    };

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
                                        onClick={handleUpdate}
                                        className="btn saveBtn col"
                                    >
                                        <p>Edit</p>
                                    </button>
                                    <h5 style={{ textAlign: "start", padding: "0", marginTop: "1em", marginBottom: "0" }}>
                                        Session Time: {timeDiff(timeBlock.start, timeBlock.end)}
                                    </h5>
                                </div>
                            ))
                            : null
                        }

                        {activeSession.length > 0 ?
                            <>
                                <div className="row header-row" style={{ marginTop: "2rem" }}>
                                    <h4 style={{ textAlign: "start", padding: "0", }}>Daily Summary</h4>
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
                                    {timeArray.length > 0}
                                </div>
                            </>
                            : null
                        }
                    </MainCol>
                </MainRow>
            </Container>
        </>

    );
}

export default ActivePet;