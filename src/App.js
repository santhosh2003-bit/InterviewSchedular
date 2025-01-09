import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateEditInterview from "./components/CreateEditInterview";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:id" element={<CreateEditInterview />} />
        <Route path="/create" element={<CreateEditInterview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
