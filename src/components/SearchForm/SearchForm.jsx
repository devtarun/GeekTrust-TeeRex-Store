import "./SearchForm.scss";
import SearchIcon from "../../assets/icons/search.svg";
import { useState } from "react";

export default function SearchForm({ handleProductSearch }) {
  const [search, setSearch] = useState("");

  return (
    <form
      className="search_wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        handleProductSearch(search);
      }}
    >
      <input
        type="text"
        placeholder="Search for products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" style={{ width: 40 }}>
        <img src={SearchIcon} alt="search" />
      </button>
    </form>
  );
}
