import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDeleteInvestmentMutation, useGetInvestmentQuery } from './investmentApiSlice';
import NewInvestment from './NewInvestment';

const InvestmentList = () => {

  const [popup , setPopup] = useState(false);

  const navigate = useNavigate();

  const accessToken = useSelector(selectCurrentToken);

  const accessTokenData = jwtDecode(accessToken);

  const {userId} = accessTokenData;

  const {
    data : investments ,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetInvestmentQuery();

  const [deleteInvestment , {} ] = useDeleteInvestmentMutation();

  let abc = [];

  if(isSuccess) {
    const {ids , entities} = investments;
    const investmentList = ids.map(id => entities[id])
    const userInvestmentList = investmentList.filter(item => item.user === userId)
    abc = [...userInvestmentList];
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
    navigate(`/dash/investments/${id}`)
  }

  function handleDelete(id) {
    deleteInvestment({id : id})
  }

  function closePopup() {
    setPopup(false)
  }

  return (
    <div className="container mx-auto mt-24 p-4">
      {
        popup ? <NewInvestment closePopup={closePopup} /> : null  
      }
      <div className='flex justify-end'>
        <button onClick={() => setPopup(true)} className='mx-48 my-6 border-1 border-white bg-darkprimary text-bodycolor px-6 py-3 rounded-md'>New Investment</button>
      </div>
      
      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>{error}</p> : null} 
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        { abc.map((item) => (
          
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getDate(item.createdAt)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.currentValue}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.currentValue - item.amount}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvestmentList;