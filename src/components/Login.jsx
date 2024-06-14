import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { setCredentials } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [email, setEmail] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername('');
      setPassword('');
      navigate('/dash')
    } catch (err) {
      console.log(err)
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
    }

  };

  return (
    <div className='bg-body-color w-screen h-screen flex flex-col justify-center items-center'>
      {
        errMsg ? <p>{errMsg}</p> : null
      }
      <header className='pb-6 pt-5 h-[10vh] fixed top-0 right-0 left-0 px-16 bg-darkprimary flex justify-around items-center'>
        <h1 className=' text-5xl font-extrabold text-bodycolor '>
          <Link to='/'>Pocket Khata</Link>
        </h1>
      </header>
      <section className='border-2 border-[#665454] w-1/4'>
        <form onSubmit={handleSubmit} >
          <section className='form-elements flex flex-col items-start justify-between'>
            <h1 className='form-head text-2xl my-8 mx-12 '>Login</h1>
            <section className='field flex flex-col relative pb-4 mx-12'>
              <label className='mb-2 text-lg'>Username <sup className='text-red-500 relative top-[-2px] text-[95%] leading-none'>*</sup></label>
              <input name='firstname' type='text' placeholder='Enter first name' value={username} onChange={(e) => setUsername(e.target.value)} className='rounded border border-gray-300 h-8 px-2 w-72' />
            </section>
            {/*<section className='field flex flex-col relative pb-4 mx-12'>
              <label className='mb-2 text-lg'>Email <sup className='text-red-500 relative top-[-2px] text-[95%] leading-none'>*</sup></label>
              <input type='text' name='email' placeholder='Ex: abc@xyz.com' value={email} onChange={(e) => setEmail(e.target.value)} className='rounded border border-gray-300 h-8 px-2 w-72' />
            </section>*/}
            <section className='field flex flex-col relative pb-4 mx-12'>
              <label className='mb-2 text-lg'>Password <sup className='text-red-500 relative top-[-2px] text-[95%] leading-none'>*</sup></label>
              <input name='lastname' type='password' placeholder='Enter last name' value={password} onChange={(e) => setPassword(e.target.value)} className='rounded border border-gray-300 h-8 px-2 w-72' />
            </section>
            <section className='form-button-section my-4 mx-12'>
              <button className='form-submit px-4 py-4 mr-4 w-28 rounded border border-gray-300 bg-primary text-white uppercase text-sm font-bold cursor-pointer' type='submit' onClick={handleSubmit}>Submit</button>
            </section>
          </section>
        </form>

      </section>
    </div>
  );
};

export default Login;