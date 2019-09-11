import React, { Component } from 'react';
import { Balloon } from '@icedesign/base';
import { Button } from 'antd';
import I18n from "../../common/I18n";

export default class FilterBalloon extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.o = this.props.o;
  }

  sure(o) {
    this.setState({
      visible: false,
    });
    if (typeof o.onClick === 'function') {
      o.onClick(this.props.index, this.props.record);
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

  renderActions = () => {
    if (!this.o.actions || !Array.isArray(this.o.actions)) {
      return null;
    }
    return (
      this.o.actions.map((o, idx) => {
        let show = true;
        if (o.condition !== undefined && Array.isArray(o.condition)) {
          o.condition.forEach((cond) => {
            switch (cond.cond) {
            case 'in':
              if (!cond.value.includes(this.props.record[cond.field])) {
                show = false;
              }
              break;
            case 'like':
            case 'strpos':
              if (this.props.record[cond.field].indexOf(cond.value) === -1) {
                show = false;
              }
              break;
            case 'neq':
            case '!=':
            case '<>':
              if (this.props.record[cond.field] === cond.value) {
                show = false;
              }
              break;
            case 'eq':
            case '=':
            default:
              if (this.props.record[cond.field] !== cond.value) {
                show = false;
              }
              break;
            }
          });
        }
        if (!show) {
          return null;
        }
        return (
          <Button
            style={styles.actionBtn}
            key={idx}
            {...o.params} // see https://ant.design/components/button-cn/
            onClick={this.sure.bind(this, o)}
          >
            {o.name}
          </Button>
        );
      })
    );
  };

  render() {
    return (
      <Balloon
        trigger={(
          <Button
            id={`FilterBalloon_${this.index}`}
            style={styles.operationBtn}
            {...this.o.trigger} // see https://alibaba.github.io/ice/component/button
          >
            {this.o.name}
          </Button>
        )}
        triggerType="click"
        closable={false}
        needAdjust={true}
        {...this.o.params} // see https://alibaba.github.io/ice/component/balloon
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange.bind(this)}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={styles.balloonText}>{this.o.title}</div>
          {this.renderActions()}
          <Button
            style={styles.actionBtn}
            size="small"
            onClick={this.cancel.bind(this)}
          >
            {I18n.tr('cancel')}
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
  actionBtn: {
    marginRight: '6px',
    marginBottom: '2px',
  },
  balloonText: {
    padding: '3px 0 10px',
  },
};
