import React, { useEffect, useState } from "react";
import "./css/Main.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";


export default function Rechart({ participants }) {

  const [age10, setAge10] = useState(0);
  const [age20, setAge20] = useState(0);
  const [age30, setAge30] = useState(0);
  const [age40, setAge40] = useState(0);
  const [age50, setAge50] = useState(0);

  let ageData = [
    { ageGroup: "10대", count: age10 },
    { ageGroup: "20대", count: age20 },
    { ageGroup: "30대", count: age30 },
    { ageGroup: "40대", count: age40 },
    { ageGroup: "50대이상", count: age50 },
  ];

  useEffect(() => {
    participants.map((item) => {
      if (item.age / 10 < 2) {
        setAge10(age10 + 1)
      } else if (item.age / 10 < 3) {
        setAge20(age20 + 1)
      } else if (item.age / 10 < 4) {
        setAge30(age30 + 1)
      } else if (item.age / 10 < 5) {
        setAge40(age40 + 1)
      } else {
        setAge50(age50 + 1)
      }

    })
  }, [ageData])

  // 전체 스터디원 수 계산
  const totalStudyMembers = ageData.reduce((sum, data) => sum + data.count, 0);

  // 스터디원 수를 퍼센트로 변환
  const ageDataWithPercentage = ageData.map((data) => ({
    ...data,
    percentage: ((data.count / totalStudyMembers) * 100).toFixed(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={500} height={300} data={ageDataWithPercentage}>
        <CartesianGrid stroke="transparent" />
        <XAxis dataKey="ageGroup" />
        <YAxis hide /> {/* y 축 숨김 */}
        <Tooltip />
        <Legend content={() => null} /> {/* 범례 숨김 */}
        <Bar dataKey="percentage" fill="#ff5037" />
      </BarChart>
    </ResponsiveContainer>
  );
}
