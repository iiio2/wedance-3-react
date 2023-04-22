import { useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import useAuth from "../../hooks/useAuth";

const ProfileContent = () => {
  const { person, profile, getProfileByUsername } = useProfile();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getProfileByUsername(id!);
  }, [id]);

  return (
    <>
      <div className="avatar flex justify-between items-center">
        <div className="rounded-full">
          <img src={person.photoURL ? person.photoURL : profile.photoURL} />
        </div>
        {user?.uid && person.email && !id && (
          <button
            onClick={() => navigate(`/edit-profile`)}
            className="btn btn-info"
          >
            + Edit Profile
          </button>
        )}
      </div>
      {user?.uid && person.email && !id && (
        <button
          onClick={() => navigate("/new")}
          className="btn btn-success pl-2 float-right"
        >
          + Create Event
        </button>
      )}

      {(person.email || profile.email) && (
        <>
          <h3 className="text-5xl">
            {person.displayName || profile.displayName}
          </h3>
          <p>{person.email ? person.email : profile.email}</p>
          <Link className="italic" to={`/user/${person.username}`}>
            @{person.username ? person.username : profile.username}
          </Link>
          <p>{person.phoneNumber ? person.phoneNumber : profile.phoneNumber}</p>
          <p>{person.livingIn ? person.livingIn : profile.livingIn}</p>
        </>
      )}
    </>
  );
};

export default ProfileContent;
