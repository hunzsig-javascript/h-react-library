import React, {Component} from 'react';
import {Row, Col, Icon, Input} from 'antd';
import DefaultCol from "./DefaultCol";
import Error from "./Error";
import I18n from "../../../common/I18n";

import "./String.scss";

export default class String extends Component {

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
    const size = this.props.size;
    const col = this.props.col;
    const defaultValue = this.props.defaultValue;
    const className = `col${col} string` + (this.state.errorMessage !== '' ? ' error' : '');
    const onChange = this.props.onChange;
    const onError = this.props.onError;
    return (
      <Row className="ItemInput">
        <Col {...DefaultCol[col].label} className={`label ${required ? 'required' : ''}`}>
          {item.icon && <Icon className="icon" type={item.icon}/>}
          {item.label && item.label.length > 0 && <label>{item.label}：</label>}
        </Col>
        <Col className="scope" {...DefaultCol[col].item}>
          <Input
            className={className}
            size={size}
            allowClear={true}
            placeholder={I18n.tr('pleaseInput') + item.label}
            defaultValue={defaultValue}
            onChange={(evt) => {
              const res = this.formatter(evt);
              if (item.params) {
                if (item.params.required) {
                  this.state.errorMessage = !res ? item.label + I18n.tr('isRequired') : '';
                }
                if (item.params.minLength && res.length < item.params.minLength) {
                  this.state.errorMessage = item.label + I18n.tr('tooShort');
                }
                if (item.params.maxLength && res.length > item.params.maxLength) {
                  this.state.errorMessage = item.label + I18n.tr('tooLong');
                }
              }W
              this.setState({
                errorMessage: this.state.errorMessage,
              });
              onChange(this.formatter(evt));
              onError(this.state.errorMessage);
            }}
            {...item.params}
          />
          {this.state.errorMessage !== '' && <Error message={this.state.errorMessage}/>}
        </Col>
      </Row>
    );
  }
}