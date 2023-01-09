import { useState } from "react";

export default function FilterOption({ name, value, handleFilterChange }) {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    handleFilterChange(e);
  };

  return (
    <label>
      <input
        type="checkbox"
        onChange={handleChange}
        {...{
          name,
          value,
          checked
        }}
      />{" "}
      {value}
    </label>
  );
}
