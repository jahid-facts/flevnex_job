import * as yup from "yup";

export const initializeValues = {
  name: "",
  username: "",
  status: "",
  role_id: "",
  sl: "",
  cell: "",
  email: "",
  password: "",
  image: null,
  signature: null,
};

export const createValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("নাম দেওয়া প্রয়োজন")
    .max(255, "নাম সর্বাধিক ২৫৫ অক্ষরের হতে হবে"),
  username: yup
    .string()
    .required("ব্যবহারকারী নাম দেওয়া প্রয়োজন")
    .max(255, "ব্যবহারকারী নাম সর্বাধিক ২৫৫ অক্ষরের হতে হবে"),
  status: yup
    .string()
    .required("স্ট্যাটাস দেওয়া প্রয়োজন")
    .max(255, "স্ট্যাটাস সর্বাধিক ২৫৫ অক্ষরের হতে হবে"),
  role_id: yup
    .number("ভূমিকা আইডি সংখ্যা হতে হবে")
    .required("ভূমিকা আইডি দেওয়া প্রয়োজন"),
  sl: yup.number("ভূমিকা আইডি সংখ্যা হতে হবে").required("এসআই দেওয়া প্রয়োজন"),
  cell: yup.number().required("সেল নম্বর দেওয়া প্রয়োজন"),
  email: yup
    .string()
    .required("ই-মেইল দেওয়া প্রয়োজন")
    .email("ই-মেইল বৈধ হতে হবে")
    .max(255, "ই-মেইল সর্বাধিক ২৫৫ অক্ষরের হতে হবে"),
  password: yup
    .string()
    .required("পাসওয়ার্ড দেওয়া প্রয়োজন")
    .min(6, "পাসওয়ার্ড সর্বনিম্ন ৬ অক্ষরের হতে হবে")
    .max(20, "পাসওয়ার্ড সর্বাধিক ২০ অক্ষরের হতে হবে"),
  image: yup
    .mixed()
    .required("ছবি দেওয়া প্রয়োজন")
    .test("fileType", "অবাঞ্ছিত ফাইল ফরম্যাট", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      );
    }),
  signature: yup
    .mixed()
    .required("স্বাক্ষর দেওয়া প্রয়োজন")
    .test("fileFormat", "অবাঞ্ছিত ফাইল ফরম্যাট", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      );
    }),
});
export const updateValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("নাম দেওয়া প্রয়োজন")
    .max(255, "নাম সর্বাধিক ২৫৫ অক্ষরের হতে হবে"),
  username: yup
    .string()
    .required("ব্যবহারকারী নাম দেওয়া প্রয়োজন")
    .max(255, "ব্যবহারকারী নাম সর্বাধিক ২৫৫ অক্ষরের হতে হবে"),
  status: yup
    .string()
    .required("স্ট্যাটাস দেওয়া প্রয়োজন")
    .max(255, "স্ট্যাটাস সর্বাধিক ২৫৫ অক্ষরের হতে হবে"),
  role_id: yup
    .number("ভূমিকা আইডি সংখ্যা হতে হবে")
    .required("ভূমিকা আইডি দেওয়া প্রয়োজন"),
  sl: yup.number("ভূমিকা আইডি সংখ্যা হতে হবে").required("এসআই দেওয়া প্রয়োজন"),
  cell: yup.number().required("সেল নম্বর দেওয়া প্রয়োজন"),
  email: yup
    .string()
    .required("ই-মেইল দেওয়া প্রয়োজন")
    .email("ই-মেইল বৈধ হতে হবে")
    .max(255, "ই-মেইল সর্বাধিক ২৫৫ অক্ষরের হতে হবে"),
});
