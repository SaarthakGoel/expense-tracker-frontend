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
        <div className='flex justify-around'>
          <div>
            <span className='text-4xl text-gray-700 font-semibold'>Income <span className='text-sm'>(/month)</span> : </span> <span className='text-5xl text-[#81c995] font-extrabold'>&#8377;{specUserData[0].Income}</span>
          </div>
          <div>
            <span className='text-4xl text-gray-700 font-semibold'>Savings : </span> <span className='text-5xl text-[#81c995] font-extrabold'>&#8377;{specUserData[0].Savings}</span>
          </div>
        </div>
      </div>


      <div className=" text-5xl mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
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
          <span>Investments</span>
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

      <div className='flex justify-around'>
        <div className=' w-[30vw]'>
          <LineChart data={expenseData} />
        </div>
        <div className=' w-[30vw]'>
          <BarChart data={investData} />
        </div>
        <div className=' w-[30vw]'>
          <PieChart data={loandata} />
        </div>
      </div>
    </div>
  )
}

export default Welcome;