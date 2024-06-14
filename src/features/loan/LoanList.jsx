import React, { useEffect, useState } from 'react';
import DebtLoanList from './DebtLoanList';
import LendedLoanList from './LendedLoanList';
import { useGetloanQuery } from './loanApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from '../auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import { useUpdateUserDataMutation } from '../userData/userDataApiSlice';

const LoanList = () => {
  const [selectedTab, setSelectedTab] = useState('debt');

  const accessToken = useSelector(selectCurrentToken);

  const accessTokenData = jwtDecode(accessToken);

  const {userId} = accessTokenData;

  const {
    data : loans,
    isSuccess
  } = useGetloanQuery();

  let abc = [];

  if(isSuccess) {
    const {ids , entities} = loans;
    const loanList = ids.map(id => entities[id])
    const userloanList = loanList.filter(item => item.user === userId)
    abc = [...userloanList];
  }

  const debts = abc.filter((item) => item.lended === false)
  const lends = abc.filter((item) => item.lended === true)

  function getTotalDebt(abc) {
    if(abc.length === 0) return 0
    let total = 0 ;
    abc.forEach((item) => {
      total += item.amount
    })
    return total
  }
  
  const TotalDebt = getTotalDebt(debts);

  function getTotalLended(abc) {
    if(abc.length === 0) return 0
    let total = 0 ;
    abc.forEach((item) => {
      total += item.amount
    })
    return total
  }
  
  const TotalLended = getTotalLended(lends);

  const debtStatus = TotalLended - TotalDebt;

  const loanData = {
    TotalDebt : TotalDebt,
    TotalLended : TotalLended,
    debtStatus : debtStatus
  }

  const [updateUserData , {} ] = useUpdateUserDataMutation();

  useEffect(() => {
    updateUserData({user : userId , TotalDebt : TotalDebt, TotalLended : TotalLended, debtStatus : debtStatus})
  },[TotalDebt,TotalLended,debtStatus])





  const renderContent = () => {
    if (selectedTab === 'debt') {
      return <DebtLoanList />;
    } else if (selectedTab === 'lended') {
      return <LendedLoanList />;
    }
  };

  const statusClass = debtStatus >= 0 ? '#81c995' : '#f28b82';

  return (
    <div className="container mx-auto mt-24 p-4">

      <div className='flex justify-around mb-10'>
      <div>
        <span className='text-4xl text-gray-700 font-semibold'>Debt : </span> <span className='text-5xl text-[#f28b82] font-extrabold'>&#8377;{TotalDebt}</span>
      </div>
      <div>
        <span className='text-4xl text-gray-700 font-semibold'>Lended : </span> <span className='text-5xl text-[#81c995] font-extrabold'>&#8377;{TotalLended}</span>
      </div>
      <div>
        <span className='text-4xl text-gray-700 font-semibold'>Debt Status : </span> <span className='text-5xl font-extrabold' style={{ color: statusClass }}>&#8377;{debtStatus}</span>
      </div>
      </div>

      <nav className="flex justify-around mb-4">
        <button
          className={`px-4 w-[50%] py-2 ${selectedTab === 'debt' ? 'bg-primary text-bodycolor' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('debt')}
        >
          Debt
        </button>
        <button
          className={`px-4 w-[50%] py-2 ${selectedTab === 'lended' ? 'bg-primary text-bodycolor' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('lended')}
        >
          Lended
        </button>
      </nav>
      {renderContent()}
    </div>
  );
};

export default LoanList;
