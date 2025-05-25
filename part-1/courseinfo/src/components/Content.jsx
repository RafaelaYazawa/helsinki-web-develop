import React from "react";
import Part from "./Part";

const Content = (props) => {
  console.log(props);

  return (
    <div>
      <Part
        part={props.content[0].name}
        exercises={props.content[0].exercises}
      />
      <Part
        part={props.content[1].name}
        exercises={props.content[1].exercises}
      />
      <Part
        part={props.content[2].name}
        exercises={props.content[2].exercises}
      />
    </div>
  );
};

export default Content;
