import React from "react";
import "./App.css";
import Dashboard from "./containers/dashboard/Dashboard";
import { Router } from "@reach/router";
import Hospital from "./containers/hospitals/HospitalTable";
import AddHospitalForm from "./containers/hospitals/components/AddHospitalForm";
import EditHospitalForm from "./containers/hospitals/components/EditHospitalForm";
import PatientsTable from "./containers/patients/PatientsTable";
import NetworksTable from "./containers/networks/NetworksTable";
import AddNetworkForm from "./containers/networks/components/AddNetworkForm";
import EditNetworkForm from "./containers/networks/components/EditNetworkForm";
import AddPatientForm from "./containers/patients/components/AddPatientForm";
import EditPatientForm from "./containers/patients/components/EditPatientForm";
import AddRRForm from "./containers/referenceForm/components/AddReferenceForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard path="/">
          <Hospital path="hospitals" />
          <AddHospitalForm path="hospitals/add" />
          <EditHospitalForm path="hospitals/edit/:id" />
          <PatientsTable path="patients" />
          <AddPatientForm path="patients/add" />
          <NetworksTable path="networks" />
          <EditPatientForm path="patients/edit/:id" />
          <AddNetworkForm path="networks/add" />
          <EditNetworkForm path="networks/edit/:id" />
          <AddRRForm path="rrform/add" />
        </Dashboard>
      </Router>
    </div>
  );
}

export default App;
