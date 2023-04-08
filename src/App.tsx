import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import About from "./components/About";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
