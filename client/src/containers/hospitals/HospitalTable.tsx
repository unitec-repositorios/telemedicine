import React, { useEffect, useState, MouseEventHandler } from "react";
import { Input, Button, Table, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps, navigate } from "@reach/router";

import { Hospital } from "./hospitalModels";
import MainTitle from "../../components/MainTitle";
import { all, remove } from "./hospitalService";

interface HospitalProps extends RouteComponentProps {}

function HospitalTable(props: HospitalProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [filterTable, setFilterTable] = useState<Hospital[]>([]);

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

	const onSearch = (value: string) => {
		const filter = hospitals.filter(o => 
			Object.values(o).some(v =>
				String(v).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterTable(filter);
	}

  const columns = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
			sorter: (a:any, b:any) => a.code - b.code,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
			sorter: (a:any, b:any) => a.name.localeCompare(b.name),
    },
    {
      title: "Colonia",
      dataIndex: "neighborhood",
      key: "neighborhood",
			sorter: (a:any, b:any) => a.neighborhood.localeCompare(b.neighborhood),
    },
    {
      title: "Municipio",
      dataIndex: "city",
      key: "city",
			sorter: (a:any, b:any) => a.city.localeCompare(b.city),
    },
    {
      title: "Departamento",
      dataIndex: "department",
      key: "department",
			sorter: (a:any, b:any) => a.department.localeCompare(b.department),
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
      <MainTitle>Hospitales</MainTitle>
      <Link to="/hospitals/add">
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
				dataSource={!filterTable.length ? hospitals: filterTable}
        columns={columns}
        rowKey="name"
        locale={{ emptyText: "Sin Informacion." }}
      />
    </div>
  );
}

export default HospitalTable;
