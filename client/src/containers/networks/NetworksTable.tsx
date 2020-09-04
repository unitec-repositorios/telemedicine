import React, { useEffect, useState } from "react";
import { Input, Button, message, Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, navigate, RouteComponentProps } from "@reach/router";

import { Network } from "./networkModels";
import MainTitle from "../../components/MainTitle";
import { all, remove } from "./networkService";

interface NetworkProps extends RouteComponentProps {}

function NetworksTable(props: NetworkProps) {
  const [networks, setNetworks] = useState<Network[]>([]);
	const [filterTable, setFilterTable] = useState<Network[]>([]);

  useEffect(() => {
    (async () => {
      const data = await all();
      setNetworks(data);
    })();
  }, []);

  const onEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    await navigate(`/networks/edit/${id}`);
  };

  const onDelete = async (id: number) => {
    try {
      await remove(id);
      message.info("La red ha sido borrada");
      setNetworks(
        networks.filter((currentNetwork) => currentNetwork.id !== id)
      );
    } catch (error) {
      message.error("Ocurrió un error al borrar la red");
    }
  };

	const onSearch = (value: string) => {
		const filter = networks.filter(o => 
			Object.values(o).some(v =>
				String(v).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterTable(filter);
	}

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (text: string, record: Network) => (
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
      <MainTitle>Redes</MainTitle>
      <Link to="/networks/add">
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
				dataSource={!filterTable.length ? networks : filterTable}
        columns={columns}
        rowKey="name"
        locale={{ emptyText: "Sin información" }}
      />
    </div>
  );
}

export default NetworksTable;
