import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../auth/authSlice';
import  {useNavigate } from 'react-router-dom';
import {useDeleteLoanMutation, useGetloanQuery} from './loanApiSlice';
import NewLoan from './NewLoan';

const LendedLoanList = () => {

  const [popup , setPopup] = useState(false);

  const navigate = useNavigate();

  const accessToken = useSelector(selectCurrentToken);

  const accessTokenData = jwtDecode(accessToken);

  const {userId} = accessTokenData;

  const {
    data : loans ,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetloanQuery();

  const [deleteLoan , {} ] = useDeleteLoanMutation();

  let abc = [];

  if(isSuccess) {
    const {ids , entities} = loans;
    const loanList = ids.map(id => entities[id])
    const userloanList = loanList.filter(item => item.user === userId)
    abc = [...userloanList];
  }

  const def = abc.filter((item) => item.lended === true)

  console.log(def);

  function getDate(createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }

  function handleEdit(id) {
    navigate(`/dash/loans/${id}`)
  }

  function handleDelete(id) {
    deleteLoan({id : id})
  }

  function closePopup() {
    setPopup(false)
  }

  return (
    <div className="container mx-auto p-4">
      {
        popup ? <NewLoan closePopup={closePopup} /> : null   
      }
      <div className='flex justify-end'>
        <button onClick={() => setPopup(true)} className='mx-48 my-6 border-1 border-white bg-darkprimary text-bodycolor px-6 py-3 rounded-md'>New Loan</button>
      </div>
      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>{error}</p> : null} 
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        { def.map((item) => (
          
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getDate(item.createdAt)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEdit(item._id)}>
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(item._id)}>
                  Paid
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LendedLoanList;