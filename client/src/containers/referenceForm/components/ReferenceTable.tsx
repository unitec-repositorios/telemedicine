import React, { useEffect, useState, MouseEventHandler } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps, navigate } from "@reach/router";
import{Reference} from "../referenceFormModels";
import MainTitle from "../../../components/MainTitle";
import {allR} from "../referenceFormService"
interface ReferenceProps extends RouteComponentProps {}

function ReferenceTable(props: ReferenceProps){
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
          <MainTitle>Referencia</MainTitle>
          <Link to="/rrform/add">
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
export default ReferenceTable;