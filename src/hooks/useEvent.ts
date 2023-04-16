import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import useAuth from "./useAuth";

interface Event {
  organizer: string;
  eventName: string;
  tickets: string;
  facebookEvent: string;
  startDate: Date;
  endDate: Date;
  where: string;
  price: number;
  eventType: string;
  allDanceStyles: string[];
  allArtists: string[];
}

const useEvent = () => {
  const { user } = useAuth();
  const [event, setEvent] = useState<Event>({} as Event);

  const addEvent = (data: Event) => {
    if (user.uid) {
      addDoc(collection(db, "events"), {
        organizer: data.organizer,
        eventName: data.eventName,
        tickets: data.tickets,
        facebookEvent: data.facebookEvent,
        startDate: data.startDate,
        endDate: data.endDate,
        where: data.where,
        price: data.price,
        eventType: data.eventType,
        allDanceStyles: data.allDanceStyles,
        allArtists: data.allArtists,
      });
    }
  };
  return { addEvent };
};

export default useEvent;
