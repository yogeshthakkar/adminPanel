// import external modules
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

// import internal(own) modules
import UserForm from '../../components/UserForm';
import { history } from '../../history';
import { api } from '../../api/api';

const EditUser = () => {
<<<<<<< HEAD
    let loginResponse, token
    loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    // adminid = loginResponse.id
    token = loginResponse.token
    // console.log('histpry location', history.location);
    const [user] = useState(history.location.state.state);
    console.log(user.firstName);
    const handleChange = (event) => {
        // alert('called')
        event.preventDefault()
=======
  const [user] = useState(history.location.state);

  const handleSubmit = async ({ firstName }) => {
    const { id } = user;
    const response = await api(`user/${id}`, { firstName }, 'patch');
    if (response.status === 200) {
      toast.success(`User Updated`);
      history.push('/users');
>>>>>>> d6ee3b01ca2052c7d87fcbfa8a030545ac8a5727
    }
    const handleSubmit = async (user) => {
    
        const { id } = user;
        console.log(user);
        console.log(id);

        const response = await api(
            `v0/user/${id}`,
            user,
            token,
            'patch'
        );
        console.log(response);

        if (response.status === 200) {
            //   toast.success(`User Updated`);
            history.push('/users');
        }
    };

    return (
        <div className="app-content">
            <Card>
                <CardHeader>
                    <h2>
                    Edit_User
                    </h2>
                </CardHeader>
                <CardBody>
                    <UserForm user={user} handleSubmit={handleSubmit}
                        handleChange={handleChange} />
                </CardBody>
            </Card>
        </div>
    );
};

export default EditUser;
