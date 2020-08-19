import React, { useState } from "react";
import { Form, Input, Button, Row, Col, InputNumber, Select, Table, Card } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// interface Props extends RouteComponentProps {}

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Resizable } from 'react-resizable';
import './HospitalEditForm.scss'



function HospitalEditForm() {

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };




  return (
    
    <Card>
      <div>  
        <h2 className="hospitalTitle" style={{ marginBottom: 8 }}>Editar Hospital</h2>

        <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
          <Form.Item
            name={['user', 'name']}
            label="Name"
            rules={[
              {
                required: true,
                pattern: new RegExp (/^[a-zA-Z]+$/i),
                message: "Campo solo debe contener letras",
                min: 3,
                max: 20,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'age']}
            label="Age"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={['user', 'website']} label="Website">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'introduction']} label="Introduction">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
          </Button>
          </Form.Item>
        </Form>

      </div>
    </Card>
  );
}

export default HospitalEditForm;