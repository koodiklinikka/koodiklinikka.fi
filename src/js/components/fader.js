import React from 'react';

function clamp(min, max, value) {
  return Math.min(Math.max(value, min), max);
}

export default React.createClass({
  getDefaultProps() {
    return {
      threshold: 100
    };
  },
  getInitialState() {
    return {
      opacity: 0
    };
  },
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  onScroll() {
    const scrollableDistance = document.body.scrollHeight - window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const distanceToBottom = scrollableDistance - scrollTop;

    this.setState({
      opacity: clamp(0, 1, distanceToBottom / this.props.threshold)
    });
  },
  render() {
    const style = {
      opacity: this.state.opacity
    };

    return (
      <div className="fader" style={style}></div>
    );
  }
});
