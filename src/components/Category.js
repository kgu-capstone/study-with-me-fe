import React from "react";
import * as sortManage from "../sortManage";

const Category = (props) => {
  // a 태그 버튼 클릭하면 글자색 파란색으로 바뀌는 거 수정하기
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
