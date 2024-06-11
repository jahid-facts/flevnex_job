// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants";
// import { setToken, logout } from './authSlice';
// import { refreshToken as refreshAuthToken } from './refreshToken';

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth?.token?.access_token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshToken = api.getState().auth?.token?.refresh_token;
//     const newToken = await refreshAuthToken(refreshToken, api.dispatch);

//     if (newToken) {
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["User", "categories"],
//   endpoints: () => ({}),
// });


// import axios from 'axios';
// import { BASE_URL } from '../constants';
// import { setToken, logout } from './authSlice';

// export const refreshToken = async (refreshToken, dispatch) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
//       token: refreshToken,
//     });
//     dispatch(setToken(response.data.accessToken));
//     return response.data.accessToken;
//   } catch (error) {
//     dispatch(logout());
//     return null;
//   }
// };
