import React, { useEffect, useState } from "react";
import {
  useUpdateUserImageMutation,
  useUpdateUserMutation,
} from "../../../redux/api/userApiSlice";
import { assets } from "../../../assets";
import toast from "react-hot-toast";
import { useGetAuthUserQuery } from "../../../redux/api/authApiSlice";
import Loader from "../../../components/custom/Loader";
import { BeatLoader } from "react-spinners";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const { data: user, isLoading, refetch } = useGetAuthUserQuery();
  const authUserData = user?.data;

  const [signature, setSignature] = useState(null);
  const [signatureError, setSignatureError] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    enname: "",
    email: "",
    cell: "",
    username: "",
  });

  useEffect(() => {
    setUserInfo({
      name: authUserData?.name || "",
      enname: authUserData?.enname || "",
      email: authUserData?.email || "",
      cell: authUserData?.cell || "",
      username: authUserData?.username || "",
    });
  }, [authUserData]);

  const [
    updateUser,
    {
      isError: isErrorUpdate,
      error: errorUpdate,
      isSuccess: isSuccessUpdate,
      data: dataUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateUserMutation();

  const [updateImage, { isError, error, isSuccess, data }] =
    useUpdateUserImageMutation();

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      updateImage(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (isError) {
      setImage(null);
      toast.error(error?.data?.message);
    }
  }, [isError, error, isSuccess, data]);

  const validateData = errorUpdate?.data?.data;

  useEffect(() => {
    if (isSuccessUpdate) {
      refetch();
      setIsEdit(false);
      toast.success(dataUpdate?.message);
    }
    if (isErrorUpdate) {
      toast.error(errorUpdate?.data?.message);
    }
  }, [isSuccessUpdate, isErrorUpdate]);

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signature && !authUserData?.signature) {
      setSignatureError("Signature is required");
      return;
    }
    setSignatureError(null);
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", userInfo.name);
    formData.append("enname", userInfo.enname);
    formData.append("email", userInfo.email);
    formData.append("cell", userInfo.cell);
    formData.append("username", userInfo.username);
    formData.append("image", signature);
    updateUser({ id: authUserData?.id, formData });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="section py-5 service-single" style={{minHeight:"75vh"}}>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center bg-light">
            <div className="card p-3 shadow w-100">
              <nav>
                <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="true"
                  >
                    প্রোফাইল
                  </button>
                </div>
              </nav>
              <div
                className="tab-content p-3 border bg-light"
                id="nav-tabContent"
              >
                <div
                  className="tab-pane fade active show"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div className="user-edit-box">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="user-image-edit-box">
                          <div className="form-group">
                            <label>
                              <div className="user-image">
                                <img
                                  src={
                                    image
                                      ? URL.createObjectURL(image)
                                      : user?.data?.image
                                      ? user?.data?.image
                                      : assets.avatar
                                  }
                                  alt="Logo"
                                  id="EditUserImage"
                                />
                              </div>
                              <input
                                type="file"
                                className="d-none"
                                onChange={handleChange}
                              />
                              <span className="custombtn1 mt-3 ">
                                পরিবর্তন করুন
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>নাম (বাংলা)</label>
                              {isEdit === false && (
                                <p className="mb-4 fs-4">
                                  {authUserData?.name}
                                </p>
                              )}
                              {isEdit === true && (
                                <>
                                  <input
                                    onChange={handleInputChange}
                                    value={userInfo.name}
                                    name="name"
                                    type="text"
                                    className="custom-input-field"
                                    placeholder="নাম (বাংলা)"
                                    required
                                  />
                                  <div>
                                    <small className="text-danger">
                                      {validateData?.name &&
                                        validateData?.name[0]}
                                    </small>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          {(authUserData?.enname || isEdit) && (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>নাম (ইংরেজী)</label>
                                {isEdit === false && (
                                  <p className="mb-4 fs-4">
                                    {authUserData?.enname}
                                  </p>
                                )}
                                {isEdit === true && (
                                  <>
                                    <input
                                      onChange={handleInputChange}
                                      value={userInfo.enname}
                                      name="enname"
                                      type="text"
                                      className="custom-input-field"
                                      placeholder="নাম (ইংরেজী)"
                                      required
                                    />
                                    <div>
                                      <small className="text-danger">
                                        {validateData?.enname &&
                                          validateData?.enname[0]}
                                      </small>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          {(authUserData?.username || isEdit) && (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>ব্যবহারকারীর নাম (ইংরেজী)</label>
                                {isEdit === false && (
                                  <p className="mb-4 fs-4">
                                    {authUserData?.username}
                                  </p>
                                )}
                                {isEdit === true && (
                                  <>
                                    <input
                                      onChange={handleInputChange}
                                      value={userInfo.username}
                                      name="username"
                                      type="text"
                                      className="custom-input-field"
                                      placeholder="ব্যবহারকারীর নাম (ইংরেজী)"
                                      required
                                    />

                                    <div>
                                      <small className="text-danger">
                                        {validateData?.username &&
                                          validateData?.username[0]}
                                      </small>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          {(authUserData?.email || isEdit) && (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>ই-মেইল</label>
                                {isEdit === false && (
                                  <p className="mb-3 fs-4">
                                    {authUserData?.email}
                                  </p>
                                )}
                                {isEdit === true && (
                                  <>
                                    <input
                                      onChange={handleInputChange}
                                      value={userInfo.email}
                                      name="email"
                                      type="email"
                                      className="custom-input-field"
                                      placeholder="ই-মেইল"
                                      required
                                    />
                                    <div>
                                      <small className="text-danger">
                                        {validateData?.email &&
                                          validateData?.email[0]}
                                      </small>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          {(authUserData?.cell || isEdit) && (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>মোবাইল নম্বর</label>
                                {isEdit === false && (
                                  <p className="mb-3 fs-4">
                                    {authUserData?.cell}
                                  </p>
                                )}
                                {isEdit === true && (
                                  <>
                                    <input
                                      onChange={handleInputChange}
                                      value={userInfo.cell}
                                      name="cell"
                                      type="number"
                                      className="custom-input-field"
                                      placeholder="মোবাইল নম্বর"
                                      required
                                    />
                                    <div>
                                      <small className="text-danger">
                                        {validateData?.cell &&
                                          validateData?.cell[0]}
                                      </small>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          {(authUserData?.signature || isEdit) && (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  স্বাক্ষর {isEdit && "(width : 200px , height: 80px)"}
                                </label>
                                {isEdit === false && (
                                  <p className="mb-3 fs-4">
                                    <img
                                      src={
                                        signature
                                          ? URL.createObjectURL(signature)
                                          : authUserData?.signature
                                      }
                                      style={{ height: "80px" }}
                                    />
                                  </p>
                                )}
                                {isEdit === true && (
                                  <div>
                                    <label
                                      htmlFor="signature"
                                      className="custombtn2"
                                    >
                                      <small> স্বাক্ষর পরিবর্তন করুন</small>
                                    </label>
                                    <input
                                      id="signature"
                                      type="file"
                                      onChange={(e) => {
                                        setSignature(e.target.files[0]);
                                      }}
                                      className="custom-input-field"
                                      placeholder="মোবাইল নম্বর"
                                      hidden
                                    />

                                    <div>
                                      <small className="text-danger">
                                        {signatureError && signatureError}
                                      </small>
                                    </div>

                                    {signature && isEdit && (
                                      <div className="form-group">
                                        <div className="py-3">
                                          <img
                                            src={URL.createObjectURL(signature)}
                                            style={{ height: "80px" }}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          <div className="col-md-12 ">
                            <div className="text-center">
                              {isEdit === false && (
                                <button
                                  className="custombtn2 mt-3"
                                  onClick={() => setIsEdit(true)}
                                >
                                  {" "}
                                  সম্পাদনা করুন
                                </button>
                              )}
                              {isEdit === true && (
                                <button
                                  type="submit"
                                  className="custombtn2 mt-5"
                                  disabled={isLoadingUpdate}
                                >
                                  {isLoadingUpdate ? (
                                    <BeatLoader />
                                  ) : (
                                    "সংরক্ষণ করুন"
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
