import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useEvent from "../hooks/useEvent";
import withSpinner from "./common/withSpinner";

export type FormData = {
  organizer: string;
  eventName: string;
  tickets: string;
  facebookEvent: string;
  startDate: string;
  endDate: string;
  where: string;
  price: number;
  eventType: string;
  danceStyle: string;
  allDanceStyles: string[];
  artist: string;
  allArtists: string[];
};

const CreateEvent = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormData>();
  const [danceStyles, setDanceStyles] = useState<string[]>([]);
  const [artists, setArtists] = useState<any>([]);
  const { addEvent } = useEvent();
  const danceStyle = watch("danceStyle");
  const artist = watch("artist");

  const getStyles = () => {
    if (danceStyle === "Choose Dance Style") return;

    let myStyles = [...danceStyles, danceStyle].filter(Boolean);
    setDanceStyles([...new Set(myStyles)]);
  };

  const handleKeyDown = (event: any) => {
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
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Organizer</span>
          </label>
          <input
            {...register("organizer")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Event Name</span>
          </label>
          <input
            {...register("eventName")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Tickets</span>
          </label>
          <input
            {...register("tickets")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Facebook Event</span>
          </label>
          <input
            {...register("facebookEvent")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            type="date"
            {...register("startDate")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">End Date</span>
          </label>
          <input
            type="date"
            {...register("endDate")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Where</span>
          </label>
          <input
            {...register("where")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            {...register("price")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Event Type</span>
          </label>
          <select
            {...register("eventType")}
            className="select select-bordered w-full max-w-xs"
          >
            <option>Party</option>
            <option>Workshop</option>
            <option>Course</option>
            <option>Festival</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text">Dance Styles</span>
          </label>
          {danceStyles.map((style, index) => (
            <li key={index}>
              {style} |{" "}
              <button
                className="btn btn-primary"
                onClick={() =>
                  setDanceStyles(danceStyles.filter((s, i) => i !== index))
                }
              >
                X
              </button>{" "}
            </li>
          ))}
          <select
            {...register("danceStyle")}
            className="select select-bordered w-full max-w-xs"
            defaultValue={`Choose Dance Style`}
          >
            <option disabled>Choose Dance Style</option>
            <option>Allemande</option>
            <option>Balboa</option>
            <option>Ballet</option>
            <option>Casino</option>
            <option>Salsa</option>
          </select>
        </div>

        <div className="form-group">
          <label className="label">
            <span className="label-text">
              Artists (Press Tab for adding artist)
            </span>
          </label>
          {artists.map((name: string, index: number) => (
            <div key={index}>{name}</div>
          ))}
          <input
            {...register("artist")}
            className="input input-bordered w-full max-w-xs"
            onKeyDown={handleKeyDown}
          />
        </div>

        <button type="submit" className="btn btn-accent mt-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default withSpinner(CreateEvent);
