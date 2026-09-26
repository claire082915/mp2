import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ListView from './components/ListView';
import GalleryView from './components/GalleryView'
import DetailView from './components/DetailView';

import './App.css'

function App() {


  return (
    <>
      <nav>
        <Link to="/">List View</Link> | <Link to="/gallery">Gallery View</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/detail/:id" element={<DetailView />} />
      </Routes>
    </>
  )
}

export default App
