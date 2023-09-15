import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Monday",
    events: 8012,
  },
  {
    name: "Tuesday",
    events: 300,
  },
  {
    name: "Wed",
    events: 5102,
  },
  {
    name: "Thursday",
    events: 591,
  },
  {
    name: "Friday",
    events: 999,
  },
  {
    name: "Saturday",
    events: 3,
  },
  {
    name: "Sunday",
    events: 8012,
  },
];

interface DaysOfTheWeek {
  name: string;
  events: number;
}

interface Props {
  events: Array<DaysOfTheWeek>;
}

export default function FullChart({ events }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <CartesianGrid /> */}
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="events"
          stroke="#10b981"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
