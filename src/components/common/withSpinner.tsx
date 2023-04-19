import useAuth from "../../hooks/useAuth";
import Spinner from "./Spinner";
import NotFound from "./NotFound";

const withSpinner = (WrappedComponent: any) => {
  return (props: any) => {
    const { user, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!user) return <NotFound />;
    if (!user.uid) return <NotFound />;

    return <WrappedComponent {...props} />;
  };
};

export default withSpinner;
