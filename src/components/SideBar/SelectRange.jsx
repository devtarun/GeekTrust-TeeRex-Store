import { useState } from "react";

export default function SelectRange({
  initialValue,
  min,
  max,
  name,
  handleFilterChange,
}) {
  const [value, setValue] = useState(initialValue || 0);

  const handleChange = (event) => {
    setValue(event.target.value);
    handleFilterChange(event);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        type="range"
        onChange={handleChange}
        {...{
          value,
          min,
          max,
          name,
        }}
      />
      <span>{value}</span>
    </div>
  );
}
