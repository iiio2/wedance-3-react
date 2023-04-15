import { useNavigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const { person } = useProfile();
  const navigate = useNavigate();

  return (
    <>
      {person.email && (
        <>
          <div className="avatar flex justify-between items-center">
            <div className="rounded-full">
              <img src={person.photoURL} />
            </div>
            <button
              onClick={() => navigate("/edit-profile")}
              className="btn btn-info"
            >
              + Edit Profile
            </button>
          </div>
          <h3 className="text-5xl">{person.displayName}</h3>
          <p>{person.email}</p>
          <p>{person.phoneNumber}</p>
          <p>{person.livingIn}</p>
          {person.events && person.events.length === 0 && (
            <p>No events founds.</p>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
