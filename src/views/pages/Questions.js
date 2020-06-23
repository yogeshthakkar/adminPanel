import React, { useState, useEffect } from 'react'
import * as Icon from 'react-feather'

import { history } from "../../history";
import { api } from "../../api/api";
import Table from "../../components/table/Mytable";
import ModalComponent from "../../components/Modal";
import { Button } from "reactstrap";

export default function PlayDates() {
    let countData
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [selectedPlayDate, setSelectedPlayDate] = useState(null);
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [userData, setUserData] = useState([]);

    let loginResponse, adminid, token
    loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    adminid = loginResponse.id
    token = loginResponse.token

    useEffect(() => {
        const fetchData = async () => {
          const result =  await api(
            `v0/user?page=1&limit=10&sort=firstName`,
            null,
            token,
            'get'
        );
        localStorage.setItem('UserDeatils',JSON.stringify(result.data))
        };
     
        fetchData();
      }, []);
    const handleQuestionList = async (data) => {
        await fetchData(data.page + 1, data.pageSize);
    }
    const fetchData = async (page = 1, limit = 10) => {
        let response = await api(
            `v0/question`,
            null,
            token,
            'get'
        )
        if (response) {
            countData = response.data.data
            console.log(countData);            
            let response_data = await api(
                `v0/question`,
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
            }
        }
    }
    const deleteToggle = (selectedPlayDate = null) => {
        console.log('delete Toggle')
        setSelectedPlayDate(selectedPlayDate)
        setDeleteModal(!deleteModal);
    };
    const handleDelete = async (event) => {
        event.preventDefault();
        console.log(selectedPlayDate);
        const { id } = selectedPlayDate
        // console.log(id);
        let response = await api(
            `v0/user/${adminid}/playdate/${id}`,
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
    const [columns] = useState([
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'User Name',
            Cell:({original})=>{
                const { userId } = original;
                return(
                    <div>{userId.firstName}</div>
                )
            }
        },
        {
            Header: 'Start Date',
            Cell:({original})=>{
                const { start } = original;
                return(
                    <div> {new Date(start).toLocaleDateString("en-US")}</div>
                )
            }
        },        
        {
            Header: 'End Date',
            Cell:({original})=>{
                const { end } = original;
                return(
                    <div> {new Date(end).toLocaleDateString("en-US")}</div>
                )
            }
        },
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
                                    history.push('/updatePlayDate', 
                                    {
                                        state: { ...original }
                                    }
                                    )}                    
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
                PLayDates List Page
                <a
                    onClick={e => history.push('/createPlayDate')}
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
                handleTable={handleQuestionList}
            />
            {
                <ModalComponent
                    // isOpen={deleteModal}
                    // toggle={deleteToggle}
                    title={'Delete Article'}
                    acceptButton={true}
                    acceptText={'OK'}
                    // handleAccept={handleDelete}
                    rejectButton={true}
                    rejectText={'Cancle'}
                >
                    {'Are you sure you want to delete this '}?
            </ModalComponent>
            }
        </React.Fragment>
    )
}

