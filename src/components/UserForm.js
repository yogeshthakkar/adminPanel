// import external modules
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormGroup, Label, Button, Row, Col } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// /^[a-zA-Z0-9._'-? ]*$/

const formSchema = Yup.object().shape({
  firstName: Yup.string().required('name_required'),

  lastName: Yup.string().required('name_required'),

  email: Yup.string().email('email_validation').required('email_required'),
});

const UserForm = ({ firstName, email, lastName, handleSubmit, edit, user }) => {
  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        email,
      }}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        values,
        setFieldValue,
      }) => (
        <Form className="user-form">
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="firstName">{'Name'}</Label>
                <Field
                  type="text"
                  maxLength="20"
                  minLength="1"
                  name="firstName"
                  id="firstName"
                  placeholder={'Name'}
                  className={`form-control input ${
                    errors.firstName && touched.firstName && 'is-invalid'
                  }`}
                />
                {errors.firstName && touched.firstName ? (
                  <div className="invalid-feedback">{`${errors.firstName}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="firstName">{'Name'}</Label>
                <Field
                  type="text"
                  maxLength="20"
                  minLength="1"
                  name="lastName"
                  id="lastName"
                  placeholder={'LastName'}
                  className={`form-control input ${
                    errors.lastName && touched.lastName && 'is-invalid'
                  }`}
                />
                {errors.lastName && touched.lastName ? (
                  <div className="invalid-feedback">{`${errors.lastName}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="email">{'Email'}</Label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder={'Email'}
                  disabled={edit}
                  onBlur={(e) => {
                    let email = e.target.value;
                    if (email) email = email.toLowerCase();
                    setFieldValue('email', email);
                    handleBlur(e);
                  }}
                  className={`form-control input ${
                    errors.email && touched.email && 'is-invalid'
                  }`}
                />
                {errors.email && touched.email ? (
                  <div className="invalid-feedback">{`${errors.email}`}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="12" sm="12" className="text-right">
              <Button type="submit" color="primary" className="round">
                {'Submit'}
              </Button>
              <NavLink
                to={user ? '/dashboard' : '/users'}
                className="btn btn-secondary round ml-2"
              >
                {'Cancel'}
              </NavLink>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

UserForm.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  handleSubmit: () => {},
  edit: false,
  user: false,
};

export default UserForm;
