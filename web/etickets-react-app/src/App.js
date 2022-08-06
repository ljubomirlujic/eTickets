import './App.css';
import 'antd/dist/antd.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ChartDesigner from './pages/ChartDesigner';
import ChartList from './pages/ChartList';
import CreateEvent from './pages/CreateEvent'
import Event from './pages/Event';
import EditEvent from './pages/EditEvent';
import Checkout from './pages/Checkout';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/events" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/chartDesigner" element={<ChartDesigner />} />
        <Route exact path="/chartList" element={<ChartList />} />
        <Route exact path="/event" element={<Event />} />
        <Route exact path="/createEvent" element={<CreateEvent />} />
        <Route exact path="/editEvent" element={<EditEvent />} />
        <Route exact path='/checkout' element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
