import React, {Component} from 'react';

export default class DesktopFormError extends Component {
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
      <div style={styles.error}>
        {this.props.message}
      </div>
    );
  }
}

const styles = {
  error: {
    color: '#e04240'
  }
};

