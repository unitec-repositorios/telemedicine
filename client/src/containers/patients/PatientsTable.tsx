import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link,  navigate, RouteComponentProps } from "@reach/router";

import { Patient } from "./patientModels";
import MainTitle from "../../components/MainTitle";
import { all } from "./patientService";

interface PatientProps extends RouteComponentProps {}

function PatientTable(props: PatientProps) {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    (async () => {
      const data = await all();
      setPatients(data);
    })();
  }, []);

  const onEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    await navigate(`/patients/edit/${id}`);
  };

  const onDelete = (id: number) => {
    console.log(id);
    setPatients(patients.filter((currentPatient) => currentPatient.id !== id));
  };

  const columns = [
    {
      title: "Número de Identidad",
      dataIndex: "idNumber",
      key: "idNumber",
    },
    {
      title: "Número de Expediente",
      dataIndex: "idRecord",
      key: "idRecord",
  },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "Primer Apellido",
        dataIndex: "firstLastName",
        key: "lastName",
    },
    {
      title: "Segundo Apellido",
      dataIndex: "secondLastName",
      key: "secondLastName",
    },
    {
      title: "Fecha de Nacimiento",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Correo electrónico",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Genero",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: Patient) => (
        <div>
          {" "}
          <Button
            onClick={onEdit}
            data-id={record.id}
            type="primary"
            icon={<EditOutlined />}
            style={{ height: "40px", width: "40px", marginLeft: "2px" }}
          />
          <Popconfirm
            placement="top"
            title="¿Está seguro que sea eliminar el registro?"
            onConfirm={() => onDelete(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              data-id={record.id}
              type="primary"
              danger
              icon={<DeleteOutlined />}
              style={{ height: "40px", width: "40px", marginLeft: "2px" }}
            />
          </Popconfirm>
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
      <Table
        dataSource={patients}
        columns={columns}
        rowKey="firstName"
        locale={{ emptyText: "Sin información" }}
        scroll={{ x: 1300}}
      />
    </div>
  );
}

export default PatientTable;
