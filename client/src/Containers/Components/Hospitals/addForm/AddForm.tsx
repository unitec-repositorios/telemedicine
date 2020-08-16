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
    <div>
      <h2 className="hospitalTitle">GODZILLA IS REAL</h2>

      <br /><br />

      <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[
            {
              required: true,
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
  );
}

export default AddForm;
