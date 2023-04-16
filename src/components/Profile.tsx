import { useNavigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import useEvent from "../hooks/useEvent";

const Profile = () => {
  const { person } = useProfile();
  const { eventsOfOwner } = useEvent();
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
          {eventsOfOwner.map((event) => (
            <div
              className="border-l-4 border-sky-500 my-2 px-2 bg-sky-100"
              key={event.id}
            >
              <h3>Organizer: {event.organizer}</h3>
              <p>Event: {event.eventName} </p>
              <p>Price: {event.price} </p>
            </div>
          ))}
          <button
            onClick={() => navigate("/create-event")}
            className="btn btn-success mt-2"
          >
            Create Event
          </button>
        </>
      )}
    </>
  );
};

export default Profile;
