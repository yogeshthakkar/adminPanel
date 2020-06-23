import React, { useState } from "react"
import * as Icon from 'react-feather'

import { history } from "../../history";
import { api } from "../../api/api";
import Table from "../../components/table/Mytable";
import Axios from "axios";
import ModalComponent from "../../components/Modal";
import { Button } from "reactstrap";

function NewsFeed() {
    let countData
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [selectedFeed, setSelectedFeed] = useState(null);
    // for store details in tavle
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    let loginResponse, adminid, token
    loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    adminid = loginResponse.id
    token = loginResponse.token

    const handleNewsFeedList = async (data) => {
        await fetchData(data.page + 1, data.pageSize);
    }
    const fetchData = async (page = 1, limit = 10) => {
        let response = await api(
            `v0/user/${adminid}/newsfeed`,
            null,
            token,
            'get'
        )
        if (response) {
            setData(response.data.data)
            countData = response.data.data.length
            // console.log(countData);

            // event.preventDefault();
            let response_data = await api(
                `v0/user/${adminid}/newsfeed?page=${page}&limit=${limit}`,
                null,
                token,
                'get'
            )
            if (response_data.status === 200) {
                console.log(response_data.data.data);
                setData(response_data.data.data)
                setPages(Math.ceil(countData / limit));
                setPage(page);
                setLimit(limit);
                console.log(limit);
            }
        }
    }
    const deleteToggle = (selectedFeed = null) => {
        console.log('delete Toggle')
        setSelectedFeed(selectedFeed)
        setDeleteModal(!deleteModal);
    };
    const handleDelete = async (event) => {
        event.preventDefault();
        // console.log(selectedFeed);

        const { id } = selectedFeed
        console.log(id);
        let response = await api(
            `v0/user/${adminid}/newsfeed/${id}`,
            null,
            token,
            'delete'
        )
        if (response.status === 200) {
            console.log('Success');
            await fetchData(page, limit);
        } else {
            console.log('Error');
        }
        deleteToggle();
    }
    const handleUpdate = async(id,event)=>{
        event.preventDefault();
        console.log(id);
        
        alert('hanlde update')
    }
    const [columns] = useState([
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Comment Count',
            accessor: 'commentCount',
        },
        {
            Header: 'Like Count',
            accessor: 'likeCount',
        },{
            Header: 'Action',
            accessor: 'action',
            Cell: ({ original }) => {
                const { id } = original;
                return (
                    <div>
                        <span>
                            <a href=""
                                onClick={(event) =>
                                    history.push('/editNewsFeed', {
                                        state: { ...original }
                                      })}                    
                            >
                            <Icon.Edit />
                            </a>
                        </span>
                        <span style={{ marginLeft: '10px' }}>
                            <Button.Ripple
                                className="btn-icon"
                                color="flat-danger"
                            >
                                <Icon.Trash2
                                    onClick={() =>
                                        deleteToggle({
                                            id,
                                        })
                                    }
                                    style={{ cursor: 'pointer' }}
                                    size={22}
                                />
                            </Button.Ripple>
                        </span>
                    </div>
                );
            },
        },

    ]);

    return (
        <React.Fragment>
            <h4>
                NewsFeed List Page
                <a
                    onClick={e => history.push('/createNewsFeed')}
                >
                    <span style={{ float: "right" }}>
                        <Icon.PlusSquare />Create
                    </span>
                </a>
            </h4>
            <Table
                columns={columns}
                data={data}
                pages={pages}
                handleTable={handleNewsFeedList}
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
        </React.Fragment>
    )
}

export default NewsFeed