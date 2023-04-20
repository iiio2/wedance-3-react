import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import EditProfile from "./components/EditProfile";
import EventForm from "./components/EventForm";
import Events from "./components/Events";
import Event from "./components/Event";
import User from "./components/User";
import DefaultLayout from "./layouts/default";
import Footer from "./components/common/footer";
import NotFound from "./components/common/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
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
            path="/event/:id"
            element={
              <DefaultLayout>
                <Event />
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
            path="/:id"
            element={
              <DefaultLayout>
                <EventForm />
              </DefaultLayout>
            }
          />
          <Route
            path="/user/:id"
            element={
              <DefaultLayout>
                <User />
              </DefaultLayout>
            }
          />

          <Route
            path="*"
            element={
              <DefaultLayout>
                <NotFound />
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
