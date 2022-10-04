import React, { useContext, useEffect } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from "../context/AppContext";

const Layout = ({ children }) => {
  const { state } = useContext(AppContext)

  useEffect(() => {
    if (state.darkTheme === 'dark') {
      document.body.classList.remove("dark");        
    } else {
      document.body.classList.add("dark");  
    }
  },[state.darkTheme])
      
  return (
    <>
      <Header />

      <main className="theme-main container">
        { children }
      </main>

      <Footer />
    </>
  )
}

export default Layout