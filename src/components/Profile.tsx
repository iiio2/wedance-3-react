import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { User } from "../App";

interface Props {
  user: User;
}

interface Person {
  displayName: string;
  email: string;
}

const Profile = ({ user }: Props) => {
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
  }, [user.uid]);

  return (
    <>
      <p>Profile</p>
      <p>{person.displayName}</p>
    </>
  );
};

export default Profile;
