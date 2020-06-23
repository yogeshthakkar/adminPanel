import React, { useState } from "react"


import Table from "../../components/table/Mytable";
import { api } from "../../api/api";

function ReportedItems() {
    const [itemsData, setItemsData] = useState([])
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [columns] = useState([
        {
            Header: 'Reason Text',           
            Cell: ({ original }) => {
                const { reason ,reportedType} = original;
                return(
                    /* eslint-disable */
                <span>
                    {reason.text}
                    {reportedType.title}
                </span>
                )  
            },
        },
        {
            Header: 'Reported Type Title',           
            Cell: ({ original }) => {
                const { reportedType} = original;
                return(
                    /* eslint-disable */
                <span>
                    {reportedType.title}
                </span>
                )  
            },
        },
        {
            Header:'Id',
            accessor:'id'
        }
        ])

    let loginResponse, adminid, token,countData
    loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
    adminid = loginResponse.id
    token = loginResponse.token
    const handleReportedItemsList = async(itemsData) => {
        await fetchData(itemsData.page+1,itemsData.pageSize)               
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
        // console.log(response.data.data);
    }
    return (
        <Table
            columns={columns}
            data={itemsData}
            pages={pages}
            handleTable={handleReportedItemsList}
        />
    )
}

export default ReportedItems