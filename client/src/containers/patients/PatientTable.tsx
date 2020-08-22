import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps } from "@reach/router";

import { Patient } from "./patientModels";
import MainTitle from "../../components/MainTitle";
import { all } from "./patientService";

interface PatientProps extends RouteComponentProps {}

function PatientTable(props: PatientProps) {
  const [patients, setNetworks] = useState<Patient[]>([]);

  useEffect(() => {
    (async () => {
      const data = await all();
      setNetworks(data);
    })();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
        title: "Apellido",
        dataIndex: "lastName",
        key: "lastName",
    },
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: Patient) => (
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
            icon={<EditOutlined />}
            style={{ height: "40px", width: "40px", marginLeft: "2px" }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <MainTitle>Pacientes</MainTitle>
      <Link to="/patients/add">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          Agregar
        </Button>
      </Link>
      <Table dataSource={patients} columns={columns} rowKey="name" />
    </div>
  );
}

export default PatientTable;
