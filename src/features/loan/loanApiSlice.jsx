import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const loanAdapter = createEntityAdapter({});

const initialState = loanAdapter.getInitialState();

export const loanApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    getloan : builder.query({
      query : () => ({
        url : '/loan',
        validateStatus : (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse : (responseData) => {
        const loadedloan = responseData.map((loan) => {
          loan.id = loan._id;
          return loan;
        })
        return loanAdapter.setAll(initialState , loadedloan)
      },
      providesTags : (result , err , arg) => {
        if (result?.ids) {
          return [
            { type: 'Loan', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Loan', id })),
          ];
        } else return [{ type: 'Loan', id: 'LIST' }];
      },
    }),
    addNewLoan : builder.mutation({
      query : (initialData) => ({
        url : '/loan',
        method : 'POST',
        body : {...initialData}
      }),
      invalidatesTags : [{type : 'Loan' , id : 'LIST'}],
    }),
    updateLoan : builder.mutation({
      query : (initialData) => ({
        url : '/loan',
        method : 'PATCH',
        body : {...initialData}
      }),
      invalidatesTags : (result , err , arg) => {
       return [{type : 'Loan' , id : arg.id}]
      }, 
    }),
    deleteLoan : builder.mutation({
      query : ({id}) => ({
        url : '/loan',
        method : 'DELETE',
        body : {id}
      }),
      invalidatesTags : (result , err , arg) => {
       return [{type : 'Loan' , id : arg.id}]
      },  
    }),
  })
})
export const {
  useGetloanQuery,
  useAddNewLoanMutation,
  useUpdateLoanMutation,
  useDeleteLoanMutation
} = loanApiSlice;