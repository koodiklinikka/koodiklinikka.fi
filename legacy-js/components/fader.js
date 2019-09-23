"use strict";

import React from "react";

function clamp(min, max, value) {
  return Math.min(Math.max(value, min), max);
}

export default class Fader extends React.Component {
  static defaultProps = {
    threshold: 100
  };

  state = {
    opacity: 0
  };

  onScroll = () => {
    var scrollableDistance = document.body.scrollHeight - window.innerHeight,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop,
      distanceToBottom = scrollableDistance - scrollTop;

    this.setState({
      opacity: clamp(0, 1, distanceToBottom / this.props.threshold)
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
    var style = {
      opacity: this.state.opacity
    };

    return <div className="fader" style={style}></div>;
  }
}
