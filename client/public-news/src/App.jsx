import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Detail from './pages/Detail'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pub/articles" />} />
        <Route path="/pub/articles" element={<Home />} />
        <Route path="/pub/articles/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}