import React, { useState } from "react"
import * as Icon from 'react-feather'

import { history } from "../../history";
import { api } from "../../api/api";
import Table from "../../components/table/Mytable";
import ModalComponent from "../../components/Modal";
import { Button } from "reactstrap";

function Articles() {
    let countData
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    let loginResponse, adminid, token
    loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    adminid = loginResponse.id
    token = loginResponse.token

    const handleArticleList = async (data) => {
        await fetchData(data.page + 1, data.pageSize);
    }
    const fetchData = async (page = 1, limit = 10) => {
        let response = await api(
            `v0/user/${adminid}/article?page=1&limit=10`,
            null,
            token,
            'get'
        )
        if (response) {
            countData = response.data.data
            console.log(countData);            
            let response_data = await api(
                `v0/user/${adminid}/article?page=1&limit=10`,
                null,
                token,
                'get'
            )
            if (response_data.status === 200) {
                console.log(response_data.data.data);
                setData(response_data.data.data)
                // setPages(Math.ceil(countData / limit));
                // setPage(page);
                // setLimit(limit);
            }
        }
    }
    const deleteToggle = (selectedArticle = null) => {
        console.log('delete Toggle')
        setSelectedArticle(selectedArticle)
        setDeleteModal(!deleteModal);
    };
    const handleDelete = async (event) => {
        event.preventDefault();
        console.log(selectedArticle);
        const { id } = selectedArticle
        console.log(id);
        let response = await api(
            `v0/user/${id}/article/${adminid}`,
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
            Header: 'Like Count',
            accessor: 'likeCount',
        },
        {
            Header: 'Comment Count',
            accessor: 'commentCount',
        },
        // {
        //     Header: 'Categories',
        //     Cell:({original})=>{
        //         const {id} = original
        //         return (
        //             <div>
        //             {id}
        //             </div>
        //         )
        //     }
        // },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ original }) => {
                const { id } = original;
                return (
                    <div>
                        <span>
                            <a href=""
                                onClick={(event) =>
                                    history.push('/updateArticle', {
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
                Articles List Page
                <a
                    onClick={e => history.push('/createArticle')}
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
                handleTable={handleArticleList}
            />
            {
                <ModalComponent
                    isOpen={deleteModal}
                    toggle={deleteToggle}
                    title={'Delete Article'}
                    acceptButton={true}
                    acceptText={'OK'}
                    handleAccept={handleDelete}
                    rejectButton={true}
                    rejectText={'Cancle'}
                >
                    {'Are you sure you want to delete this '}?
            </ModalComponent>
            }
        </React.Fragment>
    )
}

export default Articles