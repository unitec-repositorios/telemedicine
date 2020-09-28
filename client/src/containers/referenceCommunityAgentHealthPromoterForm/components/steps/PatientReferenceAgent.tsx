import {Button, Divider, Form, Input, Spin} from "antd";
import MaskedInput from "antd-mask-input/build/main/lib/MaskedInput";
import TextArea from "antd/lib/input/TextArea";
import Select from "antd/lib/select";
import React, {useEffect, useState} from "react";
import {searchById} from "../../../patients/patientService"
import {Patient} from "../../../patients/patientModels";
import {PatientReferenceInformation} from "../../../referenceForm/referenceFormModels";

export default function PatientReferenceAgent(props: any) {

    const defaultPatient = props.referenceState.selectedPatient;

    const patientProps = {
        label: 'Paciente',
        name: "patient"
    } as any;


    const {Option} = Select;
    const {current, changeCurrent} = props;
    const [fetching, setFetching] = useState(true);
    const [patients, setPatients] = useState(defaultPatient == null ? [] as Patient[] : [defaultPatient] as Patient[]);
    const [patient, setPatient] = useState(defaultPatient == null ? {} as Patient : defaultPatient);
    const [form] = Form.useForm();
    const {
        patientId,
        relationship,
        address,
        companion,
        phone,

    } = props.referenceState;

    const fetchPatient = async (value: string) => {

        setFetching(true);
        const patients = await searchById(value);
        setPatients(patients);
        setFetching(false);
    };

    useEffect(() => {
        (async () => {
            if (patientId) {
                await fetchPatient(patientId);
            }
        })();
    }, []);

    const handleChange = (value: any) => {

        setPatient(patients.find(p => p.id === value));
    };

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
            md: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
            md: {span: 8},
        },
    };

    if (defaultPatient) {
        patientProps.initialValue = defaultPatient.id;
        const {
            relationship,
            address,
            companion,
            phone,
            lastName
        } = props.referenceState;
        form.setFieldsValue({
            relationShip: relationship,
            address,
            name: companion,
            phoneNumber: phone,
            lastName
        });

    }

    const onFinish = (values: any) => {
        props.setPatientInfo({
            companion: values.name,
            lastName: values.lastName,
            phone: values.phoneNumber,
            address: values.address,
            relationship: values.relationShip,
            patientId: patient.id,
            selectedPatient: patient
        } as PatientReferenceInformation)
        changeCurrent(current + 1);
    }

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
                onFinish={onFinish}
                scrollToFirstError
            >
                <Divider orientation="left">Paciente</Divider>
                <Form.Item  {...patientProps}

                            rules={[
                                {
                                    required: true,
                                    message: "Paciente es un campo requerido",
                                },
                            ]}>
                    <Select
                        showSearch
                        placeholder="Ingrese un número de identificación"
                        notFoundContent={fetching ? <Spin size="small"/> : null}
                        filterOption={false}
                        onSearch={fetchPatient}
                        onChange={handleChange}
                        style={{width: "100%"}}
                    >
                        {patients.map((d) => (
                            <Option
                                key={d.id}
                                value={d.id}
                            >{`${d.name} ${d.firstLastName} | ${d.idNumber}`}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Divider orientation="left">Acompañante</Divider>
                <Form.Item
                    name="name"
                    label="Primer nombre"

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Primer apellido"

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Número de Teléfono"
                >
                    <MaskedInput mask="+(111) 1111-1111"/>
                </Form.Item>
                <Form.Item
                    name="relationShip"
                    label="Parentesco"
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

                >
                    <TextArea rows={4}/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType={"submit"} style={{margin: "0 8px"}}>
                        Siguiente
                    </Button>
                    <Button htmlType="button" onClick={() => form.resetFields()}>
                        Reiniciar campo
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
