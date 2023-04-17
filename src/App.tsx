import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import Footer from "./components/common/footer";
import EditProfile from "./components/EditProfile";
import CreateEvent from "./components/CreateEvent";
import DefaultLayout from "./layouts/default";
import Events from "./components/Events";
import Event from "./components/Event";
import EditEvent from "./components/EditEvent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/about"
            element={
              <DefaultLayout>
                <About />
              </DefaultLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <DefaultLayout>
                <Profile />
              </DefaultLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <DefaultLayout>
                <Contact />
              </DefaultLayout>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <DefaultLayout>
                <EditProfile />
              </DefaultLayout>
            }
          />
          <Route
            path="/create-event"
            element={
              <DefaultLayout>
                <CreateEvent />
              </DefaultLayout>
            }
          />
          <Route
            path="/events"
            element={
              <DefaultLayout>
                <Events />
              </DefaultLayout>
            }
          />
          <Route
            path="/event/:id"
            element={
              <DefaultLayout>
                <Event />
              </DefaultLayout>
            }
          />
          <Route
            path="/edit-event/:id"
            element={
              <DefaultLayout>
                <EditEvent />
              </DefaultLayout>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
