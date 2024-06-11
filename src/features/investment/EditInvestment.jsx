import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState , useEffect } from 'react'
import { useGetInvestmentQuery, useUpdateInvestmentMutation } from './investmentApiSlice'

const EditInvestment = () => {

  const {id} = useParams()

  const navigate = useNavigate();

  const {
    data : investments ,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetInvestmentQuery();

  const [updateInvestment , {isSuccess: updateSuccess}] = useUpdateInvestmentMutation();

  let xyz = {};

  if(isSuccess) {
    const {entities} = investments;
    xyz = { ...entities[id]};
  }

  const [title, setTitle] = useState(xyz.title);
  const [amount, setAmount] = useState(xyz.amount);
  const [currentValue , setCurrentValue] = useState(xyz.currentValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInvestment({ id : id , title : title, amount : amount , currentValue : currentValue });
  };

  useEffect(() => {
    if(updateSuccess) {
      navigate('/dash/investments');
    }
  },[updateSuccess])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={() => updateInvestment(xyz)} // Assuming this closes the modal
          className="absolute top-2 right-4 text-3xl mt-4 mr-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Investment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <label htmlFor="currentValue" className="block text-sm font-medium text-gray-700">Current Value</label>
            <input
              type="number"
              id="currentValue"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditInvestment;