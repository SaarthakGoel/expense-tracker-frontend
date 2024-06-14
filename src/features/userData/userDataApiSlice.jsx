import { apiSlice } from "../../app/api/apiSlice";

export const userDataApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    getUserData : builder.query({
      query : () => ({
        url : '/usersData',
        validateStatus : (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedUserData = responseData.map((data) => {
          data.id = data._id;
          return data;
        });
        return loadedUserData;
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'UserData', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'UserData', id })),
          ];
        } else return [{ type: 'UserData', id: 'LIST' }];
      },
    }),
    AddUserData : builder.mutation({
      query : (initialData) => ({
        url : '/usersData',
        method : 'POST',
        body : {...initialData}
      }),
      invalidatesTags : [{type : 'UserData' , id : 'LIST'}]
    }),
    updateUserData : builder.mutation({
      query : (initialData) => ({
        url : 'usersData',
        method : 'PATCH',
        body : {...initialData}
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'UserData', id: arg.id },
      ],
    }),
    deleteUserData : builder.mutation({
      query : ({id}) => ({
        url : 'usersData',
        method : 'DELETE',
        body : {id}
      }),
      invalidatesTags : (result, error, arg) => [
        { type: 'UserData', id: arg.id },
      ],
    })
  })
}) 

export const {
  useGetUserDataQuery,
  useAddUserDataMutation,
  useUpdateUserDataMutation,
  useDeleteUserDataMutation
} = userDataApiSlice;