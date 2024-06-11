import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  useCrateAdminUserMutation,
  useGetRolesQuery,
  useUpdateAdminUserMutation,
} from "../../../redux/api/userApiSlice";
import FormikFormField from "../../../components/custom/form/FormikFormField";
import FormikFormSelect from "../../../components/custom/form/FormikFormSelect";
import {
  createValidationSchema,
  initializeValues,
  updateValidationSchema,
} from "./form_config";
import { BeatLoader } from "react-spinners";

const AddUser = ({ refetch, onHide, user, ...props }) => {
  const { data: roles } = useGetRolesQuery();
  const [createAdminUser, { isError, error, isSuccess, data }] =
    useCrateAdminUserMutation();

  const [
    updateAdminUser,
    {
      isError: isErrorUpdate,
      error: errorUpdate,
      isSuccess: isSuccessUpdate,
      data: dataUpdate,
    },
  ] = useUpdateAdminUserMutation();

  const formik = useFormik({
    initialValues: { ...initializeValues },
    validationSchema: user?.id
      ? updateValidationSchema
      : createValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        if (values.image) {
          formData.append("image", values.image);
        }
        if (values.cell) {
          formData.append("cell", 0 + values.cell);
        }

        if (values.signature) {
          formData.append("signature", values.signature);
        }
        if (user?.id) {
          formData.append("_method", "PUT");
        }

        if (user?.id) {
          await updateAdminUser({
            id: user.id,
            formData,
          });
        } else {
          await createAdminUser(formData);
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
    if (user) {
      setValues({
        ...initializeValues,
        ...user,
      });
    }
  }, [user, setValues]);
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
            {user ? "ব্যবহারকারী সম্পাদনা করুনঃ" : "নতুন ব্যবহারকারী যোগ করুনঃ"}
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
                label="নাম"
                placeholder="নাম লিখুন"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                value={values.username}
                name="username"
                label="ব্যবহারকারী নাম"
                placeholder="ব্যবহারকারী নাম লিখুন"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </div>
            <div className="col-md-6">
              <FormikFormSelect
                value={values.status}
                name="status"
                label="স্ট্যাটাস"
                placeholder="স্ট্যাটাস নির্বাচন করুন"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                options={[
                  { label: "Active", value: 1 },
                  { label: "In-Active", value: 2 },
                  { label: "Pending", value: 3 },
                ]}
              />
            </div>
            <div className="col-md-6">
              <FormikFormSelect
                value={values.role_id}
                name="role_id"
                label="ভূমিকা"
                placeholder="ভূমিকা নির্বাচন করুন"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                options={roles?.data?.map((item) => ({
                  label: item.bn_name,
                  value: item.id,
                }))}
              />
            </div>
            <div className="col-md-6">
              <FormikFormSelect
                value={values.sl}
                name="sl"
                label="পদক্রমঃ"
                placeholder="পদক্রম নির্বাচন করুন"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                options={roles?.data?.map((item) => ({
                  label: item.bn_name,
                  value: item.id,
                }))}
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                value={values.cell}
                name="cell"
                label="মোবাইল নাম্বার"
                placeholder="মোবাইল নাম্বার লিখুন"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                type="number"
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                value={values.email}
                name="email"
                label="ইমেইল"
                placeholder="ইমেইল লিখুন"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                value={values.password}
                name="password"
                label="পাসওয়ার্ড"
                placeholder="পাসওয়ার্ড লিখুন"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                type="password"
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                name="image"
                label="ছবি"
                placeholder="ছবি নির্বাচন করুন"
                errors={errors}
                touched={touched}
                handleChange={(event) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
                handleBlur={handleBlur}
                type="file"
              />
            </div>
            <div className="col-md-6">
              <FormikFormField
                name="signature"
                label="স্বাক্ষর"
                placeholder="স্বাক্ষর নির্বাচন করুন"
                errors={errors}
                touched={touched}
                handleChange={(event) =>
                  setFieldValue("signature", event.currentTarget.files[0])
                }
                handleBlur={handleBlur}
                type="file"
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
                  বাতিল
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
                    "দাখিল করুন"
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

export default AddUser;
