import * as React from "react";
import { Component } from "react";

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, label, value, onChange }: InputProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        id={"name"}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Input;
