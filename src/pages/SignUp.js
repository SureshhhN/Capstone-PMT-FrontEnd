import axios from 'axios';
import React, { useState } from 'react';
import {useFormik} from 'formik'
import *as yup from 'yup'
import {Link} from 'react-router-dom'
import env from "react-dotenv";
import styled from "styled-components";
import { toast } from "react-toastify";

import {FaEye,FaEyeSlash} from "react-icons/fa";


function SignUp() {
    const [status,setStatus]  = useState( '' );

    const [show,setShow] = useState(false)
    const handleShow = () => {
      setShow(!show)
    }

    const formik = useFormik({
      initialValues:{ 
        name:'',
        email:'', 
        phone:'',
        password:'',
        ProfileImage:''
      },
      validationSchema: yup.object({
      name:yup.string().required('Name is required'),
      email:yup.string().email('Invalid email address').required('Email is required'),
      phone:yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/gm, "Invalid Number").required('Mobile Number is required'),
      password:yup.string().required('Password is required')
      }),
      onSubmit:values=>{
        save(values, null, 2)
  
      }
    })
  
  // Adding data using axios
  let save = async(val)=>{
    try {
      let res =  await axios.post(env.API_URL+'users/register',val)    
      toast.success(res.data.message);        
    } catch (error) {
      alert("error occured please contact the developer")
      console.log(error)
    } 
  }
  return (
    <div>
      <FormContainer>
    
         <form  onSubmit={formik.handleSubmit}>
         <div className="brand">

            <h1>Sign Up</h1>
          </div>
          {formik.touched.name && formik.errors.name?
          (<div style={{color:"red"}}>{formik.errors.name}</div>)
          :formik.touched.email && formik.errors.email?
          (<div style={{color:"red"}}>{formik.errors.email}</div>)
          :formik.touched.phone && formik.errors.phone?
          (<div style={{color:"red"}}>{formik.errors.phone}</div>)
          :formik.touched.password && formik.errors.password?
          (<div style={{color:"red"}}>{formik.errors.password}</div>):
          null}


        

         <div className='d-flex'>
            <input id="name" name="name" type="text"
                  className="form-control" placeholder='Enter Name'
                  onChange={formik.handleChange}
                  value={formik.values.name}/>
            
            &nbsp;&nbsp;
            
            <input id="email" name="email" type="email"
                  className="form-control" placeholder='Enter Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}/>
        </div>  

        <div className='d-flex'>
            <input id="phone" name="phone" type="mobile"
                  className="form-control" placeholder='Enter phone'
                  onChange={formik.handleChange}
                  value={formik.values.phone}/>            
            

            &nbsp;&nbsp;   
            <input id="password" name="password" type={show?"text":"password"}
                  className="form-control" placeholder='Enter password'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  />
        <div className="label2">
         <label onClick={handleShow}>
            <div>
              {show?<FaEyeSlash/>:<FaEye/>}
            </div>
          </label>
          </div>
            
         </div>
            <input id="ProfileImage" name="ProfileImage" type="text"
                  className="form-control" placeholder='Enter Image URL'
                  onChange={formik.handleChange}
                  value={formik.values.ProfileImage}/>
 
        <button type="submit">Sign Up</button>
        <span>
          Already have an account? <Link to="/">Login</Link>
        </span>
        </form>
        </FormContainer>
    </div>
  )
}

const FormContainer = styled.div`  
height: 100vh;

  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .brand {
    display: flex;
    align-item: center;
    gap: 1rem;
    justify-content: center;
  }
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: black;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1 rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;

      a {
        color: #4a0eff;
        text-transform: none;
        text-decoration: none;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }
`;
export default SignUp