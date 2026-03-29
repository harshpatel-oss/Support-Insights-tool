import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Charts({data}){
  const chartData = Object.entries(data.catCount)
    .map(([k,v])=>({name:k, count:v}));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="count" fill="#6366f1"/>
      </BarChart>
    </ResponsiveContainer>
  );
}