import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState , useEffect } from 'react'
import { useGetloanQuery, useUpdateLoanMutation } from './loanApiSlice'

const EditLoan = () => {

  const {id} = useParams()

  const navigate = useNavigate();

  const {
    data : loans ,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetloanQuery();

  const [updateLoan , {isSuccess: updateSuccess}] = useUpdateLoanMutation();

  let xyz = {};

  if(isSuccess) {
    const {entities} = loans;
    xyz = { ...entities[id]};
  }

  const [title, setTitle] = useState(xyz.title);
  const [amount, setAmount] = useState(xyz.amount);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if(xyz.lended === true){
      setSelectedOption('lended')
    }else{
      setSelectedOption('debt');
    }
  },[])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const lended = selectedOption === 'lended'
    updateLoan({ id : id , title : title, amount : amount , lended : lended });
  };

  useEffect(() => {
    if(updateSuccess) {
      navigate('/dash/loans');
    }
  },[updateSuccess])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={() => updateLoan(xyz)} // Assuming this closes the modal
          className="absolute top-2 right-4 text-3xl mt-4 mr-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Loan</h2>
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
          <div className="flex justify-around mx-6 my-10">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="debt"
                checked={selectedOption === 'debt'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="text-gray-700">Debt</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="lended"
                checked={selectedOption === 'lended'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="text-gray-700">Lended</span>
            </label>
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

export default EditLoan;