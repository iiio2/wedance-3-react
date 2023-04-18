import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEvent from "../hooks/useEvent";

const Event = () => {
  const { id } = useParams();
  const { fetchEvent, event } = useEvent();

  useEffect(() => {
    fetchEvent(id as string);
  }, []);

  return (
    <>
      <h3 className="text-3xl">{event.organizer}</h3>
      <h3 className="text-2xl">{event.eventName}</h3>
      <p className="text-xl">{event.where}</p>
      <p className="text-xl">{event.price}</p>
      <p className="text-xl">{event.startDate}</p>
      <p className="text-xl">{event.endDate}</p>
      <p className="text-xl">{event.eventType}</p>
      {event.allArtists &&
        event.allArtists.map((artist) => <p key={artist}>{artist}</p>)}
      {event.allDanceStyles &&
        event.allDanceStyles.map((style) => <p key={style}>{style}</p>)}
    </>
  );
};

export default Event;
