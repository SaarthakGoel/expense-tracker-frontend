import React from 'react'
import { useGetExpensesQuery } from './expenseApiSlice'

const ExpenseList = () => {

  const {
    data : expenses ,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetExpensesQuery();

  return (
    <div className='mt-24'>
       {console.log(expenses)}
    </div>
  )
}

export default ExpenseList