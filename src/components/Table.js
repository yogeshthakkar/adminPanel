// import external modules
import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const Table = ({ columns, data, pages, handleTable }) => (
  <ReactTable
    columns={columns}
    data={data}
    manual
    pages={pages}
    onFetchData={handleTable}
    defaultPageSize={10}
    className=" "
    noDataText="Data not found"
    minRows={0}
    sortable={false}
  />
);

export default Table;
