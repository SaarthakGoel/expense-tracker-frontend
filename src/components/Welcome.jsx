import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRefreshMutation } from '../features/auth/authApiSlice'
import { FaMoneyBillWave, FaChartLine, FaHandHoldingUsd, FaFileAlt } from 'react-icons/fa';

const Welcome = () => {
 
  const [refresh , {isSuccess}] = useRefreshMutation();

  const navigate = useNavigate()

  return (
    <div className='text-5xl mt-24'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      <div 
        className="flex flex-col items-center justify-center h-40 bg-primary text-secondary rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
        onClick={() => navigate('/dash/expenses')}
        style={{ backgroundColor: '#dcdcbb', color: '#1d3e31' }} // Primary background and Secondary text
      >
        <FaMoneyBillWave className="text-3xl mb-2" />
        <span>Expenses</span>
      </div>
      <div 
        className="flex flex-col items-center justify-center h-40 bg-secondary text-primary rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={() => navigate('/dash/investments')}
        style={{ backgroundColor: '#dcdcbb', color: '#1d3e31' }} // Secondary background and Dark Primary text
      >
        <FaChartLine className="text-3xl mb-2" />
        <span>Investments</span>
      </div>
      <div 
        className="flex flex-col items-center justify-center h-40 bg-dark-primary text-secondary rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={() => navigate('/dash/loans')}
        style={{ backgroundColor: '#dcdcbb', color: '#1d3e31' }} // Dark Primary background and Secondary text
      >
        <FaHandHoldingUsd className="text-3xl mb-2" />
        <span>Loans</span>
      </div>
      <div 
        className="flex flex-col items-center justify-center h-40 bg-body text-dark-primary rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        style={{ backgroundColor: '#f3f4f0', color: '#1d3e31' }} // Body background and Dark Primary text
      >
        <FaFileAlt className="text-3xl mb-2" />
        <span>Reports</span>
      </div>
    </div>
     </div>
  )
}

export default Welcome;