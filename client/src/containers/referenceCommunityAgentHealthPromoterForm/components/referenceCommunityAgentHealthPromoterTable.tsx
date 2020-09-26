import React, { useEffect, useState, MouseEventHandler } from "react";
import { Input, Button, Table, Popconfirm, message } from "antd";
import { Link, RouteComponentProps, navigate } from "@reach/router";
import{Reference} from "../referenceCommunityAgentHealthPromoterModel";
import MainTitle from "../../../components/MainTitle";
import {allR} from "../referenceCommunityAgentHealthPromoterService"
import {all} from "../../hospitals/hospitalService"
import {all as allPatients} from "../../patients/patientService"
interface ReferenceProps extends RouteComponentProps {}

interface Table {
	id: number,
	patient: string,
	origin: string,
	destination: string
}

function ReferenceACPSTable(props: ReferenceProps){
    const [reference, setReference] = useState<Reference[]>([]);
		const [table, setTable] = useState<Table[]>([]);
		const [filterTable, setFilterTable] = useState<Table[]>([]);

    useEffect(() => {
        (async () => {
          const data = await allR();
					const hospital = await all();
					const patients = await allPatients();
					
					let newTable:Table[] = [];

					data.forEach(reg => newTable.push({id: reg.id, patient: patients.find(p => p.id === reg.patientId)?.name||" ", origin: hospital.find(h => h.id === reg.originHfId)?.name||" ", destination: hospital.find(h => h.id === reg.destinationHfId)?.name||" " }));

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

      const columns = [
        {
          title: "Codigo",
          dataIndex: "id",
          key: "id",
					sorter: (a:any, b:any) => a.id - b.id,
        },
        {
          title: "Paciente",
          dataIndex: "patient",
          key: "patient",
					sorter: (a:any, b:any) => a.patient.localeCompare(b.patient),
        },
        {
          title: "Emisor",
          dataIndex: "origin",
          key: "origin",
					sorter: (a:any, b:any) => a.origin.localeCompare(b.origin),
        },
        {
          title: "Destino", 
          dataIndex: "destination",
          key: "destination",
					sorter: (a:any, b:any) => a.destination.localeCompare(b.destination),
        }
      ]
      return (
        <div>
          <MainTitle>Referencia Agente Comunitario - Promotor de Salud</MainTitle>
          <Link to="/referenceACSPSForm/add">
            <Button type="primary" style={{ marginBottom: "20px" }}>
              Agregar
            </Button>
          </Link>
											<Input.Search
				style={{ marginLeft: "30%", width: "30%" }}
        placeholder="Buscar"
        enterButton
				onSearch={onSearch}
			/>
          <Table
            dataSource={!filterTable.length ? table: filterTable}
            columns={columns}
            rowKey="name"
            locale={{ emptyText: "Sin Informacion." }}
          />
        </div>
      );

}
export default ReferenceACPSTable;
