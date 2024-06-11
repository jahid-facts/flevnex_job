import React, { useCallback, useState, useEffect } from "react";
import { useGetAdminUserQuery } from "../../../redux/api/userApiSlice";
import { Box, Tooltip } from "@mui/material";
import debounce from "lodash/debounce";
import ReusableTable from "../../../components/custom/data_table/ReusableTable";
import { Badge, Button } from "react-bootstrap";
import Loader from "../../../components/custom/Loader";
import { Link } from "react-router-dom";
import { AddCircle, Home, People } from "@mui/icons-material";
import IconBreadcrumbs from "../../../components/custom/IconBreadcrumbs";
import { assets } from "../../../assets";
import AddUser from "./AddUser";
import ShowUser from "./ShowUser";

const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [user, setUser] = useState(null);

  const {
    data: adminUser,
    isLoading,
    refetch,
  } = useGetAdminUserQuery({
    currentPage,
    searchValue,
  });

  const totalData = adminUser?.meta?.total;
  const lastPage = adminUser?.meta?.last_page;

  const debouncedSearch = useCallback(
    debounce((value) => {
      setCurrentPage(1);
      setSearchValue(value);
      refetch();
    }, 400),
    []
  );

  useEffect(() => {
    // Cleanup function to cancel the debounce when the component unmounts or debouncedSearch changes
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (value) => {
    setSearchText(value);
    debouncedSearch(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const columns = [
    { label: "SI", name: "si" },
    {
      label: "ছবি",
      name: "image",
      options: {
        customBodyRender: (value) => {
          return (
            <img src={value} style={{ height: "50px", borderRadius: "10px" }} />
          );
        },
      },
    },
    { label: "নাম", name: "name" },
    {
      label: "পদবী",
      name: "role",
      options: {
        customBodyRender: (value) => {
          return <Badge bg={"success"}>{value}</Badge>;
        },
      },
    },

    { label: "ব্যবহারকারী নাম", name: "username" },
    { label: "ই-মেইল", name: "email" },
    { label: "মোবাইল নং", name: "phone" },
    {
      label: "স্ট্যাটাস",
      name: "status",
      options: {
        customBodyRender: (value) => {
          let status, color;

          switch (value) {
            case 1:
              status = "active";
              color = "success";
              break;
            case 2:
              status = "In-Active";
              color = "danger";
              break;
            case 3:
              status = "Padding";
              color = "warning";
              break;
            default:
              status = null;
              color = null;
          }

          return <Badge bg={color}>{status}</Badge>;
        },
      },
    },
    {
      label: "ক্রিয়াকলাপ",
      name: "action",
      options: {
        customBodyRender: (value, tableMeta) => (
          <Box display={"flex"} gap={1}>
            <Tooltip title="Edit" placement="top" arrow>
              <Badge
                bg="warning"
                className="p-2"
                onClick={() => {
                  setUser(value);
                  setShowModal(true);
                }}
                style={{ cursor: "pointer" }}
              >
                Edit
              </Badge>
            </Tooltip>
            <Tooltip title="View" placement="top" arrow>
              <Badge
                bg="primary"
                className="p-2"
                onClick={() => {
                  setUser(tableMeta?.rowData);
                  setShowUserModal(true);
                }}
                style={{ cursor: "pointer" }}
              >
                View
              </Badge>
            </Tooltip>
          </Box>
        ),
      },
    },
  ];

  const data = adminUser?.data.map((item, i) => ({
    si: (currentPage - 1) * 15 + i + 1,
    id: item.id,
    action: {
      id: item.id,
      name: item.name,
      email: item.email,
      cell: item.cell,
      role_id: Number(item.role?.id),
      username: item.username,
      status: Number(item.status),
      sl: Number(item.sl),
    },
    name: item.name,
    image: item.image ? item.image : assets.avatar,
    email: item.email,
    username: item.username,
    phone: item.cell,
    role: item.role?.name,
    status: Number(item.status),
    signature: item.signature,
  }));

  const breadcrumbsData = [
    { icon: Home, title: "হোম", url: "/" },
    {
      icon: People,
      title: "ব্যবহারকারীর তালিকাঃ",
      url: "/admin/users",
      active: true,
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        justifyItems={"center"}
        py={1}
      >
        <IconBreadcrumbs breadcrumbs={breadcrumbsData} />
      </Box>
      <div className="dashboard-layout p-4">
        <Box
          display={"flex"}
          justifyContent={"end"}
          justifyItems={"center"}
          pb={2}
        >
          <Button
            onClick={() => {
              setUser(null);
              setShowModal(true);
            }}
          >
            <AddCircle /> ব্যবহারকারী যোগ করুন
          </Button>
        </Box>
        <ReusableTable
          title={"ব্যবহারকারীর তালিকাঃ"}
          columns={columns}
          data={data}
          isLoading={isLoading}
          currentPage={currentPage}
          lastPage={lastPage}
          totalData={totalData}
          onSearchChange={handleSearchChange}
          searchText={searchText}
          onPageChange={handlePageChange}
        />
      </div>
      <AddUser
        user={user}
        show={showModal}
        refetch={refetch}
        onHide={() => {
          setShowModal(false);
          setUser(null);
        }}
      />
      <ShowUser
        user={user}
        show={showUserModal}
        onHide={() => {
          setShowUserModal(false);
          setUser(null);
        }}
      />
    </div>
  );
};

export default User;
