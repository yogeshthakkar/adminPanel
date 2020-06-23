import React, { useState } from "react"


import Table from "../../../components/table/Mytable";
import { api } from "../../../api/api";
import dummyImage from '../../../../src/assets/img/portrait/small/dummyUser.jpg'
import { Trash2, Edit } from "react-feather";
import { Button } from "reactstrap";
import { history } from "../../../history";
import ModalComponent from "../../../components/Modal";
import Axios from "axios";

function ReportedNewsFeed() {
    const [itemsData, setItemsData] = useState([])
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    const deleteToggle = (selectedItem = null) => {
        console.log('delete Toggle')
        setSelectedItem(selectedItem);
        setDeleteModal(!deleteModal);
    };
    const [columns] = useState([       
        {
            Header: 'Title',
            Cell: ({ original }) => {                
                const { reportedId } = original;
                return (
                    <span>
                        {reportedId.title}
                    </span>
                )
            },
        },
        {
            Header: 'Shared With',
            Cell: ({ original }) => {
                const { reportedId } = original;
                return (
                    <span>
                        {reportedId.sharedWith === 'A'?reportedId.sharedWith='ALL':''}
                    </span>
                )
            },
        },
        {
            Header: 'Reporter User',
            Cell: ({ original }) => {
                const { userId } = original;
                return (
                    <span>
                        {userId.firstName+" "+userId.lastName}
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
                                    history.push('/EditNewsFeed', {
                                      state: { ...original.reportedId }
                                    })
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

    const handleReportedNewsFeedList = async (itemsData) => {
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
        setItemsData(response.data.data)
        setPages(Math.ceil(countData / limit));
        setPage(page);
        setLimit(limit);
        console.log(response.data.data);

        console.log(response.data.data[0].reportedId);
    }
    // handle Delete
    const handleDelete = async () => {
        const { id } = selectedItem;
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
            <h1>Reported News Feed</h1>
            <Table
                columns={columns}
                data={itemsData}
                pages={pages}
                handleTable={handleReportedNewsFeedList}
            />
            {
                <ModalComponent
                    isOpen={deleteModal}
                    toggle={deleteToggle}
                    title={'Delete'}
                    acceptButton={true}
                    acceptText={'OK'}
                    handleAccept={handleDelete}
                    rejectButton={true}
                    rejectText={'Cancle'}
                >
                    {'Are you sure you want to delete this '}?
          </ModalComponent>

            }

        </div>
    )
}

export default ReportedNewsFeed