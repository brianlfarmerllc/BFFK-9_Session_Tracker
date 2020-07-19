import React, { useState } from 'react';
import { Container, MainRow, SideCol, Row, Col, MainCol } from "../../components/Grid";
import { Input, Select, FormBtn } from "../../components/FormComponents"
import Form from "../../components/Form"

const Clients = () => {
    const [client, setClientState] = useState({})

    function handleChange(e) {
        const { name, value } = e.target
        setClientState({ ...client, [name]: value })
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
                        <Row className="row justify-content-center">
                            <Col className="col">
                                <Input
                                    htmlFor="name" label="Clients Name" type="text"
                                    name="name" handleChange={handleChange}
                                    value={client.name || ""} />

                                <Input
                                    htmlFor="phone" label="Phone Number" type="text"
                                    name="phone" handleChange={handleChange}
                                    value={client.phone || ""} />
                                <Input
                                    htmlFor="email" label="Email" type="text"
                                    name="email" handleChange={handleChange}
                                    value={client.email || ""} />
                                <Input
                                    htmlFor="address" label="Home Address" type="text"
                                    name="address" handleChange={handleChange}
                                    value={client.address || ""} />
                                <Input
                                    htmlFor="city" label="City" type="text"
                                    name="city" handleChange={handleChange}
                                    value={client.city || ""} />
                                <Select
                                    htmlFor="source" label="How did they find me" type="text"
                                    name="source" handleChange={handleChange}
                                    value={client.source || ""} 
                                    options={["Client Referal", "Instagram", "Paws in The City", "Vet Partnership"]}/>

                                <FormBtn>Save New Client</FormBtn>    
                            </Col>
                        </Row>


                    </Form>
                </MainCol>
            </MainRow>
        </Container>
    );
}

export default Clients;