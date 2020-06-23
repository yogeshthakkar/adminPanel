import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

import { history } from '../../history';
import ArticleForm from './ArticleForm'
import { api } from '../../api/api';

function UpdateArticle(props) {
  let data
  console.log('update Article');
  data = props.location.state.state

  // if(props.create !== 'create'){
  //   console.log(props.location.state.state);
  // }

  let loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
  let token = loginResponse.token
  let adminid = loginResponse.id


  async function handleSubmit(data) {
        console.log('update', data);
    
    let response  = await api(
      `v0/user/${data.id}/article/${adminid}`,
      data,
      token,
      'patch'
    )
    if(response.status === 200){
      history.push('/articles')
    }
  }
  return (
    <div>
      <ArticleForm update="update" data={data} handleSubmit={handleSubmit} />
    </div>
  )
}

export default UpdateArticle;