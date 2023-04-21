import { useState } from "react";
import { Link } from "react-router-dom";
import useEvent from "../hooks/useEvent";
import SearchBox from "./common/SearchBox";
import { Event } from "../hooks/useEvent";

const Events = () => {
  const { events } = useEvent();
  const [query, setQuery] = useState("");

  let allEvents: Event[] = query
    ? events.filter(
        (event) =>
          event.eventName.toLowerCase().includes(query.toLowerCase()) ||
          event.organizer.toLowerCase().includes(query.toLowerCase()) ||
          event.where.toLowerCase().includes(query.toLowerCase()) ||
          event.allDanceStyles.some((style) =>
            style.toLowerCase().includes(query.toLowerCase())
          )
      )
    : events;

  return (
    <>
      {allEvents.length > 0 && <SearchBox query={query} setQuery={setQuery} />}
      {allEvents.map((event) => (
        <Link
          to={`/event/${event.id}`}
          key={event.id}
          onClick={() => window.scrollTo(0, 0)}
        >
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
