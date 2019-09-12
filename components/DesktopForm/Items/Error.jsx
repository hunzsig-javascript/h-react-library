import React, {Component} from 'react';

import './Error.scss';

export default class Error extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message || '',
    };
  }

  render() {
    if (this.props.message === undefined || !this.props.message) {
      return '';
    }
    return (
      <div className="errorMessage" dangerouslySetInnerHTML={{__html: this.props.message}}/>
    );
  }
}

const styles = {
  error: {
    textAlign: 'left',
    color: '#e04240'
  }
};

