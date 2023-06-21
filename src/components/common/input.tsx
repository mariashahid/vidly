import * as React from "react";
import { Component } from "react";

interface InputProps {
  name: string;
  label: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const Input = ({ name, label, value, type, onChange, error }: InputProps) => {
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
        type={type}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
