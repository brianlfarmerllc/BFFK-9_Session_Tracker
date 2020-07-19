import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Header from "./components/Header"
import Clients from "./pages/Clients"
import './App.css';

function App() {
  return (
    <Router>
      <main>
        <Header />
        <Switch>
          <Route exact path="/clients"> <Clients /> </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
