import React, { useState } from "react";
import { Steps, Button } from "antd";
import ReferenceInformation from "./steps/ReferenceInformation";
import HospitalSearching from "./steps/HospitalSearching";
import { RRForm } from "./../referenceFormModels";
import PatientReference from "./steps/PatientReference";
import PatientReference from "./steps/PatientReference";

const { Step } = Steps;

function Stepper(props: any) {
  const [current, setCurrent] = useState(0);
  const [reference, setReference] = useState({} as RRForm);
  const changeCurrent = (current: number) => {
    setCurrent(current);
  };

  const originHandler = (originHfId: number) => {
    setReference({ ...reference, originHfId });
  };

  const destinationHandler = (destinationHfId: number) => {
    setReference({ ...reference, destinationHfId });
  };

  const institutionHandler = (institution: string) => {
    setReference({ ...reference, institution });
  };

  const next = () => {
    let nextVal = current + 1;
    setCurrent(nextVal);
  };

  const prev = () => {
    const prevVal = current - 1;
    setCurrent(prevVal);
  };

  const steps = [
    {
      title: "Paciente",
      content: (
        <PatientReference current={current} changeCurrent={changeCurrent} />
      ),
    },
    {
      title: "Establecimiento de Salud",
      content: (
        <HospitalSearching
          onOrigin={originHandler}
          onDestination={destinationHandler}
          onInstitution={institutionHandler}
          length={3}
          current={current}
          changeCurrent={changeCurrent}
        />
      ),
    },
    {
      title: "Diagnostico",
      content: (
        <ReferenceInformation
          length={3}
          current={current}
          changeCurrent={changeCurrent}
          referenceState={reference}
        />
      ),
    },
  ];

  return (
    <>
      <Steps current={current} style={{ marginBottom: "30px" }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className="steps-content">{steps[current].content}</div>
      <div style={{ marginTop: "20px" }} className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Siguiente
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Anterior
          </Button>
        )}
      </div>
    </>
  );
}

export default Stepper;
