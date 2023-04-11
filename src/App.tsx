import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import Footer from "./components/common/footer";
import "./App.css";

export interface User {
  uid: string;
}

function App() {
  const [user, setUser] = useState<User>({} as User);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user as User);
    } else {
      return null;
    }
  });
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
