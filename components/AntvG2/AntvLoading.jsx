import React, { Component } from 'react';
import { Spin } from 'antd';

export default class HRouterLoading extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.error) {
      return (
        <div style={{ textAlign: 'center', width: '100%', height: '300px', lineHeight: '300px' }}>
          <p>图表加载错误</p>
          <p>{this.props.error}</p>
        </div>
      );
    } else if (this.props.pastDelay) {
      return (
        <div style={{ textAlign: 'center', width: '100%', height: '300px', lineHeight: '300px' }}>
          <Spin tip="渲染中..." size="large" />
        </div>
      );
    }
    return null;
  }
}
