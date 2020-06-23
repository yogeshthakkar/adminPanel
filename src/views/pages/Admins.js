import React, { useState } from "react"
import Axios from "axios"
import * as Icon from 'react-feather';
import { CSVLink } from 'react-csv'
import json2csv from "json2csv";
import ObjectsToCsv from 'objects-to-csv';
import CsvDownloader from 'react-csv-downloader';
// Own Module
import { history } from "../../history"
import { api } from "../../api/api";
import Table from "../../components/table/Mytable";
import ModalComponent from "../../components/Modal";

function Admins() {
  let countData
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selected, setSelected] = useState(null);
  const exportList = new Set()
  const [checked, setChecked] = React.useState(false);
  let [display, setDisplay] = useState({
    show: 'block'
  })
  // for store details in tavle
  const [data, setData] = useState([]);
  let dataEx = [
    {
      name: 'abc',
      email: 'xyz'

    }
  ]
  const [ex, SetEx] = useState([])
  const [deleteModal, setDeleteModal] = useState(false);
  let loginResponse, adminid, token
  loginResponse = JSON.parse((localStorage.getItem('loginResponse')))
  adminid = loginResponse.id
  token = loginResponse.token
  let id
  // console.log(token);

  const fetchData = async (page = 1, limit = 20) => {
    let response = await api(
      `v0/admin`,
      null,
      token,
      'get'
    )
    if (response) {
      setData(response.data.data)
      countData = response.data.data.length
      // event.preventDefault();
      let response_data = await api(
        `v0/admin?page=${page}&limit=${limit}`,
        null,
        token,
        'get'
      )
      if (response_data) {
        console.log(response_data.data.data);
        setData(response_data.data.data)
        setDisplay({ show: 'none' })
        setPages(Math.ceil(countData / limit));
        setPage(page);
        setLimit(limit);
      }
    }
  }

  async function handleAdminList(data) {
    console.log('table change data', data);
    await fetchData(data.page + 1, data.pageSize);

  }
  const handleDelete = (deleteId, event) => {
    event.preventDefault()
    // console.log(deleteId);
    Axios.delete(`http://176.9.19.106:1337/v0/admin/${deleteId}`, {
      headers: {
        "x-auth": `${token}`
      }
    })
      .then(async (result) => {
        console.log(result);
        const arrayCopy = data.filter((row) => row.id !== deleteId);
        setData(arrayCopy);
        setDisplay({ show: 'none' })
        await fetchData(page, limit);

      }).catch((err) => {
        console.log(err);
      });
    setDeleteModal(!deleteModal);
  }
  const handleUpdate = (updateId, fullname, email, event) => {
    event.preventDefault()
    history.push('/updateAdmin', {
      state: { fullname, email, updateId }
    })
  }
  const deleteToggle = (selected = null) => {
    console.log('delete Toggle')
    setSelected(selected)
    setDeleteModal(!deleteModal);
  };
  const handleChange = (id, original, event) => {
    console.log(id);

    if (!exportList.has(id)) {
      exportList.add(id)
      exportList.add(original.fullname)
      exportList.add(original.email)
      console.log();
      let d = [
       ]
      // SetEx({
      //   name: 'abc2',
      //   email: 'xyz2'
      // })
      console.log('add');
      console.log(ex);

    } else {
      exportList.delete(original.id)
      exportList.delete(original.fullname)
      exportList.delete(original.email)

    }
  };
  function handleCSV(event) {
    const data = [
      {code: 'CA', name: 'California'},
      {code: 'TX', name: 'Texas'},
      {code: 'NY', name: 'New York'},
    ];
    var jsonObject = JSON.stringify(data)

    // var csv = json2csv(jsonObject)

    var exportedFilenmae = 'export' + '.csv' || 'export.csv'

    var blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })

    var link = document.createElement('a')
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', exportedFilenmae)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

  }
  const [columns] = useState([
    {
      Header: 'Select',
      accessor: 'select',
      Cell: ({ original }) => {
        const { id, fullname, email } = original;
        return (
          <div>
            <input type="checkbox"
              onChange={(event) =>
                handleChange(id, original, event)}
              key={id}
            />
          </div>
        );
      },
    },
    {
      Header: 'First Name',
      accessor: 'fullname',

    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ original }) => {
        const { id, fullname, email } = original;
        return (
          <div>
            <span>
              <a href=""
                onClick={(event) =>
                  handleUpdate(id, fullname, email, event)}
              >
                <Icon.Edit />
              </a>
            </span>
            <span style={{ marginLeft: '10px' }}>
              <a href=""
                onClick={(event) => handleDelete(id, event)}
              >
                <Icon.Trash2 style={{ color: 'red' }} />
              </a>
            </span>
          </div>
        );
      },
    },
  ]);

  return (
    <React.Fragment>
      <h4>
        Admin List Page
        {/*
          <button >
          {/**Converted Object To Array */}
            {/*<CSVLink data={JSON.stringify(dataEx)} filename="Exported.csv">Export</CSVLink>}
            
          <CsvDownloader
          filename="myfile"
          datas={ex} />
          </button>
       */ }
        <a
          onClick={e => history.push('/createAdmin')}
        >
          <span style={{ float: "right" }}>
            <Icon.PlusSquare />Create
        </span>
        </a>

      </h4>
      <Table
        columns={columns}
        data={data}
        handleTable={handleAdminList}
        sortable={true}
        pages={pages}
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

export default Admins