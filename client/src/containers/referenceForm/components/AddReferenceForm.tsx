import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import ReferenceInformation from "./steps/ReferenceInformation";

const { Step } = Steps;

function Stepper(props: any) {
  const [current, setCurrent] = useState(0);

  const changeCurrent = (current: number) => {
    setCurrent(current);
  };

  const steps = [
    {
      title: "Paciente",
      content: "First-Content"
    },
    {
      title: "Establecimiento de Salud",
      content: "Second-Content"
    },
    {
      title: "Diagnostico",
      content: <ReferenceInformation
        length={3}
        current={current}
        changeCurrent={changeCurrent}
      />
    }
  ];

  return (
    <>
      <Steps current={current} style={{ marginBottom: "30px" }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className="steps-content" >{steps[current].content}</div>
    </>
  );
}

export default Stepper;
