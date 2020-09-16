import React, { useEffect, useState, MouseEventHandler } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps, navigate } from "@reach/router";
import{Reference} from "../referenceFormModels";
import MainTitle from "../../../components/MainTitle";
import {allR} from "../referenceFormService"
import {all} from "../../hospitals/hospitalService"
interface ReferenceProps extends RouteComponentProps {}

interface Table {
	id: number,
	patient: string,
	origin: string,
	destination: string
}

function ReferenceTable(props: ReferenceProps){
    const [reference, setReference] = useState<Reference[]>([]);
		const [table, setTable] = useState<Table[]>([]);

    useEffect(() => {
        (async () => {
          const data = await allR();
					const hospital = await all();

					let newTable:Table[] = [];

					data.forEach(reg => newTable.push({id: reg.id, patient: "prueba", origin: hospital.find(h => h.id === reg.originHfId)?.name||" ", destination: hospital.find(h => h.id === reg.destinationHfId)?.name||" " }));

					setTable(newTable);

        })();
      }, []);
      const columns = [
        {
          title: "Codigo",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Paciente",
          dataIndex: "patient",
          key: "patient",
        },
        {
          title: "Emisor",
          dataIndex: "origin",
          key: "origin",
        },
        {
          title: "Destino", 
          dataIndex: "destination",
          key: "destination",
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
          <Table
            dataSource={table}
            columns={columns}
            rowKey="name"
            locale={{ emptyText: "Sin Informacion." }}
          />
        </div>
      );

}
export default ReferenceTable;
