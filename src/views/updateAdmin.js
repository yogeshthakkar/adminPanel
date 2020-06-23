import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { history } from '../history';

function updateAdmin(props) {
  let state1='',updateId='',fullname='',email=''
  console.log(props.location.state.state);
  let loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
  let token = loginResponse.token
  if (props.location.state.state) {

    state1 = props.location.state.state
     updateId = state1.updateId
     fullname = state1.fullname
     email = state1.email
    console.log(fullname);
  }


  function handleSubmit({ fullname, email }) {
    let url = `http://176.9.19.106:1337/v0/admin/${updateId}`
    Axios.patch(url, { fullname, email }, {
      headers: {
        "Content-Type": "application/json",
        "x-auth": `${token}`
      }
    })
      .then((result) => {
        console.log('success', result);
        history.push('/admins')

      }).catch((err) => {
        console.log('err', err);

      });
  }
  return (
    <Formik
      initialValues={{
        fullname: fullname ? fullname : '',
        email: email ? email : ''
      }}
      validationSchema={Yup.object().shape({
        fullname: Yup.string()
          .required('Full Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required')

      })}
      onSubmit={handleSubmit}
      render={({ errors, status, touched }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <Field
              name="fullname"
              type="text"
              className={'form-control' + (errors.fullname && touched.fullname ? ' is-invalid' : '')} />
            <ErrorMessage name="fullname" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">Update</button>

          </div>
        </Form>
      )}
    />
  )
}

export default updateAdmin;