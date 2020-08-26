import React, { useEffect, useState, MouseEventHandler } from "react";
import { Button, Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps, navigate } from "@reach/router";

import { Hospital } from "./hospitalModels";
import MainTitle from "../../components/MainTitle";
import { all } from "./hospitalService";

interface HospitalProps extends RouteComponentProps {}

function HospitalTable(props: HospitalProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    (async () => {
      const data = await all();
      setHospitals(data);
    })();
  }, []);

  const onEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    await navigate(`/hospitals/edit/${id}`);
  }

  const onDelete = (id: number) => {
    console.log(id)
    setHospitals(hospitals.filter(currentHospital => currentHospital.id != id))
  }


  const columns = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Colonia",
      dataIndex: "neighborhood",
      key: "neigborhood"
    },
    {
      title: "Municipio",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Departamento",
      dataIndex: "department",
      key: "department"
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: Hospital) =>
       (
        <div>
          {" "}
          <Button
            onClick={onEdit}
            data-id = {record.id}
            type="primary"
            icon={<EditOutlined />}
            style={{ height: "40px", width: "40px", marginLeft: "2px" }}
          />
           <Popconfirm
            placement="top"
            title="¿Está seguro que sea eliminar el registro?"
            onConfirm={() => onDelete(record.id)}
            okText="Si"
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
      <MainTitle>Hospitales</MainTitle>
      <Link to="/hospitals/add">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          Agregar
        </Button>
      </Link>
      <Table dataSource={hospitals} columns={columns} rowKey="name" locale={{emptyText: "Sin Informacion."}}/>
    </div>
  );
}

export default HospitalTable;