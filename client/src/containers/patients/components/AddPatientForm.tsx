import React from "react";
import { Button, Form, Input } from "antd";
import { Link, RouteComponentProps } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { create } from "../patientService";
import { ArrowLeftOutlined } from "@ant-design/icons";

export interface AddPatientProps extends RouteComponentProps {}

export interface PatientForm {
  [key: string]: string;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 8 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function AddPatientForm(props: AddPatientProps) {
  const [form] = Form.useForm();

  const onFinish = (values: PatientForm) => {
    (async () => {
      await create({
        code: values.code,
        firstName: values.firstName,
        lastName : values.secondName,
      });
    })();
  };

  return (
    <>
    <Link to="/patients">
      <Button type="primary" shape="circle"  htmlType="submit" icon={<ArrowLeftOutlined />}  style={{marginLeft: '-20%'}}>           
      </Button>
      </Link>
      <MainTitle>Registrar paciente</MainTitle>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="firstName"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Nombre es un campo requerido",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="Código"
          rules={[
            {
              required: true,
              message: "Código es un campo requerido",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Apellido"
          rules={[
            {
              required: true,
              message: "Apellido es un campo requerido",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddPatientForm;
