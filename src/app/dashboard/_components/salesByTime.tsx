"use client";
import { formatCurrency } from "@/helpers";
import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";

const SalesByTime = () => {
  const data = [
    { value: 300000, time: "1pm" },
    { value: 280000, time: "9pm" },
    { value: 200000, time: "8am" },
    { value: 100000, time: "2pm" },
    { value: 50000, time: "12pm" },
  ];
  return (
    // <ResponsiveContainer width="100%" minHeight={300}>
    //   <LineChart data={data}>
    //     <CartesianGrid stroke="hsl(210 40% 96.1%)" />
    //     <XAxis dataKey="time" stroke="hsl(222.2 47.4% 11.2%)" />
    //     <YAxis stroke="hsl(222.2 47.4% 11.2%)" />
    //     <Tooltip />
    //     <Line dataKey="value" type="monotone" name="Total Sales" dot={false} />
    //     <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    //   </LineChart>
    // </ResponsiveContainer>

    <ResponsiveContainer width="100%" minHeight={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 50, bottom: 0 }}
      >
        <defs>
          <linearGradient id="color-chart" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="hsl(210 40% 96.1%)" />
        <XAxis dataKey="time" />
        <YAxis
          tickFormatter={(tick) => formatCurrency(tick)}
          padding={{ top: 10, bottom: 10 }}
        />
        <Tooltip formatter={(value) => formatCurrency(value as number)} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#color-chart)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesByTime;
