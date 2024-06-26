import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logOut())
          dispatch(apiSlice.util.resetApiState())
        } catch (err) {
          console.log(err)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const  data  = await queryFulfilled;
          const obj = {accessToken : data.data}
          dispatch(setCredentials(obj));
        } catch (err) {
          console.log(err)
        }
      }
    }),
  })
})

export const {
  useLoginMutation,
  useRefreshMutation,
  useSendLogoutMutation
} = authApiSlice;