import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getByName } from "../../store/actions/index";
import "./SearchBar.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return alert("insert a dog's race");
    } else {
      dispatch(getByName(search));
      history.push("/home");
      setSearch("");
    }
  };

  return (
    <>
      <div>
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-txt"
            placeholder="Search some race..."
            onChange={handleChange}
            value={search}
          />
          <button className="search-btn" type="submit" value="Search">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
