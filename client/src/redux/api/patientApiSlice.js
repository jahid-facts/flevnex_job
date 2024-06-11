import { apiSlice } from "./apiSlice";
import { PATIENT_URL } from "../constants";

export const patientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query({
      query: ({ searchValue = "", currentPage = 1 }) => {
        let url = `${PATIENT_URL}?page=${currentPage}&per_page=10`;
        if (searchValue) {
          url += `&searchText=${searchValue}`;
        }
        return {
          url: url,
          method: "GET",
        };
      },
    }),
    findPatient: builder.query({
      query: (id) => PATIENT_URL + "/" + id,
    }),
    cratePatient: builder.mutation({
      query: (formData) => ({
        url: `${PATIENT_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
    updatePatient: builder.mutation({
      query: ({ formData, id }) => ({
        url: `${PATIENT_URL}/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `${PATIENT_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPatientQuery,
  useFindPatientQuery,
  useCratePatientMutation,
  useUpdatePatientMutation,
  useUpdatePatientQuery,
  useDeletePatientMutation,
} = patientApiSlice;
