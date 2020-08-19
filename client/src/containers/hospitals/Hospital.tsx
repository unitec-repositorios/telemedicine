import React from "react";
import { Button, Table } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Hospital.scss";
import { RouteComponentProps } from "@reach/router";

interface HospitalProps extends RouteComponentProps {}

function Hospital(props: HospitalProps) {
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
          />
          <Button
            type="primary"
            className="btnEdit"
            icon={<EditOutlined />}
            style={{ height: "40px", width: "40px", marginLeft: "2px" }}
          />
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
          />
          <Button
            type="primary"
            className="btnEdit"
            icon={<EditOutlined />}
            style={{ height: "40px", width: "40px", marginLeft: "2px" }}
          />
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
      <h2 className="hospitalTitle">HOSPITALES</h2>
      <Button type="primary">Agregar</Button>
      <br />
      <br />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default Hospital;
