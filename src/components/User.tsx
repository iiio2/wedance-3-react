import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import useEvent from "../hooks/useEvent";
import ProfileContent from "./common/ProfileContent";
import ProfileEvents from "./common/ProfileEvents";
useEvent;

const User = () => {
  const { getProfileByUsername } = useProfile();
  const { getEventsByUsername } = useEvent();
  const { id } = useParams();

  useEffect(() => {
    getProfileByUsername(id!);
    getEventsByUsername(id!);
  }, [id]);

  return (
    <>
      <ProfileContent />
      <ProfileEvents />
    </>
  );
};

export default User;
