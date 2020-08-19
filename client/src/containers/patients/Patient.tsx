import React, { useState } from "react";
import { Button, Select, Table } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Patient.scss";
import { RouteComponentProps } from "@reach/router";

interface PatientProps extends RouteComponentProps {}

function Patient(props: PatientProps) {
  const [displayUserForm, setDisaplayForm] = useState(false);

  const { Option } = Select;

  const handleSubmit = () => {};

  const deleteRow = () => {
    // <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //           <a>Delete</a>
    // </Popconfirm>
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
      actions: (
        <div>
          {" "}
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            style={{ height: "40px", width: "40px", marginLeft: "2px" }}
            onClick={deleteRow}
          ></Button>
          <Button
            type="primary"
            className="btnEdit"
            icon={<EditOutlined />}
            style={{ height: "40px", width: "40px", marginLeft: "2px" }}
          ></Button>
        </div>
      ),
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      actions: (
        <div>
          {" "}
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            style={{ height: "40px", width: "40px", marginLeft: "2px" }}
          ></Button>
          <Button
            type="primary"
            className="btnEdit"
            icon={<EditOutlined />}
            style={{ height: "40px", width: "40px", marginLeft: "2px" }}
          ></Button>
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      actions: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      actions: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      actions: "address",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      actions: "actions",
    },
  ];
  return (
    <div>
      <h2 className="patientTitle">PACIENTES</h2>
      <Button type="primary">Agregar</Button>
      <br />
      <br />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default Patient;