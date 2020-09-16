import {Form, Button, Input, Select, message,Divider, Radio, Checkbox} from "antd";
import { Hospital } from '../../../hospitals/hospitalModels'
import React, { useState, useRef, useEffect } from "react";
import { all } from "../../../hospitals/hospitalService";
export interface SearchForm{
    [key: string]: string;
}

function HospitalSearching(props: any){
  const { Option } = Select;
  const [form] = Form.useForm();
  const [hidden, setHidden]= useState(true);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [selectedOrigin, setSelectedOrigin] = useState(0);
	const [selectedDestination, setSelectedDestination] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await all();
      setHospitals(data);
      console.log(data);
    })();
  }, []);
    
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
						props.onOrigin(value);
						console.log(value)
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
						props.onDestination(value);
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
        </Form>


       

        </>       

    );

}
export default HospitalSearching;