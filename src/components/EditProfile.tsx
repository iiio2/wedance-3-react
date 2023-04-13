import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useProfile from "../hooks/useProfile";

type FormData = {
  displayName: string;
  email: string;
  phoneNumber: number;
  livingIn: string;
};

const EditProfile = () => {
  const { person } = useProfile();
  const { register, handleSubmit, reset } = useForm<FormData>();
  console.log(person);

  useEffect(() => {
    reset(person);
  }, [person]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("displayName")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email")}
            className="input input-bordered w-full max-w-xs"
            disabled
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            {...register("phoneNumber")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Living In</span>
          </label>
          <input
            {...register("livingIn")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-group">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <img className="rounded-full" src={person.photoURL} alt="User" />
        </div>

        <div className="form-group">
          <label className="label">
            <span className="label-text">Change Photo</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>

        <button type="submit" className="btn btn-accent mt-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default EditProfile;
