import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useProfile from "../hooks/useProfile";
import withSpinner from "./common/withSpinner";
import useInput from "../hooks/useInput";

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
  const { renderInput, renderImage, renderBtn } = useInput();
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
        {renderInput("Name", register("displayName"))}
        {renderInput("Email", register("email"), "email")}
        {renderInput("Phone Number", register("phoneNumber"), "number")}
        {renderInput("Living In", register("livingIn"))}
        {renderImage("Photo", person.photoURL!)}
        {renderInput("Change Photo", register("image"), "file")}
        {renderBtn("Submit")}
      </form>
    </>
  );
};

export default withSpinner(EditProfile);
