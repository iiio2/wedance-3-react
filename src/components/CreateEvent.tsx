import { useEffect, useState, KeyboardEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useEvent from "../hooks/useEvent";
import withSpinner from "./common/withSpinner";
import useInput from "../hooks/useInput";

export type FormData = {
  organizer: string;
  eventName: string;
  tickets: string;
  facebookEvent: string;
  startDate: string;
  endDate: string;
  where: string;
  price: string;
  eventType: string;
  danceStyle: string;
  allDanceStyles: string[];
  artist: string;
  allArtists: string[];
};

export const eventTypes = ["Party", "Workshop", "Course", "Festival", "Other"];

export const danceStyleNames = [
  "Choose Dance Style",
  "Allemande",
  "Balboa",
  "Ballet",
  "Casino",
  "Salsa",
];

const CreateEvent = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormData>();
  const [danceStyles, setDanceStyles] = useState<string[]>([]);
  const [artists, setArtists] = useState<string[]>([]);
  const { addEvent } = useEvent();
  const {
    renderInput,
    renderSelect,
    renderBtn,
    renderItemsOnSelect,
    renderInputOnTab,
    renderItemsOnTab,
  } = useInput();
  const danceStyle = watch("danceStyle");
  const artist = watch("artist");

  const getStyles = () => {
    if (danceStyle === "Choose Dance Style") return;

    let myStyles = [...danceStyles, danceStyle].filter(Boolean);
    setDanceStyles([...new Set(myStyles)]);
  };

  const handleArtists = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setArtists([...artists, artist]);
      reset({ artist: "" });
    }
  };

  useEffect(() => {
    getStyles();
  }, [danceStyle]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    data.allDanceStyles = danceStyles;
    data.allArtists = artists;
    addEvent(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderInput("Organizer", register("organizer"))}
      {renderInput("Event Name", register("eventName"))}
      {renderInput("Tickets", register("tickets"))}
      {renderInput("Facebook Event", register("facebookEvent"))}
      {renderInput("Start Date", register("startDate"), "date")}
      {renderInput("End Date", register("endDate"), "date")}
      {renderInput("Where", register("where"))}
      {renderInput("Price", register("price"))}
      {renderSelect("Event Type", register("eventType"), eventTypes)}
      {renderItemsOnSelect(danceStyles, setDanceStyles)}
      {renderSelect("Dance Styles", register("danceStyle"), danceStyleNames)}
      {renderItemsOnTab(artists)}
      {renderInputOnTab(
        "Artists (Press Tab for adding artist)",
        register("artist"),
        handleArtists
      )}
      {renderBtn("Submit")}
    </form>
  );
};

export default withSpinner(CreateEvent);
