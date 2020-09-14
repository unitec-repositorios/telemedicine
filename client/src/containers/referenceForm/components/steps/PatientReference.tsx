import { Spin } from "antd";
import Select from "antd/lib/select";
import React, { useState } from "react";
import { Patient } from "../../../patients/patientModels";

export default function PatientReference() {
  const { Option } = Select;

  const [fetching, setFetching] = useState(true);
  const [patients, setPatients] = useState([] as Patient[]);

  const fetPatient = (value: string) => {};

  const handleChange = () => {};

  return (
    <>
      <Select
        mode="multiple"
        labelInValue
        value={patients.map((d) => d.name)}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={fetPatient}
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        {patients.map((d) => (
          <Option
            key={d.idNumber}
            value={d.name}
          >{`${d.name} ${d.firstLastName}`}</Option>
        ))}
      </Select>
    </>
  );
}
