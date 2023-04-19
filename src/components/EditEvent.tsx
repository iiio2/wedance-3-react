import { useEffect, useState, KeyboardEvent } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useEvent from "../hooks/useEvent";
import { FormData } from "./CreateEvent";
import withSpinner from "./common/withSpinner";
import useInput from "../hooks/useInput";
import { eventTypes, danceStyleNames } from "./CreateEvent";

const EditEvent = () => {
  const { id } = useParams();
  const { fetchEvent, event, updateEvent } = useEvent();

  const { register, handleSubmit, watch, reset } = useForm<FormData>();
  const [danceStyles, setDanceStyles] = useState<string[]>([]);
  const {
    renderInput,
    renderSelect,
    renderItemsOnSelect,
    renderItemsOnTab,
    renderInputOnTab,
    renderBtn,
  } = useInput();
  const [artists, setArtists] = useState<string[]>([]);
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

  useEffect(() => {
    fetchEvent(id!);
  }, [id]);

  useEffect(() => {
    reset(event);
    setDanceStyles(event.allDanceStyles);
    setArtists(event.allArtists);
  }, [event]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    data.allDanceStyles = danceStyles;
    data.allArtists = artists;
    updateEvent(data, id!);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderInput("Organizer", register("organizer"))}
      {renderInput("Event Name", register("eventName"))}
      {renderInput("Tickets", register("tickets"))}
      {renderInput("Facebook Evnet", register("facebookEvent"))}
      {renderInput("Start Date", register("startDate"))}
      {renderInput("End Date", register("endDate"))}
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

export default withSpinner(EditEvent);
