const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} - {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  console.log("Receiving parts ...", parts);

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((c) => (
        <div key={c.id}>
          <Header courseName={c.name} />
          <Content parts={c.parts} />
          <Total parts={c.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
