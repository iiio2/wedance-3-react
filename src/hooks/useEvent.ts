import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../services/firebase";
import useAuth from "./useAuth";
import useProfile from "./useProfile";

export interface Event {
  id?: string;
  username?: string;
  organizer: string;
  eventName: string;
  tickets: string;
  facebookEvent: string;
  startDate: string;
  endDate: string;
  where: string;
  price: string;
  eventType: string;
  allDanceStyles: string[];
  allArtists: string[];
  bookmark?: boolean;
}

const useEvent = () => {
  const { user } = useAuth();
  const { person } = useProfile();
  const [eventsOfOwner, setEventsOfOwner] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event>({} as Event);
  const [bookmarked, setBookmarked] = useState();

  const addEvent = (data: Event) => {
    if (user && user.uid) {
      addDoc(collection(db, "events"), {
        owner: user.uid,
        username: person.username,
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
        bookmark: false,
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
    if (user && user.uid) {
      let events: Event[] = [];
      const q = query(
        collection(db, "events"),
        where("owner", "==", user.uid),
        orderBy("bookmark", "desc")
      );

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

  const deleteEvent = (event: Event) => {
    if (event.id) {
      deleteDoc(doc(db, "events", event.id));
    }
  };

  const fetchEvent = (eventId: string) => {
    if (eventId) {
      const docRef = doc(db, "events", eventId);
      getDoc(docRef).then((doc) => {
        setEvent(doc.data() as Event);
      });
    }
  };

  const updateEvent = (data: Event, eventId: string) => {
    if (user && user.uid) {
      const docRef = doc(db, "events", eventId);
      updateDoc(docRef, {
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

  const bookmarkEvent = (eventId: string) => {
    if (user && user.uid) {
      const docRef = doc(db, "events", eventId);

      const event = getDoc(docRef);
      event.then((doc) => {
        if (doc.exists()) {
          const status = doc.data().bookmark;
          setBookmarked(status);
          updateDoc(docRef, {
            bookmark: !status,
          });
        }
      });
    }
  };

  const getEventsByUsername = (username: string) => {
    const q = query(
      collection(db, "events"),
      where("username", "==", username)
    );
    const events: Event[] = [];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() } as Event);
      });
      setEvents(events);
    });
  };

  useEffect(() => {
    allEvents();
    getEventsByOwner();
  }, [user, bookmarked, events]);

  return {
    addEvent,
    events,
    eventsOfOwner,
    deleteEvent,
    fetchEvent,
    event,
    setEvents,
    updateEvent,
    bookmarkEvent,
    getEventsByUsername,
    setEventsOfOwner,
    bookmarked,
  };
};

export default useEvent;
