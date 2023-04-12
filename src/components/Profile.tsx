import { useNavigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import { User } from "../App";

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  const { person } = useProfile(user.uid);
  const navigate = useNavigate();

  return (
    <>
      {person.email && (
        <>
          <div className="avatar flex justify-between items-center">
            <div className="w-24 rounded-full">
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
          {person.events && person.events.length === 0 && (
            <p>No events founds.</p>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
