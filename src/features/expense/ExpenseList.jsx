import React from 'react'
import { useGetExpensesQuery } from './expenseApiSlice'

const ExpenseList = () => {

  const {
    data : expense ,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetExpensesQuery();


  return (
    <div>
      expense list
    </div>
  )
}

export default ExpenseList