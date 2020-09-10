import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ReferenceACSPSInformation from "./steps/referenceACSPSInformation";
import { Link } from "@reach/router";

const { Step } = Steps;

const steps = [
  {
    title: "Paciente",
    content: "First-content"
  },
  {
    title: "Establecimiento de Salud",
    content: "Second-Content"
  },
  {
    title: "Diagnostico",
    content: <ReferenceACSPSInformation />
  }
];

function Stepper(props: any) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    let nextVal = current + 1;
    setCurrent(nextVal);
  };

  const prev = () => {
    const prevVal = current - 1;
    setCurrent(prevVal);
  };

  return (
    <>

      <Steps current={current} style={{ marginBottom: "30px" }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      
      <div className="steps-content" >{steps[current].content}</div>
      <div  style={{ marginTop: "20px" }} className="steps-action">
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
