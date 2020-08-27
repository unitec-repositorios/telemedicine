import React, { useEffect, useState } from "react";
import MainTitle from "../../../components/MainTitle";
import { Button, Form, Input, Radio, DatePicker, message } from "antd";
import { findById, update, IdNumberExists } from "../patientService";
import { PatientForm } from "./AddPatientForm";
import { Link, RouteComponentProps } from "@reach/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MaskedInput from "antd-mask-input";
import moment from "moment";
import { Patient } from "../patientModels";
import { RuleObject } from "antd/lib/form";
import { StoreValue } from "antd/lib/form/interface";

interface EditPatientRouteParams {
  id: number;
}

interface EditPatientFormProps
  extends RouteComponentProps<EditPatientRouteParams> {}

function EditPatientForm(props: EditPatientFormProps) {
  const [form] = Form.useForm();

  const [currentDate, setCurrentDate] = useState(moment());

  const [patient, setPatient] = useState({} as Patient);

  const dateFormat = "DD-MM-YYYY";

  const validateIdNumber = async (rule: RuleObject, value: StoreValue) => {
    const IdNumber = value;
    const exists = await IdNumberExists(IdNumber);

    if (exists && patient.idNumber !== IdNumber) {
      throw new Error(
        `Ya existe un paciente con ese número de identidad. ${IdNumber}`
      );
    }
  };

  useEffect(() => {
    (async () => {
      const patient = await findById(props.id ?? 1);
      setPatient({ ...patient, dateOfBirth: patient.dateOfBirth.toDate() });
      setCurrentDate(patient.dateOfBirth);
      form.setFieldsValue(patient);
    })();
  }, []);

  const onFinish = (values: PatientForm) => {
    (async () => {
      try {
        await update({
          id: patient.id,
          idNumber: values.idNumber,
          name: values.name,
          firstLastName: values.firstLastName,
          secondLastName: values.secondLastName,
          dateOfBirth: currentDate.toDate(),
          email: values.email,
          gender: values.gender,
          address: values.address,
        });
        message.success("El paciente ha sido editado existosamente");
      } catch (error) {
        message.error("Ocurrió un error al editar el paciente");
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
              pattern: /\d{5}/,
              message: "Número de Identidad incompleto. ",
            },
            {
              required: true,
              message: "Número de Identidad es un campo requerido",
              whitespace: true,
            },
            {
              validator: validateIdNumber,
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
              pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
              message: "Sólo se permiten letras, números, puntos y comas.",
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
              pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
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
              pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
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
          name="dateOfBirth"
          rules={[
            {
              required: true,
              message: "Fecha nacimiento es un campo requerido",
            },
          ]}
        >
          <DatePicker
            name="dateOfBirth"
            placeholder="Ingrese fecha"
            format={dateFormat}
            value={currentDate}
            onChange={(value) => setCurrentDate(value!)}
            disabledDate={(d) =>
              !d || d.isSameOrBefore("1940-01-01") || d.isAfter(moment())
            }
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
              pattern: /^.{8,50}$/g,
              message: "Dirección debe tener mínimo 8 letras y máximo 50.",
            },
            {
              pattern: /^[^\d]/g,
              message: "No puede empezar con un número.",
            },
            {
              pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ.,])+\s?)+([0-9])*$/g,
              message: "No se permiten caracteres especiales.",
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

export default EditPatientForm;
