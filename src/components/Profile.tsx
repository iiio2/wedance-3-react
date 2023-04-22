import ProfileContent from "./common/ProfileContent";
import ProfileEvents from "./common/ProfileEvents";
import withSpinner from "./common/withSpinner";

const Profile = () => {
  return (
    <>
      <ProfileContent />
      <ProfileEvents />
    </>
  );
};

export default withSpinner(Profile);
