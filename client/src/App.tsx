import React from "react";
import "./App.css";
import Dashboard from "./containers/dashboard/Dashboard";
import { Router } from "@reach/router";

// import { Router } from "@reach/router";
function App() {
  return (
    <div className="App">
      <Dashboard>
        <Router></Router>
      </Dashboard>
    </div>
  );
}

export default App;
