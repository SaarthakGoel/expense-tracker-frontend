import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === 'deployement' ?  'http://localhost:3500' : 'https://pocket-khata-api.vercel.app/',
  credentials: 'include', // Include credentials (cookies)
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args , api , extraOptions) => {
  let result = await baseQuery(args , api , extraOptions);
  if(result?.error?.status === 403){
    const refreshResult = await baseQuery('auth/refresh' , api , extraOptions)
    if(refreshResult?.data) {
      const accessToken = refreshResult.data;
      api.dispatch(setCredentials({accessToken}))
      result = await baseQuery(args , api , extraOptions)
    }else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired."
    }
    return refreshResult
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery : baseQueryWithReauth,
  tagTypes : ['User' , 'Expense' , 'Investment' , 'Loan' , 'UserData'],
  endpoints: (builder) => ({
    generateReport: builder.mutation({
      query: (userData) => ({
        url: '/api/gemenai', // Adjust URL based on your backend setup
        method: 'POST',
        body: { userData },
      }),
    }),
  })
})

export const {useGenerateReportMutation} = apiSlice; 