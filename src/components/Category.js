import React from "react";

const Category = (props) => {
  const handleCategoryClick = (category) => {
    props.category_arrange(props.category_num);

    //카테고리 클릭했을 때 css 바꾸기
    let css_temp = [...props.category_css]
    for (let i = 0; i < css_temp.length; i++) {
      css_temp[i] = 'category'
    }
    css_temp[props.category_num - 1] = 'category_clicked';
    props.category_css_set(css_temp)
  };


  return (
    <div>
      <div
        className={props.category_css[props.category_num - 1]}
        onClick={() => handleCategoryClick(props.category_num)}
      >
        {props.title}
      </div>
    </div>
  );
};

export default Category;
