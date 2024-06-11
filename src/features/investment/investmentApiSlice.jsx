import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const investmentAdapter = createEntityAdapter({});

const initialState = investmentAdapter.getInitialState();

export const investmentApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    getInvestment : builder.query({
      query : () => ({
        url : '/investment',
        validateStatus : (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse : (responseData) => {
        const loadedInvestment = responseData.map((investment) => {
          investment.id = investment._id;
          return investment;
        })
        return investmentAdapter.setAll(initialState , loadedInvestment)
      },
      providesTags : (result , err , arg) => {
        if (result?.ids) {
          return [
            { type: 'Investment', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Investment', id })),
          ];
        } else return [{ type: 'Investment', id: 'LIST' }];
      },
    }),
    addNewInvestment : builder.mutation({
      query : (initialData) => ({
        url : '/investment',
        method : 'POST',
        body : {...initialData}
      }),
      invalidatesTags : [{type : 'Investment' , id : 'LIST'}],
    }),
    updateInvestment : builder.mutation({
      query : (initialData) => ({
        url : '/investment',
        method : 'PATCH',
        body : {...initialData}
      }),
      invalidatesTags : (result , err , arg) => {
        return [{type : 'Investment' , id : arg.id}]
      }, 
    }),
    deleteInvestment : builder.mutation({
      query : ({id}) => ({
        url : '/investment',
        method : 'DELETE',
        body : {id}
      }),
      invalidatesTags : (result , err , arg) => {
        return [{type : 'Investment' , id : arg.id}]
      },  
    }),
  })
})

export const {
  useGetInvestmentQuery,
  useAddNewInvestmentMutation,
  useUpdateInvestmentMutation,
  useDeleteInvestmentMutation
} = investmentApiSlice;