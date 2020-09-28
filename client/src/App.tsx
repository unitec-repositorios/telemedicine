import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Dashboard from "./containers/dashboard/Dashboard";
import {Router} from "@reach/router";
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
import AddRRACSPS
    from "./containers/referenceCommunityAgentHealthPromoterForm/components/addReferenceCommunityAgentHealthPromoterForm";
import ReferenceTable from "./containers/referenceForm/components/ReferenceTable";
import ReferenceACPSTable
    from "./containers/referenceCommunityAgentHealthPromoterForm/components/referenceCommunityAgentHealthPromoterTable";
import StepsContext, {StepsProvider} from "./contexts/StepsContext";
import {RRForm} from "./containers/referenceForm/referenceFormModels";

function App() {
    return (
        <div className="App">
            <StepsProvider value={{} as RRForm}>
                <Router>
                    <Dashboard path="/">
                        <Hospital path="hospitals"/>
                        <AddHospitalForm path="hospitals/add"/>
                        <EditHospitalForm path="hospitals/edit/:id"/>
                        <PatientsTable path="patients"/>
                        <AddPatientForm path="patients/add"/>
                        <NetworksTable path="networks"/>
                        <EditPatientForm path="patients/edit/:id"/>
                        <AddNetworkForm path="networks/add"/>
                        <EditNetworkForm path="networks/edit/:id"/>
                        <AddRRForm path="referenceForm/add"/>
                        <AddRRACSPS path="referenceACSPSForm/add"/>
                        <ReferenceTable path="referenceForm"/>
                        <ReferenceACPSTable path="referenceACSPSForm"/>
                    </Dashboard>
                </Router>
            </StepsProvider>
        </div>
    );
}

export default App;
