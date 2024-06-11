import React from "react";
import MUIDataTable from "mui-datatables";

const DataTable = ({ columns, data, title }) => {
  const options = {
    filter: true,
    filterType: "dropdown",
    selectableRows: "none",
    draggableColumns: {
      enabled: true,
    },
    responsive: "standard",
    rowsPerPage: 10,
    selectableRows: "none",
    jumpToPage: true,
    elevation: 0,
  };

  return (
    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
      <MUIDataTable
        title={<h4 className="fs-6 text-secondary">{title}</h4>}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default DataTable;
