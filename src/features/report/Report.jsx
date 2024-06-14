import { useSelector } from "react-redux";
import { useGetUserDataQuery } from "../userData/userDataApiSlice";
import { selectCurrentToken } from "../auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useGenerateReportMutation } from '../../app/api/apiSlice';
import { useState } from 'react';

const Report = () => {
  const accessToken = useSelector(selectCurrentToken);
  const accessTokenData = jwtDecode(accessToken);
  const { userId } = accessTokenData;

  const { data: userData, isLoading } = useGetUserDataQuery();
  const [generateReport, { isLoading: reportLoading, isSuccess: reportSuccess, isError: reportError }] = useGenerateReportMutation();

  const [response, setResponse] = useState('');

  if (isLoading) return <p className='mt-24'>Loading...</p>;

  const specUserData = userData.filter((item) => item.user === userId);

  const currentColor = specUserData[0].investment.TotalCurrent > specUserData[0].investment.TotalInvestment ? '#81c995' : '#f28b82';
  const returnsColor = specUserData[0].investment.TotalReturns >= 0 ? '#81c995' : '#e75757';
  const statusColor = specUserData[0].loan.debtStatus >= 0 ? '#81c995' : '#e75757';

  const handleGenerateReport = async () => {
    try {
      const data = await generateReport(specUserData[0]);
      setResponse(data.data.message);  // Update the state with the response
      console.log('Generated report:', data.data.message);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const formatReport = (report) => {
    return report
      .replace(/## /g, '<h2>')
      .replace(/##/g, '</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/-/g, '<li>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className='mt-24'>
      <div className="grid grid-cols-3">
        <div className="mx-auto mt-2 mb-6">
          <span className=' text-4xl text-gray-700 font-semibold'>Savings : </span>
          <span className='text-5xl text-[#81c995] font-extrabold'>&#8377;{specUserData[0].Savings}</span>
        </div>
        <div className="mx-auto mt-2 mb-6">
          <span className=' text-4xl text-gray-700 font-semibold'>Income : </span>
          <span className='text-5xl text-[#81c995] font-extrabold'>&#8377;{specUserData[0].Income}</span>
        </div>
        <div className="mx-auto mt-2 mb-6">
          <span className=' text-4xl text-gray-700 font-semibold'>Month Expense : </span>
          <span className='text-5xl text-[#e75757] font-extrabold'>&#8377;{specUserData[0].expense.currentMonth}</span>
        </div>
        <div className="mx-auto mt-2 mb-6">
          <span className=' text-4xl text-gray-700 font-semibold'>Invested amount : </span>
          <span className='text-5xl text-black font-extrabold'>&#8377;{specUserData[0].investment.TotalInvestment}</span>
        </div>
        <div className="mx-auto mt-2 mb-6">
          <span className=' text-4xl text-gray-700 font-semibold'>Current Amount : </span>
          <span style={{ color: currentColor }} className='text-5xl font-extrabold'>&#8377;{specUserData[0].investment.TotalCurrent}</span>
        </div>
        <div className="mx-auto mt-2 mb-6">
          <span className=' text-4xl text-gray-700 font-semibold'>Returns : </span>
          <span style={{ color: returnsColor }} className='text-5xl font-extrabold'>&#8377;{specUserData[0].investment.TotalReturns}</span>
        </div>
        <div className="mx-auto mt-2 mb-6">
          <span className=' text-4xl text-gray-700 font-semibold'>Total Debt : </span>
          <span className='text-5xl text-[#e75757] font-extrabold'>&#8377;{specUserData[0].loan.TotalDebt}</span>
        </div>
        <div className="mx-auto mt-2 mb-6">
          <span className=' text-4xl text-gray-700 font-semibold'>Total Lended : </span>
          <span className='text-5xl text-[#81c995] font-extrabold'>&#8377;{specUserData[0].loan.TotalLended}</span>
        </div>
        <div className="mx-auto mt-2 mb-6">
          <span className=' text-4xl text-gray-700 font-semibold'>Debt Status : </span>
          <span style={{ color: statusColor }} className='text-5xl font-extrabold'>&#8377;{specUserData[0].loan.debtStatus}</span>
        </div>
      </div>

<div className="flex flex-col justify-center items-center mx-24 my-10">
  <p className="text-5xl my-10 font-semibold text-primary">Generate a AI Powered Report Using GemenAi By Google</p>
      <button
        onClick={handleGenerateReport}
        disabled={reportLoading}
        className={`bg-primary hover:bg-darkprimary text-bodycolor font-bold py-2 px-4 rounded ${reportLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {reportLoading ? 'Generating...' : 'Generate Report'}
      </button>

      {reportSuccess && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Generated Report:</h3>
          <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: formatReport(response) }}></p>
        </div>
      )}

      {reportError && (
        <p className="text-red-500 mt-4">Error generating report. Free trial limit reached. Please try again after an hour.</p>
      )}
      </div>
    </div>
  );
};

export default Report;
