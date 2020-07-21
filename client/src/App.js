import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Header from "./components/Header"
import Clients from "./pages/Clients"
import ClientHome from "./pages/ClientHome"
import './App.css';

function App() {
  const [form, setForm] = useState({})
  const [selectClient, setSelectClient] = useState({})


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
              setForm={setForm} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
