import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import useAuth from "./useAuth";

interface Event {
  id?: string;
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
  const [eventsOfOwner, setEventsOfOwner] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (data: Event) => {
    if (user.uid) {
      addDoc(collection(db, "events"), {
        owner: user.uid,
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

  const allEvents = () => {
    const querySnapshot = getDocs(collection(db, "events"));
    let events: Event[] = [];
    querySnapshot.then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.exists()) {
          events.push({ id: doc.id, ...doc.data() } as Event);
        }
      });
      setEvents(events);
    });
  };

  const getEventsByOwner = () => {
    if (user.uid) {
      let events: Event[] = [];
      const q = query(collection(db, "events"), where("owner", "==", user.uid));

      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            events.push({ id: doc.id, ...doc.data() } as Event);
          }
        });
        setEventsOfOwner(events);
      });
    }
  };

  useEffect(() => {
    allEvents();
    getEventsByOwner();
  }, [user.uid]);

  return { addEvent, events, eventsOfOwner };
};

export default useEvent;
