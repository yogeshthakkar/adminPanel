import React, {  } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { history } from '../../history';
import { api } from '../../api/api';

function CreateNewsFeed(props) {    
    let loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    let token = loginResponse.token
    let adminId = loginResponse.id
  
    async function handleSubmit({ title, description,sharedWith, canonicalAddress,longitude, latitude }) {
        // console.log(uid,newsId);
        let response = await api(
            `v0/user/${adminId}/newsfeed`,
            { title, description,sharedWith, canonicalAddress,longitude, latitude },
            token,
            'post'
        )
        if(response.status === 200){
            console.log('success');
            history.push('/newsFeed')
        }else{
            console.log('Error');            
        }
    }
    return (
        <Formik
            initialValues={{}}
            validationSchema={Yup.object().shape({
                longitude: Yup.number()
                    .typeError('Longitude must be digits'),
                latitude: Yup.number()
                    .typeError('Latitude must be digits')
            })}
            onSubmit={handleSubmit}
            render={({ errors,setFieldValue }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="title">title</label>
                        <Field
                            name="title"
                            type="text"
                            className={'form-control' + (errors.title ? ' is-invalid' : '')} />
                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sharedWith">sharedWith</label>
                        <Field as="select" name="sharedWith" 
                        className={'form-control'} >
                            <option value="F" onChange={selectedOptions => {
                                setFieldValue("sharedWith", selectedOptions)
                            }}>Friend</option>
                            <option value='A' onChange={selectedOptions => {
                                setFieldValue("sharedWith", selectedOptions)
                            }}>All</option>
                        </Field>                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">description</label>
                        <Field name="description" type="text" className={'form-control' + (errors.description ? ' is-invalid' : '')} />
                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="canonicalAddress">canonicalAddress</label>
                        <Field name="canonicalAddress" type="text" className={'form-control' + (errors.canonicalAddress ? ' is-invalid' : '')} />
                        <ErrorMessage name="canonicalAddress" component="div" className="invalid-feedback" />
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
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2">Create</button>

                    </div>
                </Form>
            )}
        />
    )
}


CreateNewsFeed.defaultProps = {
    title: '',
    description: '',
    canonicalAddress: '',
    longitude: '',
    latitude: '',
    image: '',
    handleSubmit: () => { },
    edit: false,
    user: false,
};
export default CreateNewsFeed;