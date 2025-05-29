import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / sum;
  const positiveAverage = (good / sum) * 100 + "%";

  if (sum === 0) return <p>No feedbacks yet</p>;
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={sum} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positiveAverage} />
      </tbody>
    </table>
  );
};

export default Statistics;
