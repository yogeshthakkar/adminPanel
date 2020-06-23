import React, { useState } from "react"
import { Trash2, Edit } from "react-feather";
import { Button } from "reactstrap";
import Axios from "axios";

import Table from "../../../components/table/Mytable";
import { api } from "../../../api/api";
import dummyImage from '../../../../src/assets/img/portrait/small/dummyUser.jpg'
import ModalComponent from "../../../components/Modal";

function ReportedUser() {
    const [itemsData, setItemsData] = useState([])
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    const deleteToggle = (selectedUser = null) => {
        console.log('delete Toggle')
        setSelectedUser(selectedUser);
        setDeleteModal(!deleteModal);
    };
    const [columns] = useState([
        {
            Header: 'Avatar',
            Cell: ({ original }) => {
                const { userId } = original;
                return (
                    <div>
                        <>{userId.avatar !== ''
                            ?
                            <img src={`http://176.9.19.106:1337/v0/file/${userId.avatar}`}
                                className="rounded-circle mt-25"
                                height="48"
                                width="48" />
                            :
                            <img src={dummyImage}
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
            Header: 'Name',
            Cell: ({ original }) => {
                const { userId } = original;
                return (
                    <span>
                        {userId.firstName}
                    </span>
                )
            },
        },
        {
            Header: 'Email',
            Cell: ({ original }) => {
                const { userId } = original;
                return (
                    <span>
                        {userId.email}
                    </span>
                )
            },
        },
        {
            Header: 'Reason',
            Cell: ({ original }) => {
                const { reason } = original;
                return (
                    <span>
                        {reason.text}
                    </span>
                )
            },
        },

        {
            Header: 'Reported on date',
            Cell: ({ original }) => {
                const { createdAt } = original;
                return (
                    <span>
                        {new Date(createdAt).toLocaleDateString("en-US")}
                    </span>
                )
            },
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ original }) => {
                const { id } = original;
                return (
                    <div>
                        <>

                            <a
                                onClick={() => {
                                    // history.push('/edit', {
                                    //   state: { ...original }
                                    // })
                                }}
                                className="btn-icon rounded-circle"
                                color="flat-warning"
                            >
                                <Edit style={{ cursor: 'pointer' }} size={22} />
                            </a>
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
    ])

    let loginResponse, adminid, token, countData
    loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    adminid = loginResponse.id
    token = loginResponse.token

    const handleReportedUserList = async (itemsData) => {
        await fetchData(itemsData.page + 1, itemsData.pageSize)
    }
    const fetchData = async (page = 1, limit = 10) => {
        let response = await api(
            `v0/user/${adminid}/report?page=${page}&limit=${limit}&reportedType=4`,
            null,
            token,
            'get'
        )
        countData = response.data.data.length
        // fetch only user data
        setItemsData(response.data.data)
        setPages(Math.ceil(countData / limit));
        setPage(page);
        setLimit(limit);
        console.log(response.data.data);

        console.log(response.data.data[0].userId);
    }
    // handle Delete
    const handleDelete = async () => {
        const { id } = selectedUser;
        await Axios.delete(`http://176.9.19.106:1337/v0/user/${id}`, {
            headers: {
                "x-auth": `${token}`
            }
        })
            .then(async (result) => {
                // toast.success(`User Deleted`);
                await fetchData(page, limit);
                console.log('success');

            }).catch((err) => {
                console.log('error');

            });
        deleteToggle();
    };
    return (
        <div>
            <h1>Reported User </h1>
            <Table
                columns={columns}
                data={itemsData}
                pages={pages}
                handleTable={handleReportedUserList}
            />
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

        </div>
    )
}

export default ReportedUser