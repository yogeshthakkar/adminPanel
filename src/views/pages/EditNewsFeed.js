import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { history } from '../../history';
import { api } from '../../api/api';

function EditNewsFeed(props) {
    let title, description, canonicalAddress, longitude, latitude, image
    let Imageid
    let [img, setImg] = useState({
        file: '',
        pic: ''
    })
    let formData
    let nFeed = props.location.state.state
    console.log(props.location.state.state);
    let loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    let token = loginResponse.token
    let userDetails = JSON.parse((localStorage.getItem('UserDeatils')))

    const handleImageUpload = async (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        console.log(file);
        reader.onloadend = () => {
            setImg({
                file: file,
                pic: reader.result
            });
        }
        reader.readAsDataURL(file)
        formData = new FormData();
        formData.append('image', file);
        let response = await api(
            `v0/file`,
            formData,
            token,
            'postImage'
        )
        if (response.status === 200) {
            // console.log(response.data.data);
            console.log(response.data.data.id);
            Imageid = response.data.data.id           
            alert('done')
        }


    }
    async function handleSubmit({ title, description, sharedWith, canonicalAddress, longitude, latitude }) {
        // console.log(title);
        let uid = props.location.state.state.userId
        let newsId = props.location.state.state.id
        // console.log(uid,newsId);

        let response = await api(
            `v0/user/${uid}/newsfeed/${newsId}`,
            { title, description, sharedWith, canonicalAddress, longitude, latitude },
            token,
            'patch'
        )
        if (response.status === 200) {
            console.log('success');
            history.push('/newsFeed')
        } else {
            console.log('Error');
        }

    }
    return (
        <Formik
            initialValues={{
                ...props.location.state.state
            }}
            validationSchema={Yup.object().shape({
                longitude: Yup.number()
                    .typeError('Longitude must be digits'),
                latitude: Yup.number()
                    .typeError('Latitude must be digits')

            })}
            onSubmit={handleSubmit}
            render={({ errors, status, values, setFieldValue }) => (
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
                        <Field name="description" type="textarea" className={'form-control' + (errors.description ? ' is-invalid' : '')} />
                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
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
                                        setFieldValue("userId", selectedOptions)
                                    }}
                                    key={val.id}
                                    value={val.id}>{val.email}</option>
                            )
                            }
                        </Field>
                    </div>

                    <div className="form-group">
                        <label htmlFor="canonicalAddress">canonicalAddress</label>
                        <Field name="canonicalAddress" type="text" className={'form-control' + (errors.canonicalAddress ? ' is-invalid' : '')} />
                        <ErrorMessage name="canonicalAddress" component="div" className="invalid-feedback" />
                    </div>
                    {<div className="form-group">
                        <label htmlFor="image">Image</label>
                        <Field type="file"
                            {...nFeed.image}
                            value={null}
                            name="image"
                            id="image"
                            onChange={handleImageUpload}
                        />
                        {nFeed.image == "" 
                            ? <img alt='No Image Is Selected'
                                height='100px'
                                width='100xp' />
                            : <img alt='preview'
                                height='100px'
                                width='100xp'
                                src={`http://176.9.19.106:1337/v0/file/${nFeed.image}`} />
                        }
                    </div>}

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
                        <button type="submit" className="btn btn-primary mr-2">Update</button>

                    </div>
                </ Form>
            )}
        />
    )
}


EditNewsFeed.defaultProps = {
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
export default EditNewsFeed;