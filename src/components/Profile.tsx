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
  photoURL: string;
  phoneNumber: number;
  events: object[];
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
    <div className="profile p-4 text-neutral-950 leading-8 text-lg ">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={person.photoURL} />
        </div>
      </div>
      <h3 className="text-5xl">{person.displayName}</h3>
      <p>{person.email}</p>
      <p>{person.phoneNumber}</p>
      {person.events && person.events.length === 0 && <p>No events founds.</p>}
    </div>
  );
};

export default Profile;
