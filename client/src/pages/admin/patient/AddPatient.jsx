import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import FormikFormField from "../../../components/custom/form/FormikFormField";
import FormikFormSelect from "../../../components/custom/form/FormikFormSelect";
import {
  blood_group,
  createValidationSchema,
  initializeValues,
  updateValidationSchema,
  validationSchema,
} from "./form_config";
import { BeatLoader } from "react-spinners";
import {
  useCratePatientMutation,
  useUpdatePatientMutation,
} from "../../../redux/api/patientApiSlice";

const AddPatient = ({ refetch, onHide, patient, ...props }) => {
  const [createAdminPatient, { isError, error, isSuccess, data }] =
    useCratePatientMutation();

  const [
    updateAdminPatient,
    {
      isError: isErrorUpdate,
      error: errorUpdate,
      isSuccess: isSuccessUpdate,
      data: dataUpdate,
    },
  ] = useUpdatePatientMutation();

  const formik = useFormik({
    initialValues: { ...initializeValues },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        if (patient?.id) {
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
          });
          await updateAdminPatient({
            id: patient.id,
            formData: formData,
          });
        } else {
          await createAdminPatient(values);
        }
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    setErrors,
    isSubmitting,
    resetForm,
  } = formik;

  useEffect(() => {
    if (patient) {
      setValues({
        ...initializeValues,
        ...patient,
        _method: "PUT",
      });
    }
  }, [patient, setValues]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
      setErrors(handleServerErrors(error?.data?.data || {}));
    }
    if (isSuccess) {
      refetch();
      onHide();
      resetForm();
      toast.success(data?.message);
    }
  }, [isError, isSuccess, error, data]);

  useEffect(() => {
    if (isErrorUpdate) {
      toast.error(errorUpdate?.data?.message);
      setErrors(handleServerErrors(errorUpdate?.data?.data || {}));
    }
    if (isSuccessUpdate) {
      refetch();
      onHide();
      resetForm();
      toast.success(dataUpdate?.message);
    }
    // eslint-disabled-next-line
  }, [isErrorUpdate, isSuccessUpdate, errorUpdate, dataUpdate]);

  const handleServerErrors = (serverErrors) => {
    const errors = {};
    Object.keys(serverErrors).forEach((field) => {
      errors[field] = serverErrors[field].join(", ");
    });
    return errors;
  };

  return (
    <Modal
      {...props}
      onHide={() => {
        onHide();
        resetForm();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="fw-bold px-3">
            {patient ? "Update" : "Create"} Patient
          </span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <FormikFormField
                value={values.name}
                name="name"
                label="Name"
                placeholder="Enter your name"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                value={values.email}
                name="email"
                label="email"
                placeholder="Enter a valid email"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                type={"email"}
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                value={values.phone}
                name="phone"
                label="Phone"
                placeholder="Enter phone number"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                value={values.address}
                name="address"
                label="Address"
                placeholder="Enter address"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                value={values.age}
                name="age"
                label="Age"
                placeholder="Enter age"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </div>
            <div className="col-md-6">
              <FormikFormSelect
                value={values.gender}
                name="gender"
                label="Gender"
                placeholder="select gender"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />
            </div>
            <div className="col-md-6">
              <FormikFormSelect
                value={values.blood_group}
                name="blood_group"
                label="Blood Group"
                placeholder="select blood group"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                options={blood_group}
              />
            </div>
            <div className="col-md-12">
              <hr />
              <div className="d-flex justify-content-between align-items-center pt-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    onHide();
                    resetForm();
                  }}
                  style={{ width: "100px" }}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "150px" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <BeatLoader className="text-white" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPatient;
