import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = () => {
    console.log("good was clicked", good + 1);
    setGood(good + 1);
  };

  const setToNeutral = () => {
    console.log("neutral was clicked", neutral + 1);
    setNeutral(neutral + 1);
  };

  const setToBad = () => {
    console.log("bad was clicked", bad + 1);
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="Give feedback" />
      <Button onClick={setToGood} text="Good" />
      <Button onClick={setToNeutral} text="Neutral" />
      <Button onClick={setToBad} text="Bad" />
      <Header text="Statistics" />
      <Statistics text="Good" good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
