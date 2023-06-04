import { render } from "@testing-library/react";
import * as React from "react";
import { Component } from "react";
import { Movie } from "../../services/fakeMovieService";

interface LikeProps {
  id: String;
  liked: boolean;
  onClick: () => void;
}

const Like = (props: LikeProps) => {
  let classes = "fa fa-heart";

  if (!props.liked) classes += "-o";

  return <i className={classes} onClick={props.onClick}></i>;
};

export default Like;
