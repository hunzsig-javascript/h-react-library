import React, { Component } from 'react';
import { Balloon } from '@icedesign/base';
import { Button } from 'antd';
import I18n from "../../common/I18n";


export default class CommonBalloon extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.o = this.props.o;
  }

  sure() {
    this.setState({
      visible: false,
    });
    if (typeof this.o.onClick === 'function') {
      this.o.onClick(this.props.record);
    }
  }

  cancel() {
    this.setState({
      visible: false,
    });
  }

  // onVisibleChange事件会在所有visible属性被改变的时候触发;
  // 比如对于click类型,会在点击button的时候触发和点击空白区域的时候触发;
  // 对于hover类型,会在mouseentter,mouseleave的时候触发;
  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  render() {
    return (
      <Balloon
        trigger={(
          <Button
            style={styles.operationBtn}
            {...this.o.button} // see https://alibaba.github.io/ice/component/button
          >
            {this.o.name}
          </Button>
        )}
        triggerType="click"
        closable={false}
        needAdjust={true}
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange.bind(this)}
      >
        <div>
          <div style={styles.balloonText}>{I18n.translate('confirmOperation')}</div>
          <Button
            id="confirmBtn"
            size="small"
            type="danger"
            style={{ marginRight: '5px' }}
            onClick={this.sure.bind(this)}
          >
            {I18n.translate('yes')}
          </Button>
          <Button
            id="cancelBtn"
            size="small"
            onClick={this.cancel.bind(this)}
          >
            {I18n.translate('no')}
          </Button>
        </div>
      </Balloon>
    );
  }
}

const styles = {
  operationBtn: {
    marginLeft: '6px',
    marginBottom: '2px',
  },
  balloonText: {
    padding: '3px 0 10px',
  },
  balloonBtn: {
    marginLeft: '8px',
  },
};
