import React from "react";
import "./App.css";
import Dashboard from "./containers/dashboard/Dashboard";
import { Router } from "@reach/router";
import HospitalTable from "./containers/hospitals/HospitalTable";
import AddHospitalForm from "./containers/hospitals/components/AddHospitalForm";
import EditHospitalForm from "./containers/hospitals/components/EditHospitalForm"
import Patient from "./containers/patients/Patient";
import NetworksTable from "./containers/networks/NetworksTable";
import AddNetworkForm from "./containers/networks/components/AddNetworkForm";
import EditNetworkForm from "./containers/networks/components/EditNetworkForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard path="/">
          <HospitalTable path="hospitals" />
          <AddHospitalForm path="hospitals/add" />
          <EditHospitalForm path="hospitals/edit/:id" />
          <Patient path="patients" />
          <NetworksTable path="networks" />
          <AddNetworkForm path="networks/add" />
          <EditNetworkForm path="networks/edit/:id" />
        </Dashboard>
      </Router>
    </div>
  );
}

export default App;
