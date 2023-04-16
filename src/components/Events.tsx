import useEvent from "../hooks/useEvent";

const Events = () => {
  const { events } = useEvent();
  return (
    <>
      {events.map((event) => (
        <div
          className="border-l-4 border-sky-500 my-2 px-2 bg-sky-100"
          key={event.id}
        >
          <h3>Organizer: {event.organizer}</h3>
          <p>Event: {event.eventName} </p>
          <p>Price: {event.price} </p>
        </div>
      ))}
    </>
  );
};

export default Events;
