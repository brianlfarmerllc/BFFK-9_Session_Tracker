import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import API from "./API"
import Header from "./components/Header"
import Clients from "./pages/Clients"
import ClientHome from "./pages/ClientHome"
import './App.css';

function App() {
  const [form, setForm] = useState({})
  const [selectClient, setSelectClient] = useState({})
  const [petList, setPetList] = useState([])

  useEffect(() => {
    loadPets()
  }, [])

  function loadPets() {
    API.returnPets()
      .then(res => setPetList(res))
  }


  return (
    <Router>
      <main>
        <Header />
        <Switch>
          <Route exact path="/clients">
            <Clients
              form={form}
              setForm={setForm}
              setSelectClient={setSelectClient} />
          </Route>
          <Route exact path="/clients/home">
            <ClientHome
              selectClient={selectClient[0]}
              form={form}
              setForm={setForm}
              petList={petList} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
