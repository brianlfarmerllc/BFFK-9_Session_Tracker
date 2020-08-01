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
  const [session, setSession] = useState("")
  const [trainingSessions, setTrainingSessions] = useState([])

  useEffect(() => {
    loadPets()
  }, [])

  function loadPets() {
    API.returnPets()
      .then(res => setPetList(res))
      .catch(err => console.log(err))
  }

  return (
    <Router>
      <main>
        <Header selectClient={selectClient} />
        <Switch>
          <Route exact path="/">
            <Clients
              form={form}
              setForm={setForm}
              setSelectClient={setSelectClient} />
          </Route>
          <Route exact path="/clients/home">
            <ClientHome
              selectClient={selectClient[0]}
              petList={petList}
              setSession={setSession}
              setPetList={setPetList}
              trainingSessions={trainingSessions}
              setTrainingSessions={setTrainingSessions} />
          </Route>
          <Route exact path="/training">
            <ActivePet
              session={session} 
              trainingSessions={trainingSessions}/>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
