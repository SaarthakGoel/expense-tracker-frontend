import React, { useEffect, useState, useRef } from 'react';
import { useDeleteExpenseMutation, useGetExpensesQuery } from './expenseApiSlice';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import NewExpense from './NewExpense';
import { useGetUserDataQuery, useUpdateUserDataMutation } from '../userData/userDataApiSlice';

const ExpenseList = () => {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const accessToken = useSelector(selectCurrentToken);
  const accessTokenData = jwtDecode(accessToken);
  const { userId } = accessTokenData;

  const { data: userData } = useGetUserDataQuery();

  // Check if userData is defined before filtering
  const specUserData = userData ? userData.filter((item) => item.user === userId) : [];

  const {
    data: expenses,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetExpensesQuery();

  const [deleteExpense] = useDeleteExpenseMutation();

  let abc = [];

  if (isSuccess) {
    const { ids, entities } = expenses;
    const expenseList = ids.map(id => entities[id]);
    const userExpenseList = expenseList.filter(item => item.user === userId);
    abc = [...userExpenseList];
  }

  const [currMonth, setCurrMonth] = useState(new Date().getMonth());

  useEffect(() => {
    if (specUserData.length > 0) {
      const now = new Date();
      const newMonth = now.getMonth();

      if (newMonth !== currMonth) {
        const currentMonthExpense = specUserData[0].Income - totalExpenseInLastMonth.currentMonth;
        updateUserData({ user: userId, Savings: specUserData[0].Savings + currentMonthExpense });
        setCurrMonth(newMonth);
      }
    }
  }, [new Date().getDate()]);

  function getDate(createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  function handleEdit(id) {
    navigate(`/dash/expenses/${id}`);
  }

  function handleDelete(id) {
    deleteExpense({ id });
  }

  function closePopup() {
    setPopup(false);
  }

  function compareDatesDescending(a, b) {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  }

  const now = new Date();
  const thisMonth = now.getMonth();

  abc.sort(compareDatesDescending);

  function getTotalExpenses(abc) {
    if (abc.length === 0) return { currentMonth: 0, lastMonth: 0, twoMonthsAgo: 0 };

    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = January, 11 = December
    const currentYear = now.getFullYear();

    let totalExpenseCurrentMonth = 0;
    let totalExpenseLastMonth = 0;
    let totalExpenseTwoMonthsAgo = 0;

    abc.forEach((item) => {
      const itemDate = new Date(item.createdAt);
      const itemMonth = itemDate.getMonth();
      const itemYear = itemDate.getFullYear();

      if (itemYear === currentYear && itemMonth === currentMonth) {
        totalExpenseCurrentMonth += item.amount;
      } else if (
        (itemYear === currentYear && itemMonth === currentMonth - 1) ||
        (currentMonth === 0 && itemMonth === 11 && itemYear === currentYear - 1)
      ) {
        totalExpenseLastMonth += item.amount;
      } else if (
        (itemYear === currentYear && itemMonth === currentMonth - 2) ||
        (currentMonth === 0 && itemMonth === 10 && itemYear === currentYear - 1) ||
        (currentMonth === 1 && itemMonth === 11 && itemYear === currentYear - 1)
      ) {
        totalExpenseTwoMonthsAgo += item.amount;
      }
    });

    return { currentMonth: totalExpenseCurrentMonth, lastMonth: totalExpenseLastMonth, twoMonthsAgo: totalExpenseTwoMonthsAgo };
  }

  const totalExpenseInLastMonth = getTotalExpenses(abc);

  const currentMonth = totalExpenseInLastMonth.currentMonth;

  const lastMonth = totalExpenseInLastMonth.lastMonth;

  const twoMonthsAgo = totalExpenseInLastMonth.twoMonthsAgo;

  const [updateUserData] = useUpdateUserDataMutation();

  useEffect(() => {
    if (specUserData.length > 0) {
      updateUserData({ user: userId, currentMonth, lastMonth, twoMonthsAgo });
    }
  }, [currentMonth, lastMonth, twoMonthsAgo]);

  const returnsColor = specUserData.length > 0 && specUserData[0].Income - currentMonth >= 0 ? '#81c995' : '#f28b82';

  return (
    <div className="container mx-auto mt-24 p-4">
      {popup ? <NewExpense closePopup={closePopup} /> : null}

      <div className='flex flex-col items-center sm:flex-row sm:justify-around'>
        <div className='mb-5 sm:mb-0'>
          <span className='text-2xl sm:text-3xl md:text-4xl text-gray-700 font-semibold'>Month Expense : </span> <span className='text-3xl sm:text-4xl md:text-5xl text-[#f28b82] font-extrabold'>&#8377;{currentMonth}</span>
        </div>

        {specUserData.length > 0 && (
          <>
            <div className='mb-5 sm:mb-0'>
              <span className='text-2xl sm:text-3xl md:text-4xl text-gray-700 font-semibold'>Income <span className='text-xs md:text-sm'>(/month)</span> : </span> <span className='text-3xl sm:text-4xl md:text-5xl text-[#81c995] font-extrabold'>&#8377;{specUserData[0].Income}</span>
            </div>

            <div className='mb-5 sm:mb-0'>
              <span className='text-2xl sm:text-3xl md:text-4xl text-gray-700 font-semibold'>Month Balance : </span> <span style={{ color: returnsColor }} className='text-3xl sm:text-4xl md:text-5xl font-extrabold'>&#8377;{specUserData[0].Income - currentMonth}</span>
            </div>
          </>
        )}
      </div>

      <div className='flex justify-end'>
        <button onClick={() => setPopup(true)} className='my-6 border-1 border-white bg-darkprimary text-bodycolor px-6 py-3 rounded-md'>New Expense</button>
      </div>

      {isLoading ? <p>Loading...</p> : null}
      <div className=' overflow-x-scroll'>
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
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ExpenseList;

