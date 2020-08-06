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
    const [newPet, setNewPet] = useState({});
    const [selectPet, setSelectPet] = useState();
    const [activePet, setActivePet] = useState({});
    const [clientEditState, setClientEditState] = useState(false);
    const [editClient, setEditClient] = useState({});
    const [petEditState, setPetEditState] = useState(false);
    const [editPet, setEditPet] = useState({});


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

    function handleCancel(e) {
        e.preventDefault();
        setEditClient({});
        setEditPet({});
        setClientEditState(false);
        setPetEditState(false);
    }

    function deleteClient(e) {
        e.preventDefault();
        console.log(selectClient._id)
        API.deleteClient(selectClient._id)
            .then(res => {
                console.log(res)
                history.push("/")
            })
            .catch(err => console.log(err))
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
                        <div className="row header_row">
                            <div className="col">
                                <h2>Client Info</h2>
                            </div>
                            <div className="col" style={{ maxWidth: "100px" }}>
                                <FormBtn onClick={() => setClientEditState(true)} className="edit">Edit</FormBtn>
                            </div>
                        </div>
                        <hr style={{ marginTop: "0" }} />
                        {selectClient ?
                            <>
                                <h5>Name: </h5>
                                <h5><span>{selectClient.name}</span></h5>
                                <h5>Phone:</h5>
                                <h5><span>{selectClient.phone}</span></h5>
                                <h5>Email:</h5>
                                <h5><span>{selectClient.email}</span></h5>
                                <h5>Address:</h5>
                                <h5><span>{selectClient.address} <br /> {selectClient.city}</span></h5>
                            </>
                            : null
                        }

                        {selectPet ?
                            <>
                                {selectPet.map((pet, index) => (
                                    <div key={index}>
                                        <div className="row header_row" style={{ marginTop: "2rem" }}>
                                            <div className="col">
                                                <h2>Pet Info</h2>
                                            </div>
                                            <div className="col" style={{ maxWidth: "100px" }}>
                                                <FormBtn id={pet._id} onClick={() => setPetEditState(true)} className="edit">Edit</FormBtn>
                                            </div>
                                        </div>
                                        <hr style={{ marginTop: "0" }} />
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
                            :
                            <>
                                <div className="row header_row" style={{ marginTop: "2rem" }}>
                                    <div className="col">
                                        <h2>Pet Info</h2>
                                    </div>
                                </div>
                                <hr style={{ marginTop: "0" }} />
                                <h5>Name:<span>No Pets Assigned</span></h5>
                            </>
                        }

                    </SideCol>
                    <MainCol className="col main-col">
                        {selectPet ?
                            <>
                                <div className="row header_row">
                                    <div className="col">
                                        <h2>{activePet.name}'s Training Dashboard</h2>
                                    </div>
                                    <div className="col">
                                        <FormBtn className="new_day" onClick={startNewDay}>Start New Day</FormBtn>
                                    </div>
                                </div>

                                <Row className="row">
                                    <h5>Main Issues:</h5>
                                    <h5><span>{activePet.issues}</span></h5>
                                    <h5>Additional Notes:</h5>
                                    <h5><span>{activePet.notes}</span></h5>
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
                    <Form header={"Add Pet Info"}>
                        <div className="row modal-row">
                            <div className="col left-col">
                                <Input
                                    htmlFor="name" label="Pets Name *" type="text"
                                    name="name" handleChange={handleChange}
                                    value={newPet.name || ""} />
                            </div>
                            <div className="col right-col">
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
            {
                clientEditState === true ?
                    <Modal>
                        <Form
                            header="Edit Client Info"
                        >
                            <Input
                                htmlFor="name" label="Clients Name *" type="text"
                                name="name" handleChange={handleChange}
                                defaultValue={selectClient.name} />
                            <Input
                                htmlFor="phone" label="Phone Number *" type="text"
                                name="phone" handleChange={handleChange}
                                defaultValue={selectClient.phone} />
                            <Input
                                htmlFor="email" label="Email *" type="text"
                                name="email" handleChange={handleChange}
                                defaultValue={selectClient.email} />
                            <Input
                                htmlFor="address" label="Home Address *" type="text"
                                name="address" handleChange={handleChange}
                                defaultValue={selectClient.address} />
                            <Input
                                htmlFor="city" label="City *" type="text"
                                name="city" handleChange={handleChange}
                                defaultValue={selectClient.city} />
                            <Select
                                htmlFor="source" label="How did they find me *" type="text"
                                name="source" handleChange={handleChange}
                                defaultValue={selectClient.source} choose={"Source"}
                                options={["Client Referal", "Instagram", "Paws in The City", "Vet Partnership", "Other"]} />

                            <div className="row">
                                <div className="col button_col">
                                    <FormBtn onClick={handleCancel}><i className="fas fa-times-circle"></i></FormBtn>
                                </div>
                                <div className="col button_col">
                                    <FormBtn id={selectClient._id} onClick={deleteClient}><i className="fas fa-trash"></i></FormBtn>
                                </div>
                                <div className="col button_col">
                                    <FormBtn><i className="fas fa-save"></i></FormBtn>
                                </div>
                            </div>
                        </Form>
                    </Modal>
                    : null
            }
            {
                petEditState === true ?
                    <Modal>
                        <Form header={"Edit Pet Info"}>
                            <div className="row modal-row">
                                <div className="col left-col">
                                    <Input
                                        htmlFor="name" label="Pets Name *" type="text"
                                        name="name" handleChange={handleChange}
                                        value={newPet.name || ""} />
                                </div>
                                <div className="col right-col">
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
                            <div className="row">
                                <div className="col button_col">
                                    <FormBtn onClick={handleCancel}><i className="fas fa-times-circle"></i></FormBtn>
                                </div>
                                <div className="col button_col">
                                    <FormBtn><i className="fas fa-trash"></i></FormBtn>
                                </div>
                                <div className="col button_col">
                                    <FormBtn><i className="fas fa-save"></i></FormBtn>
                                </div>
                            </div>
                        </Form>
                    </Modal>
                    : null
            }
        </>
    );
}

export default ClientHome;