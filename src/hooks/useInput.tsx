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
          disabled={type === "email" ? true : false}
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

  const renderBtn = (label: string) => {
    return (
      <button type="submit" className="btn btn-accent mt-3">
        {label}
      </button>
    );
  };

  return { renderInput, renderImage, renderBtn };
};

export default useInput;
