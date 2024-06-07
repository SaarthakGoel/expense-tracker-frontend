import { store } from "../../app/store";
import { expenseApiSlice } from "../expense/expenseApiSlice";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export const Prefetch = () => {
  useEffect(() => {
    store.dispatch(expenseApiSlice.util.prefetch('getExpenses' , 'ExpesnseList' , {force : true}))
  },[]);

  return <Outlet />
}