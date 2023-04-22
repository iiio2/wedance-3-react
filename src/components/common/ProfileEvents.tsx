import { useNavigate, Link, useLocation } from "react-router-dom";
import useEvent from "../../hooks/useEvent";
import useAuth from "../../hooks/useAuth";

const ProfileEvents = () => {
  const {
    eventsOfOwner,
    deleteEvent,
    bookmarkEvent,
    setEventsOfOwner,
    loading,
  } = useEvent();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {eventsOfOwner.map((event) => (
        <div
          key={event.id}
          className="flex justify-between items-center bg-sky-100 my-2"
        >
          <div
            onClick={() => navigate(`/event/${event.id}`)}
            key={event.id}
            className="border-l-4 border-sky-500 px-2 cursor-pointer grow bg-sky-100"
          >
            <div className="event-short-info">
              <h3>Organizer: {event.organizer}</h3>
              <p>Event: {event.eventName} </p>
              <p>Price: {event.price} </p>
            </div>
          </div>
          <div className="border-sky-500 my-2 px-2 bg-sky-100 flex justify-between">
            {user?.uid && location.pathname === "/profile" && (
              <div className="btn-group">
                <div className="edit-btn">
                  <button
                    onClick={() => {
                      bookmarkEvent(event.id!);
                    }}
                    className="btn btn-warning"
                  >
                    {!event.bookmark ? "Bookmark" : "Unbookmark"}
                  </button>
                </div>
                <div className="edit-btn">
                  <Link to={`/${event.id}`} className="btn btn-accent mx-1">
                    Edit
                  </Link>
                </div>
                <div className="delete-btn">
                  <button
                    onClick={() => {
                      setEventsOfOwner(
                        eventsOfOwner.filter((e) => e.id !== event.id)
                      );
                      deleteEvent(event);
                    }}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProfileEvents;
