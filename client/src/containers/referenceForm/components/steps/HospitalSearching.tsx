import React, {useState} from "react";
import {Form, Input, Select, message,Divider, Radio, Checkbox} from "antd";
import moment from "moment";
import MainTitle from "../../../../components/MainTitle";
import { create } from "../../referenceFormService"
import {readlinkSync} from "fs";

export interface SearchForm{
    [key: string]: string;
}

function HospitalSearching(){

    const[form] = Form.useForm();
    const [hidden, setHidden]= useState(true);

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
        <Select>
            <Select.Option value = "Choloma"> Choloma</Select.Option>
            <Select.Option value = "La Lima"> La Lima</Select.Option>
            <Select.Option value = "Progreso"> Progreso</Select.Option>
            <Select.Option value = "Villanueva"> Villanueva</Select.Option>
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
        <Select>
            <Select.Option value = "Choloma"> Choloma</Select.Option>
            <Select.Option value = "La Lima"> La Lima</Select.Option>
            <Select.Option value = "Progreso"> Progreso</Select.Option>
            <Select.Option value = "Villanueva"> Villanueva</Select.Option>
        </Select>

        </Form.Item>
        </Form>


       

        </>       

    );

}
export default HospitalSearching;