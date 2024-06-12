import React, { useState } from 'react'
import { useDeleteExpenseMutation, useGetExpensesQuery } from './expenseApiSlice'
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import NewExpense from './NewExpense';

const ExpenseList = () => {

  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

  const accessToken = useSelector(selectCurrentToken);

  const accessTokenData = jwtDecode(accessToken);

  const { userId } = accessTokenData;

  const {
    data: expenses,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetExpensesQuery();

  const [deleteExpense, { }] = useDeleteExpenseMutation();

  let abc = [];

  if (isSuccess) {
    const { ids, entities } = expenses;
    const expenseList = ids.map(id => entities[id])
    const userExpenseList = expenseList.filter(item => item.user === userId)
    abc = [...userExpenseList];
  }

  function getDate(createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }

  function handleEdit(id) {
    navigate(`/dash/expenses/${id}`)
  }

  function handleDelete(id) {
    deleteExpense({ id: id })
  }

  function closePopup() {
    setPopup(false)
  }






  function compareDatesDescending(a, b) {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  }

  abc.sort(compareDatesDescending);

  function getTotalExpenseInLastMonth(abc) {
    if (abc.length === 0) return 0;

    const referenceDate = new Date(abc[0].createdAt);
    const referenceMonth = referenceDate.getMonth();
    const referenceYear = referenceDate.getFullYear();
    
    let totalExpense = 0;
    
    abc.forEach((item) => {
        const itemDate = new Date(item.createdAt);
        const itemMonth = itemDate.getMonth();
        const itemYear = itemDate.getFullYear();
        
        if (referenceMonth === itemMonth && referenceYear === itemYear) {
            totalExpense += item.amount;
        }
    });
    
    return totalExpense;
}

  const totalExpenseInLastMonth = getTotalExpenseInLastMonth(abc);
















  return (
    <div className="container mx-auto mt-24 p-4">
      {
        popup ? <NewExpense closePopup={closePopup} /> : null
      }

      <div>
        <span className='text-4xl text-gray-700 font-semibold'>Current Month Expense : </span> <span className='text-5xl text-[#e75757] font-extrabold'>&#8377;{totalExpenseInLastMonth}</span>
      </div>

      <div className='flex justify-end'>
        <button onClick={() => setPopup(true)} className='mx-48 my-6 border-1 border-white bg-darkprimary text-bodycolor px-6 py-3 rounded-md'>New Expense</button>
      </div>

      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>{error}</p> : null}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {abc.map((item) => {
            return (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getDate(item.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEdit(item._id)}>
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;