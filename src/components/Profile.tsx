import { useNavigate, Link } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import useEvent from "../hooks/useEvent";
import withSpinner from "./common/withSpinner";

const Profile = () => {
  const { person } = useProfile();
  const { eventsOfOwner, deleteEvent, bookmarkEvent, setEventsOfOwner } =
    useEvent();
  const navigate = useNavigate();

  return (
    <>
      {person.email && (
        <div>
          <div className="avatar flex justify-between items-center">
            <div className="rounded-full">
              <img src={person.photoURL} />
            </div>
            <button
              onClick={() => navigate(`/edit-profile`)}
              className="btn btn-info"
            >
              + Edit Profile
            </button>
          </div>
          <h3 className="text-5xl">{person.displayName}</h3>
          <p>{person.email}</p>
          <p>@{person.username}</p>
          <p>{person.phoneNumber}</p>
          <p>{person.livingIn}</p>
          {eventsOfOwner.map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-center bg-sky-100 mb-2"
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
              </div>
            </div>
          ))}
          <button
            onClick={() => navigate("/new")}
            className="btn btn-success mt-2"
          >
            Create Event
          </button>
        </div>
      )}
    </>
  );
};

export default withSpinner(Profile);
