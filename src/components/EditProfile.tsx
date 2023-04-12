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

const EditProfile = ({ user }: Props) => {
  console.log(user);
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
      <form>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </form>
    </>
  );
};

export default EditProfile;
