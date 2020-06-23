import React, { useState } from 'react';
import Table from '../../components/Table';
import ModalComponent from '../../components/Modal';
import { api } from '../../services/api';
import { NavLink } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { Trash2, Eye, Edit } from 'react-feather';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const fetchData = async (page = 1, limit = 10) => {
    const countData = await api(`user/count`, {}, 'get');
    console.log('countdata', countData);

    const response = await api(`user?page=${page}&limit=${limit}`, {}, 'get');
    console.log('user Response', response);
    if (response.status === 200) {
      setUsers(response.data.data);
      setPages(Math.ceil(countData.data.data / limit));
      setPage(page);
      setLimit(limit);
    }
  };

  // handle View toggle
  const viewToggle = (selectedUser = null) => {
    setSelectedUser(selectedUser);
    setViewModal(!viewModal);
  };

  const deleteToggle = (selectedUser = null) => {
    setSelectedUser(selectedUser);
    setDeleteModal(!deleteModal);
  };
  // handle Delete
  const handleDelete = async () => {
    const { id } = selectedUser;
    const response = await api(`user/${id}`, {}, 'delete');
    if (response.status === 200) {
      toast.success(`User Deleted`);
      await fetchData(page, limit);
    }
    deleteToggle();
  };

  const handleTable = async (data) => {
    console.log('table change data', data);
    await fetchData(data.page + 1, data.pageSize);
  };

  const [columns] = useState([
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ original }) => {
        const { id } = original;
        return (
          <div>
            <Button.Ripple
              className="btn-icon rounded-circle"
              color="flat-success"
              onClick={() => viewToggle(original)}
            >
              <Eye style={{ cursor: 'pointer' }} size={22} />
            </Button.Ripple>
            <>
              <Button.Ripple
                className="btn-icon rounded-circle"
                color="flat-warning"
              >
                <NavLink
                  title="Edit"
                  to={{
                    pathname: '/user/edit',
                    state: { ...original },
                  }}
                  className="btn-flat-warning"
                >
                  <Edit style={{ cursor: 'pointer' }} size={22} />
                </NavLink>
              </Button.Ripple>
              <Button.Ripple
                className="btn-icon rounded-circle"
                color="flat-danger"
              >
                <Trash2
                  onClick={() =>
                    deleteToggle({
                      id,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                  size={22}
                />
              </Button.Ripple>
            </>
          </div>
        );
      },
    },
  ]);

  return (
    <div>
      <Card>
        <CardHeader>
          <h2>Users</h2>
          <Button.Ripple className="primary">create</Button.Ripple>
        </CardHeader>

        <CardBody>
          <Table
            columns={columns}
            data={users}
            pages={pages}
            handleTable={handleTable}
          />
        </CardBody>
      </Card>
      <ModalComponent
        isOpen={deleteModal}
        toggle={deleteToggle}
        title={'Delete User'}
        acceptButton={true}
        acceptText={'OK'}
        handleAccept={handleDelete}
        rejectButton={true}
        rejectText={'Cancle'}
      >
        {'Are you sure you want to delete this user'}?
      </ModalComponent>

      {/* View Modal */}
      <ModalComponent
        isOpen={viewModal}
        toggle={viewToggle}
        title={'User_Details'}
        acceptButton={false}
        rejectButton={true}
        rejectText={'Close'}
      >
        {selectedUser && (
          <>
            <table className="user-form-table">
              <tr>
                <td>FirstName:</td>
                <td>{selectedUser.firstName}</td>
              </tr>
              <tr>
                <td>LastName:</td>
                <td>{selectedUser.lastName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{selectedUser.email}</td>
              </tr>
            </table>
          </>
        )}
      </ModalComponent>
    </div>
  );
};

export default Users;
