import Layout from './components/Layout';
import Landing from './components/Landing';
import { Route, Routes } from 'react-router-dom';
import DashLayout from './components/DashLayout';
import Welcome from './components/Welcome';
import ExpenseList from './features/expense/ExpenseList';
import EditExpense from './features/expense/EditExpense';
import NewExpense from './features/expense/NewExpense';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import { Prefetch } from './features/auth/Prefetch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />} >
            <Route element={<Prefetch />}>
              <Route path='dash' element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route path='expenses'>
                  <Route index element={<ExpenseList />} />
                  <Route path=':id' element={<EditExpense />} />
                  <Route path='new' element={<NewExpense />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
    </Routes>
  );
}

export default App;
