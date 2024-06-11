import { createEntityAdapter} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice";

const expenseAdapter = createEntityAdapter({});

const initialState = expenseAdapter.getInitialState();

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: '/expense',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedExpenses = responseData.map((expense) => {
          expense.id = expense._id;
          return expense;
        });
        return expenseAdapter.setAll(initialState, loadedExpenses);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Expense', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Expense', id })),
          ];
        } else return [{ type: 'Expense', id: 'LIST' }];
      },
    }),

    addNewExpense: builder.mutation({
      query: (initialExpenseData) => ({
        url: '/expense',
        method: 'POST',
        body: { ...initialExpenseData },
      }),
      invalidatesTags: [{ type: 'Expense', id: 'LIST' }],
    }),

    updateExpense: builder.mutation({
      query: (initialExpenseData) => ({
        url: '/expense',
        method: 'PATCH',
        body: { ...initialExpenseData },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Expense', id: arg.id },
      ],
    }),

    deleteExpense: builder.mutation({
      query: ({ id }) => ({
        url: '/expense',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Expense', id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetExpensesQuery,
  useAddNewExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApiSlice;
