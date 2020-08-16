import { Form, Input, Button, Row, Col, InputNumber, Select, Table } from "antd";
import { Redirect } from 'react-router';
// interface Props extends RouteComponentProps {}
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Resizable } from 'react-resizable';
import './Hospital.scss'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function Hospital() {
  const [displayUserForm, setDisaplayForm] = useState(false);
  const { Option } = Select;
  const history = useHistory();
  const handleClick = () => history.push('/addForm');
  
  const handleSubmit = () => { };

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
      actions: <div> <Button type="primary" danger icon={<DeleteOutlined />} style={{ height: '40px', width: '40px', marginLeft: '2px' }}>
      </Button><Button type="primary" className="btnEdit" icon={<EditOutlined />} style={{ height: '40px', width: '40px', marginLeft: '2px' }}>
        </Button></div>,
    },
    {
      key: '2',
      name: 'John',
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
  
  
  function sayHello() {
    
    alert('Hello!');
  }

  return (
      <div>
        <h2 className="hospitalTitle">HOSPITALES</h2>
        <Button type="primary"  onClick={handleClick}>Agregar</Button>
        <br /><br />
        <Table dataSource={dataSource} columns={columns} />
      </div>
  );
}

export default Hospital;
