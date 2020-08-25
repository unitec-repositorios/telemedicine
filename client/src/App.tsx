import React from "react";
import "./App.css";
import Dashboard from "./containers/dashboard/Dashboard";
import { Router } from "@reach/router";
import Hospital from "./containers/hospitals/Hospital";
import PatientsTable from "./containers/patients/PatientsTable";
import NetworksTable from "./containers/networks/NetworksTable";
import AddNetworkForm from "./containers/networks/components/AddNetworkForm";
import EditNetworkForm from "./containers/networks/components/EditNetworkForm";
import AddPatientForm from "./containers/patients/components/AddPatientForm";
import EditPatientForm from "./containers/patients/components/EditPatientForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard path="/">
          <Hospital path="hospitals" />
          <PatientsTable path="patients" />
          <AddPatientForm path="patients/add" />
          <NetworksTable path="networks" />
          <EditPatientForm path="patients/edit/:id" />
          <AddNetworkForm path="networks/add" />
          <EditNetworkForm path="networks/edit/:id" />
        </Dashboard>
      </Router>
    </div>
  );
}

export default App;
