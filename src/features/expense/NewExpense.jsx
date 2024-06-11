import React from 'react'
import { useState , useEffect } from 'react';
import { useAddNewExpenseMutation } from './expenseApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../auth/authSlice';
import { jwtDecode } from 'jwt-decode';

const NewExpense = ({closePopup}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const accessToken = useSelector(selectCurrentToken);

  const {userId} = jwtDecode(accessToken);

  const [addNewExpense , {isSuccess : addSuccess}] = useAddNewExpenseMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewExpense({id : userId , amount : amount , title : title});
  };

  useEffect(() => {
    if(addSuccess) closePopup()
  } , [addSuccess])

  const handleCross = () => {
    closePopup();
  }

  return (
    <div className="min-h-screen w-[100%] fixed top-0 left-0 bg-black flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <button className='absolute top-2 right-4 text-3xl' onClick={handleCross}>&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-darkprimary text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewExpense;
