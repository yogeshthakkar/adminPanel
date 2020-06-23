import React, { useState } from 'react';
import Table from '../../components/table/Mytable';

import { Col } from 'reactstrap';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { Trash2,  Edit } from 'react-feather';
import {  toast } from 'react-toastify';
import Axios from 'axios';
import { history } from "../../history"

import ModalComponent from '../../components/Modal'
import { api } from '../../api/api';
import userImg from '../../../src/assets/img/portrait/small/dummyUser.jpg'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
<<<<<<< HEAD
  
  let loginResponse, adminid, token
  loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
  adminid = loginResponse.id
  token = loginResponse.token
  let countData
  const fetchData = async (page = 1, limit = 20) => {

    await Axios.get(`http://176.9.19.106:1337/v0/user?page=1&limit=10&sort=firstName `, {
      headers: {
        "Accept-Language": "en",
        "x-auth": `${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((result) => {
        console.log('success', result);
        setUsers(result.data.data);
        countData = result.data.data.length
        // console.log(countData);

        Axios.get(`http://176.9.19.106:1337/v0/user?page=${page}&limit=${limit}&sort=firstName ASC`, {
          headers: {
            "Accept-Language": "en",
            "x-auth": `${token}`,
            "Content-Type": "application/json"
          }
        })
          .then((response) => {
            if (response.status === 200) {
              setUsers(response.data.data);
              setPages(Math.ceil(countData / limit));
              setPage(page);
              setLimit(limit);
            }
          }).catch((error) => {
            console.log('user Response', error);
          });
      }).catch((err) => {
        console.log('error', err);
      });
=======

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
>>>>>>> d6ee3b01ca2052c7d87fcbfa8a030545ac8a5727
  };

  // handle View toggle
  const viewToggle = (selectedUser = null) => {
    setSelectedUser(selectedUser);
    setViewModal(!viewModal);
  };

  const deleteToggle = (selectedUser = null) => {
    console.log('delete Toggle')
    setSelectedUser(selectedUser);
    setDeleteModal(!deleteModal);
  };
  // handle Delete
  const handleDelete = async () => {
    const { id } = selectedUser;
    await Axios.delete(`http://176.9.19.106:1337/v0/user/${id}`, {
      headers: {
        "x-auth": `${token}`
      }
    })
      .then(async (result) => {
        toast.success(`User Deleted`);
        await fetchData(page, limit);
        console.log('success');

      }).catch((err) => {
        console.log('error');

      });
    deleteToggle();
  };

  const handleTable = async (data) => {
    console.log('table change data', data);
    await fetchData(data.page + 1, data.pageSize);
  };
<<<<<<< HEAD
  const handleSearch = async (event) => {
    event.preventDefault();
    let search = event.target.value
    // console.log()
    let response = await api(
      `v0/user/?name=${search}`,
      null,
      token,
      'get'
    )
    setUsers(response.data.data);

  }
=======

>>>>>>> d6ee3b01ca2052c7d87fcbfa8a030545ac8a5727
  const [columns] = useState([
    {
      Header: 'Avatar',
      accessor: 'avatar',
      Cell: ({ original }) => {
        const { avatar } = original;
        return (
          <div>
            <>{avatar !== ''
            ?
              <img src={`http://176.9.19.106:1337/v0/file/${avatar}`}
                className="rounded-circle mt-25"                
                height="48"
                width="48" />              
            :
            <img src={userImg}
              className="rounded-circle mt-25"                
              height="48"
              width="48" />
            }
            </>
          </div>
        );
      },
    },
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
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'User Type',
      accessor: 'userType',
    },
    {
      Header: 'Relationship Status',
      accessor: 'relationshipStatus',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ original }) => {
        const { id } = original;
        return (
          <div>
            {/*<Button.Ripple
              className="btn-icon rounded-circle"
              color="flat-success"
              onClick={() => viewToggle(original)}
            >
              <Eye style={{ cursor: 'pointer' }} size={22} />
            </Button.Ripple>
            */}
            <>
<<<<<<< HEAD

              <a
                onClick={() => {
                  history.push('/edit', {
                    state: { ...original }
                  })
                }}
                className="btn-icon rounded-circle"
                color="flat-warning"
              >
                <Edit style={{ cursor: 'pointer' }} size={22} />
              </a>
=======
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
>>>>>>> d6ee3b01ca2052c7d87fcbfa8a030545ac8a5727
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
<<<<<<< HEAD
          <h2>
            Users
            <span>
              <Col md="6" sm="12">
                <input
                  type="text"
                  placeholder="search"
                  style={{ marginLeft: '600px', borderRadius: '1px' }}
                  className={`form-control input `}
                  onChange={handleSearch}
                />
              </Col>
            </span>
          </h2>
=======
          <h2>Users</h2>
          <Button.Ripple className="primary">create</Button.Ripple>
>>>>>>> d6ee3b01ca2052c7d87fcbfa8a030545ac8a5727
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
      {
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

      }
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
