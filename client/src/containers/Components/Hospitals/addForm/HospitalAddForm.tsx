import React, { useState } from "react";
import { Form, Input, Button, Row, Col, InputNumber, Select, Table, Space, Card } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Resizable } from 'react-resizable';
import './HospitalAddForm.scss'
import { clear } from "console";



function HospitalAddForm() {

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const validateMessages = {
    required: '${label} es requerido!',
    types: {
      email: '${label} no es un email valido!',
      number: '${label} no es un numero valido!',
    },
    number: {
      range: '${label} debe contener un minimo ${min} y un maximo ${max}',
    },
  };


  return (
    
    <Card>
      <div>
        <h2 className="hospitalTitle" style={{ marginBottom: 8 }}>Agregar Hospital</h2>

        

        <Form {...layout} name="nest-messages" id="AddF" validateMessages={validateMessages} >

          <Form.Item
            name={['user', 'establecimiento']}
            label="Nombre del Establecimiento"
            rules={[
              {
                required: true,
              },
              {
                pattern: new RegExp(/^[^-\s\d][a-zA-Z_\s-]+$/i),
                message: "Campo solo debe contener letras",
              }
            ]}

          >
            <Input placeholder="Nombre del establecimiento" />
          </Form.Item>

          <Form.Item
            name={['user', 'red']}
            label="Red"
            rules={[
              {
                required: true,
              },
              {
                pattern: new RegExp(/^[^-\s\d][a-zA-Z_\s-]+$/i),
                message: "Campo solo debe contener letras",
              }
            ]}
          >
            <Input placeholder="Nombre de la red" />
          </Form.Item>


          <Form.Item name={['user', 'direccion']} label="Dirección"
            rules={[
              {
                required: true,
              },
              {
                pattern: new RegExp(/^[^-\s][a-zA-Z_\s-.,0-9]+$/i),
                message: "Campo solo debe contener letras, comas y puntos",
              }
            ]}
          >
            <Input.TextArea placeholder="Dirección" />
          </Form.Item>

          <Row className="containButton">
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
              <Button type="primary" htmlType="submit" >Agregar</Button>
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
              <Button type="default" style={{ marginLeft: "10px"}}>Limpiar</Button>
            </Form.Item>
          </Row>

        </Form>

      </div>
    </Card>
  );
}

export default HospitalAddForm;
