import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import API from './API'
import Header from "./components/Header"
import Clients from "./pages/Clients"
import './App.css';

function App() {
  const [newClient, setNewClient] = useState({})
  const [selectClient, setSelectClient] = useState({})
  const [clientList, setClientList] = useState([])

    useEffect(() => {
        API.returnClients()
            .then(res => setClientList(res))
    },[])

  return (
    <Router>
      <main>
        <Header />
        <Switch>
          <Route exact path="/clients">
            <Clients 
            newClient={newClient} 
            setNewClient={setNewClient} 
            setSelectClient={setSelectClient}
            clientList={clientList} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
