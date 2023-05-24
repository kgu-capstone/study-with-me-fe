import React, { useEffect, useState, useRef } from "react";
import { SelectBOX } from "../SelectBOX";

const RealEstate = (props) => {
  useEffect(() => {
    SelectBOX(props); // 시/도/군/구 selectBOX 생성함수를 컴포넌트가 로드 되자마자 실행해준다.
  });

  return (
    <div>
      <select
        name="sido1"
        id="sido1"
        value={props.province}
        onChange={(e) => props.setProvince(e.target.value)}
        className='main_province_choice'
      ></select>
      <select 
        name="gugun1" 
        id="gugun1"
        value={props.city}
        onChange={(e) => props.setCity(e.target.value)}
      ></select>
    </div>
  );
};

export default RealEstate;
