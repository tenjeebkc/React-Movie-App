import { useState } from 'react'
import './App.css'

function App() {
const [query, setQuery] = useState("");

function handleSearch(){
  console.log(query)
}

  return (
    <>
    <div>
      <h1>Movie App 🎬</h1>

      <input type="text"
      placeholder='Search Movie...'
      value={query}
      onChange={(e)=> setQuery(e.target.value)} />

      <button onClick={handleSearch} >Search</button>
    </div>
    </>
  )
}

export default App
