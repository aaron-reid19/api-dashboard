import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext} from './Hooks/useAuthContext';

//pages and components
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';


function App() {
const {user} = useAuthContext()
  return (
    <div className="app">
      <Router>
        <Navbar/>
      <div className="pages">
        <Routes>
          <Route path='/' element={user ? <Home/> : <Navigate to='/login'/>}/>
        </Routes>
        <Routes>
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
        </Routes>
        <Routes>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </div>
      </Router>
    </div>
  )
   
}

export default App;
