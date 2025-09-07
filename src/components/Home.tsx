// import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
// import { TodoProvider } from '../stores'

function Home() {
  // const [count, setCount] = useState<number>(0)

  return (
    <div className="App">
      <div>
        <h2>Figma to code : Demo components.</h2>
        <Link 
          to="/demo" 
          className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Vers la demo store.
        </Link>
      </div>
    </div>
  )
}

export default Home