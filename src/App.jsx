import Layout from './components/Layout';
import Landing from './components/Landing';
import { Route, Routes } from 'react-router-dom';
import DashLayout from './components/DashLayout';
import Welcome from './components/Welcome';
import ExpenseList from './features/expense/ExpenseList';
import EditExpense from './features/expense/EditExpense';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import { Prefetch } from './features/auth/Prefetch';
import PersistLogin from './components/PersistLogin';
import CreateAccount from './components/CreateAccount';
import InvestmentList from './features/investment/investmentList';
import EditInvestment from './features/investment/EditInvestment';
import LoanList from './features/loan/LoanList';
import EditLoan from './features/loan/EditLoan';
import DebtLoanList from './features/loan/DebtLoanList';
import LendedLoanList from './features/loan/LendedLoanList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createaccount' element={<CreateAccount />} /> 
        <Route element={<PersistLogin />} >
          <Route element={<ProtectedRoute />} >
            <Route element={<Prefetch />}>
              <Route path='dash' element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route path='expenses'>
                  <Route index element={<ExpenseList />} />
                  <Route path=':id' element={<EditExpense />} />
                </Route>
                <Route path='investments'>
                  <Route index element={<InvestmentList />} />
                  <Route path=':id' element={<EditInvestment />} />
                </Route>
                <Route path='loans' >
                  <Route index element={<LoanList />} />
                  <Route path=':id' element={<EditLoan />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
