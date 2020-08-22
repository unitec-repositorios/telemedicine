import React from "react";
import { Button, Form, Input,  } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RouteComponentProps, Link } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { create } from "../hospitalService";


export interface AddHospitalProps extends RouteComponentProps {}

export interface HospitalForm {
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

function AddHospitalForm(props: AddHospitalProps) {
  const [form] = Form.useForm();

  const onFinish = (values: HospitalForm) => {
    (async () => {
      await create({
        city: values.city,
        code: values.code,
        name: values.name,
      });
    })();
  };

  return (
    <>
      <Link to="/hospitals">
      <Button type="primary" shape="circle"  htmlType="submit" icon={<ArrowLeftOutlined />}  style={{marginLeft: '-20%'}}>           
      </Button>
      </Link>
      <MainTitle>Registrar Hospital</MainTitle>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="name"
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
          name="city"
          label="Municipio"
          rules={[
            {
              required: true,
              message: "Municipio es un campo requerido",
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

export default AddHospitalForm;