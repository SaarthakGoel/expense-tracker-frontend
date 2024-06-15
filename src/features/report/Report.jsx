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
    <div className="mt-24 px-4 sm:px-6 lg:px-8">
      <div className="hidden md:block">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Savings', value: specUserData[0].Savings, color: '#81c995' },
          { label: 'Income', value: specUserData[0].Income, color: '#81c995' },
          { label: 'Month Expense', value: specUserData[0].expense.currentMonth, color: '#e75757' },
          { label: 'Invested amount', value: specUserData[0].investment.TotalInvestment, color: 'black' },
          { label: 'Current Amount', value: specUserData[0].investment.TotalCurrent, color: currentColor },
          { label: 'Returns', value: specUserData[0].investment.TotalReturns, color: returnsColor },
          { label: 'Total Debt', value: specUserData[0].loan.TotalDebt, color: '#e75757' },
          { label: 'Total Lended', value: specUserData[0].loan.TotalLended, color: '#81c995' },
          { label: 'Debt Status', value: specUserData[0].loan.debtStatus, color: statusColor }
        ].map((item, index) => (
          <div key={index} className="text-center mt-2 mb-6">
            <span className="text-xl sm:text-2xl lg:text-4xl text-gray-700 font-semibold">{item.label} : </span>
            <span className={`text-2xl sm:text-3xl lg:text-5xl font-extrabold`} style={{ color: item.color }}>
              &#8377;{item.value}
            </span>
          </div>
        ))}
      </div>
      </div>
  
      <div className="flex flex-col justify-center items-center mx-4 sm:mx-6 lg:mx-24 my-10">
        <p className="text-2xl sm:text-3xl lg:text-5xl my-10 font-semibold text-primary text-center">
          Generate an AI Powered Report Using GemenAi By Google
        </p>
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
