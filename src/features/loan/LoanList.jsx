import React, { useState } from 'react';
import DebtLoanList from './DebtLoanList';
import LendedLoanList from './LendedLoanList';

const LoanList = () => {
  const [selectedTab, setSelectedTab] = useState('debt');

  const renderContent = () => {
    if (selectedTab === 'debt') {
      return <DebtLoanList />;
    } else if (selectedTab === 'lended') {
      return <LendedLoanList />;
    }
  };

  return (
    <div className="container mx-auto mt-24 p-4">
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
