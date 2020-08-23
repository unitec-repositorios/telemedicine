import React from "react";
import { Button, Form, Input } from "antd";
import { RouteComponentProps } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { create, rupsCodeExists } from "../networkService";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";

export interface AddNetworkProps extends RouteComponentProps {}

export interface NetworkForm {
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

function AddNetworkForm(props: AddNetworkProps) {
  const [form] = Form.useForm();

  const onFinish = (values: NetworkForm) => {
    (async () => {
      await create({
        city: values.city,
        code: values.code,
        name: values.name,
      });
    })();
  };

  const validateCode = async (rule: RuleObject, value: StoreValue) => {
    const code = parseInt(value, 10);
    const exists = await rupsCodeExists(code);

    if (exists) {
      throw new Error(`Ya existe una red con el código ${code}`);
    }
  };

  return (
    <>
      <MainTitle>Registrar red</MainTitle>
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
            {
              validator: validateCode,
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

export default AddNetworkForm;
