import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEvent from "../hooks/useEvent";

const Event = () => {
  const { id } = useParams();
  const { fetchEvent, event } = useEvent();

  useEffect(() => {
    fetchEvent(id as string);
  }, []);

  const getFormattedData = (data: string[]) => {
    return new Intl.ListFormat("en", {
      style: "long",
      type: "unit",
    }).format(data);
  };

  return (
    <>
      <p className="italic">{event.username}</p>
      <h3 className="text-3xl">{event.organizer}</h3>
      <h3 className="text-2xl">{event.eventName}</h3>
      <p className="text-xl">{event.where}</p>
      <p className="text-xl">{event.price}</p>
      <p className="text-xl">{event.startDate}</p>
      <p className="text-xl">{event.endDate}</p>
      <p className="text-xl">{event.eventType}</p>
      <p className="text-xl">
        {event &&
          event.allDanceStyles &&
          getFormattedData(event.allDanceStyles)}
      </p>
      <p className="text-xl">
        {event && event.allArtists && getFormattedData(event.allArtists)}
      </p>
    </>
  );
};

export default Event;
