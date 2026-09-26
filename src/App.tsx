import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import type { Emoji } from './types/emoji'
import { fetchAllEmojis } from './services/api';
import ListView from './components/ListView';
import GalleryView from './components/GalleryView'
import DetailView from './components/DetailView';

import './App.css'

function App() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllEmojis().then((data) => {
      setEmojis(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
      setLoading(false);
    })
  }, []);

  if (loading) return <div>Loading Emojis...</div>

  return (
    <>
      <nav>
        <Link to="/">List View</Link> | <Link to="/gallery">Gallery View</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ListView emojis={emojis}/>} />
        <Route path="/gallery" element={<GalleryView emojis={emojis}/>} />
        <Route path="/detail/:name" element={<DetailView emojis={emojis}/>} />
      </Routes>
    </>
  )
}

export default App
