import { FunctionComponent } from "react";
import classes from "./SearchBar.module.css";

interface SearchBarProps {
  onInputChange: (value: string) => void;
  onDeleteInput: () => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  onInputChange,
  onDeleteInput,
}) => {
  return (
    <div className={classes.search_bar}>
      <input
        type="text"
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
      />
      <button onClick={onDeleteInput}>X</button>
    </div>
  );
};

export default SearchBar;
