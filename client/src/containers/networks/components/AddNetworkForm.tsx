import React from "react";
import { Button, Form, Input, message } from "antd";
import { RouteComponentProps, Link } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { create } from "../networkService";
import { ArrowLeftOutlined } from "@ant-design/icons";
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
    md: {
      span: 16,
      offset: 8,
    },
  },
};

function AddNetworkForm(props: AddNetworkProps) {
  const [form] = Form.useForm();

  const onFinish = (values: NetworkForm) => {
    (async () => {
      try {
        await create({
          name: values.name,
        });
        form.resetFields();
        message.success("La red ha sido creada existosamente");
      } catch (error) {
        message.error("Ocurrió un error al guardar la red");
      }
    })();
  };

  return (
    <>
      <Link to="/networks">
        <Button
          type="primary"
          shape="circle"
          htmlType="submit"
          icon={<ArrowLeftOutlined />}
          style={{ marginLeft: "-20%" }}
        ></Button>
      </Link>
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
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            Guardar
          </Button>
          <Button htmlType="button" onClick={() => form.resetFields()}>
            Reiniciar campo
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddNetworkForm;
