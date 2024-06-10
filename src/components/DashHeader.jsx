import React, { useEffect, useState } from 'react';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

const DashHeader = () => {
  const navigate = useNavigate();
  const [logoutSuccess , setLogoutSuccess] = useState(false)
  const [sendLogout, { isSuccess, isLoading, isError, error }] = useSendLogoutMutation();

  useEffect(() => {
    if (logoutSuccess) {
      navigate('/');
    }
  }, [logoutSuccess, navigate]);

  const handleLogout = async () => {
    try {
      setLogoutSuccess(true)
      await sendLogout().unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=''>
      <section className='flex h-[10vh] justify-between items-center fixed top-0 right-0 left-0 bg-darkprimary'>
        <section>
          Pocket Khata
        </section>
        <section>
          <button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </section>
      </section>
    </div>
  );
};

export default DashHeader;
