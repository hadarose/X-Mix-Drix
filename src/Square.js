function Square(props) {
  // Option1 : return <button onClick={() => props.onClick()}>{props.value}</button>;
  // Option 2 (shorter)
  return <button onClick={props.onClick}>{props.value}</button>;
}

export default Square;
