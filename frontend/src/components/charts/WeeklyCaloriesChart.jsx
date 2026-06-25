import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const WeeklyCaloriesChart = ({ data }) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-6
      shadow-lg
      h-full
      "
    >
      <h2
        className="
        text-xl
        font-bold
        text-[#23084D]
        mb-6
        "
      >
        Weekly Calories Burned
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />

          <Tooltip />

          <Bar
            dataKey="calories"
            fill="#23084D"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyCaloriesChart;