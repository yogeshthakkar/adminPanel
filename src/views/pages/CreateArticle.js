import React from 'react'
import ArticleForm from './ArticleForm'

import { api } from '../../api/api';

function CreateArticle(){
    let loginResponse, adminid, token
    loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    adminid = loginResponse.id
    token = loginResponse.token
    let data
    const handleSubmit=async(data)=>{
        console.log('Create handleSubmit',adminid);
        let response  = await api(
            `v0/user/${adminid}/article`,
            data,
            token,
            'post'
        )
        console.log(response);
        
    }
    return(
        <div>
            <ArticleForm create="create" data={data} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default CreateArticle;