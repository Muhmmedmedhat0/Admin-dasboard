import React from "react";
import "./login.css";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { logIn } from "../../app/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleSubmit = async (values) => {
    await dispatch(logIn(values));
    navigate("/");
  };

  const validationSchema = () => {
    let schema = yup.object().shape({
      email: yup.string().email("invalid email").required("required"),
      password: yup
        .string()
        .min(4, "too short!")
        .max(15, "too long!")
        .required("required"),
    });
    return schema;
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ touched, errors }) => (
          <Form className="login">
            <Field name="email" type="email" placeholder="email" />
            <div className="error-container">
              {touched.email && errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <Field name="password" type="password" placeholder="password" />
            <div className="error-container">
              {touched.password && errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div>
              {userInfo.message ? (
                <span className="servir-error">{userInfo.message}</span>
              ) : (
                "Welcome"
              )}
            </div>
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;
