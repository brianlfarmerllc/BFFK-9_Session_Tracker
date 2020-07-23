import React, { useState } from 'react';
import "./active_pet.css"
import { Container, MainRow, MainCol } from '../../components/Grid';
import TimePicker from 'react-time-picker';




const ActivePet = () => {
    const [block, setBlock] = useState({})


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

    return (
        <Container>
            <MainRow>
                <MainCol className="col main-col">
                    <h2>Enter New Traing Session Details</h2>
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
                            value={block.session_notes || ""}
                            onChange={handleChange
                            }>
                        </textarea>
                        <button className="btn saveBtn col"><i className="fas fa-save"></i></button>
                    </div>
                </MainCol>
            </MainRow>
        </Container>
    );
}

export default ActivePet;