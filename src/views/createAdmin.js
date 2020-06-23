import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

function createAdmin(props) {
    let state1 = '', updateId = '', fullname = '', email = '',password=''
    let loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    let token = loginResponse.token

    function handleSubmit({ fullname, email,password }) {
        let dataCreated = { fullname, email,password }
          console.log(dataCreated);

        let url = `http://176.9.19.106:1337/v0/admin/`
        Axios.post(url, dataCreated, {
            headers: {
                "Content-Type": "application/json",

            }
        })
            .then((result) => {
                console.log('success', result);

            }).catch((err) => {
                console.log('err', err);

            });
    }
    return (
        <Formik
            initialValues={{
                fullname: fullname ? fullname : '',
                email: email ? email : '',
                password: ''
            }}
            validationSchema={Yup.object().shape({
                fullname: Yup.string()
                    .required('Full Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .required("password is required")
                    .min(6, "password_validation")

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
                        <label htmlFor="password">Password</label>
                        <Field
                            name="password"
                            type="password"
                            className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2">Create</button>

                    </div>
                </Form>
            )}
        />
    )
}

export default createAdmin;