import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import '../index.css';
import landingImg from '../assets/istockphot.jpg';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-body-color w-screen'>
      {/* Header Section */}
      <header className='h-[12vh] fixed top-0 right-0 left-0 px-16 bg-darkprimary flex justify-center  md:justify-between items-center shadow-lg z-10'>
        <h1 className='text-4xl font-extrabold text-bodycolor overflow-clip text-nowrap sm:text-5xl'>
          Pocket Khata
        </h1>
        <nav className='hidden md:block'>
          <ul className='flex space-x-8 text-bodycolor font-medium'>
            <li className='hover:text-primary cursor-pointer'>
              <Link to='home' smooth={true} duration={100}>Home</Link>
            </li>
            <li className='hover:text-primary cursor-pointer'>
              <Link to='features' smooth={true} duration={100}>Features</Link>
            </li>
            <li className='hover:text-primary cursor-pointer'>
              <Link to='about' smooth={true} duration={100}>About</Link>
            </li>
            <li className='hover:text-primary cursor-pointer'>
              <Link to='contact' smooth={true} duration={100}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      
      {/* Main Section */}
      <main id='home' className='mt-[6vh] sm:mt-[9vh] md:[12vh] h-[88vh] bg-secondary flex flex-col items-center'>
        <section className='w-full h-full flex flex-col lg:flex-row gap-16 justify-around items-center py-16 px-8 lg:px-32'>
          <div className='xl:w-1/2 text-center xl:text-left'>
            <h1 className='text-5xl font-bold py-5 sm:text-6xl'>
              <span className='text-primary'>Pocket Khata</span>: Your Personal Expense Tracker
            </h1>
            <h3 className='text-2xl font-semibold py-5 sm:3xl'>Take Control of Your Finances</h3>
            <p className=' text-left sm:text-center text-lg text-gray-700 leading-6 mb-8 sm:text-xl sm:leading-9'>
              Welcome to Pocket Khata, the ultimate solution for managing your personal finances. Whether you're saving for a big purchase, keeping track of daily expenses, or planning your monthly budget, Pocket Khata is here to help you stay on top of your money matters.
            </p>
            <div className='flex justify-center xl:justify-start space-x-6'>
              <button 
                className='bg-darkprimary text-bodycolor py-3 px-6 sm:py-5 sm:px-10 border-2 border-darkprimary rounded-full font-medium transition duration-500 hover:bg-primary hover:border-primary'
                onClick={() => navigate('/login')}
              >
                Log In
              </button>
              <button 
                className='bg-bodycolor text-darkprimary py-3 px-6 sm:py-5 sm:px-10 rounded-full border-2 border-darkprimary font-medium transition duration-500 hover:bg-primary hover:text-bodycolor'
                onClick={() => navigate('/createaccount')}
              >
                Create Account
              </button>
            </div>
          </div>
          <div className='hidden xl:block lg:w-1/2 mt-12 lg:mt-0'>
            <img src={landingImg} alt='Pocket Khata' className='w-[600px] h-[400px] rounded-lg shadow-lg' />
          </div>
        </section>
      </main>
      
      {/* Features Section */}
      <section id='features' className='bg-lightprimary py-20'>
        <div className='container mx-auto px-8'>
          <h2 className='text-4xl font-bold text-center mb-10 overflow-clip'>Features</h2>
          <div className='flex flex-wrap justify-around'>
            <div className='w-full md:w-1/3 p-4'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-2xl font-semibold mb-4 overflow-clip'>Track Expenses</h3>
                <p className='text-gray-700'>Easily track your daily expenses and manage your budget effectively.</p>
              </div>
            </div>
            <div className='w-full md:w-1/3 p-4'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-2xl font-semibold mb-4 overflow-clip'>Track Investments</h3>
                <p className='text-gray-700'>Set financial goals and monitor your investments towards achieving them.</p>
              </div>
            </div>
            <div className='w-full md:w-1/3 p-4'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-2xl font-semibold mb-4 overflow-clip'>Generate Reports</h3>
                <p className='text-gray-700'>Generate detailed reports to understand your spending patterns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section className='bg-secondary py-20'>
        <div className='container mx-auto px-8'>
          <h2 className='text-4xl font-bold text-center mb-10 overflow-clip'>What Our Users Say</h2>
          <div className='flex flex-wrap justify-around'>
            <div className='w-full md:w-1/3 p-4'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <p className='text-gray-700 italic mb-4'>"Pocket Khata has transformed the way I manage my finances. It's incredibly easy to use and has helped me save a lot of money."</p>
                <h3 className='text-xl font-semibold'>- Aditya Verma</h3>
              </div>
            </div>
            <div className='w-full md:w-1/3 p-4'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <p className='text-gray-700 italic mb-4'>"I love the goal setting feature. It's so motivating to see my progress and know that I'm getting closer to my financial goals."</p>
                <h3 className='text-xl font-semibold'>- Utkarsh Awasthi</h3>
              </div>
            </div>
            <div className='w-full md:w-1/3 p-4'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <p className='text-gray-700 italic mb-4'>"The reporting tools are fantastic. They give me a clear picture of where my money is going, which helps me make better financial decisions."</p>
                <h3 className='text-xl font-semibold'>- Dhruv Gupta</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id='about' className='bg-white py-20'>
        <div className='container mx-auto px-8'>
          <h2 className='text-4xl font-bold text-center mb-10 overflow-clip'>About Us</h2>
          <p className='text-xl text-center text-gray-700 leading-9'>
            Pocket Khata is a comprehensive expense tracking application designed to help you manage your finances with ease. Our mission is to provide you with the tools you need to achieve financial stability and peace of mind.
          </p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id='contact' className='bg-darkprimary py-20'>
        <div className='container mx-auto px-8'>
          <h2 className='text-4xl font-bold text-center text-bodycolor mb-10 overflow-clip'>Contact Us</h2>
          <form className='max-w-lg mx-auto'>
            <div className='mb-4'>
              <label className='block text-bodycolor text-sm font-bold mb-2' htmlFor='name'>Name</label>
              <input 
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary'
                type='text' 
                id='name' 
                placeholder='Your Name' 
              />
            </div>
            <div className='mb-4'>
              <label className='block text-bodycolor text-sm font-bold mb-2' htmlFor='email'>Email</label>
              <input 
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary'
                type='email' 
                id='email' 
                placeholder='Your Email' 
              />
            </div>
            <div className='mb-4'>
              <label className='block text-bodycolor text-sm font-bold mb-2' htmlFor='message'>Message</label>
              <textarea 
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary'
                id='message' 
                rows='4' 
                placeholder='Your Message' 
              ></textarea>
            </div>
            <div className='flex justify-center'>
              <button 
                type='submit'
                className='bg-primary text-white py-2 px-6 rounded-full font-medium transition duration-500 hover:bg-darkprimary'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className='bg-darkprimary py-6'>
        <div className='container mx-auto text-center text-bodycolor'>
          &copy; 2023 Pocket Khata. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Landing;

