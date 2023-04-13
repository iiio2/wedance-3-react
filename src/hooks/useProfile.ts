import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import useAuth from "./useAuth";

interface Person {
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber: number;
  livingIn: string;
  events: object[];
}

const useProfile = () => {
  const { user } = useAuth();
  const [person, setPerson] = useState<Person>({} as Person);
  const fetchUser = () => {
    if (user.uid) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPerson(doc.data() as Person);
        });
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return { person };
};

export default useProfile;
