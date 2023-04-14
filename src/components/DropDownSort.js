import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const DropDownSort = (props) => {
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
            {props.title}
          </button>

          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                {props.sub1}
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                {props.sub2}
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
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
