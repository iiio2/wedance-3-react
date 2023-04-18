import { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../services/firebase";

interface User {
  uid: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User>({} as User);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user as User);
      } else {
        return null;
      }
    });
  }, [user.uid]);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      const { displayName, email, photoURL, phoneNumber, uid } = result.user;

      const q = query(collection(db, "users"), where("email", "==", email));

      getDocs(q).then((querySnapshot) => {
        const user: string[] = [];

        querySnapshot.forEach((doc) => {
          user.push(doc.id);
        });

        if (user.length > 0) {
          window.location.href = "/profile";
          return;
        }
        addDoc(collection(db, "users"), {
          displayName,
          email,
          photoURL,
          phoneNumber,
          createdAt: new Date(),
          livingIn: "",
          uid,
        }).then((docRef) => {
          window.location.href = "/";
        });
      });
    });
  };

  const logout = () => {
    signOut(auth).then(() => {
      window.location.href = "/";
    });
  };

  return { loginWithGoogle, user, logout };
};

export default useAuth;
