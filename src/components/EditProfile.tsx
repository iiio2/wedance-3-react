import useProfile from "../hooks/useProfile";
import { User } from "../App";

interface Props {
  user: User;
}

const EditProfile = ({ user }: Props) => {
  const { person } = useProfile(user.uid);
  console.log(person);

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
