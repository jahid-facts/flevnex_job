import React from "react";
import { Box, Typography, InputBase } from "@mui/material";
import Pagination from "react-bootstrap/Pagination";
import Loader from "../Loader";
import { Search } from "@mui/icons-material";
import { Table } from "react-bootstrap";
import "./styles.css";

const ReusableTable = ({
  columns,
  data,
  isLoading,
  currentPage,
  lastPage,
  totalData,
  onSearchChange,
  searchText,
  onPageChange,
  title,
}) => {
  const generatePaginationItems = () => {
    let items = [];
    let startPage, endPage;
    if (lastPage <= 5) {
      startPage = 1;
      endPage = lastPage;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= lastPage) {
        startPage = lastPage - 4;
        endPage = lastPage;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontWeight="bold">{title}</Typography>
        {onSearchChange && (
          <Box display="flex" alignItems="center">
            <Search />
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              sx={{ ml: 1, flex: 1, border: "none" }}
            />
          </Box>
        )}
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Box minHeight={"40vh"}>
          <Table striped bordered hover responsive>
            <thead className="p-4">
              <tr>
                {columns.map((column) => (
                  <th className="bg-success text-white " key={column.name}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.length <= 0 ? (
                <tr className="text-center">
                  <td colSpan={columns.length}>No data found</td>
                </tr>
              ) : (
                <>
                  {data?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column, colIndex) => {
                        const value = row[column.name];
                        if (column.options && column.options.customBodyRender) {
                          return (
                            <td key={colIndex}>
                              {column.options.customBodyRender(value, {
                                rowData: row,
                              })}
                            </td>
                          );
                        }
                        return <td key={colIndex}>{value}</td>;
                      })}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
        </Box>
      )}
      {data?.length > 0 && (
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <Typography sx={{ fontSize: "14px" }}>
              Total items: {totalData}
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              {currentPage} of {lastPage} pages
            </Typography>
          </div>
          <Pagination className="pt-3">
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => onPageChange(1)}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            />
            <Pagination.Ellipsis disabled />
            {generatePaginationItems()}
            <Pagination.Ellipsis disabled />
            <Pagination.Next
              disabled={currentPage === lastPage}
              onClick={() => onPageChange(currentPage + 1)}
            />
            <Pagination.Last
              disabled={currentPage === lastPage}
              onClick={() => onPageChange(lastPage)}
            />
          </Pagination>
        </div>
      )}
    </>
  );
};

export default ReusableTable;
