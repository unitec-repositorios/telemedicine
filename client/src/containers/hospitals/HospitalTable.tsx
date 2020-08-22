import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps } from "@reach/router";

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

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Municipio",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: Hospital) => (
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
      <MainTitle>Hospitales</MainTitle>
      <Link to="/hospitals/add">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          Agregar
        </Button>
      </Link>
      <Table dataSource={hospitals} columns={columns} rowKey="name" />
    </div>
  );
}

export default HospitalTable;