import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import API from "./API"
import Header from "./components/Header"
import Clients from "./pages/Clients"
import ClientHome from "./pages/ClientHome"
import ActivePet from "./pages/ActivePet"
import './App.css';

function App() {
  const [form, setForm] = useState({})
  const [selectClient, setSelectClient] = useState({})
  const [petList, setPetList] = useState([])
  const [allSessions, setAllSessions] = useState([])
  const [session, setSession] = useState()

  useEffect(() => {
    loadPets()
    getSessions()
  }, [])

  function loadPets() {
    API.returnPets()
      .then(res => setPetList(res))
      .catch(err => console.log(err))
  }

  function getSessions() {
    API.getPetSessions()
      .then(res => setAllSessions(res))
      .catch(err => console.log(err))
  }

  return (
    <Router>
      <main>
        <Header selectClient={selectClient} loadPets={loadPets} />
        <Switch>
          <Route exact path="/">
            <Clients
              getSessions={getSessions}
              form={form}
              setForm={setForm}
              setSelectClient={setSelectClient} />
          </Route>
          <Route exact path="/clients/home">
            <ClientHome
              selectClient={selectClient[0]}
              petList={petList}
              setSession={setSession}
              setPetList={setPetList} />
          </Route>
          <Route exact path="/training">
            <ActivePet
              getSessions={getSessions}
              allSessions={allSessions}
              session={session} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
