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
    const {current, changeCurrent, setPatientInfo} = props;
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
				props.setPatientInfo(patient.id);
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
