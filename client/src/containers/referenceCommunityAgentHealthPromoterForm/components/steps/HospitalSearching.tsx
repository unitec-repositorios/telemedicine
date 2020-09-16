import {Form, Button, Input, Select, message,Divider, Radio, Checkbox} from "antd";
import { Hospital } from '../../../hospitals/hospitalModels'
import React, { useState, useRef, useEffect } from "react";
import { all } from "../../../hospitals/hospitalService";
export interface SearchForm{
    [key: string]: string;
}

function HospitalSearching(props: any){
    const { Option } = Select;
    const[form] = Form.useForm();
    const [hidden, setHidden]= useState(true);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [selectedOrigin, setSelectedOrigin] = useState(0);
    const [selectedDestination, setSelectedDestination] = useState(0);
    const [current, setCurrent] = useState(0);
    
    const prev = () => {
        const prevVal = current - 1;
        setCurrent(prevVal);
      };

    const onFinish=(values: any) =>{
        props.onChange(values.origin,values.destination,values.institution);
        
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
        <Form
            {...formItemLayout}
            form = {form}   
            name ="register"
            scrollToFirstError
            id= "HospitalDestination" 
            onFinish = {onFinish}    
        >
       

        <Form.Item 
         label = "Establecimiento de Salud que remite"
         name = "origin"
         rules = {[{
             required: true,
             message: "El campo es requerido."
         }]}
        >
        <Select
					showSearch
					placeholder="Seleccione un establecimiento de salud"
					onSelect={(value: any) => {
						setSelectedOrigin(+value);
						console.log(+value)
					}}
				>
						{hospitals.map(
							(h: any) => (
								<Option key={h.name} value={h.id} label={h.name}>
									{h.name}
								</Option>
							)
						)}
        </Select>

        </Form.Item>
        

        <Form.Item
            name = "institution"
            label="Institucion" 
            rules = {[{
                required: true,
                message: "El campo es requerido."
            }]}
        >
           <Select>
               <Select.Option value = "SESAL"> SESAL</Select.Option>
               <Select.Option value = "Privado"> Privado</Select.Option>
               <Select.Option value = "IHSS"> IHSS</Select.Option>
               <Select.Option value = "Militar"> Militar</Select.Option>
               <Select.Option value = "ONG"> ONG</Select.Option>
               <Select.Option value = "Otro"> Otro</Select.Option>
           </Select>
        </Form.Item>

        <Form.Item 
         label = "Establecimiento de salud al que sera remitido"
         name = "destination"
         rules = {[{
             required: true,
             message: "El campo es requerido."
         }]}
        >
        <Select

					showSearch
					placeholder="Seleccione un establecimiento de salud"
					onSelect={(value: any) => {
						setSelectedOrigin(+value);
						console.log(+value)
					}}
				>
						{hospitals.map(
							(h: any) => (
								<Option key={h.name} value={h.id} label={h.name}>
									{h.name}
								</Option>
							)
						)}
        </Select>
        
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            Siguiente
          </Button>

          <Button htmlType="button" onClick={() => form.resetFields()}>
            Reiniciar campos
          </Button>
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Anterior
            </Button>
          )}
        </Form.Item>
        </Form>


       

        </>       

    );

}
export default HospitalSearching;
