import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { authApi } from "../services/api";
import * as sortManage from "../sortManage";

const DropDownSort = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.title);


  const handleOptionSelect = (option, sort) => {
    props.setRecru_Sort(sort);
    if (props.title == "모집 최신순") {
      sortManage.sortManage(
        props.save_Category_Status,
        sort,
        props.save_Sort_Status
      );
    } else {
      sortManage.sortManage(
        props.save_Category_Status,
        props.save_Sort_Status,
        sort
      );
    }

    setSelectedOption(option);
    props.setRecruitStatus(sort);

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

                onClick={() => handleOptionSelect(props.sub1, props.sub1_API)}

            

              >
                {props.sub1}
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"

                onClick={() => handleOptionSelect(props.sub2, props.sub2_API)}

              

              >
                {props.sub2}
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"

                onClick={() => handleOptionSelect(props.sub3, props.sub3_API)}

       

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
