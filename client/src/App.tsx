import React from "react";
import "./App.css";
import Dashboard from "./containers/dashboard/Dashboard";
import { Router } from "@reach/router";
import Hospital from "./containers/hospitals/Hospital";
import Patient from "./containers/patients/Patient";
import NetworkTable from "./containers/networks/NetworkTable";
import AddNetworkForm from "./containers/networks/components/AddNetworkForm";

function App() {
  return (
    <div className="App">
      <Dashboard>
        <Router>
          <Hospital path="hospitals" />
          <Patient path="patients" />
          <NetworkTable path="networks" />
          <AddNetworkForm path="networks/add" />
        </Router>
      </Dashboard>
    </div>
  );
}

export default App;
