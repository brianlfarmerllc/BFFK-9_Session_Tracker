import React, { useState, useEffect } from 'react';
import "./clienthome.css"
import { Container, MainRow, SideCol, MainCol, Row, Col } from "../../components/Grid";
import { Input, Text, FormBtn, Select } from "../../components/FormComponents";
import Modal from "../../components/Modal"
import API from "../../API"
import Form from "../../components/Form"

const ClientHome = ({ form, setForm, selectClient, petList, allSessions }) => {
    const [selectPet, setSelectPet] = useState()
    const [activePet, setActivePet] = useState({})
    const [trainingSession, setTrainingSession] = useState()

    useEffect(() => {
        setPets();
        // getPetSessions();
    }, [])

    function setPets() {
        const clientPets = petList.filter(pet => pet.clientId === selectClient._id)
        
        if (clientPets[0] !== undefined) {
            const activePetSessions = allSessions.filter(session => session.petId === clientPets[0]._id)
            setTrainingSession(activePetSessions)
        }

        if (clientPets.length > 0) {
            setSelectPet(clientPets)
            setActivePet(clientPets[0])
        } else {
            return
        }
    }



    function handleChange(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    function handlePetSubmit(e) {
        e.preventDefault()
        API.addPet({ ...form, clientId: selectClient._id })
            .then(res => {
                setSelectPet([res])
                setActivePet(res)
                setForm({})
            })
            .catch(err => console.log(err))
    }

    function startNewDay(e) {
        e.preventDefault()
        API.newDay({ petId: activePet._id, day: new Date().toISOString() })
            .then(res => setTrainingSession([...trainingSession, res]))
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
                        <h2>Client Info</h2>
                        <hr />
                        {selectClient ?
                            <>
                                <h5>Name:<span>{selectClient.name}</span></h5>
                                <h5>Phone:<span>{selectClient.phone}</span></h5>
                                <h5>Email:<span>{selectClient.email}</span></h5>
                                <h5>Address:<span>{selectClient.address} - {selectClient.city}</span></h5>
                            </>
                            : null
                        }
                        <h2 style={{ marginTop: "1em" }}>Pet Info</h2>
                        <hr />
                        {selectPet ?
                            <>
                                {selectPet.map((pet, index) => (
                                    <div key={index}>
                                        <h5>Name:<span>{pet.name}</span></h5>
                                        <h5>Breed:<span>{pet.breed}</span></h5>
                                        <h5>Program:<span>{pet.program}</span></h5>
                                        <h5>Starting:<span>{pet.start_date}</span></h5>
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


                                <Row className="row">
                                    {
                                        trainingSession ?

                                            trainingSession.map(session => (
                                                <Col key={session._id} className="col-3">
                                                    <h2>{formatDate(session.day)}</h2>
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
                        <Input
                            htmlFor="name" label="Pets Name" type="text"
                            name="name" handleChange={handleChange}
                            value={form.name || ""} />
                        <Input
                            htmlFor="breed" label="Breed" type="text"
                            name="breed" handleChange={handleChange}
                            value={form.breed || ""} />
                        <Select
                            htmlFor="program" label="Program" type="text"
                            name="program" handleChange={handleChange}
                            value={form.program || ""} choose={"Program"}
                            options={["Private Lesson", "One Week B&T", "Two Week B&T"]} />
                        <Input
                            htmlFor="start_date" label="Start Date (MM/DD/YY)" type="text"
                            name="start_date" handleChange={handleChange}
                            value={form.start_date || ""} />
                        <Text
                            htmlFor="issues" label="Issues" type="text"
                            name="issues" handleChange={handleChange}
                            value={form.issues || ""} />
                        <Text
                            htmlFor="notes" label="Notes" type="text"
                            name="notes" handleChange={handleChange}
                            value={form.notes || ""} />
                        <FormBtn onClick={handlePetSubmit}>Save New Pet</FormBtn>
                    </Form>
                </Modal>
                : null
            }
        </>
    );
}

export default ClientHome;