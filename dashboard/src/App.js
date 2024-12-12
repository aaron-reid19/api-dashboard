import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';


function App() {
  return (
    <div className="app">
      <Router>
        <Navbar/>
      <div className="pages">
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Routes>
          <Route path='register' element={<Register/>}/>
        </Routes>
      </div>
      </Router>
    </div>
  )
   
}

export default App;
