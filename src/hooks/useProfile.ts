import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

interface Person {
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber: number;
  events: object[];
}

const useProfile = (userId: string) => {
  const [person, setPerson] = useState<Person>({} as Person);
  const fetchUser = () => {
    if (userId) {
      const q = query(collection(db, "users"), where("uid", "==", userId));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPerson(doc.data() as Person);
        });
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return { person };
};

export default useProfile;
