import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import env from "react-dotenv";
import styled from "styled-components";
import { toast } from "react-toastify";

function SignIn() {
  const { user, setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      loggedin(values, null, 2);
    },
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");

  

  let history = useNavigate();

  let loggedin = async (val) => {
    try {
      let res = await axios.post(env.API_URL + "users/login", val);
      console.log(res.data)
      
      if (res) {      
        if (res.data.message === "Login successfully") {
          const user = res.data;
          toast.success(res.data.message);
          
          if(res.data.data._id === '629c183b32e346b6eb6d3720')
          {
            localStorage.setItem('admin', true)
          }
          else{
            localStorage.setItem('admin', false)
          }
          setUser(user);

          setUsername(res.data.data.name);
          setEmail(res.data.data.email);
          setPhone(res.data.data.phone);
          history("/Project-list");
        } 
        else 
      {
        toast.error(res.data.message);
      }
      } 
      else 
      {
        toast.error(res.data.message);
      }
    } catch (error) {
      alert("error occured please contact the developer");
      console.log(error);
    }
  };

  const forms = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      
      let val = values.email;
      forgetpwd(val, null, 2);
    },
  });

  const forgetpwd = async (data) => {
    var obj = JSON.stringify({ email: data });
    let object = JSON.parse(obj);

    try {
      let res = await axios.post(env.API_URL + "users/forget-password", object);
      toast.success(res.data.message);
    } catch (error) {
      alert("error occured please contact the developer");
      console.log(error);
    }
  };

  return (
    <div>
      <FormContainer >
        <form onSubmit={formik.handleSubmit} name="loginform">
          <div className="brand">
            <h1>Sign In</h1>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}

          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <input
            id="password"
            name="password"
            type="text"
            className="form-control"
            placeholder="Enter password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          

          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            className="text-decoration-none"
          >
            Forget password
          </a>
            <button type="sumbit" className="btn btn-primary">
              Login
            </button>          
          <span>
                Create new Account <Link to="/Sign-up">Sign Up</Link>
              </span>
        </form>
      </FormContainer>
      <div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Forget Password
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={forms.handleSubmit} name="loginform">
                <div className="modal-body ">
                  <div className="d-flex justify-content-center">
                    <img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2018/03/16/VpSrwGLX9OChNxj7qKY16tFP/reset_password/images/icon_lock.gif" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Email ID:
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      onChange={forms.handleChange}
                      value={forms.values.email}
                    />
                    {forms.touched.email && forms.errors.email ? (
                      <div style={{ color: "red" }}>{forms.errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="sumbit" className="btn btn-primary">
                    Check
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
    background-color: black ;
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

export default SignIn;