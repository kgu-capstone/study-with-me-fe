import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const DropDownSort = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.title);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    console.log("선택된 값:", option);
  };

  return (
    <div>
      <div className="sort-area">
        <div class="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedOption}
          </button>

          <ul class="dropdown-menu">
            <li>
              <a
                class="dropdown-item"
                href="#"
                onClick={() => handleOptionSelect(props.sub1)}
              >
                {props.sub1}
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                onClick={() => handleOptionSelect(props.sub2)}
              >
                {props.sub2}
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                onClick={() => handleOptionSelect(props.sub3)}
              >
                {props.sub3}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropDownSort;
