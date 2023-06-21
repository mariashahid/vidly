interface LikeProps {
  id: String;
  liked?: boolean;
  onClick: () => void;
}

const Like = (props: LikeProps) => {
  let classes = "fa fa-heart";

  if (!props.liked) classes += "-o";

  return <i className={classes} onClick={props.onClick}></i>;
};

export default Like;
