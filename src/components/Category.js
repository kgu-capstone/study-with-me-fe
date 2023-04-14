import React from "react";

const Category = (props) => {
  // a 태그 버튼 클릭하면 글자색 파란색으로 바뀌는 거 수정하기
  return (
    <div>
      <a className="category" href="#">
        {props.title}
      </a>
    </div>
  );
};

export default Category;
