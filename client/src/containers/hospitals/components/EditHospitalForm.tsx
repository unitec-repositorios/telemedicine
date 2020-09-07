import { Button, Form, Input, Select, message, Spin, Space } from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { RouteComponentProps, Link } from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import { findById, update, rupsCodeExists } from "../hospitalService";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
import React, { useEffect, useState } from "react";
import departmentsLocations from "../../../departmentsLocations";
import { Hospital } from "../hospitalModels";
import MaskedInput from "antd-mask-input/build/main/lib/MaskedInput";
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

  const [loading, setLoading] = useState(true);

  const [currentHospital, setCurrentHospital] = useState({} as Hospital);
  useEffect(() => {
    (async () => {
      const hospital = await findById(props.id ?? 1);
      hospital.contacts = JSON.parse(hospital.contacts);
      setCurrentHospital(hospital);
      form.setFieldsValue(hospital);
      // setTagsInformation({tags: JSON.parse(hospital.services) as string[]} as ServiceTag)
      setLoading(false);
    })();
  }, []);

  const validateCode = async (rule: RuleObject, value: StoreValue) => {
    const code = parseInt(value, 10);
    const exists = await rupsCodeExists(code);

    if (exists && currentHospital.code !== code) {
      throw new Error(`Ya existe un centro de salud con el código ${code}`);
    }
  };

  const onFinish = (values: HospitalForm) => {
    (async () => {
      try {
        await update({
          id: currentHospital.id,
          code: parseInt(values.code),
          name: values.name,
          address: values.address,
          department: currentHospital.department,
          city: currentHospital.city,
          category: values.category,
          contacts: JSON.stringify(values.contacts),
        });

        message.success("El hospital ha sido editado existosamente");
      } catch (error) {
        message.error("Ocurrió un error al editar el hospital");
      }
    })();
  };

  const { TextArea } = Input;
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
      <MainTitle>Editar Establecimiento de Salud</MainTitle>
      <Spin spinning={loading}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          autoComplete="off"
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
                message: "Sólo se permiten números",
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
                message: "Nombre debe tener mínimo 2 letras y máximo 30",
              },
              {
                pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])+\s?)+$/g,
                message: "Sólo se permiten letras",
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
                  departmentsLocations.departments.find(
                    (d) => d.id === value
                  ) || departmentsLocations.departments[0];

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
          <Form.Item
            name="category"
            label="Categorización"
            rules={[
              {
                required: true,
                message: "Categorización es un campo requerido",
              },
            ]}
          >
            <Select>
              <Option value="UAPS">UAPS</Option>
              <Option value="CIS">CIS</Option>
              <Option value="POLICLINICO">POLICLINICO</Option>
              <Option value="HOSPITAL BÁSICO">HOSPITAL BÁSICO</Option>
              <Option value="HOSPITAL GENERAL">HOSPITAL GENERAL</Option>
              <Option value="HOSPITAL DE ESPECIALIDADES">
                HOSPITAL DE ESPECIALIDADES
              </Option>
              <Option value="HOSPITAL INSTITUTO">HOSPITAL INSTITUTO</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Dirección"
            rules={[
              {
                pattern: /^.{1,200}$/g,
                message: "Direccion debe tener máximo 200 letras",
              },
              {
                pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ.,])+\s?)+$/g,
                message: "Sólo se permiten letras, puntos y comas",
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
          <Form.Item name="contactList" label="Contactos">
            <Form.List name="contacts">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{ width: "110%" }}
                        align="start"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "contactName"]}
                          fieldKey={[field.fieldKey, "contactName"]}
                          rules={[
                            {
                              required: true,
                              message: "Nombre es requerido.",
                            },
                            {
                              pattern: /^.{2,30}$/g,
                              message:
                                "Nombre debe tener mínimo 2 letras y máximo 30.",
                            },
                            {
                              pattern: /^(([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ.])+\s?)+$/g,
                              message: "Sólo se permiten letras.",
                            },
                          ]}
                        >
                          <Input placeholder="Nombre" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "contactNumber"]}
                          fieldKey={[field.fieldKey, "contactNumber"]}
                          rules={[
                            {
                              required: true,
                              message: "Número es requerido",
                            },
                          ]}
                        >
                          <MaskedInput mask="+(111) 1111-1111" />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))}

                    <Form.Item style={{ marginBottom: "0px" }}>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined /> Agregar Contacto
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "8px" }}
            >
              Editar
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}

export default EditHospitalForm;
