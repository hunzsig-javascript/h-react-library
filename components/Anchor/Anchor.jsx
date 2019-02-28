import React, { Component } from 'react';
import './Anchor.scss';

class Anchor extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.href = this.props.href;
    this.title = this.props.title;
    this.triggerType = this.props.triggerType;
    this.align = this.props.align || 'left';
    this.onClick = () => {};
    this.onMouseOver = () => {};
    switch (this.triggerType) {
    case 'hover':
      this.onMouseOver = (evt) => { this.scrollToAnchor(evt, this.href); };
      break;
    default:
      this.onClick = (evt) => { this.scrollToAnchor(evt, this.href); };
      break;
    }
    this.state = {};
  }
  scrollToAnchor = (evt, anchorName) => {
    console.log(anchorName);
    if (typeof anchorName === 'string' && anchorName.length > 0) {
      anchorName = anchorName.replace('#', '');
      const anchorElement = document.getElementById(anchorName);
      if (anchorElement) { anchorElement.scrollIntoView(); }
      evt.target.className = '';
    }
  };
  onMouseLeave = (evt) => {
    evt.target.className = 'passive';
  };

  render() {
    return (
      <div className={`h-anchor ${this.align}`}>
        <a
          className="passive"
          title={this.title}
          onClick={this.onClick}
          onFocus={this.onMouseOver}
          onMouseOver={this.onMouseOver}
          onMouseLeave={(evt) => { this.onMouseLeave(evt); }}
        >
          {this.title}
        </a>
        {this.props.children}
      </div>
    );
  }
}

export default Anchor;
