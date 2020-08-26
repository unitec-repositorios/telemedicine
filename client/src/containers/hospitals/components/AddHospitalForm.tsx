import React from "react";
import { Button, Form, Input, Result } from "antd";
import { RouteComponentProps } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { PostHospital } from "../hospitalService";

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
      await PostHospital({
        name: values.name,
        address: values.address,
      });
      
    })();
    form.resetFields();
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

  const onTest = async (event: React.MouseEvent<HTMLButtonElement>,values: HospitalForm) => {
    await PostHospital({
      name: values.name,
      address: values.address,
    });
  };

  return (
    <>
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
            {
              pattern: new RegExp(/^[^-\s\d][a-zA-Z_\s-]+$/i),
              message: "Campo solo debe contener letras",
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Direccion"
          rules={[
            {
              required: true,
              message: "Direccion es un campo requerido",
              whitespace: true,
            },
            {
              pattern: new RegExp(/^[^-\s\d][0-9a-zA-Z_\s-]+$/i),
              message: "Campo solo debe contener letras y numeros",
            }
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
