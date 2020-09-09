import React, { useEffect, useState, MouseEventHandler } from "react";
import { Button, Table, Popconfirm, message, Pagination, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps, navigate } from "@reach/router";
import { TableProps } from "antd/lib/table";
import { Hospital } from "./hospitalModels";
import MainTitle from "../../components/MainTitle";
import { all, remove } from "./hospitalService";
import { table } from "console";

interface HospitalProps extends RouteComponentProps {}

function HospitalTable(props: HospitalProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const data = await all();
      setHospitals(data);
      setLoading(false);
    })();
  }, []);

  const onEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    await navigate(`/hospitals/edit/${id}`);
  };

  const onDelete = async (id: number) => {
    try {
      await remove(id);
      message.info("El Hospital ha sido borrado");
      setHospitals(
        hospitals.filter((currentNetwork) => currentNetwork.id !== id)
      );
    } catch (error) {
      message.error("Ocurrió un error al borrar el Hospital");
    }
  };

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
      title: "Departamento",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Municipio",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Red",
      dataIndex: "network",
      key: "network",
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
      <MainTitle>Establecimientos de Salud</MainTitle>
      <Link to="/hospitals/add">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          Agregar
        </Button>
      </Link>
      <Spin spinning={loading}>
        <Table
          dataSource={hospitals}
          pagination={{ defaultPageSize: 10 }}
          columns={columns}
          rowKey="code"
          locale={{ emptyText: "Sin Informacion." }}
        />
      </Spin>
    </div>
  );
}

export default HospitalTable;
