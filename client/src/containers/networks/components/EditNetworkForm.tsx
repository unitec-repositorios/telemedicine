import React, { useEffect, useState } from "react";
import MainTitle from "../../../components/MainTitle";
import { Button, Form, Input, message } from "antd";
import { findById, update } from "../networkService";
import { NetworkForm } from "./AddNetworkForm";
import { RouteComponentProps } from "@reach/router";
import { Network } from "../networkModels";

interface EditNetworkRouteParams {
  id: number;
}

interface EditNetworkFormProps
  extends RouteComponentProps<EditNetworkRouteParams> {}

function EditNetworkForm(props: EditNetworkFormProps) {
  const [form] = Form.useForm();
  const [network, setNetwork] = useState({} as Network);

  useEffect(() => {
    (async () => {
      const foundNetwork = await findById(props.id ?? 1);
      setNetwork(foundNetwork);
      form.setFieldsValue(foundNetwork);
    })();
  }, []);

  const onFinish = (values: NetworkForm) => {
    (async () => {
      try {
        await update({
          id: network.id,
          name: values.name,
        });
        message.success("La red ha sido editada existosamente");
      } catch (error) {
        message.error("Ocurrió un error al editar la red");
      }
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
      <MainTitle>Editar red</MainTitle>
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

export default EditNetworkForm;
