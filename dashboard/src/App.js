import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';


function App() {
  return (
    <div className="app">
      <Router>
      <div className="pages">
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
      </Router>
    </div>
  )
   
}

export default App;
