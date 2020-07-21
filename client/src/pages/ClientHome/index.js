import React, { useState } from 'react';
import "./clienthome.css"
import { Container, MainRow, SideCol, MainCol, Row, Col } from "../../components/Grid";
import { Input, Text, FormBtn, Select } from "../../components/FormComponents";
import Modal from "../../components/Modal"
import API from "../../API"
import Form from "../../components/Form"

const ClientHome = ({ form, setForm, selectClient }) => {
    const [selectPet, setSelectPet] = useState()

    function handleChange(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log({...form, id:selectClient._id})
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
                                <h5>Name:<span>{selectPet.name}</span></h5>
                                <h5>Breed:<span>{selectPet.breed}</span></h5>
                                <h5>Program:<span>{selectPet.program}</span></h5>
                                <h5>Main Issues:<span>{selectPet.issues}</span></h5>
                                <h5>Notes:<span>{selectPet.notes}</span></h5>
                            </>
                            : null
                        }

                    </SideCol>
                    <MainCol className="col main-col">
                        {selectPet ?
                            <h2>Some Text</h2>
                            : null}
                    </MainCol>
                </MainRow>
            </Container>
            {!selectPet ?
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
                        <Text
                            htmlFor="issues" label="Issues" type="text"
                            name="issues" handleChange={handleChange}
                            value={form.issues || ""} />
                        <Text
                            htmlFor="notes" label="Notes" type="text"
                            name="notes" handleChange={handleChange}
                            value={form.notes || ""} />
                        <FormBtn onClick={handleSubmit}>Save New Pet</FormBtn>
                    </Form>
                </Modal>
                : null
            }
        </>
    );
}

export default ClientHome;