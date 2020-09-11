import React, { useEffect, useState } from "react";
import MainTitle from "../../../components/MainTitle";
import { Button, Form, Input, Radio, DatePicker, message, Space } from "antd";
import { findById, update, IdNumberExists, EmailExists } from "../patientService";
import { PatientForm } from "./AddPatientForm";
import { Link, RouteComponentProps } from "@reach/router";
import { ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import MaskedInput from "antd-mask-input";
import moment from "moment";
import { Patient } from "../patientModels";
import { RuleObject } from "antd/lib/form";
import { StoreValue } from "antd/lib/form/interface";

interface EditPatientRouteParams {
  id: number;
}

interface EditPatientFormProps
  extends RouteComponentProps<EditPatientRouteParams> { }

function EditPatientForm(props: EditPatientFormProps) {
  const [form] = Form.useForm();

  const [currentDate, setCurrentDate] = useState(moment());
  const [patient, setPatient] = useState({} as Patient);

  const [Hidden, setHidden] = useState(false);
  const [Required, setRequired] = useState(false);
  const [phoneRequired, setPhoneRequired] = useState(false);
  const dateFormat = "DD-MM-YYYY";

  const changeHidden = () => {
    setHidden(!Hidden)
    setRequired(!Required)
  }

  const validateIdNumber = async (rule: RuleObject, value: StoreValue) => {
    const IdNumber = value;
    const exists = await IdNumberExists(IdNumber);

    if (exists && Required === false && patient.idNumber !== IdNumber) {
      throw new Error(
        `Ya existe un paciente con ese número de identidad. ${IdNumber}`
      );
    }
  };

  const ForeignIdNumberExists = async (rule: RuleObject, value: StoreValue) => {
    const ForeignIdNumber = value;
    const exists = await IdNumberExists(ForeignIdNumber);

    if (exists && Required === true && patient.idNumber !== ForeignIdNumber) {
      throw new Error(
        `Ya existe un paciente con ese número de identidad. ${ForeignIdNumber}`
      );
    }
  };

  const validateEmail = async (rule: RuleObject, value: StoreValue) => {
    const Email = value;
    const exists = await EmailExists(Email);


    if (exists && patient.email !== Email) {
      throw new Error(
        `Ya existe un paciente con ese correo electrónico. ${Email}`
      );
    }
  };

  useEffect(() => {
    (async () => {
      const patient = await findById(props.id ?? 1);
      setPatient({ ...patient, dateOfBirth: patient.dateOfBirth.toDate() });
      patient.contacts = JSON.parse(patient.contacts);
      setCurrentDate(patient.dateOfBirth);
      if (patient.nationality === "extranjero") {
        form.setFieldsValue({
          foreignIdNumber: patient.idNumber,
        });
        patient.idNumber = "";
        setHidden(true);
        setRequired(true);
      }
      form.setFieldsValue(patient);
    })();
  }, []);

  const onFinish = (values: PatientForm) => {
    (async () => {
      try {
        var newId = values.idNumber;
        if (Hidden) {
          newId = values.foreignIdNumber;
        }
        await update({
          id: patient.id,
          idNumber: newId,
          name: values.name,
          firstLastName: values.firstLastName,
          secondLastName: values.secondLastName,
          dateOfBirth: currentDate.toDate(),
          email: values.email,
          gender: values.gender,
          address: values.address,
          contacts: JSON.stringify(values.contacts),
          nationality: values.nationality
        });
        setPhoneRequired(true);
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

  const { TextArea } = Input;
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
          name="nationality"
          label="Nacionalidad"
          rules={[
            {
              required: true,
              message: "Nacionalidad es un campo requerido"
            },
          ]}
        >
          <Radio.Group buttonStyle="solid" onChange={changeHidden}>
            <Radio.Button value="hondureño">Hondureño</Radio.Button>
            <Radio.Button value="extranjero">Extranjero</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="idNumber"
          label="Número de Identidad"
          hidden={Hidden}
          rules={[
            {
              pattern: /\d{5}/,
              message: "Número de Identidad incompleto. ",
            },
            {
              required: !Required,
              message: "Número de Identidad es un campo requerido",
              whitespace: true,
            },
            {
              validator: validateIdNumber,
            },
          ]}
        >
          <MaskedInput mask="1111-1111-11111" />
        </Form.Item>
        <Form.Item
          name="foreignIdNumber"
          label="Número de Identidad"
          hidden={!Hidden}
          rules={[
            {
              pattern: /^[A-Za-z0-9]+$/g,
              message: "Sólo se aceptan números y letras.",
            },
            {
              min: 8,
              max: 20,
              message: "Número de Identidad debe tener mínimo 8 y máximo 20 caracteres."
            },
            {
              required: Required,
              message: "Número de Identidad es un campo requerido"
            },
            {
              validator: ForeignIdNumberExists,
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
            {
              validator: validateEmail
            }
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
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="Femenino">Femenino</Radio.Button>
            <Radio.Button value="Masculino">Masculino</Radio.Button>
          </Radio.Group>
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
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="phoneContacts"
          label="Números de teléfono:"
          rules={[
            {
              required: phoneRequired,
              message: "El campo número de teléfono es requerido.",
            },
          ]}
        >
          <Form.List name="contacts">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        rules={[
                          {
                            pattern: /-\d{4}/,
                            message: "Número de teléfono incompleto. ",
                          },
                          {
                            required: true,
                            message: "Ingresar número o eliminar el campo",
                          },
                        ]}
                      >
                        <MaskedInput mask="+(111) 1111-1111" />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          if (fields.length === 1) {
                            setPhoneRequired(true);
                          }
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
                        setPhoneRequired(false);
                      }}
                      block
                    >
                      <PlusOutlined /> Agregar número de teléfono
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
