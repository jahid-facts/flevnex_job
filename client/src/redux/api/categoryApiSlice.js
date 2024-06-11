import { CATEGORY, CATEGORY_SHOW } from "../constants";
import { apiSlice } from "./apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => CATEGORY,
      providesTags: ["categories"],
    }),
    findCategories: builder.query({
      query: (params) => CATEGORY_SHOW + '/' + params,
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useFindCategoriesQuery } = categoryApiSlice;
