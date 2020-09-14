import React, { useEffect, useState, MouseEventHandler } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { Link, RouteComponentProps, navigate } from "@reach/router";
import{Reference} from "../referenceCommunityAgentHealthPromoterModel";
import MainTitle from "../../../components/MainTitle";
import {allR} from "../referenceCommunityAgentHealthPromoterService"
interface ReferenceProps extends RouteComponentProps {}

function ReferenceACPSTable(props: ReferenceProps){
    const [reference, setReference] = useState<Reference[]>([]);
    useEffect(() => {
        (async () => {
          const data = await allR();
          setReference(data);
        })();
      }, []);
      const columns = [
        {
          title: "Codigo",
          dataIndex: "code",
          key: "code",
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
          <MainTitle>Referencia Agente Comunitario - Promotor de Salud</MainTitle>
          <Link to="/referenceACSPSForm/add">
            <Button type="primary" style={{ marginBottom: "20px" }}>
              Agregar
            </Button>
          </Link>
          <Table
            dataSource={reference}
            columns={columns}
            rowKey="name"
            locale={{ emptyText: "Sin Informacion." }}
          />
        </div>
      );

}
export default ReferenceACPSTable;