import React from "react";
import "./App.css";
import Dashboard from "./containers/dashboard/Dashboard";
import { Router } from "@reach/router";
import Hospital from "./containers/hospitals/Hospital";
import PatientTable from "./containers/patients/PatientsTable";
import NetworkTable from "./containers/networks/NetworkTable";
import AddNetworkForm from "./containers/networks/components/AddNetworkForm";
import AddPatientsForm from "./containers/patients/components/AddPatientForm";
import EditPatientForm from "./containers/patients/components/EditPatientForm";

function App() {
  return (
    <div className="App">
      <Dashboard>
        <Router>
          <Hospital path="hospitals" />
          <PatientTable path="patients" />
          <AddPatientsForm path="patients/add" />
          <EditPatientForm path="patients/edit/:id" />
          <NetworkTable path="networks" />
          <AddNetworkForm path="networks/add" />
        </Router>
      </Dashboard>
    </div>
  );
}

export default App;
