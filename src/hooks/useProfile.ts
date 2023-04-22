import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import useAuth from "./useAuth";

interface Person {
  displayName: string;
  email: string;
  username: string;
  photoURL?: string;
  phoneNumber: number;
  livingIn: string;
  events?: object[];
  image?: any;
}

const useProfile = () => {
  const { user } = useAuth();
  const [person, setPerson] = useState<Person>({} as Person);
  const [profile, setProfile] = useState<Person>({} as Person);
  const [loading, setLoading] = useState(false);

  const fetchUser = () => {
    if (user && user.uid) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPerson(doc.data() as Person);
        });
      });
    }
  };

  const updateUser = (data: Person) => {
    setLoading(true);
    if (user && user.uid) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((query) => {
          const docRef = doc(db, "users", query.id);
          updateDoc(docRef, {
            displayName: data.displayName,
            phoneNumber: data.phoneNumber,
            livingIn: data.livingIn,
            photoURL: data.photoURL,
          });
          setLoading(false);
        });
      });
    }
  };

  const getProfileByUsername = (username: string) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setProfile(doc.data() as Person);
      });
    });
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return { person, profile, updateUser, getProfileByUsername, loading };
};

export default useProfile;
