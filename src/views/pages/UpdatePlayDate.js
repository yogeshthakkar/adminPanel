import  React  from "react";
import PlayDateForm from "./PlayDateForm";
import { api } from "../../api/api";
import { history } from "../../history";

function UpdatePlayDate(props) {
    let data
    console.log('update ');
    data = props.location.state.state
    console.log(data);
    
    let loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    let token = loginResponse.token
    let adminid = loginResponse.id

    async function handleSubmit(data) {
        console.log('update', data);

        let response  = await api(
          `v0/user/${adminid}/playdate/${data.id}`,
          data,
          token,
          'patch'
        )
        if(response.status === 200){
          history.push('/playDates')
        }
    }
    return (
        <div>
            <PlayDateForm FormType="update" data={data} handleSubmit={handleSubmit} />
        </div>
    )
}

export default UpdatePlayDate;