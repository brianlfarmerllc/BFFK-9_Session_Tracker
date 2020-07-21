import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "./clients.css"
import { Container, MainRow, SideCol, MainCol } from "../../components/Grid";
import { Input, Select, FormBtn } from "../../components/FormComponents";
import API from "../../API"
import Form from "../../components/Form"

const Clients = ({ form, setForm, setSelectClient }) => {
    const [clientList, setClientList] = useState([])
    const history = useHistory();

    useEffect(() => {
        loadClients()
    }, [])

    function loadClients() {
        API.returnClients()
            .then(res => setClientList(res))
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        API.addClient(form)
            .then(res => {
                setSelectClient([res])
                setForm({})
                history.push("/clients/home")
            })
            .catch(err => console.log(err))
    }

    function selectClient(e) {
        e.preventDefault()
        const selected = clientList.filter(client => client._id === e.target.id)
        setSelectClient(selected)
        history.push("/clients/home")

    }

    return (
        <Container>
            <MainRow>
                <SideCol>
                    <h2>Select Client</h2>
                    <ul>
                        {
                            clientList.length !== 0 ?
                                clientList.map((client, index) => (
                                    <li onClick={selectClient}
                                        key={client._id}
                                        id={client._id}>
                                        <span>{index + 1}</span>
                                        {client.name}
                                    </li>
                                )) : null
                        }
                    </ul>
                </SideCol>
                <MainCol className="col col-xl-5 main-col">
                    <Form
                        header="New Client Info"
                    >
                        <Input
                            htmlFor="name" label="Clients Name" type="text"
                            name="name" handleChange={handleChange}
                            value={form.name || ""} />
                        <Input
                            htmlFor="phone" label="Phone Number" type="text"
                            name="phone" handleChange={handleChange}
                            value={form.phone || ""} />
                        <Input
                            htmlFor="email" label="Email" type="text"
                            name="email" handleChange={handleChange}
                            value={form.email || ""} />
                        <Input
                            htmlFor="address" label="Home Address" type="text"
                            name="address" handleChange={handleChange}
                            value={form.address || ""} />
                        <Input
                            htmlFor="city" label="City" type="text"
                            name="city" handleChange={handleChange}
                            value={form.city || ""} />
                        <Select
                            htmlFor="source" label="How did they find me" type="text"
                            name="source" handleChange={handleChange}
                            value={form.source || ""} choose={"Source"}
                            options={["Client Referal", "Instagram", "Paws in The City", "Vet Partnership"]} />

                        <FormBtn onClick={handleSubmit}>Save New Client</FormBtn>
                    </Form>
                </MainCol>
            </MainRow>
        </Container>
    );
}

export default Clients;