import { apiSlice } from "./apiSlice";
import {
  ROLE_URL,
  USER_ADMIN_UPDATE,
  USER_FIND,
  USER_IMAGE,
  USER_URL,
} from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ROLE_URL,
    }),
    findUser: builder.query({
      query: (id) => USER_FIND + "/" + id,
    }),
    crateAdminUser: builder.mutation({
      query: (formData) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
    updateAdminUser: builder.mutation({
      query: ({ formData, id }) => ({
        url: `${USER_ADMIN_UPDATE}/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ formData, id }) => ({
        url: `${USER_URL}/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
    updateUserImage: builder.mutation({
      query: (data) => ({
        url: USER_IMAGE,
        method: "POST",
        body: data,
      }),
    }),
    getAdminUser: builder.query({
      query: ({ searchValue = "", currentPage = 1 }) => {
        let url = `${USER_URL}?page=${currentPage}&per_page=15`;
        if (searchValue) {
          url += `&searchText=${searchValue}`;
        }
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetRolesQuery,
  useFindUserQuery,
  useCrateAdminUserMutation,
  useUpdateAdminUserMutation,
  useUpdateUserMutation,
  useUpdateUserImageMutation,
  useGetAdminUserQuery,
} = userApiSlice;
