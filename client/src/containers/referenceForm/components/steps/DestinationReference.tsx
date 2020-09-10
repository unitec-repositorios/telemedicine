import React, {useState} from "react";
import {Form, Input, Select, message,Divider, Radio, Checkbox} from "antd";
import moment from "moment";
import MainTitle from "../../../../components/MainTitle";
import { create } from "../../referenceFormService"
import {readlinkSync} from "fs";

export interface RefForm{
    [key: string]: string;
}

function DestinationReference(){
    const[form] = Form.useForm();
    const[hidden, setHidden] = useState(true);

    const formItemLayout ={
        labelCol: {
            xs:{ span : 24},
            sm:{span : 8},
            md: {span: 8},
        },

        wrapperCol:{
            xs:{span: 24},
            sm: { span: 16},
            md:{ span : 8},
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
    
}

export default DestinationReference;