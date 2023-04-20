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
        });
      });
    }
  };

  const getProfileByUsername = (username: string) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setPerson(doc.data() as Person);
      });
    });
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return { person, updateUser, getProfileByUsername };
};

export default useProfile;
