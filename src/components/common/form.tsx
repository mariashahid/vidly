import * as React from "react";
import { Component } from "react";
import Joi from "joi-browser";
import { IIndexable } from "./tableBody";
import Input from "./input";

export interface FormProps<T> {}

export interface FormState<T> {
  data: T;
  errors: T;
}

export interface Schema<T> {
  [key: string]: [keyof T];
}

abstract class Form<
  T extends IIndexable<any>,
  S extends Schema<T>,
  P extends FormProps<T>,
  ST extends FormState<T>
> extends React.Component<P, ST> {
  schema = {} as S;

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || ({} as T) });
    if (errors) {
      return;
    }

    this.doSubmit(this.state.data);
  };

  // add an abstract method for defining the logic to invoke backend services
  abstract doSubmit(t: T): void;

  handleChange = ({
    currentTarget: input,
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    const errorMessage =
      data["_id"] != undefined && this.validateProperty(input);

    if (errorMessage) errors[input.name as keyof T] = errorMessage;
    else delete errors[input.name as keyof T];

    data[input.name as keyof T] = input.value as any;
    this.setState({ data, errors });
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) {
      return null;
    }

    const errors = {} as T;

    for (let item of result.error.details) {
      errors[item.path as keyof T] = item.message;
    }

    return errors;
  };

  validateProperty = ({
    name,
    value,
  }: HTMLInputElement | HTMLSelectElement) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name as keyof S] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  renderButton = (label: string) => {
    return (
      <button
        type="submit"
        disabled={
          this.state.data["_id"] != undefined && this.validate() ? true : false
        }
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };

  renderInput = (name: string, label: string, type: string = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        type={type}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      ></Input>
    );
  };
}

export default Form;
