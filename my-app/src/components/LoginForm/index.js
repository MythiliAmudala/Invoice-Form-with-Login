import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./index.css"

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    localStorage.setItem('session', JSON.stringify(values));
    navigate('/invoice');
  };

  return (
    <div className="container">
      
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
        <h2>Login</h2>
          <label>Username</label>
          <Field name="username" placeholder = "Enter your Username" />
          <ErrorMessage name="username" component="div" className="error" />

          <label>Password</label>
          <Field name="password" type="password" placeholder = "Enter your Password" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;

