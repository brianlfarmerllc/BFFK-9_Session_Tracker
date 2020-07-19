import React, { useState } from 'react';
import { Container, MainRow, SideCol, MainCol } from "../../components/Grid";
import { Input, Select, FormBtn } from "../../components/FormComponents"
import Form from "../../components/Form"

const Clients = () => {
    const [newClient, setNewClientState] = useState({})

    function handleChange(e) {
        const { name, value } = e.target
        setNewClientState({ ...newClient, [name]: value })
    }

    return (
        <Container>
            <MainRow>
                <SideCol>

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

                        <FormBtn>Save New Client</FormBtn>



                    </Form>
                </MainCol>
            </MainRow>
        </Container>
    );
}

export default Clients;