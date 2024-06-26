import React, { useEffect, useState } from 'react';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      <section className='flex h-[10vh] z-50 justify-around items-center fixed top-0 right-0 left-0 bg-darkprimary'>
        <section className=' text-4xl sm:text-5xl whitespace-nowrap font-extrabold text-bodycolor '>
        <Link to='/dash'>  Pocket Khata </Link>
        </section>
        <section>
          <ul className='flex cursor-pointer'>
            <Link to='/dash/expenses'><li className='hidden md:block px-5 lg:px-10 text-bodycolor text-xl'>Expenses</li></Link> 
            <Link to='/dash/investments'> <li className='hidden md:block px-5 lg:px-10 text-bodycolor text-xl'>Investments</li></Link>
            <Link to='/dash/loans' > <li className='hidden md:block px-5 lg:px-10 text-bodycolor text-xl'>Loans</li></Link>
            <li className='px-10 text-bodycolor text-xl' onClick={handleLogout}>Logout</li>
          </ul>
        </section>
      </section>
    </div>
  );
};

export default DashHeader;
