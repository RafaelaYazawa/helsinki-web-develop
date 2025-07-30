import React from "react";
import Input from "./Input";
import Button from "./Button";

const Form = ({
  onSubmit,
  nameValue,
  onNameChange,
  phoneValue,
  onPhoneChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <Input label="Name" value={nameValue} onChange={onNameChange} />
        <Input label="Number" value={phoneValue} onChange={onPhoneChange} />
      </div>
      <Button text="Add" />
    </form>
  );
};

export default Form;
