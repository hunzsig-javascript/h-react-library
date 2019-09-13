import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
import DefaultCol from "./DefaultCol";

import "./Const.scss";

export default class Const extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  formatter = (evt) => {
    return evt.target.value;
  };

  render() {
    const required = this.props.required;
    const item = this.props.item;
    const col = this.props.col;
    const defaultValue = this.props.defaultValue;
    const className = `col${col} const` + (this.state.errorMessage !== '' ? ' error' : '');
    return (
      <Row className="ItemConst">
        <Col {...DefaultCol[col].label} className={`label ${required ? 'required' : ''}`}>
          {item.icon && <Icon className="icon" type={item.icon}/>}
          {item.label && item.label.length > 0 && <label>{item.label}：</label>}
        </Col>
        <Col className="scope" {...DefaultCol[col].item}>
          <div className={className}>{defaultValue}</div>
        </Col>
      </Row>
    );
  }
}