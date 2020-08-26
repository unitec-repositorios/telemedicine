import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Hospital.scss";
import { Link, navigate, RouteComponentProps } from "@reach/router";
import { Hospital } from "./hospitalModels";
import MainTitle from "../../components/MainTitle";
import { all, DeleteHospital } from "./hospitalService";

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
  };

  const onDeleteElement = async (id: number) => {
    await navigate(`/hospitals`);
    await DeleteHospital(id);
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);



  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Direccion",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: Hospital) => (
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
            title="¿Está seguro que desea eliminar el registro?"
            onConfirm={() => onDeleteElement(record.id)}
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
      <Table
        dataSource={hospitals}
        columns={columns}
        rowKey="name"
        locale={{ emptyText: "Sin información" }}
      />
    </div>
  );
}
  


export default HospitalTable;
