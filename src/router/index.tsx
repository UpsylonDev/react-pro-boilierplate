import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Demo from '../components/Demo'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  )
}