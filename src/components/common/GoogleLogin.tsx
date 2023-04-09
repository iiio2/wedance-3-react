import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase";

const GoogleLogin = () => {
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      window.location.href = "/about";
    });
  };

  return (
    <button onClick={loginWithGoogle} className="btn btn-primary">
      Get Started
    </button>
  );
};

export default GoogleLogin;
