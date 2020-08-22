import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps } from "@reach/router";

import { Network } from "./networkModels";
import MainTitle from "../../components/MainTitle";
import { all } from "./networkService";

interface NetworkProps extends RouteComponentProps {}

function NetworkTable(props: NetworkProps) {
  const [networks, setNetworks] = useState<Network[]>([]);

  useEffect(() => {
    (async () => {
      const data = await all();
      setNetworks(data);
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
      render: (text: string, record: Network) => (
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
      <MainTitle>Redes</MainTitle>
      <Link to="/networks/add">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          Agregar
        </Button>
      </Link>
      <Table dataSource={networks} columns={columns} rowKey="name" />
    </div>
  );
}

export default NetworkTable;
