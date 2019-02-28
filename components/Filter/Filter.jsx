import React, { Component } from 'react';
import { Grid, DatePicker, TimePicker } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Button, Select, Cascader, TreeSelect, Input, Icon } from 'antd';
import I18n from "../../common/I18n";

const { Row, Col } = Grid;
const { Option } = Select;
const { MonthPicker, YearPicker, RangePicker } = DatePicker;

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeShadow: {},
    };
  }

  checkNumber = (rule, values, callback) => {
    console.log(values);
    if (!values) {
      callback();
    } else if (isNaN(values)) {
      callback(I18n.translate('fillNum'));
    } else {
      callback();
    }
  };

  checkInteger = (rule, values, callback) => {
    if (!values) {
      callback();
    } else if (isNaN(values)) {
      callback(I18n.translate('fillNum'));
    } else if (!Number.isInteger(values)) {
      callback(I18n.translate('fillInt'));
    } else {
      callback();
    }
  };

  renderTreeSelect = (data, prevKey) => {
    const tpl = [];
    data.forEach((d) => {
      prevKey = prevKey || [];
      const pk = (prevKey.length > 0) ? (prevKey.join('-') + '-' + d.value) : d.value + '';
      if (Array.isArray(d.children)) {
        tpl.push(
          (
            <TreeSelect.TreeNode
              key={pk}
              value={pk}
              title={`${d.label}`}
            >
              {this.renderTreeSelect(d.children, pk.split('-'))}
            </TreeSelect.TreeNode>
          )
        );
      } else {
        tpl.push(
          (
            <TreeSelect.TreeNode
              key={pk}
              value={pk}
              title={`${d.label}`}
              isLeaf
            />
          )
        );
      }
    });
    return tpl.map((t) => {
      return t;
    });
  };

  renderSuffix = (val) => {
    if (this.props.value[val.field]) {
      return (
        <div>
          {
            val.params && val.params.maxLength > 0 &&
            <span style={{ color: '#777777' }}>
              <span style={{ color: this.props.value[val.field].length >= val.params.maxLength ? '#e04240' : null }}>
                {this.props.value[val.field] ? (this.props.value[val.field] + '').length : 0}
              </span>
              <span>/</span>
              <span>{val.params.maxLength}</span>&nbsp;
            </span>
          }
          <Icon
            style={{ color: '#aaaaaa', cursor: 'pointer' }}
            type="close-circle"
            theme="filled"
            onClick={
              () => {
                this.props.value[val.field] = undefined;
                this.props.onChange(this.props.value);
                if (this.state.nodeShadow[val.field]) {
                  this.state.nodeShadow[val.field].focus();
                }
              }
            }
          />
        </div>
      );
    }
    return null;
  };

  renderItem = (val, idx) => {
    let tpl = null;
    const map = val.map || [];
    const isSelectMulti = val.params !== undefined && (val.params.mode === 'multiple' || val.params.mode === 'tag');
    const showSearch = map.length > 10;
    const align = 'top';
    const size = 'small';
    const sizeAntd = 'small';
    const col = {
      1: { xxs: 24, xs: 12, s: 8, m: 6, l: 6, xl: 4 },
      2: { xxs: 24, xs: 24, s: 16, m: 12, l: 12, xl: 8 },
      3: { xxs: 24, xs: 24, s: 24, m: 18, l: 18, xl: 12 },
      4: { xxs: 24, xs: 24, s: 24, m: 24, l: 24, xl: 16 },
    };
    switch (val.type) {
    case 'text':
    case 'textarea':
    case 'multiple':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder name={val.field} valueFormatter={(evt) => { return evt.target.value; }}>
            <div style={{ position: 'relative' }}>
              <Input.TextArea
                size={size}
                style={styles.filterTool[1]}
                placeholder={I18n.translate('pleaseInput') + val.name}
                value={this.props.value[val.field]}
                ref={node => this.state.nodeShadow[val.field] = node}
                {...val.params}
              />
              <div style={{ position: 'absolute', right: '5%', bottom: '2%' }}>
                {this.renderSuffix(val)}
              </div>
            </div>
          </IceFormBinder>
        </Col>
      );
      break;
    case 'num':
    case 'number':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder
            name={val.field}
            validator={this.checkNumber}
            valueFormatter={(evt) => {
              let value = evt.target.value.trim();
              if (value === '-') return value;
              if (value === '' || value === null || !value) {
                return value;
              }
              let last = value.substr(value.length - 1, 1);
              if (last === '。' || last === '.') {
                last = '.';
                value = parseFloat(value) + last;
              } else {
                value = parseFloat(value);
              }
              if (value < val.min) {
                value = val.min;
              } else if (value > val.max) {
                value = val.max;
              }
              if (isNaN(value) || value === Infinity) {
                return '';
              }
              return value;
            }}
          >
            <Input
              size={size}
              style={styles.filterTool[1]}
              placeholder={I18n.translate('pleaseInput') + val.name}
              allowClear={true}
              ref={node => this.state.nodeShadow[val.field] = node}
              defaultValue={this.props.value[val.field]}
              {...val.params}
            />
          </IceFormBinder>
          {this.props.value[val.field] && <IceFormError name={val.field} style={{ whiteSpace: 'nowrap' }} />}
        </Col>
      );
      break;
    case 'int':
    case 'integer':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder
            name={val.field}
            validator={this.checkInteger}
            valueFormatter={(evt) => {
              let value = evt.target.value.trim();
              if (value === '-') return value;
              if (value === '' || value === null || !value) {
                return value;
              }
              value = parseFloat(value);
              if (isNaN(value)) {
                return undefined;
              } else if (value < val.min) {
                value = val.min;
              } else if (value > val.max) {
                value = val.max;
              }
              if (isNaN(value) || value === Infinity) {
                return '';
              }
              return value;
            }}
          >
            <Input
              size={size}
              style={styles.filterTool[1]}
              placeholder={I18n.translate('pleaseInput') + val.name}
              allowClear={true}
              ref={node => this.state.nodeShadow[val.field] = node}
              defaultValue={this.props.value[val.field]}
              {...val.params}
            />
          </IceFormBinder>
          {this.props.value[val.field] && <IceFormError name={val.field} style={{ whiteSpace: 'nowrap' }} />}
        </Col>
      );
      break;
    case 'select':
    case 'map':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder name={val.field}>
            <Select
              showSearch={showSearch}
              size={size}
              style={styles.filterTool[1]}
              placeholder={I18n.translate('pleaseChoose') + val.name}
              value={this.props.value[val.field] || (isSelectMulti ? [] : '')}
              filterOption={(input, option) => {
                if (option.props.disabled === true) return false;
                else if (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) return true;
                else if (`${option.props.value}`.indexOf(input) >= 0) return true;
                return false;
              }}
              {...val.params}
            >
              {isSelectMulti !== true && <Option value="">全部</Option>}
              {map.map((m) => {
                return <Option key={m.value} value={m.value} disabled={m.disabled || false}>{m.label}</Option>;
              })}
            </Select>
          </IceFormBinder>
        </Col>
      );
      break;
    case 'cascader':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder type="array" name={val.field}>
            <Cascader
              style={styles.filterTool[1]}
              size={size}
              placeholder={I18n.translate('pleaseChoose') + val.name}
              defaultValue={this.props.value[val.field]}
              options={val.map}
              showSearch={(inputValue, path) => {
                return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
              }}
              {...val.params}
            />
          </IceFormBinder>
        </Col>
      );
      break;
    case 'datetime':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder name={val.field} valueFormatter={(date, dateStr) => dateStr}>
            <DatePicker
              size={size}
              style={styles.filterTool[1]}
              defaultValue={this.props.value[val.field]}
              showTime={true}
              formater={['YYYY-MM-DD', 'HH:mm:ss']}
              {...val.params}
            />
          </IceFormBinder>
        </Col>
      );
      break;
    case 'date':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder name={val.field} valueFormatter={(date, dateStr) => dateStr}>
            <DatePicker
              size={size}
              style={styles.filterTool[1]}
              defaultValue={this.props.value[val.field]}
              formater={['YYYY-MM-DD']}
              {...val.params}
            />
          </IceFormBinder>
        </Col>
      );
      break;
    case 'time':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder name={val.field} valueFormatter={(date, dateStr) => dateStr}>
            <TimePicker
              size={size}
              style={styles.filterTool[1]}
              defaultValue={this.props.value[val.field]}
              formater={['HH:mm:ss']}
              {...val.params}
            />
          </IceFormBinder>
        </Col>
      );
      break;
    case 'year':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder name={val.field} valueFormatter={(date, dateStr) => dateStr}>
            <YearPicker
              size={size}
              style={styles.filterTool[1]}
              defaultValue={this.props.value[val.field]}
              formater={['YYYY']}
              {...val.params}
            />
          </IceFormBinder>
        </Col>
      );
      break;
    case 'month':
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder name={val.field} valueFormatter={(date, dateStr) => dateStr}>
            <MonthPicker
              size={size}
              style={styles.filterTool[1]}
              defaultValue={this.props.value[val.field]}
              formater={['YYYY-MM']}
              {...val.params}
            />
          </IceFormBinder>
        </Col>
      );
      break;
    case 'rangeDatetime':
      tpl = (
        <Col key={idx} {...col[2]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder
            type="array"
            name={val.field}
            valueFormatter={(date, dateStr) => dateStr}
          >
            <RangePicker
              size={size}
              style={{ ...styles.filterTool[2], backgroundColor: 'transparent', border: '1px solid #E0E0E0' }}
              defaultValue={this.props.value[val.field]}
              showTime={true}
              formater={['YYYY-MM-DD', 'HH:mm:ss']}
              {...val.params}
            />
          </IceFormBinder>
        </Col>
      );
      break;
    case 'rangeDate':
      tpl = (
        <Col key={idx} {...col[2]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder
            name={val.field}
            type="array"
            valueFormatter={(date, dateStr) => dateStr}
          >
            <RangePicker
              size={size}
              style={{ ...styles.filterTool[2], backgroundColor: 'transparent', border: '1px solid #E0E0E0' }}
              defaultValue={this.props.value[val.field]}
              formater={['YYYY-MM-DD']}
              {...val.params}
            />
          </IceFormBinder>
        </Col>
      );
      break;
    case 'tree.select':
      tpl = (
        <Col key={idx} {...col[2]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}：</label>
          <IceFormBinder
            type="array"
            name={val.field}
            valueFormatter={
              (checkKeys) => {
                return checkKeys;
              }
            }
          >
            <TreeSelect
              style={{ ...styles.filterTool[2] }}
              showSearch
              allowClear
              treeDefaultExpandAll
              defaultValue={this.props.value[val.field]}
              treeCheckable={true}
              showCheckedStrategy={TreeSelect.SHOW_PARENT}
              size={sizeAntd}
              placeholder={I18n.translate('selectable') + val.name}
              searchPlaceholder={I18n.translate('selectable') + val.name}
              multiple
              defaultCheckedKeys={this.props.value[val.field]}
            >
              {this.renderTreeSelect(map)}
            </TreeSelect>
          </IceFormBinder>
        </Col>
      );
      break;
    case 'str':
    case 'string':
    default:
      tpl = (
        <Col key={idx} {...col[1]} style={styles.filterCol} align={align}>
          <label style={styles.filterTitle}>{val.name}</label>
          <IceFormBinder type="string" name={val.field} valueFormatter={(evt) => { return evt.target.value; }}>
            <Input
              onPressEnter={this.props.onSubmit}
              size={size}
              style={styles.filterTool[1]}
              placeholder={I18n.translate('pleaseInput') + val.name}
              allowClear={true}
              ref={node => this.state.nodeShadow[val.field] = node}
              defaultValue={this.props.value[val.field]}
              {...val.params}
            />
          </IceFormBinder>
        </Col>
      );
      break;
    }
    return tpl;
  };
  render() {
    return (
      <div style={styles.search}>
        <IceFormBinderWrapper
          value={this.props.value}
          onChange={this.props.onChange}
        >
          <div>
            <Row wrap>
              {
                this.props.display.map((val, idx) => {
                  return this.renderItem(val, idx);
                })
              }
            </Row>
            <div style={{ textAlign: 'right', marginRight: '12px' }}>
              <Button
                onClick={this.props.onReset}
                size="small"
                type="default"
              >
                {I18n.translate('reset')}
              </Button>
              <Button
                onClick={this.props.onSubmit}
                size="small"
                type="primary"
                style={{ marginLeft: '10px' }}
                loading={this.props.loading}
                disabled={this.props.loading}
              >
                {I18n.translate('search')}
              </Button>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  search: {
    background: '#fefefe',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #eee',
  },
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  filterTitle: {
    width: '68px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  filterTool: {
    1: { width: '200px' },
    2: { width: '500px' },
    3: { width: '800px' },
    4: { width: '1100px' },
  },
};
