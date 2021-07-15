import React from "react";
import {useState} from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string,
  exampleRequired: string,
};

const SigninForm = () =>  {
   const [state, setstate] = useState({});

   return [state];
  }
export default SigninForm;