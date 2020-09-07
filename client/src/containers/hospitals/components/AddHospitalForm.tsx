import React, {useState, useRef, useEffect} from "react";
import {
    Button,
    Form,
    Input,
    Select,
    message,
    Space,
    Tag,
    Tooltip,
} from "antd";
import {
    ArrowLeftOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {RouteComponentProps, Link} from "@reach/router";
import MainTitle from "../../../components/MainTitle";
import {create, rupsCodeExists} from "../hospitalService";
import departmentsLocations from "../../../departmentsLocations";
import {RuleObject, StoreValue} from "rc-field-form/lib/interface";
import {MaskedInput} from "antd-mask-input";

export interface AddHospitalProps extends RouteComponentProps {
}

export interface HospitalForm {
    [key: string]: string;
}

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
        throw new Error(`Ya existe un centro de salud con el código ${code}`);
    }
};

interface ServiceTagsState {
    tags: string[];
    inputVisible: boolean;
    inputValue: string;
    editInputIndex: number;
    editInputValue: string;
}

function AddHospitalForm(props: AddHospitalProps) {
    const [form] = Form.useForm();
    const [department, setDepartment] = useState(
        departmentsLocations.departments[0]
    );

    const [tagsInformation, setTagsInformation] = useState({
        tags: [] as string[],
    } as ServiceTagsState);

    const input = useRef<Input>(null);
    const editInput = useRef<Input>(null);

    const handleClose = (removedTag: string) => {
        const tags = tagsInformation.tags.filter((tag) => tag !== removedTag);

        setTagsInformation({...tagsInformation, tags});
    };

    useEffect(() => {
        if (editInput.current) {
            editInput.current?.focus();
        } else {
            input.current?.focus();
        }
    }, [tagsInformation])

    const showInput = () => {
        setTagsInformation({...tagsInformation, inputVisible: true});
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagsInformation({...tagsInformation, inputValue: event.target.value});
    };

    const handleInputConfirm = () => {
        const {inputValue} = tagsInformation;
        let {tags} = tagsInformation;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }

        setTagsInformation({
            ...tagsInformation,
            tags,
            inputVisible: false,
            inputValue: "",
        });
    };

    const handleEditInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTagsInformation({
            ...tagsInformation,
            editInputValue: event.target.value,
        });
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tagsInformation.tags];
        const {editInputIndex, editInputValue} = tagsInformation;
        newTags[editInputIndex] = editInputValue;

        setTagsInformation({
            ...tagsInformation,
            tags: newTags,
            editInputIndex: -1,
            editInputValue: "",
        });
    };

    const onFinish = (values: HospitalForm) => {
        (async () => {
            console.log(JSON.stringify(values.contacts));
            try {
                await create({
                    code: parseInt(values.code),
                    name: values.name,
                    address: values.address,
                    department:
                    departmentsLocations.departments[parseInt(values.department) - 1]
                        .name,
                    city:
                    departmentsLocations.departments[parseInt(values.department) - 1]
                        .cities[parseInt(values.city) - 1].name,
                    category: values.category,
                    contacts: JSON.stringify(values.contacts),
                    services: JSON.stringify(tagsInformation.tags)
                });
                form.resetFields();
                message.success("El hospital ha sido creado existosamente.");
            } catch (error) {
                message.error("Ocurrió un error al guardar el hospital.");
            }
        })();
    };

    const {TextArea} = Input;
    const {Option} = Select;
    const {
        tags,
        inputVisible,
        inputValue,
        editInputIndex,
        editInputValue,
    } = tagsInformation;

    return (
        <>
            <Link to="/hospitals">
                <Button
                    type="primary"
                    shape="circle"
                    htmlType="submit"
                    icon={<ArrowLeftOutlined/>}
                    style={{marginLeft: "-20%"}}
                />
            </Link>
            <MainTitle>Registrar Establecimiento de Salud</MainTitle>
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
                    <Input/>
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
                    <Input/>
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
                        {departmentsLocations.departments.map(
                            (l: any) => (
                                <Option key={l.name} value={l.id} label={l.name}>
                                    {l.name}
                                </Option>
                            ),
                            form.resetFields(["city"])
                        )}
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
                    <TextArea rows={4}/>
                </Form.Item>
                <Form.Item name="contactList" label="Contactos">
                    <Form.List name="contacts">
                        {(fields, {add, remove}) => {
                            return (
                                <div>
                                    {fields.map((field) => (
                                        <Space
                                            key={field.key}
                                            style={{width: "110%"}}
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
                                                <Input placeholder="Nombre"/>
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
                                                <MaskedInput mask="+(111) 1111-1111"/>
                                            </Form.Item>

                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        </Space>
                                    ))}

                                    <Form.Item style={{marginBottom: "0px"}}>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                            }}
                                            block
                                        >
                                            <PlusOutlined/> Agregar Contacto
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>
                </Form.Item>
                <Form.Item
                    label="Servicios"
                >
                    {tags.map((tag, index) => {
                        if (editInputIndex === index) {
                            return (
                                <Input
                                    ref={editInput}
                                    key={tag}
                                    size="small"
                                    className="tag-input"
                                    value={editInputValue}
                                    onChange={handleEditInputChange}
                                    onBlur={handleEditInputConfirm}
                                    onPressEnter={handleEditInputConfirm}
                                />
                            );
                        }

                        const isLongTag = tag.length > 30;

                        const tagElem = (
                            <Tag
                                className="edit-tag"
                                key={tag}
                                closable={true}
                                onClose={() => handleClose(tag)}
                            >
                <span
                    onDoubleClick={(e) => {
                        setTagsInformation({
                            ...tagsInformation,
                            editInputIndex: index,
                            editInputValue: tag,
                        });
                        editInput.current?.focus();

                        e.preventDefault();
                    }}
                >
                  {isLongTag ? `${tag.slice(0, 30)}...` : tag}
                </span>
                            </Tag>
                        );
                        return isLongTag ? (
                            <Tooltip
                                title={tag}
                                key={tag}
                                style={{display: "inline-block"}}
                            >
                                {tagElem}
                            </Tooltip>
                        ) : (
                            tagElem
                        );
                    })}
                    {inputVisible && (
                        <Input
                            ref={input}
                            type="text"
                            size="small"
                            className="tag-input"
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputConfirm}
                            onPressEnter={handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag className="site-tag-plus" onClick={() => showInput()}>
                            <PlusOutlined/>
                            Nuevo Servicio
                        </Tag>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{marginRight: "8px"}}
                    >
                        Guardar
                    </Button>
                    <Button htmlType="button" onClick={() => {
                        setTagsInformation({tags: [] as string[]} as ServiceTagsState );
                        form.resetFields();
                    }}>
                        Reiniciar campos
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default AddHospitalForm;
