import React, { useEffect, useState } from "react";
import { Input, Button, Popconfirm, Table, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, navigate, RouteComponentProps } from "@reach/router";
import { ColumnType } from "antd/lib/table/interface";

import { Patient } from "./patientModels";
import MainTitle from "../../components/MainTitle";
import { all, remove } from "./patientService";

interface PatientProps extends RouteComponentProps {}

function PatientTable(props: PatientProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
	const [filterTable, setFilterTable] = useState<Patient[]>([]);

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

  const onDelete = async (id: number) => {
    try {
      await remove(id);
      message.info("El paciente ha sido borrado.");
      setPatients(
        patients.filter((currentPatients) => currentPatients.id !== id)
      );
    } catch (error) {
      message.error("Ocurrió un error al borrar el paciente. ");
    }
  };

	const onSearch = (value: string) => {
		const filter = patients.filter(o => 
			Object.values(o).some(v =>
				String(v).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterTable(filter);
	}

  const columns: ColumnType<Patient>[] = [
    {
      title: "Número de Identidad",
      dataIndex: "idNumber",
      key: "idNumber",
      width: 150,
			sorter: (a:any, b:any) => a.idNumber.localeCompare(b.idNumber),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
			sorter: (a:any, b:any) => a.name.localeCompare(b.name),
    },
    {
      title: "Primer Apellido",
      dataIndex: "firstLastName",
      key: "lastName",
			sorter: (a:any, b:any) => a.firstLastName.localeCompare(b.firstLastName),
    },
    {
      title: "Segundo Apellido",
      dataIndex: "secondLastName",
      key: "secondLastName",
			sorter: (a:any, b:any) => a.secondLastName.localeCompare(b.secondLastName),
    },
    {
      title: "Fecha de Nacimiento",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
			sorter: (a:any, b:any) => a.dateOfBirth.localeCompare(b.dateOfBirth),
      render(text: string, record: Patient) {
        return (
          <div>
            {`${record.dateOfBirth.getDate().toString().padStart(2, "0")}-${(
              record.dateOfBirth.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${record.dateOfBirth.getFullYear()}`}
          </div>
        );
      },
    },
    {
      title: "Correo electrónico",
      dataIndex: "email",
      key: "email",
      width: 200,
			sorter: (a:any, b:any) => a.email.localeCompare(b.email),
    },
    {
      title: "Género",
      dataIndex: "gender",
      key: "gender",
			sorter: (a:any, b:any) => a.gender.localeCompare(b.gender),
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
      width: 200,
			sorter: (a:any, b:any) => a.address.localeCompare(b.address),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      render: (text: string, record: Patient) => (
        <div>
          <Space size={0}>
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
          </Space>
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
			<Input.Search
				style={{ margin: "0 0 10px 600px", width: "400px" }}
        placeholder="Buscar"
        enterButton
				onSearch={onSearch}
			/>
      <Table
				dataSource={!filterTable.length ? patients : filterTable}
        columns={columns}
        rowKey="firstName"
        locale={{ emptyText: "Sin información" }}
        scroll={{ x: 1300 }}
      />
    </div>
  );
}

export default PatientTable;
