import React, { useCallback, useState, useEffect } from "react";
import { Box, Tooltip } from "@mui/material";
import debounce from "lodash/debounce";
import ReusableTable from "../../../components/custom/data_table/ReusableTable";
import { Badge, Button } from "react-bootstrap";
import Loader from "../../../components/custom/Loader";
import { Link } from "react-router-dom";
import { AddCircle, Home, People } from "@mui/icons-material";
import IconBreadcrumbs from "../../../components/custom/IconBreadcrumbs";
import { assets } from "../../../assets";
import AddPatient from "./AddPatient";
import Swal from "sweetalert2";
import ShowPatient from "./ShowPatient";
import {
  useDeletePatientMutation,
  useGetPatientQuery,
} from "../../../redux/api/patientApiSlice";
import toast from "react-hot-toast";

const Patient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [patient, setPatient] = useState(null);

  const {
    data: adminPatient,
    isLoading,
    refetch,
  } = useGetPatientQuery({
    currentPage,
    searchValue,
  });

  const [
    deletePatient,
    {
      isLoading: isLoadingDelete,
      data: dataDelete,
      isError: isErrorDelete,
      isSuccess: isSuccessDelete,
      errorDelete,
    },
  ] = useDeletePatientMutation();

  const totalData = adminPatient?.meta?.total;
  const lastPage = adminPatient?.meta?.last_page;

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

  useEffect(() => {
    if (isErrorDelete) {
      toast.error(errorDelete?.data?.message);
    }
    if (isSuccessDelete) {
      refetch();
      toast.success("Patient deleted");
    }
  }, [isErrorDelete, isSuccessDelete, errorDelete, dataDelete]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePatient(id);
      }
    });
  };

  const columns = [
    { label: "SI", name: "si" },
    { label: "Name", name: "name" },
    { label: "Phone", name: "phone" },
    { label: "Address", name: "address" },
    {
      label: "Gender",
      name: "gender",
      options: {
        customBodyRender: (value) => {
          let status, color;

          switch (value) {
            case "male":
              status = "Male";
              color = "success";
              break;
            case "female":
              status = "Female";
              color = "danger";
              break;
            default:
              status = "Other";
              color = "warning";
              break;
          }

          return <Badge bg={color}>{status}</Badge>;
        },
      },
    },
    {
      label: "Action",
      name: "action",
      options: {
        customBodyRender: (value, tableMeta) => (
          <Box display={"flex"} gap={1}>
            <Tooltip title="Edit" placement="top" arrow>
              <Badge
                bg="warning"
                className="p-2"
                onClick={() => {
                  setPatient(value);
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
                  setPatient(value);
                  setShowPatientModal(true);
                }}
                style={{ cursor: "pointer" }}
              >
                View
              </Badge>
            </Tooltip>
            <Tooltip title="View" placement="top" arrow>
              <Badge
                bg="danger"
                className="p-2"
                onClick={() => {
                  handleDelete(value.id);
                }}
                style={{ cursor: "pointer" }}
              >
                Delete
              </Badge>
            </Tooltip>
          </Box>
        ),
      },
    },
  ];

  const data = adminPatient?.data.map((item, i) => ({
    si: (currentPage - 1) * 15 + i + 1,
    id: item.id,
    action: item,
    name: item.name,
    phone: item.phone,
    address: item.address,
    gender: item.gender,
  }));

  const breadcrumbsData = [
    { icon: Home, title: "Home", url: "/" },
    {
      icon: People,
      title: "Patient",
      url: "/admin/patients",
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
              setPatient(null);
              setShowModal(true);
            }}
          >
            <AddCircle /> Add Patient
          </Button>
        </Box>
        <ReusableTable
          title={"Patient List"}
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
      <AddPatient
        patient={patient}
        show={showModal}
        refetch={refetch}
        onHide={() => {
          setShowModal(false);
          setPatient(null);
        }}
      />
      <ShowPatient
        patient={patient}
        setPatient={setPatient}
        show={showPatientModal}
        onHide={() => {
          setShowPatientModal(false);
          setPatient(null);
        }}
      />
    </div>
  );
};

export default Patient;
