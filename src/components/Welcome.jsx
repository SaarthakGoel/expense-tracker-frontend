import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRefreshMutation } from '../features/auth/authApiSlice'

const Welcome = () => {
 
  const [refresh , {isSuccess}] = useRefreshMutation();

  const navigate = useNavigate()

  return (
    <div className='text-5xl mt-24'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div onClick={() => navigate('/dash/expenses')}>
          expenses
        </div>
        <div>
          investments
        </div>
        <div>
        Loans
        </div>
        <div>
          reports
        </div>
      </div>
     </div>
  )
}

export default Welcome;