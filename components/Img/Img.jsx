import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Parse from '../../common/Parse';
import I18n from "../../common/I18n";

class Img extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick = () => {
    if (typeof this.props.href === 'string') {
      this.props.history.push(this.props.href);
    }
  };

  render() {
    return (
      <img
        src={Parse.img(this.props.src)}
        alt={this.props.alt || I18n.translate('picture')}
        style={this.props.style}
        onClick={this.onClick}
      />
    );
  }
}

export default withRouter(Img);
