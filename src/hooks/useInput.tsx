import { Dispatch, SetStateAction, KeyboardEventHandler } from "react";

const useInput = () => {
  const renderInput = (label: string, register: object, type = "text") => {
    return (
      <div className="form-group">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          {...register}
          type={type}
          disabled={type === "email" || label === "Username" ? true : false}
          className={
            type === "file"
              ? "file-input file-input-bordered w-full max-w-xs"
              : "input input-bordered w-full max-w-xs"
          }
        />
      </div>
    );
  };

  const renderImage = (label: string, photoURL: string) => {
    return (
      <div className="form-group">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="avatar flex justify-between items-center">
          <div className="rounded-full">
            <img src={photoURL} />
          </div>
        </div>
      </div>
    );
  };

  const renderBtn = (label: string, loading?: boolean) => {
    return (
      <button
        type="submit"
        className={
          loading ? "btn btn-accent mt-3 loading" : "btn btn-accent mt-3"
        }
      >
        {loading ? "Submitting" : label}
      </button>
    );
  };

  const renderSelect = (
    label: string,
    register: object,
    items: string[],
    defaultValue = "Choose Dance Style"
  ) => {
    return (
      <div className="form-group">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <select
          {...register}
          className="select select-bordered w-full max-w-xs"
          defaultValue={defaultValue}
        >
          {items.map((item) => (
            <option disabled={item === defaultValue ? true : false} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderInputOnTab = (
    label: string,
    register: object,
    handleItem: KeyboardEventHandler<HTMLInputElement>
  ) => {
    return (
      <div className="form-group">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>

        <input
          {...register}
          className="input input-bordered w-full max-w-xs"
          onKeyDown={handleItem}
        />
      </div>
    );
  };

  const renderItems = (
    data: string[],
    setData: Dispatch<SetStateAction<string[]>>
  ) => {
    return (
      <>
        {data &&
          data.map((name: string, index: number) => (
            <div key={index}>
              {name}{" "}
              <button
                className="btn btn-primary"
                onClick={(event) => {
                  event.preventDefault();
                  setData(data.filter((s, i) => i !== index));
                }}
              >
                X
              </button>{" "}
            </div>
          ))}
      </>
    );
  };

  return {
    renderInput,
    renderImage,
    renderBtn,
    renderSelect,
    renderInputOnTab,
    renderItems,
  };
};

export default useInput;
