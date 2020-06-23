import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { history } from '../../history';
import { Input, FormGroup } from 'reactstrap';
import { api } from '../../api/api';

function PlayDateForm(props) {
    let title = '', content = '', status = '', ImageId
    let [showAvatar, setShowAvatar] = useState({
        file: '',
        avatar: ''
    })
    let arr = [1, 2, 3, 4]
    let [data, setData] = useState([])
    let [userData, setUserData] = useState([])

    console.log(' Article');


    // // if (props.update === 'update') {
    // //   setData(props.data)
    // //   console.log(props.data);
    // // }
    // console.log(props.data);

    let loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    let token = loginResponse.token
    let adminid = loginResponse.id
    let userDetails = JSON.parse((localStorage.getItem('UserDeatils')))
    console.log(userDetails.data)
    async function handleLoading() {
        alert('loading')
    }
    async function handleChange(event, setFieldValue) {
        event.preventDefault()
        let ImageId
        let reader = new FileReader();
        let file = event.target.files[0];
        console.log(file);
        reader.onloadend = () => {
            setShowAvatar({
                file: file,
                avatar: reader.result
            });
        }
        reader.readAsDataURL(file)
        let formData = new FormData();
        formData.append('image', file);
        await Axios.post(
            `http://176.9.19.106:1337/v0/file`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-auth": `${token}`
                }
            })
            .then(async (result) => {
                console.log(result.data.data.id);
                ImageId = result.data.data.id
            });
        setFieldValue('avatar', ImageId)
    }

    // setUserData(userDetails.data)

    return (
        <Formik
            initialValues={{
                ...props.data

            }}
            validationSchema={
                Yup.object().shape({
                    title: Yup.string()
                        .typeError('content must be String')
                        .required('Content is need'),
                    latitude: Yup.number()
                        .typeError('Word Press Id is Required')

                })}
            onSubmit={props.handleSubmit}
            onLoad={handleLoading}
            render={({ errors, status, setFieldValue, touched, handleSubmit }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Field
                            name="title"
                            type="text"
                            className={'form-control' + (errors.title ? ' is-invalid' : '')} />
                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Field name="description" type="text" className={'form-control' + (errors.description ? ' is-invalid' : '')} />
                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <Field name="image" type="file"
                            value={null}
                            onChange={handleChange}
                            className={'form-control'} />
                        {showAvatar.avatar.length > 0
                            ? <img alt='preview'
                                height='100px'
                                width='100xp'
                                src={showAvatar.avatar} />
                            : ''
                        }
                    </div>


                    <div className="form-group">
                        <label htmlFor="longitude">longitude</label>
                        <Field name="longitude" type="text" className={'form-control' + (errors.longitude ? ' is-invalid' : '')} />
                        <ErrorMessage name="longitude" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="latitude">latitude</label>
                        <Field name="latitude" type="text" className={'form-control' + (errors.latitude ? ' is-invalid' : '')} />
                        <ErrorMessage name="latitude" component="div" className="invalid-feedback" />
                    </div>

                    <div>
                        <label htmlFor="userId">User Id </label>
                        <Field as="select" name="userId"
                            className={'form-control'} >
                            <option onChange={selectedOptions => {
                                setFieldValue("userId", userDetails.data)
                            }}>Select</option>

                            {userDetails.data.map((val) =>
                                <option
                                    onChange={selectedOptions => {
                                        setFieldValue("userId", userDetails.data)
                                    }}
                                    key={val.id}>{val.email}</option>
                            )
                            }
                        </Field>
                    </div>

                    <div className="form-group">
                        <label htmlFor="start">start</label>
                        <Field name="start" type="date" className={'form-control' + (errors.start ? ' is-invalid' : '')} />
                        <ErrorMessage name="start" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="end">end</label>
                        <Field name="end" type="date" className={'form-control' + (errors.end ? ' is-invalid' : '')} />
                        <ErrorMessage name="end" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="canonicalAddress">canonicalAddress</label>
                        <Field name="canonicalAddress" type="text" className={'form-control' + (errors.canonicalAddress ? ' is-invalid' : '')} />
                        <ErrorMessage name="canonicalAddress" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="maxNumberOfAttendees">maxNumberOfAttendees</label>
                        <Field name="maxNumberOfAttendees" type="number" className={'form-control' + (errors.maxNumberOfAttendees ? ' is-invalid' : '')} />
                        <ErrorMessage name="maxNumberOfAttendees" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="website">website</label>
                        <Field name="website" type="text" className={'form-control' + (errors.website ? ' is-invalid' : '')} />
                        <ErrorMessage name="website" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ticketUrl">ticketUrl</label>
                        <Field name="ticketUrl" type="text" className={'form-control' + (errors.ticketUrl ? ' is-invalid' : '')} />
                        <ErrorMessage name="ticketUrl" component="div" className="invalid-feedback" />
                    </div>
                    {/*playdate Type*/}
                    <div className="form-group">
                        <label htmlFor="recurringId">recurringId</label>
                        <Field name="recurringId" type="text" className={'form-control' + (errors.recurringId ? ' is-invalid' : '')} />
                        <ErrorMessage name="recurringId" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <button type="submit"
                            className="btn btn-primary mr-2"
                            disabled={!true}
                        >{props.FormType === 'create' ? "Create" : "Update"}</button>

                    </div>
                </Form>
            )}
        />
    )
}


PlayDateForm.defaultProps = {
    title: '',
    longitude: '',
    latitude: '',
    description: '',
    start: '',
    end: '',
    maxNumberOfAttendees: '',
    canonicalAddress: '',
    image: '',
    website: '',
    ticketUrl: '',
    playdateType: '',
    recurringId: '',
    setFieldValue: '',
    handleSubmit: () => { }
};
export default PlayDateForm;