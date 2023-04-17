import { Link } from "react-router-dom";
import useEvent from "../hooks/useEvent";

const Events = () => {
  const { events } = useEvent();
  return (
    <>
      {events.map((event) => (
        <Link to={`/event/${event.id}`} key={event.id}>
          <div className="border-l-4 border-sky-500 my-2 px-2 bg-sky-100">
            <h3>Organizer: {event.organizer}</h3>
            <p>Event: {event.eventName} </p>
            <p>Price: {event.price} </p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Events;
