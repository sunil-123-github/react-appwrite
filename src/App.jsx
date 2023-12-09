import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { useDispatch } from "react-redux";
import authService from "./appwrite_services/auth";
import { useEffect } from "react";
import { login, logout } from "./redux_store/slices/authSlice";
import Header from "./components/Header/Header";
import React from "react";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return true ?
    <>
      <Header />
      <main >
        <Outlet />
      </main>
    </>
    : (null)
}

export default App









