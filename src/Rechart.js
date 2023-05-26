import React from "react";
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

const ageData = [
  { ageGroup: "10대", count: 7 },
  { ageGroup: "20대", count: 20 },
  { ageGroup: "30대", count: 5 },
  { ageGroup: "40대", count: 5 },
  { ageGroup: "50대이상", count: 1 },
];

// 전체 스터디원 수 계산
const totalStudyMembers = ageData.reduce((sum, data) => sum + data.count, 0);

// 스터디원 수를 퍼센트로 변환
const ageDataWithPercentage = ageData.map((data) => ({
  ...data,
  percentage: ((data.count / totalStudyMembers) * 100).toFixed(1),
}));

export default function Rechart() {
  return (
    <ResponsiveContainer width="100%" height={500}>
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
