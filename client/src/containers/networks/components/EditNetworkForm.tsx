import React, { useEffect } from "react";
import MainTitle from "../../../components/MainTitle";
import { Button, Form, Input } from "antd";
import { findById, update } from "../networkService";
import { NetworkForm } from "./AddNetworkForm";
import { RouteComponentProps } from "@reach/router";

interface EditNetworkRouteParams {
  id: number;
}

interface EditNetworkFormProps
  extends RouteComponentProps<EditNetworkRouteParams> {}

function EditNetworkForm(props: EditNetworkFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const network = await findById(props.id ?? 1);
      form.setFieldsValue(network);
    })();
  }, []);

  const onFinish = (values: NetworkForm) => {
    (async () => {
      await update({
        city: values.city,
        code: values.code,
        name: values.name,
      });
    })();
  };

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

export default EditNetworkForm;
