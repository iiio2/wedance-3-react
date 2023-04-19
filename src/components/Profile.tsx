import { useNavigate, Link } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import useEvent from "../hooks/useEvent";
import { useEffect, useState } from "react";
import { Event } from "../hooks/useEvent";
import useAuth from "../hooks/useAuth";
import withSpinner from "./common/withSpinner";

const Profile = () => {
  const { person } = useProfile();
  const { loading, user } = useAuth();
  const { eventsOfOwner, deleteEvent } = useEvent();
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEvents(eventsOfOwner);
  }, [eventsOfOwner]);

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
          {events.map((event) => (
            <div
              className="border-l-4 border-sky-500 my-2 px-2 bg-sky-100 flex justify-between items-center"
              key={event.id}
            >
              <div className="event-short-info">
                <h3>Organizer: {event.organizer}</h3>
                <p>Event: {event.eventName} </p>
                <p>Price: {event.price} </p>
              </div>
              <div className="btn-group">
                <div className="edit-btn">
                  <Link
                    to={`/edit-event/${event.id}`}
                    className="btn btn-accent"
                  >
                    Edit
                  </Link>
                </div>
                <div className="delete-btn ml-2">
                  <button
                    onClick={() => {
                      setEvents(events.filter((e) => e.id !== event.id));
                      deleteEvent(event);
                    }}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
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

export default withSpinner(Profile);
