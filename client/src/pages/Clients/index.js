import React, { useState, useEffect } from 'react';
import "./clients.css"
import { Container, MainRow, SideCol, MainCol } from "../../components/Grid";
import { Input, Select, FormBtn } from "../../components/FormComponents";
import API from "../../API"
import Form from "../../components/Form"

const Clients = ({ newClient, setNewClient, setSelectClient, clientList }) => {
    // const [clientList, setClientList] = useState([])

    // useEffect(() => {
    //     API.returnClients()
    //         .then(res => setClientList([res]))
    // }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setNewClient({ ...newClient, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        API.addClient(newClient)
            .then(res => {
                setSelectClient({ id: res._id })
                setNewClient({})
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <MainRow>
                <SideCol>
                    <h2>Select Client</h2>
                    <ol>
                        {clientList.length !== 0 ?
                            clientList.map(client => (
                                <a href="/clients/home" key={client._id} value={client._id}><li>{client.name}</li></a>
                            )) : null }
                    </ol>
                </SideCol>
                <MainCol>
                    <Form
                        header="New Client Info"
                    >
                        <Input
                            htmlFor="name" label="Clients Name" type="text"
                            name="name" handleChange={handleChange}
                            value={newClient.name || ""} />
                        <Input
                            htmlFor="phone" label="Phone Number" type="text"
                            name="phone" handleChange={handleChange}
                            value={newClient.phone || ""} />
                        <Input
                            htmlFor="email" label="Email" type="text"
                            name="email" handleChange={handleChange}
                            value={newClient.email || ""} />
                        <Input
                            htmlFor="address" label="Home Address" type="text"
                            name="address" handleChange={handleChange}
                            value={newClient.address || ""} />
                        <Input
                            htmlFor="city" label="City" type="text"
                            name="city" handleChange={handleChange}
                            value={newClient.city || ""} />
                        <Select
                            htmlFor="source" label="How did they find me" type="text"
                            name="source" handleChange={handleChange}
                            value={newClient.source || ""}
                            options={["Client Referal", "Instagram", "Paws in The City", "Vet Partnership"]} />

                        <FormBtn onClick={handleSubmit}>Save New Client</FormBtn>
                    </Form>
                </MainCol>
            </MainRow>
        </Container>
    );
}

export default Clients;