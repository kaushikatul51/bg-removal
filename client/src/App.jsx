import React from 'react'
import { Routes,Route } from 'react-router-dom'
import BuyCredit from './pages/BuyCredits.jsx'
import Home from './pages/Home'
import Result from './pages/Result.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'


const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar/>
      
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/result' element = {<Result/>} />
        <Route path='/buy' element = {<BuyCredit/>} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App
