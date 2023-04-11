import useAuth from "../../hooks/useAuth";

interface Props {
  label: string;
}

const GoogleLogin = ({ label }: Props) => {
  const { loginWithGoogle } = useAuth();
  return (
    <button onClick={loginWithGoogle} className="btn btn-primary">
      {label}
    </button>
  );
};

export default GoogleLogin;
