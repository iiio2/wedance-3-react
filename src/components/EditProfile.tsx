import useProfile from "../hooks/useProfile";

const EditProfile = () => {
  const { person } = useProfile();
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
