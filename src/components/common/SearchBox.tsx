import { Dispatch, SetStateAction } from "react";

interface Props {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchBox = ({ query, setQuery }: Props) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search by Organizer, Name, Dance Styles, Location..."
      className="input input-bordered w-full"
    />
  );
};

export default SearchBox;
