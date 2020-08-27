import { Button, Form, Input, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RouteComponentProps, Link } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { findById, update, rupsCodeExists } from "../hospitalService";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
import React, { useEffect, useState } from "react";
import departmentsLocations from "../../../departmentsLocations";
import { Hospital } from "../hospitalModels";
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

const { Option } = Select;

function EditHospitalForm(props: EditHospitalProps) {
  const [form] = Form.useForm();

  const [department, setDepartment] = useState(
    departmentsLocations.departments[0]
  );

  const [currentHospital, setCurrentHospital] = useState({} as Hospital);

  useEffect(() => {
    (async () => {
      const hospital = await findById(props.id ?? 1);
      setCurrentHospital(hospital);
      form.setFieldsValue(hospital);
    })();
  }, []);

  const validateCode = async (rule: RuleObject, value: StoreValue) => {
    const code = parseInt(value, 10);
    const exists = await rupsCodeExists(code);

    if (exists && currentHospital.code !== code) {
      throw new Error(`Ya existe un Hospital con el código ${code}`);
    }
  };

  const onFinish = (values: HospitalForm) => {
    (async () => {
      try {
        await update({
          id: currentHospital.id,
          code: parseInt(values.code),
          name: values.name,
          neighborhood: values.neighborhood,
          department: currentHospital.department,
          city: currentHospital.city,
        });
        message.success("El Hospital ha sido editado existosamente.");
      } catch (error) {
        message.error("Ocurrió un error al editar el Hospital.");
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
        />
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
            onSelect={(value) => {
              const selectedDepartment =
                departmentsLocations.departments.find((d) => d.id === value) ||
                departmentsLocations.departments[0];

              setDepartment(selectedDepartment);

              setCurrentHospital({
                ...currentHospital,
                department: selectedDepartment.name,
              });

              form.resetFields(["city"]);
            }}
          >
            {departmentsLocations.departments.map((l: any) => (
              <Option key={l.name} value={l.id}>
                {l.name}
              </Option>
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
          <Select
            onSelect={(value) => {
              setCurrentHospital({
                ...currentHospital,
                city: department.cities.find((x) => x.id === value)!.name,
              });
            }}
          >
            {department.cities.map((l: any) => (
              <Option key={l.name} value={l.id}>
                {l.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Editar
          </Button>
          <Button htmlType="button" onClick={() => form.resetFields()}>
            Reiniciar campos
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default EditHospitalForm;
