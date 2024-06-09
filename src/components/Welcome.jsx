import React from 'react'
import { Link } from 'react-router-dom'
import { useRefreshMutation } from '../features/auth/authApiSlice'

const Welcome = () => {
 
  const [refresh , {isSuccess}] = useRefreshMutation();

  return (
    <div className='text-5xl mt-24'><Link to='/dash/expenses' >Welcome</Link>
     <button onClick={() => refresh()}>refresh</button>
     </div>
  )
}

export default Welcome;