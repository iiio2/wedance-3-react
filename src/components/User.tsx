import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import useEvent from "../hooks/useEvent";
useEvent;

const User = () => {
  const { person, getProfileByUsername } = useProfile();
  const { events, getEventsByUsername } = useEvent();
  const { id } = useParams();

  useEffect(() => {
    getProfileByUsername(id!);
    getEventsByUsername(id!);
  }, [id]);

  return (
    <div>
      <div className="avatar flex justify-between items-center">
        <div className="rounded-full">
          <img src={person.photoURL} />
        </div>
      </div>
      <h3 className="text-5xl">{person.displayName}</h3>
      <p>{person.email}</p>
      <p>{person.phoneNumber}</p>
      <p>{person.livingIn}</p>

      {events &&
        events.map((event) => (
          <Link
            to={`/event/${event.id}`}
            className="border-l-4 border-sky-500 my-2 px-2 bg-sky-100 flex justify-between items-center"
            key={event.id}
          >
            <div className="event-short-info">
              <h3>Organizer: {event.organizer}</h3>
              <p>Event: {event.eventName} </p>
              <p>Price: {event.price} </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default User;
