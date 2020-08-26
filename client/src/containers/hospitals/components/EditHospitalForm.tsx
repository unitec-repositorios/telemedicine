import { Button, Form, Input, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RouteComponentProps, Link } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { create, findById, update, rupsCodeExists } from "../hospitalService";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
import React, { useEffect, useState, MouseEventHandler } from "react";
import departmentsLocations from "../../../departmentsLocations";
interface EditHospitalRouterParams {
  id: number;
}

interface EditHospitalProps
  extends RouteComponentProps<EditHospitalRouterParams> {}

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
    throw new Error(`Ya existe un Hospital con el código ${code}`);
  }
};
function EditHospitalForm(props: EditHospitalProps) {
  const [form] = Form.useForm();
  const [department, setDepartment] = useState(
    departmentsLocations.departments[0]
  );
  useEffect(() => {
    (async () => {
      const hospital = await findById(props.id ?? 1);
      form.setFieldsValue(hospital);
    })();
  }, []);

  const onFinish = (values: HospitalForm) => {
    (async () => {
      await update({
        city: values.city,
        code: parseInt(values.code),
        name: values.name,
        neighborhood: values.neighborhood,
        department: values.department,
      });
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
      <MainTitle>Editar Hospital</MainTitle>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
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
              message: "Solo se permiten Numeros.",
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
              message: "Nombre debe tener Minimo 2 letras y maximo 30.",
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
          name="neighborhood"
          label="Colonia"
          rules={[
            {
              pattern: /^.{2,30}$/g,
              message: "Colonia debe tener Minimo 2 letras y maximo 30.",
            },
            {
              pattern: /^(([a-zA-Z])+\s?)+$/g,
              message: "Solo se permiten letras.",
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
              <option key={l.id} value={l.id}>
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
          <Button type="primary" htmlType="submit">
            Editar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default EditHospitalForm;
