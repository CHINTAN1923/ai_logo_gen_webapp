import React from "react";

interface LabelProps {
  text: string;
}

const Label = ({ text }: LabelProps) => {
  return (
    <>
      <label htmlFor="model" className="form-label">
        {text}
      </label>
    </>
  );
};

export default Label;
