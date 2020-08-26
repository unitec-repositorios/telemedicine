import React, { useEffect } from "react";
import MainTitle from "../../../components/MainTitle";
import { Button, Form, Input } from "antd";
import { findById, edit } from "../hospitalService";
import { HospitalForm } from "./AddHospitalForm";
import { RouteComponentProps } from "@reach/router";



interface EditHospitalRouteParams {
  id: number;
}

interface EditHospitalFormProps
  extends RouteComponentProps<EditHospitalRouteParams> {}

function EditHospitalForm(props: EditHospitalFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const hospital = await findById(props.id ?? 1);
      form.setFieldsValue(hospital);
    })();
  }, []);

  const onFinish = (values: HospitalForm) => {
    (async () => {
      await edit(props.id ?? 1,{ name: values.name, address: values.address,});
      form.resetFields();
    })();
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
      <MainTitle>Editar Hospital</MainTitle>
      <Form
        {...formItemLayout}
        form={form}
        name="edit"
        onFinish={onFinish}
        scrollToFirstError
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
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

export default EditHospitalForm;
