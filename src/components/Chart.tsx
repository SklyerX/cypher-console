import { Line, LineChart, ResponsiveContainer } from "recharts";

interface DaysOfTheWeek {
  name: string;
  events: number;
}

interface Props {
  events: Array<DaysOfTheWeek>;
}

export default function PlaceholderChart({ events }: Props) {
  return (
    <ResponsiveContainer width="100%" height="40%">
      <LineChart
        width={500}
        height={300}
        data={events}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis />
        <Tooltip />
        <Legend /> */}
        <Line
          type="monotone"
          dataKey="events"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
