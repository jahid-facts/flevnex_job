import * as yup from "yup";

export const initializeValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  gender: "",
  age: "",
  blood_group: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup.string().email().required("email is required"),
  phone: yup.string().required("phone is required"),
  address: yup.string().required("address is required"),
  gender: yup.string().required("gender is required"),
  age: yup.string().required("age is required"),
  blood_group: yup.string().required("blood_group is required"),
});

export const blood_group = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];
