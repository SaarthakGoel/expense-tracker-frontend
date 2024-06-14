import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAddUserDataMutation} from '../features/userData/userDataApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

const SetUserData = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const accessToken = useSelector(selectCurrentToken);

  const accessTokenData = jwtDecode(accessToken);

  const { userId } = accessTokenData;

  const navigate = useNavigate();

  const [addUserData , {isSuccess , isError , error} ] = useAddUserDataMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/dash');
    }
  }, [isSuccess , navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addUserData({id : userId , Income : username , Savings : email})
  };

  if(isError) console.log(error)

  return (
    <div className='bg-body-color w-screen h-screen flex flex-col justify-center items-center'>
      {
        isError ? <p>error</p> : null
      }
      <header className='pb-6 pt-5 h-[10vh] fixed top-0 right-0 left-0 px-16 bg-darkprimary flex justify-around items-center'>
        <h1 className='text-5xl font-extrabold text-bodycolor'>
          <Link to='/'>Pocket Khata</Link>
        </h1>
      </header>
      <section className='border-2 border-[#665454] w-1/4'>
        <form onSubmit={handleSubmit}>
          <section className='form-elements flex flex-col items-start justify-between'>
            <h1 className='form-head text-2xl my-8 mx-12'>Basic Details</h1>
            <section className='field flex flex-col relative pb-4 mx-12'>
              <label className='mb-2 text-lg'>Income <sup className='text-red-500 relative top-[-2px] text-[95%] leading-none'>*</sup></label>
              <input name='firstname' type='number' placeholder='Enter Income' value={username} onChange={(e) => setUsername(e.target.value)} className='rounded border border-gray-300 h-8 px-2 w-72' />
            </section>
            <section className='field flex flex-col relative pb-4 mx-12'>
              <label className='mb-2 text-lg'>Savings <sup className='text-red-500 relative top-[-2px] text-[95%] leading-none'>*</sup></label>
              <input type='number' name='email' placeholder='Enter Savings' value={email} onChange={(e) => setEmail(e.target.value)} className='rounded border border-gray-300 h-8 px-2 w-72' />
            </section>
            <section className='form-button-section my-4 mx-12'>
              <button className='form-submit px-4 py-4 mr-4 w-28 rounded border border-gray-300 bg-primary text-white uppercase text-sm font-bold cursor-pointer' type='submit'>
                Submit
              </button>
            </section>
          </section>
        </form>
      </section>
    </div>
  );
};

export default SetUserData;