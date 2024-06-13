import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";  // Bootstrap CSS
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import AddTask from './tasks/AddTask';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTask from './tasks/EditTask';

function App() {
  return (
    <div className="App">
      <Router> 
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/addTask" element={<AddTask/>}/>
        <Route exact path="/editTask/:task_num" element={<EditTask/>}/>
      </Routes>

      </Router>
      
    </div>
  );
}

export default App;
