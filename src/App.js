import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateEditInterview from "./components/CreateEditInterview";
import Calender from "./components/Schedules/Calender";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:id" element={<Calender />} />
        <Route path="/create" element={<Calender />} />
        <Route path="/calender" element={<Calender />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
