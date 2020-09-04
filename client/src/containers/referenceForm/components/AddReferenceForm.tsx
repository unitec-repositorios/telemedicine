import React, { useState } from "react";
import "antd/dist/antd.css";
import { Steps, Button, message } from "antd";
import ReferenceInformation from "./steps/ReferenceInformation";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: <ReferenceInformation />
  },
  {
    title: "Second",
    content: "Second-content"
  },
  {
    title: "Last",
    content: "Here-content"
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
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
}

export default Stepper;
