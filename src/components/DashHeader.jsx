import React, { useEffect } from 'react'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useNavigate } from 'react-router-dom';

const DashHeader = () => {

  const navigate = useNavigate();

  const [sendLogout , {isSuccess}] = useSendLogoutMutation();

  useEffect(() => {
     if(isSuccess) navigate('/');
  },[isSuccess , navigate]);

  return (
    <div className=''>
      <section className='flex h-[10vh] justify-between items-center fixed top-0 right-0 left-0 bg-darkprimary'>
        <section>
          Pocket Khata
        </section>
        <section>
          <button onClick={sendLogout}>
            logout
          </button>
        </section>
      </section>

    </div>
  )
}

export default DashHeader