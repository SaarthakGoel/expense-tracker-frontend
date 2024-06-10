import React from 'react'
import '../index.css';
import LandingImg from "../assets/img1.jpg"
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-body-color w-screen h-screen'>
      <header className='pb-6 pt-5 h-[10vh] fixed top-0 right-0 left-0 px-16 bg-darkprimary flex justify-around items-center'>
        <h1 className=' text-5xl font-extrabold text-bodycolor'>
          Pocket Khata
        </h1>
        <nav>
          LINKS
        </nav>
      </header>
      <main>
        <section className=' bg-secondary py-10 flex flex-col items-center'>
          <section className='flex justify-around items-center'>
            <section className='w-[50%] py-16 flex flex-col justify-between items-left'>
              <section>
                <h1 className='text-4xl font-bold py-5'> <span className='text-primary'>Pocket Khata</span>: Your Personal Expense Tracker</h1>
              </section>
              <section>
                <h3 className='text-3xl font-semibold py-5'>Take Control of Your Finances</h3>
              </section>
              <section>
                <p className='text-xl from-stone-500 leading-9 '>Welcome to Pocket Khata, the ultimate solution for managing your personal finances. Whether you're saving for a big purchase, keeping track of daily expenses, or planning your monthly budget, Pocket Khata is here to help you stay on top of your money matters.</p>
              </section>
            </section>
            <section>
              <img src={LandingImg} alt="landingimg"  className='h-[30hv] w-[30vw] rounded-xl'/>
            </section>
          </section>
          <section className='py-5'>
            <button className='bg-darkprimary text-bodycolor py-4 px-10 border-2 border-darkprimary rounded-full mx-3 transition duration-500 font-medium hover:border-2 hover:border-secondary' onClick={() => navigate('/login')}>Log In</button>
            <button className='bg-bodycolor py-4 px-10 rounded-full mx-3 font-medium border-2 border-bodycolor transition duration-500 hover:border-2 hover:border-black' onClick={() => navigate('/createaccount')}>Create Account</button>
          </section>
        </section>
      </main>
    </div>
  )
}

export default Landing;