import React, { useEffect } from "react";
import { SelectBOX } from "../SelectBOX";

const RealEstate = () => {
  useEffect(() => {
    SelectBOX(); // 시/도/군/구 selectBOX 생성함수를 컴포넌트가 로드 되자마자 실행해준다.
  }, []);

  return (
    <div className="some-area">
      <select name="sido1" id="sido1"></select>
      <select name="gugun1" id="gugun1"></select>
    </div>
  );
};

export default RealEstate;
