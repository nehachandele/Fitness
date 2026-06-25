import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#23084D",
  "#7C3AED",
  "#A855F7",
  "#EC4899",
  "#14B8A6",
];

const ActivityPieChart = ({ data }) => {
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
        Activity Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityPieChart;