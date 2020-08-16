import React, { useState } from "react";
import { Form, Input, Button, Row, Col, InputNumber, Select, Table } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// interface Props extends RouteComponentProps {}

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Resizable } from 'react-resizable';
import './AddForm.scss'



function AddForm() {
  const [displayUserForm, setDisaplayForm] = useState(false);

  const { Option } = Select;

  const handleSubmit = () => { };

  const dataSource = [
    {
      key: '1',
      name: 'CHRISTOPHER SE LA COME',
      age: 32,
      address: '10 Downing Street',
      actions: <div> <Button type="primary" danger icon={<DeleteOutlined />} style={{ height: '40px', width: '40px', marginLeft: '2px' }}>
      </Button><Button type="primary" className="btnEdit" icon={<EditOutlined />} style={{ height: '40px', width: '40px', marginLeft: '2px' }}>
        </Button></div>,
    },
    {
      key: '2',
      name: 'MW2',
      age: 42,
      address: '10 Downing Street',
      actions: <div> <Button type="primary" danger icon={<DeleteOutlined />} style={{ height: '40px', width: '40px', marginLeft: '2px' }}>
      </Button><Button type="primary" className="btnEdit" icon={<EditOutlined />} style={{ height: '40px', width: '40px', marginLeft: '2px' }}>
        </Button></div>,

    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      actions: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      actions: 'age',

    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      actions: 'address',

    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      actions: 'actions',

    }

  ];
  return (
      <div>
        <h2 className="hospitalTitle">GODZILLA IS REAL</h2>
        <Button type="primary" >Agregar</Button>
        <br /><br />
        <Table dataSource={dataSource} columns={columns} />
      </div>
  );
}

export default AddForm;
