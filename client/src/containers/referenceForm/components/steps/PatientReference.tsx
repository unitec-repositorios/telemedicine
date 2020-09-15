import { Button, Divider, Form, Input, Spin } from "antd";
import MaskedInput from "antd-mask-input/build/main/lib/MaskedInput";
import TextArea from "antd/lib/input/TextArea";
import Select from "antd/lib/select";
import React, { useState } from "react";
import { Patient } from "../../../patients/patientModels";

export default function PatientReference(props: any) {
  const { Option } = Select;
  const { current, setCurrent } = props;
  const [fetching, setFetching] = useState(true);
  const [patients, setPatients] = useState([] as Patient[]);
  const [form] = Form.useForm();
  const fetPatient = (value: string) => {};

  const handleChange = () => {};

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

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        // onFinish={onFinish}
        scrollToFirstError
      >
        <Divider orientation="left">Paciente</Divider>
        <Form.Item label="Nombre Paciente" required>
          <Select
            mode="multiple"
            labelInValue
            value={patients.map((d) => d.name)}
            placeholder="Seleccionar paciente"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={fetPatient}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            {patients.map((d) => (
              <Option
                key={d.idNumber}
                value={d.name}
              >{`${d.name} ${d.firstLastName}`}</Option>
            ))}
          </Select>
        </Form.Item>
        <Divider orientation="left">Acompañante</Divider>
        <Form.Item
          name="name"
          label="Primer nombre"
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
          name="lastName"
          label="Primer apellido"
          rules={[
            {
              pattern: /^.{2,30}$/g,
              message:
                "Primer apellido debe tener mínimo 2 letras y máximo 30.",
            },
            {
              pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
              message: "Sólo se permiten letras.",
            },
            {
              required: true,
              message: "Primer apellido es un campo requerido",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Número de Teléfono"
          rules={[
            {
              pattern: /-\d{4}/,
              message: "Número de teléfono incompleto. ",
            },
            {
              required: true,
              message: "Número de teléfono es requerido.",
            },
          ]}
        >
          <MaskedInput mask="+(111) 1111-1111" />
        </Form.Item>
        <Form.Item
          name="relationShip"
          label="Parentesco"
          rules={[
            {
              required: true,
              message: "Parentesco es un campo requerido",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Selecciona tipo parentesco."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Padre o Madre">Padre o Madre</Option>
            <Option value="Hijo">Hijo</Option>
            <Option value="Abuelo">Abuelo</Option>
            <Option value="Hermano">Hermano</Option>
            <Option value="Nieto">Nieto</Option>
            <Option value="Tío">Tío</Option>
            <Option value="Primo">Primo</Option>
            <Option value="Sobrino">Sobrino</Option>
            <Option value="Suegro">Suegro</Option>
            <Option value="Yerno o Nuera">Yerno o Nuera</Option>
            <Option value="Padrastro o Madrastra">Padrastro o Madrastra</Option>
            <Option value="Hermanastro">Hermanastro</Option>
            <Option value="Cuñado">Cuñado</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="address"
          label="Dirección"
          rules={[
            {
              pattern: /^.{1,200}$/g,
              message: "Dirección debe tener máximo 200 letras.",
            },
            {
              pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ.,])+\s?)+([0-9])*$/g,
              message: "Sólo se permiten letras, números, puntos y comas.",
            },
            {
              required: true,
              message: "Dirección es un campo requerido",
              whitespace: true,
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {/* <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            Guardar
          </Button> */}
          <Button htmlType="button" onClick={() => form.resetFields()}>
            Reiniciar campo
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
