import React from "react";

type Props = {
  threshold: number;
};

function clamp(min: number, max: number, value: number) {
  return Math.min(Math.max(value, min), max);
}

export default class Fader extends React.Component<Props> {
  static defaultProps = {
    threshold: 100,
  };

  state = {
    opacity: 0,
  };

  onScroll = () => {
    const scrollableDistance = document.body.scrollHeight - window.innerHeight,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop,
      distanceToBottom = scrollableDistance - scrollTop;

    this.setState({
      opacity: clamp(0, 1, distanceToBottom / this.props.threshold),
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  render() {
    const style = {
      opacity: this.state.opacity,
    };

    return <div className="fader" style={style}></div>;
  }
}
