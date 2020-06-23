import React from 'react'
import ArticleForm from './ArticleForm'

import { api } from '../../api/api';
import PlayDateForm from './PlayDateForm';
import { history } from '../../history';

function CreatePlayDate() {
    let loginResponse, adminid, token
    loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    adminid = loginResponse.id
    token = loginResponse.token
    let data
    const handleSubmit = async (data) => {
        console.log('Create handleSubmit',data);       

        let response  = await api(
            `v0/user/${data.userId}/playdate?page=1&limit=10&sort=createdAt DESC`,
            data,
            token,
            'post'
          )
          if(response.status === 200){
              console.log(response.data);              
            history.push('/playDates')
          }
          console.log('done')           

    }
    return (
        <div>
            <PlayDateForm FormType="create" data={data} handleSubmit={handleSubmit} />
        </div>
    )
}

export default CreatePlayDate;