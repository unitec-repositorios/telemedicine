import React, { useEffect } from "react";
import MainTitle from "../../../components/MainTitle";
import { Button, Form, Input, Radio, DatePicker } from "antd";
import { findById, update } from "../patientService";
import { PatientForm } from "./AddPatientForm";
import { Link, RouteComponentProps } from "@reach/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MaskedInput from "antd-mask-input";
import moment from "moment";

interface EditPatientRouteParams {
  id: number;
}

interface EditPatientFormProps
  extends RouteComponentProps<EditPatientRouteParams> {}

function EditPatientForm(props: EditPatientFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const patient = await findById(props.id ?? 1);
      form.setFieldsValue(patient);
    })();
  }, []);

  const onFinish = (values: PatientForm) => {
    (async () => {
      await update({
        idNumber: values.idNumber,
        name: values.name,
        firstLastName: values.firstLastName,
        secondLastName: values.secondLastName,
        dateOfBirth: moment(values.dateOfBirth).toDate(),
        email: values.email,
        gender: values.gender,
        address: values.address,
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
      <Link to="/patients">
        <Button
          type="primary"
          shape="circle"
          htmlType="submit"
          icon={<ArrowLeftOutlined />}
          style={{ marginLeft: "-20%" }}
        ></Button>
      </Link>
      <MainTitle>Editar paciente</MainTitle>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="idNumber"
          label="Número de Identidad"
          rules={[
            {
              pattern: /\d{13}/,
              message: "Número de Identidad incompleto. ",
            },
            {
              required: true,
              message: "Número de Identidad es un campo requerido",
              whitespace: true,
            },
          ]}
        >
          <MaskedInput mask="1111 1111 11111" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              pattern: /^.{2,30}$/g,
              message: "Nombre debe tener mínimo 2 letras y máximo 30.",
            },
            {
              pattern: /^(([a-zA-Z])+\s?)+$/g,
              message: "Sólo se permiten letras.",
            },
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
          name="firstLastName"
          label="Primer Apellido"
          rules={[
            {
              pattern: /^.{2,30}$/g,
              message: "Apellido debe tener mínimo 2 letras y máximo 30.",
            },
            {
              pattern: /^(([a-zA-Z])+\s?)+$/g,
              message: "Solo se permiten letras.",
            },
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
          name="secondLastName"
          label="Segundo Apellido"
          rules={[
            {
              pattern: /^.{2,30}$/g,
              message:
                "Segundo apellido debe tener mínimo 2 letras y máximo 30.",
            },
            {
              pattern: /^(([a-zA-Z])+\s?)+$/g,
              message: "Solo se permiten letras.",
            },
            {
              required: true,
              message: "Segundo apellido es un campo requerido",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Fecha Nacimiento"
          rules={[
            {
              required: true,
              message: "Fecha nacimiento es un campo requerido",
            },
          ]}
        >
          <DatePicker
            name="dateOfBirth"
            defaultValue={moment("15-01-1995", "DD-MM-YYYY")}
            format={"DD-MM-YYYY"}
            placeholder="Ingrese fecha"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo electrónico"
          rules={[
            {
              required: true,
              message: "Correo electrónico es un campo requerido",
              whitespace: true,
            },
            {
              type: "email",
              message: "Correo debe estar en formato: ejemplo@ejemplo.com",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Género"
          rules={[
            {
              required: true,
              message: "Género es un campo requerido",
              whitespace: true,
            },
          ]}
        >
          <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="Femenino">Femenino</Radio.Button>
            <Radio.Button value="Masculino">Masculino</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="address"
          label="Dirección"
          rules={[
            {
              pattern: /^.{10,50}$/g,
              message: "Dirección debe tener mínimo 10 letras y máximo 50.",
            },
            {
              pattern: /^(([a-zA-Z])+\s?)+$/g,
              message: "Solo se permiten letras.",
            },
            {
              required: true,
              message: "Dirección es un campo requerido",
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

export default EditPatientForm;
