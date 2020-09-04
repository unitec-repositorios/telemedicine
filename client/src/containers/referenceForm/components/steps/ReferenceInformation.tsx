import React, { useState } from "react";
import { Button, Form, Input, Select, message, Divider, Row, DatePicker } from "antd";
import moment from "moment";
import MainTitle from "../../../../components/MainTitle";
import { create } from "../../referenceFormService"


export interface ReferenceForm {
  [key: string]: string;
}

function ReferenceInformation() {

  const [form] = Form.useForm();


  

  const onFinish = (values: ReferenceForm) => {

    const vitalSignsFormJson = {
      vitalSignsJson: {
        bloodPressure: values.bloodPressure,
        respiratoryRate: values.respiratoryRate,
        pulse: values.pulse,
        heartRate: values.heartRate,
        temperature: values.temperature,
        weight: values.weight,
        sizePerson: values.sizePerson
      }};

    const obgynFormJson = {
      obgynJson: {
        fum: values.fum,
        fpp: values.fpp,
        pregnancy: values.pregnancy,
        birth: values.birth,
        cesareanSections: values.cesareanSections,
        livingChildren: values.livingChildren,
        deadChildren: values.deadChildren,
        deaths: values.deaths,
        abortions: values.abortions
      }
    };

    (async () => {
      try {
        await create({
          type: "NotSet",
          originHfId: "NotSet",
          destinationHfId: "NotSet",
          patientId: "NotSet",
          motive: values.motive,
          descriptionMotive: values.descriptionMotive,
          symptoms: "NotSet",
          medicalSummary: values.medicalSummary,
          vitalSigns: JSON.stringify(vitalSignsFormJson),
          obGyn: JSON.stringify(obgynFormJson),
          //physicalExamination: JSON.parse(myObjStr),
          complementaryExams: "NotSet",
          diagnosticImpression: "NotSet",
          observations: "NotSet",
          risk: true,
          attentionRequired: "NotSet",
          madeBy: "NotSet",
          contactedHf: "NotSet",
          contactId: "NotSet",
          date: new Date("02-09-2020"),
        });

        form.resetFields();
        message.success("Elementos se han guardado exitosamente.");
      } catch (error) {
        console.log(error)
        message.error("Ocurrió un error al guardar los elementos.");
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
      <MainTitle>Formulario de Referencia</MainTitle>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        id="form-register">

        <Form.Item label="Motivo"
          name="motive"
          rules={[{
            required: true,
            message: "El campo es requerido."
          }]}
        >
          <Select>
            <Select.Option value="1">Diagnostico</Select.Option>
            <Select.Option value="2">Tratamiento</Select.Option>
            <Select.Option value="3">Seguimieto</Select.Option>
            <Select.Option value="4">Rehabilitación</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="descriptionMotive"
          label="Descripción del motivo"
          rules={[
            {
              required: true,
              message: "El campo es requerido.",
              whitespace: true,
            },
            {
              pattern: /^.{2,150}$/g,
              message: "Nombre debe tener mínimo 2 letras y máximo 150.",
            },
          ]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="medicalSummary"
          label="Resumen de datos clinicos"
          rules={[
            {
              required: true,
              message: "El campo es requerido.",
              whitespace: true,
            },
            {
              pattern: /^.{2,150}$/g,
              message: "Nombre debe tener mínimo 2 letras y máximo 150.",
            },
          ]}>
          <Input.TextArea />
        </Form.Item>

        <Divider orientation="left">Signos vitales</Divider>

        <Form.Item
          name="bloodPressure"
          label="Presión arterial"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="respiratoryRate"
          label="Frecuencia respiratoria"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="pulse"
          label="Pulso"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="heartRate"
          label="Frecuencia cardiaca"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="temperature"
          label="Temperatura"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="weight"
          label="Peso"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="sizePerson"
          label="Talla"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Divider orientation="left">Datos Gineco Obstétricos</Divider>

        <Form.Item
          label="FUM"
          name="fum"
          rules={[
            {
              required: true,
              message: "FUM es un campo requerido",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={moment("01-01-2000", "DD-MM-YYYY")}
            format={"DD-MM-YYYY"}
            placeholder="Ingrese fecha"
            disabledDate={(d) =>
              !d || d.isSameOrBefore("1940-01-01") || d.isAfter(moment())
            }
          />
        </Form.Item>
        
        <Form.Item
          label="FPP"
          name="fpp"
          rules={[
            {
              required: true,
              message: "FPP es un campo requerido",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={moment("01-01-2000", "DD-MM-YYYY")}
            format={"DD-MM-YYYY"}
            placeholder="Ingrese fecha"
            disabledDate={(d) =>
              !d || d.isSameOrBefore("1940-01-01") || d.isAfter(moment())
            }
          />
        </Form.Item>

        <Form.Item
          name="pregnancy"
          label="Embarazos"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="birth"
          label="Partos"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="cesareanSections"
          label="Cesareas"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="livingChildren"
          label="Hijos vivos"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="deadChildren"
          label="Hijos Muertos"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="deaths"
          label="Obitos"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="abortions"
          label="Abortos"
          rules={[
            {
              required: true,
              message: "El campo es requerido",
              whitespace: true,
            },
            {
              pattern: /^(\d)+$/g,
              message: "Sólo se permiten números.",
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
            Reiniciar campos
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ReferenceInformation;
