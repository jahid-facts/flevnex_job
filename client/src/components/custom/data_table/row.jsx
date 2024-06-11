import React, { useState, useEffect } from "react";
import { Box, Card, Grid, Typography, InputBase } from "@mui/material";
import Pagination from "react-bootstrap/Pagination";
import {
  AddCircle,
  Grain,
  Home,
  MoreHoriz,
  Whatshot,
  Search,
} from "@mui/icons-material";
import DropdownMenu from "../../components/DropdownMenu";
import MyVerticallyCenteredModal from "../../components/modal/BootstrapModal";
import Button from "react-bootstrap/esm/Button";
import { theme } from "../../theme";
import IconBreadcrumbs from "../../components/IconBreadcrumbs";
import { useGetApplicantQuery } from "../../redux/api/adminMemberAndApplicant";
import { Badge, Table } from "react-bootstrap";
import Loader from "../../components/Loader";

const Applicant = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemId, setItemId] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const perPage = 1;

  const {
    data: applicant,
    refetch,
    isLoading,
  } = useGetApplicantQuery({
    page: currentPage,
    perPage,
    search: searchText,
  });

  const totalData = applicant?.meta?.total;
  const lastPage = applicant?.meta?.last_page;

  const handleMenuOpen = (event, itemId) => {
    setAnchorEl(event.currentTarget);
    setItemId(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (id, actionType) => {
    handleMenuClose();
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
    refetch();
  };

  const actionItems = [
    { type: "view" },
    { type: "disabled" },
    { type: "de-active" },
  ];

  const columns = [
    { label: "ID", name: "id" },
    { label: "Name", name: "name" },
    { label: "Email", name: "email" },
    { label: "Phone", name: "phone" },
    {
      label: "Application Fee",
      name: "application_fee",
      options: {
        customBodyRender: (value) => {
          const variant = value ? "success" : "danger";
          return <Badge bg={variant}>{value ? value : "Unpaid"}</Badge>;
        },
      },
    },
    {
      label: "Action",
      name: "action",
      options: {
        customBodyRender: (value, tableMeta) => (
          <Box display="flex" pl={1}>
            <MoreHoriz
              sx={{ cursor: "pointer" }}
              onClick={(event) => handleMenuOpen(event, tableMeta.rowData[0])}
            />
            <DropdownMenu
              anchorEl={anchorEl}
              handleMenuClose={handleMenuClose}
              handleAction={(actionType) => handleAction(itemId, actionType)}
              actionItems={actionItems}
            />
          </Box>
        ),
      },
    },
  ];

  const data = applicant?.data.map((item, i) => [
    (currentPage - 1) * perPage + i + 1,
    item.name,
    item.email,
    item.phone,
    item.application_fee,
  ]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    refetch();
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    refetch();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

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
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const breadcrumbsData = [
    { icon: Home, title: "Home", url: "/" },
    {
      icon: Whatshot,
      title: "Core",
      url: "/material-ui/getting-started/installation/",
    },
    { icon: Grain, title: "Breadcrumb", url: "/my-custom-url" },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            justifyItems={"center"}
            py={1}
          >
            <IconBreadcrumbs breadcrumbs={breadcrumbsData} />
            <Button onClick={() => setModalShow(true)}>
              <AddCircle />
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card
                sx={{
                  boxShadow: theme.palette.boxShadow,
                  borderRadius: "10px",
                  padding: "5px 10px",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  bgcolor: "#ffffff",
                  p: 3,
                }}
              >
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems="center"
                  mb={2}
                >
                  <Typography fontWeight={"bold"}>Applicant</Typography>
                  <Box display="flex" alignItems="center">
                    <Search />
                    <InputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      value={searchText}
                      onChange={handleSearchChange}
                      sx={{ ml: 1, flex: 1 }}
                    />
                  </Box>
                </Box>
                {isLoading ? (
                  <Loader />
                ) : (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr className="bg-primary text-white">
                        {columns.map((column) => (
                          <th key={column.name}>{column.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((column, colIndex) => {
                            const value = row[colIndex];
                            if (
                              column.options &&
                              column.options.customBodyRender
                            ) {
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
                    </tbody>
                  </Table>
                )}

                <div className="d-flex justify-content-end align-items-center gap-3">
                  <Typography>
                    {currentPage} of {lastPage} pages
                  </Typography>
                  <Typography>Total items: {totalData}</Typography>
                  <Pagination>
                    <Pagination.First
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(1)}
                    />
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={handlePrev}
                    />
                    <Pagination.Ellipsis disabled  />
                    {generatePaginationItems()}
                    <Pagination.Ellipsis disabled />
                    <Pagination.Next
                      disabled={currentPage === lastPage}
                      onClick={handleNext}
                    />
                    <Pagination.Last
                      disabled={currentPage === lastPage}
                      onClick={() => handlePageChange(lastPage)}
                    />
                  </Pagination>
                </div>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Applicant;
