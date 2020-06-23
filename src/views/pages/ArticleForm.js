import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { history } from '../../history';
import { Input, FormGroup } from 'reactstrap';
import { api } from '../../api/api';

function ArticleFrom(props) {
  let title = '', content = '', status = '', ImageId
  let [showAvatar, setShowAvatar] = useState({
    file: '',
    avatar: ''
  })
  let arr = [1, 2, 3, 4]
  let [data, setData] = useState([])
  console.log(' Article');

  // if (props.update === 'update') {
  //   setData(props.data)
  //   console.log(props.data);
  // }
    console.log(props.data);

  let loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
  let token = loginResponse.token
  let adminid = loginResponse.id

  async function onload(event) {
    event.preventDefault()
    let response_data = await api(
      `v0/user/${adminid}/category`,
      null,
      token,
      'get'
    )
    if (response_data.status === 200) {
      console.log(response_data.data.data);
      setData(response_data.data.data)
    }
  }
  async function handleChange(event) {
    event.preventDefault()
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

  }


  return (
    <Formik
      initialValues={{
       ...props.data

      }}
      validationSchema={Yup.object().shape({
        content: Yup.string()
          .typeError('content must be String')
          .required('Content is need'),
        wordpressPostId:Yup.number()
        .typeError('Word Press Id is Required')

      })}
      onSubmit={props.handleSubmit}
      render={({ errors, status,setFieldValue, touched, handleSubmit }) => (
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
            <label htmlFor="content">Content</label>
            <Field name="content" type="text" className={'form-control' + (errors.content ? ' is-invalid' : '')} />
            <ErrorMessage name="content" component="div" className="invalid-feedback" />
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

          <div>
            <FormGroup>
              <h5 className="text-bold-600" >Categories</h5>
              <Input
                type="select"
                name="categories"
                id="categories"
                onChange={onload}
                multiple
              >
              <option >Select</option>
                {data.map((val) =>
                  <option key={val.id}>{val.id}</option>
                )}
              </Input>
            </FormGroup>
          </div>
              
          <div className="form-group">
            <label htmlFor="wordpressPostId">Word Press ID</label>
            <Field name="wordpressPostId" 
            type="number" 
            className={'form-control' + (errors.wordpressPostId ? ' is-invalid' : '')} />
            <ErrorMessage name="content" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <Field name="status" type="text" className={'form-control' + (errors.email ? ' is-invalid' : '')} />
            <ErrorMessage name="content" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="articleType">Article Type</label>
            <Field as="select" name="articleType"
              className={'form-control'} 
            >
              <option 
              value="default" 
              onChange={selectedOptions => {
                setFieldValue("articleType", selectedOptions)
              }}
              >Default</option>

              <option 
              value='sponsored' 
              onChange={selectedOptions => {
                setFieldValue("articleType", selectedOptions)
              }}
              >Sponsored</option>

              <option 
              value='advert' 
              onChange={selectedOptions => {
                setFieldValue("articleType", selectedOptions)
              }}
              >Anzeige</option>
             
            </Field>     
          </div>

          <div className="form-group">
            <button type="submit"
              className="btn btn-primary mr-2"
            >{props.create === 'create' ? "Create" : "Update"}</button>

          </div>
        </Form>
      )}
    />
  )
}


ArticleFrom.defaultProps = {
  title: '',
  content: '',
  image: '',
  categories: '',
  expirationDate: '',
  wordpressPostId: '',
  status: '',
  articleType: '',  
  handleSubmit: () => { }
};
export default ArticleFrom;