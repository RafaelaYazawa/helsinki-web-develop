import React from "react";

const Total = (props) => {
  console.log(props);
  return (
    <div>
      {props.sum[0].exercises + props.sum[1].exercises + props.sum[2].exercises}
    </div>
  );
};

export default Total;
