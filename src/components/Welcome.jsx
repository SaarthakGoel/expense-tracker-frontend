import { useNavigate } from 'react-router-dom'
import { FaMoneyBillWave, FaChartLine, FaHandHoldingUsd, FaFileAlt } from 'react-icons/fa';
import { useGetUserDataQuery } from '../features/userData/userDataApiSlice';
import LineChart from './LineChart';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import PieChart from './PieChart';
import BarChart from './BarChart';

const Welcome = () => {

  const accessToken = useSelector(selectCurrentToken);

  const accessTokenData = jwtDecode(accessToken);

  const { userId } = accessTokenData;

  const navigate = useNavigate()

  const { data: userData, isLoading, isSuccess , isError, error } = useGetUserDataQuery();

  if(isSuccess) console.log(userData)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  const specUserData = userData.filter((item) => item.user === userId);

  if (!specUserData.length) {
    return <div>No specific user data available</div>;
  }

  const expenseData = specUserData[0].expense;
  const investData = specUserData[0].investment;
  const loandata = specUserData[0].loan;

  return (
    <div className='mt-24'>

      <div className='pt-10 mb-10'>
        <div className='flex flex-col justify-center items-center sm:flex-row sm:justify-around'>
          <div className='mb-6 sm:my-0'>
            <span className='text-2xl sm:text-3xl md:text-4xl text-gray-700 font-semibold'>Income <span className='text-xs md:text-sm'>(/month)</span> : </span> <span className='text-3xl sm:text-4xl md:text-5xl text-[#81c995] font-extrabold'>&#8377;{specUserData[0].Income}</span>
          </div>
          <div>
            <span className='text-2xl sm:text-3xl md:text-4xl text-gray-700 font-semibold'>Savings : </span> <span className='text-3xl sm:text-4xl md:text-5xl text-[#81c995] font-extrabold'>&#8377;{specUserData[0].Savings}</span>
          </div>
        </div>
      </div>


      <div className=" text-3xl sm:text-4xl md:text-5xl mb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
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
          <span>Investment</span>
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
          onClick={() => navigate('/dash/report')}
          style={{ backgroundColor: '#f3f4f0', color: '#1d3e31' }} // Body background and Dark Primary text
        >
          <FaFileAlt className="text-3xl mb-2" />
          <span>Reports</span>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div className='border-2 border-gray-400 mb-5 p-10 w-[60wv] md:w-[60vw] md:mb-24 rounded-md'>
          <LineChart data={expenseData} />
        </div>
        <div className='flex flex-col md:flex-row mb-24'>
        <div className='border-2 mb-5 md:mr-10 border-gray-400 p-10 w-[60wv] md:w-[40vw] rounded-md'>
          <BarChart data={investData} />
        </div>
        <div className='border-2 mb-5 border-gray-400 p-10 w-[60wv] md:w-[30vw] rounded-md'>
          <PieChart data={loandata} />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome;