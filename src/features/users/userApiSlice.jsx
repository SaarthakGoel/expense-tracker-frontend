import { apiSlice } from "../../app/api/apiSlice";



export const userApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    createUser : builder.mutation({
      query : (initialUserData) => ({
         url : '/users',
         method : 'POST',
         body : {...initialUserData}
      }),
      invalidatesTags : [{type : 'User' , id : 'LIST'}],
    })
  })
})

export const {useCreateUserMutation} = userApiSlice
