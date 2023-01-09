import { useState } from "react";
import FilterOption from "./FilterOption";
import SelectRange from "./SelectRange";
import "./SideBar.scss";

export default function SideBar({ data: SideBarData, handleProductFilter }) {
  const [filters, setFilters] = useState({
    color: [],
    gender: [],
    price: [0, 1000],
    type: []
  });

  // Function to handle filter changes
  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target;

    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...filters[name], value];
      } else {
        newFilters[name] = filters[name].filter((f) => f !== value);
      }
    } else if (type === "range") {
      newFilters[name] = [+value, filters[name][1]];
    }
    setFilters(newFilters);
    handleProductFilter(newFilters);
  };

  return (
    <aside>
      {SideBarData.map((itm, idx) => (
        <div className="aside_card" key={"aside_card" + idx}>
          <h2>{itm.cat}</h2>
          <ul>
            {itm.cat === "Price" ? (
              <li>
                <SelectRange
                  initialValue={0}
                  min={0}
                  max={800}
                  name={itm.cat.toLowerCase()}
                  handleFilterChange={handleFilterChange}
                />
              </li>
            ) : (
              itm.children.map((option, _idx) => (
                <li key={"aside_card_li" + _idx}>
                  <FilterOption
                    name={itm.cat.toLowerCase()}
                    value={option}
                    handleFilterChange={handleFilterChange}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      ))}
    </aside>
  );
}
