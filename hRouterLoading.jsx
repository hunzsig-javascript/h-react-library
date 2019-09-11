import React, { Component } from 'react';
import { Spin } from 'antd';
import I18n from "./common/I18n";

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
          <p>{I18n.tr('pageError')}</p>
          <p>{this.props.error}</p>
        </div>
      );
    } else if (this.props.pastDelay) {
      return (
        <div style={{ textAlign: 'center', width: '100%', height: '300px', lineHeight: '300px' }}>
          <Spin tip={I18n.tr('loading')} size="large" />
        </div>
      );
    }
    return null;
  }
}
