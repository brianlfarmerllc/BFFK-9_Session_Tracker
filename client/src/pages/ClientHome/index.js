import React, { useState, useEffect } from 'react';
import "./clienthome.css"
import { useHistory } from "react-router-dom";
import { Container, MainRow, SideCol, MainCol, Row, Col } from "../../components/Grid";
import { Input, Text, FormBtn, Select } from "../../components/FormComponents";
import TrainingCard from "../../components/TrainingCard"
import Modal from "../../components/Modal"
import API from "../../API"
import Form from "../../components/Form"

const ClientHome = ({ selectClient, petList, setPetList, setSession, trainingSessions, setTrainingSessions }) => {
    const [newPet, setNewPet] = useState({})
    const [selectPet, setSelectPet] = useState()
    const [activePet, setActivePet] = useState({})


    const history = useHistory();

    useEffect(() => {
        const clientPets = petList.filter(pet => pet.clientId === selectClient._id)

        if (clientPets[0] !== undefined) {
            API.getPetSessionsByPetId(clientPets[0]._id)
                .then(res => setTrainingSessions(res))
                .catch(err => console.log(err))
        }

        if (clientPets.length > 0) {
            setSelectPet(clientPets)
            setActivePet(clientPets[0])
        } else {
            return
        }

    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setNewPet({ ...newPet, [name]: value })
    }

    function handlePetSubmit(e) {
        e.preventDefault()
        API.addPet({ ...newPet, clientId: selectClient._id })
            .then(res => {
                setSelectPet([res])
                setActivePet(res)
                setNewPet({})
                setPetList([...petList, res])
            })
            .catch(err => console.log(err))
    }

    function startNewDay(e) {
        e.preventDefault()
        API.newDay({ petId: activePet._id, day: new Date().toISOString() })
            .then(res => {
                setTrainingSessions([...trainingSessions, res])
                setSession(res._id)
                history.push("/training")
            })
            .catch(err => console.log(err))
    }

    function findDay(e) {
        e.preventDefault();
        const cardId = (e.target.closest('.card').id)
        setSession(cardId)
        history.push("/training")
    }

    function totalTime(time) {
        return new Date(time * 1000).toISOString().substr(11, 5)
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

    return (
        <>
            <Container>
                <MainRow>
                    <SideCol>
                        <h2>Client Info</h2>
                        <hr />
                        {selectClient ?
                            <>
                                <h5>Name: </h5>
                                <h5><span>{selectClient.name}</span></h5>
                                <h5>Phone:</h5>
                                <h5><span>{selectClient.phone}</span></h5>
                                <h5>Email:</h5>
                                <h5><span>{selectClient.email}</span></h5>
                                <h5>Address:</h5>
                                <h5><span>{selectClient.address} - {selectClient.city}</span></h5>
                            </>
                            : null
                        }
                        <h2 style={{ marginTop: "1em" }}>Pet Info</h2>
                        <hr />
                        {selectPet ?
                            <>
                                {selectPet.map((pet, index) => (
                                    <div key={index}>
                                        <h5>Name:</h5>
                                        <h5><span>{pet.name}</span></h5>
                                        <h5>Breed:</h5>
                                        <h5><span>{pet.breed}</span></h5>
                                        <h5>Program:</h5>
                                        <h5><span>{pet.program}</span></h5>
                                        <h5>Starting:</h5>
                                        <h5><span>{pet.start_date}</span></h5>
                                    </div>
                                ))}
                            </>
                            : <h5>Name:<span>No Pets Assigned</span></h5>
                        }

                    </SideCol>
                    <MainCol className="col main-col">
                        {selectPet ?
                            <>
                                <h2>{activePet.name}'s Training Dashboard</h2>
                                <Row className="row">
                                    <h5>Main Issues:</h5>
                                    <h5><span>{activePet.issues}</span></h5>
                                    <h5>Additional Notes:</h5>
                                    <h5><span>{activePet.notes}</span></h5>
                                    <FormBtn onClick={startNewDay}>Start New Day</FormBtn>
                                </Row >


                                <Row className="row calander">
                                    {
                                        trainingSessions ?

                                            trainingSessions.map((session, index) => (
                                                <Col className="col-12 col-xl-6 mt-4" key={session._id}>
                                                    <TrainingCard
                                                        date={formatDate(session.day)}
                                                        day={index + 1}
                                                        id={session._id}
                                                        findDay={findDay}
                                                        sessionTime={totalTime(session.total_sec)}
                                                        days_notes={
                                                            session.days_notes.length < 90 ?
                                                                session.days_notes
                                                                : session.days_notes.substring(0, 85) + " ..."
                                                        }
                                                    />
                                                </Col>

                                            ))
                                            :
                                            null
                                    }
                                </Row>
                            </>
                            : null
                        }
                    </MainCol>
                </MainRow>
            </Container>
            {!selectPet && selectClient ?
                <Modal>
                    <Form header={!selectPet ? "Add Pet Info" : "Add Another Pet"}>
                        <div className="row modal-row">
                            <div className="col">
                                <Input
                                    htmlFor="name" label="Pets Name *" type="text"
                                    name="name" handleChange={handleChange}
                                    value={newPet.name || ""} />
                            </div>
                            <div className="col">
                                <Input
                                    htmlFor="breed" label="Breed *" type="text"
                                    name="breed" handleChange={handleChange}
                                    value={newPet.breed || ""} />
                            </div>
                        </div>
                        <Select
                            htmlFor="program" label="Program *" type="text"
                            name="program" handleChange={handleChange}
                            value={newPet.program || ""} choose={"Program"}
                            options={["Private Lesson", "One Week B&T", "Two Week B&T"]} />
                        <Input
                            htmlFor="start_date" label="Start Date (MM/DD/YY) *" type="text"
                            name="start_date" handleChange={handleChange}
                            value={newPet.start_date || ""} />
                        <Text
                            htmlFor="issues" label="Issues *" type="text"
                            name="issues" handleChange={handleChange}
                            value={newPet.issues || ""} />
                        <Text
                            htmlFor="notes" label="Notes" type="text"
                            name="notes" handleChange={handleChange}
                            value={newPet.notes || ""} />
                        <FormBtn
                            disabled={!(newPet.name && newPet.breed && newPet.program && newPet.start_date && newPet.issues)}
                            onClick={handlePetSubmit}>Save New Pet</FormBtn>
                    </Form>
                </Modal>
                : null
            }
        </>
    );
}

export default ClientHome;