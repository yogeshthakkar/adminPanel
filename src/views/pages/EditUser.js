// import external modules
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { toast } from 'react-toastify';

// import internal(own) modules
import UserForm from '../../components/UserForm';
import { api } from '../../services/api';
import { history } from '../../history';

const EditUser = () => {
  console.log('histpry locayion', history.location);
  const [user] = useState(history.location.state);

  const handleSubmit = async ({ firstName }) => {
    const { id } = user;
    const response = await api(`user/${id}`, { firstName }, 'patch');
    if (response.status === 200) {
      toast.success(`User Updated`);
      history.push('/users');
    }
  };

  return (
    <div className="app-content">
      <Card>
        <CardHeader>
          <h2>{'Edit_User'}</h2>
        </CardHeader>
        <CardBody>
          <UserForm edit={true} {...user} handleSubmit={handleSubmit} />
        </CardBody>
      </Card>
    </div>
  );
};

export default EditUser;
