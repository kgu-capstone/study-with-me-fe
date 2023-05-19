import React from "react";
import * as sortManage from "../sortManage";

const Category = (props) => {
  const handleCategoryClick = (category) => {
    props.category_arrange(props.category_num);
    sortManage.sortManage(category, props.sort_arrange, props.recruit);

    console.log("카테고리 클릭");
  };

  return (
    <div>
      <a
        className="category"
        href="#"
        onClick={() => handleCategoryClick(props.category_num)}
      >
        {props.title}
      </a>
    </div>
  );
};

export default Category;
