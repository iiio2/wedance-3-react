import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useProfile from "../hooks/useProfile";

type FormData = {
  displayName: string;
  email: string;
  phoneNumber: number;
  livingIn: string;
  photoURL: string;
  image: FileList;
};

const EditProfile = () => {
  const { person, updateUser } = useProfile();
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    reset(person);
  }, [person]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.image[0]?.name) {
      const imageRef = ref(storage, `images/${data.image[0].name}`);
      uploadBytes(imageRef, data.image[0]).then((snapshot) => {
        getDownloadURL(ref(storage, `images/${data.image[0].name}`)).then(
          (url) => {
            data.photoURL = url;
            updateUser(data);
            return;
          }
        );
      });
    }
    updateUser(data);
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
          <div className="avatar flex justify-between items-center">
            <div className="rounded-full">
              <img src={person.photoURL} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="label">
            <span className="label-text">Change Photo</span>
          </label>
          <input
            {...register("image")}
            type="file"
            name="image"
            accept="image/*"
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
