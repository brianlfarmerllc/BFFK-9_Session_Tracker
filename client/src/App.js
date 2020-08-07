import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import API from "./API"
import Header from "./components/Header"
import Clients from "./pages/Clients"
import ClientHome from "./pages/ClientHome"
import ActivePet from "./pages/ActivePet"
import './App.css';

function App() {
  const [form, setForm] = useState({})
  const [selectClient, setSelectClient] = useState({})
  const [session, setSession] = useState("")
  const [trainingSessions, setTrainingSessions] = useState([])

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
          <Route exact path="/clients/home"
            render={() => selectClient === undefined ? <Redirect to="/" /> :
              <ClientHome
                selectClient={selectClient[0]}
                setSelectClient={setSelectClient}
                setSession={setSession}
                trainingSessions={trainingSessions}
                setTrainingSessions={setTrainingSessions} />
            }
          />
          <Route exact path="/training">
            <ActivePet
              session={session}
              trainingSessions={trainingSessions} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
