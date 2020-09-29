import React, { useEffect, useState } from "react";
import { Button, Input, Table, Popconfirm, message } from "antd";
import { Link, RouteComponentProps, navigate } from "@reach/router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Reference } from "../referenceFormModels";
import MainTitle from "../../../components/MainTitle";
import { allR, remove } from "../referenceFormService"
import { all } from "../../hospitals/hospitalService"
import { all as allPatients } from "../../patients/patientService"

interface ReferenceProps extends RouteComponentProps {
}

interface Table {
    id: number,
    patient: string,
    origin: string,
    destination: string
}

function ReferenceTable(props: ReferenceProps) {
    const [reference, setReference] = useState<Reference[]>([]);
    const [table, setTable] = useState<Table[]>([]);
    const [filterTable, setFilterTable] = useState<Table[]>([]);

    useEffect(() => {
        (async () => {
            const data = await allR();
            const hospital = await all();
            const patients = await allPatients();

            let newTable: Table[] = [];

            data.forEach(reg => newTable.push({
                id: reg.id,
                patient: patients.find(p => p.id === reg.patientId)?.name || " ",
                origin: hospital.find(h => h.id === reg.originHfId)?.name || " ",
                destination: hospital.find(h => h.id === reg.destinationHfId)?.name || " "
            }));

            setTable(newTable);

        })();
    }, []);

    const onSearch = (value: string) => {
        const filter = table.filter(o =>
            Object.values(o).some(v =>
                String(v).toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilterTable(filter);
    }

    const onDelete = async (id: number) => {
        try {
            await remove(id);
						setTable(
							table.filter((ref) => ref.id !== id)
						);
            message.info("La referencia ha sido borrada");

        } catch (error) {
            message.error("Ocurrió un error al borrar la referencia");
        }
    };

    const onEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.dataset.id;
        await navigate(`/referenceForm/edit/${id}`);
    };

    const columns = [
        {
            title: "Codigo",
            dataIndex: "id",
            key: "id",
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: "Paciente",
            dataIndex: "patient",
            key: "patient",
            sorter: (a: any, b: any) => a.patient.localeCompare(b.patient),
        },
        {
            title: "Emisor",
            dataIndex: "origin",
            key: "origin",
            sorter: (a: any, b: any) => a.origin.localeCompare(b.origin),
        },
        {
            title: "Destino",
            dataIndex: "destination",
            key: "destination",
            sorter: (a: any, b: any) => a.destination.localeCompare(b.destination),
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            key: "actions",
            render: (text: string, record: Table) => (
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
        }
    ]
    return (
        <div>
            <MainTitle>Referencia Respuesta</MainTitle>
            <Link to="/referenceForm/add">
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
                dataSource={!filterTable.length ? table : filterTable}
                columns={columns}
                rowKey="name"
                locale={{ emptyText: "Sin Informacion." }}
            />
        </div>
    );

}

export default ReferenceTable;
