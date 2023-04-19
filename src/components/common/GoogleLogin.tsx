import useAuth from "../../hooks/useAuth";

interface Props {
  label: string;
}

const GoogleLogin = ({ label }: Props) => {
  const { loginWithGoogle, user } = useAuth();
  return (
    <button
      onClick={
        user ? () => (window.location.href = "/profile") : loginWithGoogle
      }
      className="btn btn-primary"
    >
      {label}
    </button>
  );
};

export default GoogleLogin;
