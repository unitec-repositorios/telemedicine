import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RouteComponentProps, Link } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { create, rupsCodeExists } from "../hospitalService";
import departmentsLocations from "../../../departmentsLocations";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
export interface AddHospitalProps extends RouteComponentProps { }

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
const validateCode = async (rule: RuleObject, value: StoreValue) => {
  const code = parseInt(value, 10);
  const exists = await rupsCodeExists(code);

  if (exists) {
    throw new Error(`Ya existe un hospital con el código ${code}`);
  }
};

function AddHospitalForm(props: AddHospitalProps) {
  const [form] = Form.useForm();
  const [department, setDepartment] = useState(
    departmentsLocations.departments[0]
  );

  const onFinish = (values: HospitalForm) => {
    (async () => {
      try {
        await create({
          code: parseInt(values.code),
          name: values.name,
          neighborhood: values.neighborhood,
          department:
            departmentsLocations.departments[parseInt(values.department) - 1]
              .name,
          city:
            departmentsLocations.departments[parseInt(values.department) - 1]
              .cities[parseInt(values.city) - 1].name,
        });
        form.resetFields();
        message.success("El hospital ha sido creado existosamente.");
      } catch (error) {
        message.error("Ocurrió un error al guardar el hospital.");
      }
    })();
  };

  return (
    <>
      <Link to="/hospitals">
        <Button
          type="primary"
          shape="circle"
          htmlType="submit"
          icon={<ArrowLeftOutlined />}
          style={{ marginLeft: "-20%" }}
        ></Button>
      </Link>
      <MainTitle>Registrar Hospital</MainTitle>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        id="form-register"
      >
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
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
            {
              validator: validateCode,
            },
          ]}
        >
          <Input />
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
          name="neighborhood"
          label="Colonia"
          rules={[
            {
              pattern: /^.{5,30}$/g,
              message: "Colonia debe tener mínimo 5 letras y máximo 30.",
            },
            {
              pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ.,])+\s?)+([0-9])*$/g,
              message: "Sólo se permiten letras, números, puntos y comas.",
            },
            {
              required: true,
              message: "Colonia es un campo requerido",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="department"
          label="Departamento"
          rules={[
            {
              required: true,
              message: "Departamento es un campo requerido",
            },
          ]}
        >
          <Select
            onSelect={(value) =>
              setDepartment(
                departmentsLocations.departments.find((d) => d.id === value) ||
                departmentsLocations.departments[0]
              )
            }
          >
            {departmentsLocations.departments.map((l: any) => (
              <option key={l.id} value={l.id} label={l.name}>
                {l.name}
              </option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="city"
          label="Municipio"
          rules={[
            {
              required: true,
              message: "Municipio es un campo requerido",
            },
          ]}
        >
          <Select>
            {department.cities.map((l: any) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </Select>
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
            Reiniciar campos
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddHospitalForm;
