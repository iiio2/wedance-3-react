import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="navbar bg-primary flex justify-center ">
      <div className="text-primary-content">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-primary rounded-box w-52"
          >
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            {user.uid && (
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            {user.uid && (
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            )}
          </ul>

          <a
            onClick={() => navigate("/")}
            className="btn btn-ghost normal-case text-xl"
          >
            WeDance
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
