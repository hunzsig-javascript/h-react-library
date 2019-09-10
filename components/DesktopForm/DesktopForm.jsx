import React, {Component} from 'react';
import {
  Row,
  Col,
  AutoComplete,
  Alert,
  message,
  Select,
  Cascader,
  Icon,
  Button,
  Tree,
  TreeSelect,
  Input,
  Radio,
  DatePicker,
  TimePicker,
  Switch,
  Checkbox,
  Slider, // Range
  Rate, // Rating
} from 'antd';
import {CompactPicker} from 'react-color';
import ReactQuill from 'react-quill';
import Hoss from './../Hoss';
import './quill.css';

import Api from '../../common/Api';

import './DesktopForm.scss';
import I18n from "../../common/I18n";

const provincialJson = require('./../../assets/json/provincial').default;
const municipalJson = require('./../../assets/json/municipal').default;
const regionJson = require('./../../assets/json/region').default;

const {MonthPicker, YearPicker, RangePicker} = DatePicker;
const TreeRoot = 'TREE';

const defaultCol = {
  0: {
    label: {xxs: 5},
    item: {xxs: 19},
    rich: {xxs: 19},
  },
  1: {
    label: {xxs: 6, xs: 5, s: 4, m: 3, l: 3, xl: 2},
    item: {xxs: 18, xs: 19, s: 17, m: 14, l: 10, xl: 9},
    rich: {xxs: 18, xs: 19, s: 19, m: 18, l: 17, xl: 16},
  },
  2: {
    label: {xxs: 6, xs: 5, s: 4, m: 6, l: 6, xl: 4},
    item: {xxs: 18, xs: 19, s: 17, m: 18, l: 18, xl: 16},
    rich: {xxs: 18, xs: 19, s: 19, m: 18, l: 17, xl: 16},
  },
  3: {
    label: {xxs: 6, xs: 5, s: 4, m: 6, l: 9, xl: 6},
    item: {xxs: 18, xs: 19, s: 17, m: 18, l: 15, xl: 18},
    rich: {xxs: 18, xs: 19, s: 19, m: 18, l: 17, xl: 16},
  },
  4: {
    label: {xxs: 6, xs: 5, s: 4, m: 6, l: 9, xl: 8},
    item: {xxs: 18, xs: 19, s: 17, m: 18, l: 15, xl: 16},
    rich: {xxs: 18, xs: 19, s: 19, m: 18, l: 17, xl: 16},
  },
};
export default class DesktopForm extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    if (typeof this.props.onRef === 'function') {
      this.props.onRef(this);
    }
    this.state = {
      scope: this.props.form.scope || null,
      align: this.props.form.align || 'left',
      valueFormatter: this.props.form.valueFormatter,
      refresh: this.props.form.refresh,
      operation: this.props.form.operation,
      onChange: this.props.form.onChange,
      onSubmit: this.props.form.onSubmit,
      onSuccess: this.props.form.onSuccess,
      items: this.props.form.items || [],
      values: {},
      valuesShadow: {},
      nodeShadow: {},
      loading: false,
      error: '',
      renderNet: [],
      renderEmail: [],
    };
    this.state.items.forEach((val) => {
      if (Array.isArray(val.values) && val.values.length > 0) {
        val.values.forEach((v) => {
          if (v.value !== null && v.value !== undefined) {
            this.state.values[v.field] = v.value;
          }
          if (v.type === 'region') {
            this.state.values[v.field + '_label'] = '';
          }
        });
      }
    });
    this.state.originValues = JSON.parse(JSON.stringify(this.state.values || {}));
  }

  componentDidMount() {
  }

  formChange = (values) => {
    if (typeof this.state.onChange === 'function') {
      this.state.onChange(values);
    }
    this.setState({
      valuesShadow: values,
    });
  };

  setError = (error) => {
    this.setState({
      error: error,
    });
  };

  setLoading = (loading) => {
    this.setState({
      loading: loading,
    });
  };

  checkNumber = (rule, values, callback) => {
    if (!values) {
      callback();
    } else if (isNaN(values)) {
      callback(I18n.translate('pleaseFillRightNum'));
    } else {
      callback();
    }
  };

  checkInteger = (rule, values, callback) => {
    if (!values) {
      callback();
    } else if (isNaN(values)) {
      callback(I18n.translate('pleaseFillRightInt'));
    } else if (!Number.isInteger(values)) {
      callback(I18n.translate('pleaseFillRightInt'));
    } else {
      callback();
    }
  };

  set = (values) => {
    this.setState({
      originValues: JSON.parse(JSON.stringify(typeof values === 'object' ? values : this.state.values)),
    });
  };

  setItems = (items) => {
    const values = JSON.parse(JSON.stringify(this.state.values));
    items[0].values.forEach((v) => {
      if (values[v.field] === undefined && v.value !== undefined) {
        values[v.field] = v.value;
      }
    });
    this.setState({
      items: items,
      values: values,
    });
  };

  setValues = (values) => {
    this.setState({
      values: values,
    });
  };

  reset = () => {
    this.setState({
      values: JSON.parse(JSON.stringify(this.state.originValues)),
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors === null || errors === undefined) {
        let v = JSON.parse(JSON.stringify(values));
        if (typeof this.state.valueFormatter === 'function') {
          v = this.state.valueFormatter(v);
          if (typeof v === 'string') {
            this.setError(v);
            return;
          }
        }
        console.log('values', v);
        if (typeof this.state.onSubmit === 'function') {
          this.state.onSubmit(v);
        }
        if (this.state.scope !== null) {
          this.setError('');
          this.setLoading(true);
          Api.real(this.state.scope, v, (res) => {
            this.setLoading(false);
            if (res.code === 200) {
              if (this.state.refresh === true) {
                this.reset();
              } else {
                this.set(values);
              }
              message.success(res.response);
              if (typeof this.state.onSuccess === 'function') {
                this.state.onSuccess(res);
              }
            } else {
              this.setError(res.response);
            }
          });
        }
      }
    });
  };

  renderSuffix = (val) => {
    if (this.state.valuesShadow[val.field]) {
      return (
        <div>
          {
            val.params && val.params.maxLength > 0 &&
            <span style={{color: '#777777'}}>
              <span
                style={{color: this.state.valuesShadow[val.field].length >= val.params.maxLength ? '#e04240' : null}}>
                {this.state.valuesShadow[val.field] ? (this.state.valuesShadow[val.field] + '').length : 0}
              </span>
              <span>/</span>
              <span>{val.params.maxLength}</span>&nbsp;
            </span>
          }
          <Icon
            style={{color: '#aaaaaa', cursor: 'pointer'}}
            type="close-circle"
            theme="filled"
            onClick={
              () => {
                this.state.values[val.field] = undefined;
                this.state.valuesShadow[val.field] = undefined;
                this.setState({
                  values: this.state.values,
                  valuesShadow: this.state.valuesShadow,
                });
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

  binderValueFormatter = (val, result, result2) => {
    let value;
    switch (val.type) {
      case 'datetime':
      case 'date':
      case 'time':
      case 'year':
      case 'month':
      case 'rangeDatetime':
      case 'rangeDate':
        console.log(result);
        console.log(result2);
        value = result2;
        break;
      case 'net':
      case 'email':
        value = result.trim();
        break;
      case 'color':
      case 'hex':
        value = result.hex;
        break;
      case 'int':
      case 'integer':
        value = result.target.value.trim();
        if (value === '-') break;
        if (value === '' || value === null || !value) {
          break;
        }
        value = parseInt(value, 10);
        if (isNaN(value) || value === Infinity) {
          value = '';
        }
        break;
      case 'num':
      case 'number':
        value = result.target.value.trim();
        if (value === '-') break;
        if (value === '' || value === null || !value) {
          break;
        }
        let last = value.substr(value.length - 1, 1);
        if (last === '。' || last === '.') {
          last = '.';
          value = parseFloat(value) + last;
        } else if (value.toString().indexOf('.') === -1) {
          value = parseFloat(value);
        }
        const vsp = value.toString().split('.');
        if (vsp.length >= 2) {
          if (vsp[0].length >= 0 && vsp[1].length > 0) {
            vsp[1] = (parseInt(vsp[1], 10) + 10 ** vsp[1].length).toString();
            vsp[1] = vsp[1].substring(1, vsp[1].length);
            value = parseInt(vsp[0], 10) + '.' + vsp[1];
          }
        }
        if (value < val.min) {
          value = val.min;
        } else if (value > val.max) {
          value = val.max;
        }
        if (isNaN(value) || value === Infinity) {
          value = '';
        }
        break;
      case 'cascader':
      case 'region':
      case 'provincial':
      case 'municipal':
        let n = '';
        result2.forEach((path) => {
          n += n === '' ? path.label : ' ' + path.label;
        });
        this.state.values[val.field + '_label'] = n;
        value = result;
        break;
      case 'password':
      case 'pwd':
        value = result.target.value.trim();
        break;
      case 'text':
      case 'textarea':
      case 'multiple':
      case 'str':
      case 'string':
      case 'radio':
      default:
        value = result.target.value;
        break;
    }
    return value;
  };


  renderNet = (value) => {
    let renderNet;
    if (!value || (value.indexOf('.') >= 0 && value.indexOf('.', value.indexOf('.') + 1) >= 0)) {
      renderNet = [];
    } else {
      renderNet = ['.com', '.cn', '.com.cn', '.org', '.net', '.cc', '.gov.cn', '.xin', '.top', '.wiki'].map((domain) => {
        const net = `${value}${domain}`;
        return <AutoComplete.Option key={net}>{net}</AutoComplete.Option>;
      });
    }
    this.setState({renderNet});
  };

  renderEmail = (value) => {
    let renderEmail;
    if (!value || value.indexOf('@') >= 0) {
      renderEmail = [];
    } else {
      renderEmail = ['qq.com', '163.com', '126.com', 'sina.com', 'hotmail.com', 'gmail.com'].map((domain) => {
        const email = `${value}@${domain}`;
        return <AutoComplete.Option key={email}>{email}</AutoComplete.Option>;
      });
    }
    this.setState({renderEmail});
  };

  renderTree = (data, prevKey) => {
    const tpl = [];
    data.forEach((d) => {
      prevKey = prevKey || [];
      const pk = (prevKey.length > 0) ? (prevKey.join('-') + '-' + d.value) : d.value + '';
      if (Array.isArray(d.children)) {
        tpl.push(
          (
            <Tree.TreeNode
              key={pk}
              value={pk}
              title={`${d.label}`}
            >
              {this.renderTree(d.children, pk.split('-'))}
            </Tree.TreeNode>
          )
        );
      } else {
        tpl.push(
          (
            <Tree.TreeNode
              key={pk}
              value={pk}
              title={`${d.label}`}
            />
          )
        );
      }
    });
    return tpl.map((t) => {
      return t;
    });
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

  renderSearchRemove = (val) => {
    let tpl;
    if (this.state.values[val.field] && this.state.values[val.field].length > 0) {
      tpl = (
        <Icon
          type="close-circle"
          theme="filled"
          onClick={
            () => {
              this.state.nodeShadow[val.field].input.input.value = '';
              this.state.values[val.field] = undefined;
              this.formChange(this.state.values);
            }
          }
        />
      );
    }
    return tpl;
  };

  renderFormItem = (c, val, idx) => {
    c = c < 1 ? 0 : c;
    c = val.col ? val.col : c;
    let tpl = null;
    let temp = null;
    let map = val.map || [];
    const required = val.params !== undefined && val.params.required !== undefined && val.params.required === true;
    const showSearch = map.length > 8;
    const align = 'center';
    const sizeIce = 'medium';
    const size = 'default';
    const col = {
      0: {xxs: 24, xs: 24, s: 24, m: 24, l: 24, xl: 24},
      1: {xxs: 24, xs: 24, s: 24, m: 24, l: 24, xl: 24},
      2: {xxs: 24, xs: 24, s: 24, m: 12, l: 12, xl: 12},
      3: {xxs: 24, xs: 24, s: 24, m: 12, l: 8, xl: 8},
      4: {xxs: 24, xs: 24, s: 24, m: 12, l: 8, xl: 6},
    };
    switch (val.type) {
      case 'hidden':
        tpl = null;
        break;
      case 'label':
      case 'static':
      case 'const':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formLabelStatic}>
                {this.state.values[val.field]}
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'search':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder
                  type={val.binderType || 'string'}
                  name={val.field}
                  message={I18n.translate('pleaseInput') + val.name}
                  valueFormatter={(result) => {
                    return this.binderValueFormatter(val, result);
                  }}
                >
                  <Input
                    style={{position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, opacity: 0}}
                    placeholder={I18n.translate('pleaseInput') + val.name}
                    value={this.state.values[val.field]}
                    readOnly={true}
                    required={val.params && val.params.required ? val.params.required : false}
                  />
                </IceFormBinder>
                <div>
                  <Input.Search
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    placeholder={(val.params && val.params.placeholder) ? val.params.placeholder : `${I18n.translate('pleaseChooseByClick')}${val.name}`}
                    defaultValue={this.state.values[val.field + '_shadow'] ? this.state.values[val.field + '_shadow'] : ''}
                    ref={node => this.state.nodeShadow[val.field] = node}
                    readOnly={true}
                    allowClear={true}
                    enterButton={val.nameSub}
                    onSearch={() => {
                      if (typeof val.onSearch === 'function') {
                        const callback = (callbackData = undefined, callbackLabel = '') => {
                          this.state.nodeShadow[val.field].input.input.value = callbackLabel;
                          this.state.values[val.field] = callbackData;
                          this.formChange(this.state.values);
                        };
                        val.onSearch(this.state.values[val.field], callback);
                      }
                    }}
                    addonAfter={this.renderSearchRemove(val)}
                  />
                </div>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'searchText':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} message={I18n.translate('pleaseInputRight') + val.name}
                               valueFormatter={(result) => {
                                 return this.binderValueFormatter(val, result);
                               }}>
                  <Input.TextArea
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    placeholder={I18n.translate('pleaseInput') + val.name}
                    defaultValue={this.state.values[val.field]}
                    {...val.params}
                  />
                </IceFormBinder>
                <div style={{position: 'absolute', right: '5px', top: '5px'}}>
                  <Button
                    type="dashed"
                    size="small"
                    onClick={() => {
                      if (typeof val.onSearch === 'function') {
                        const callback = (callbackData = undefined) => {
                          this.state.values[val.field] = callbackData;
                          this.formChange(this.state.values);
                        };
                        val.onSearch(this.state.values[val.field], callback);
                      }
                    }}
                  >
                    {val.nameSub}
                  </Button>
                </div>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'text':
      case 'textarea':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} message={I18n.translate('pleaseInputRight') + val.name}
                               valueFormatter={(result) => {
                                 return this.binderValueFormatter(val, result);
                               }}>
                  <Input.TextArea
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    placeholder={I18n.translate('pleaseInput') + val.name}
                    defaultValue={this.state.values[val.field]}
                    ref={node => this.state.nodeShadow[val.field] = node}
                    {...val.params}
                  />
                </IceFormBinder>
                <div style={{position: 'absolute', right: '15px', bottom: '-5px'}}>
                  {this.renderSuffix(val)}
                </div>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'net':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <Input.Group compact className={`fromItemWidth${c} ${val.type}`}>
                  <Select
                    style={{width: '20%'}}
                    defaultValue=""
                    onChange={(value) => {
                      this.state.values[val.field] = value;
                      this.formChange(this.state.values);
                    }}
                  >
                    <Select.Option value="" disabled={true}>{I18n.translate('protocol')}</Select.Option>
                    <Select.Option value="http://">http://</Select.Option>
                    <Select.Option value="https://">https://</Select.Option>
                  </Select>
                  <IceFormBinder
                    type="url"
                    name={val.field}
                    message={I18n.translate('URLFormat')}
                    valueFormatter={(result) => {
                      return this.binderValueFormatter(val, result);
                    }}
                  >
                    <AutoComplete
                      style={{width: '80%'}}
                      size={size}
                      placeholder={I18n.translate('pleaseInput') + val.name}
                      onChange={this.renderNet}
                      filterOption={false}
                      hasClear={true}
                      {...val.params}
                    >
                      {this.state.renderNet}
                    </AutoComplete>
                  </IceFormBinder>
                </Input.Group>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'email':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} type="email" message={I18n.translate('pleaseInputRight') + val.name}
                               valueFormatter={(result) => {
                                 return this.binderValueFormatter(val, result);
                               }}>
                  <AutoComplete
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    placeholder={I18n.translate('pleaseInput') + val.name}
                    onChange={this.renderEmail}
                    filterOption={false}
                    hasClear={true}
                    {...val.params}
                  >
                    {this.state.renderEmail}
                  </AutoComplete>
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'color':
      case 'hex':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="hex" name={val.field} message={I18n.translate('pleaseInputRightCode')}
                               valueFormatter={(result) => {
                                 return this.binderValueFormatter(val, result);
                               }}>
                  <CompactPicker
                    className={`fromItemWidth${c} ${val.type}`}
                    {...val.params}
                    color={this.state.values[val.field]}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'password':
      case 'pwd':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="string" name={val.field} message={I18n.translate('pleaseInput') + val.name}
                               valueFormatter={(result) => {
                                 return this.binderValueFormatter(val, result);
                               }}>
                  <Input.Password
                    className={`fromItemWidth${c} ${val.type}`}
                    type="password"
                    size={size}
                    placeholder={I18n.translate('pleaseInput') + val.name}
                    allowClear={true}
                    ref={node => this.state.nodeShadow[val.field] = node}
                    defaultValue={this.state.values[val.field]}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'num':
      case 'number':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} validator={this.checkNumber} valueFormatter={(result) => {
                  return this.binderValueFormatter(val, result);
                }}>
                  <Input
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    placeholder={I18n.translate('pleaseInput') + val.name}
                    allowClear={true}
                    ref={node => this.state.nodeShadow[val.field] = node}
                    defaultValue={this.state.values[val.field]}
                    {...val.params}
                  />
                </IceFormBinder>
                {(this.state.values[val.field] > 0 || this.state.values[val.field] < 0) &&
                <IceFormError name={val.field} style={{whiteSpace: 'nowrap'}}/>}
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'int':
      case 'integer':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} validator={this.checkInteger} valueFormatter={(result) => {
                  return this.binderValueFormatter(val, result);
                }}>
                  <Input
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    placeholder={I18n.translate('pleaseInput') + val.name}
                    allowClear={true}
                    ref={node => this.state.nodeShadow[val.field] = node}
                    defaultValue={this.state.values[val.field]}
                    {...val.params}
                  />
                </IceFormBinder>
                {(this.state.values[val.field] > 0 || this.state.values[val.field] < 0) &&
                <IceFormError name={val.field} style={{whiteSpace: 'nowrap'}}/>}
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'switch':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} message={I18n.translate('pleaseChoose') + val.name}>
                  <Switch
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    defaultChecked={this.state.values[val.field]}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'radio':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type={val.binderType || 'string'} name={val.field}
                               message={I18n.translate('pleaseChoose') + val.name} valueFormatter={(e) => {
                  return this.binderValueFormatter(val, e);
                }}>
                  <Radio.Group
                    defaultValue={this.state.value}
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    options={map}
                    checked={this.state.values[val.field]}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'checkbox':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="array" name={val.field} message={I18n.translate('pleaseChoose') + val.name}>
                  <Checkbox.Group
                    className={`fromItemWidth${c} ${val.type}`}
                    defaultValue={this.state.value}
                    dataSource={map}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'checkboxCol':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="array" name={val.field} message={I18n.translate('pleaseChoose') + val.name}>
                  <Checkbox.Group
                    className={`fromItemWidth${c} ${val.type}`}
                    defaultValue={this.state.value || []}
                    {...val.params}
                  >
                    {
                      [true].map((x, cbcIdx1) => {
                        return (
                          <Row key={cbcIdx1} wrap>
                            {
                              map.map((cb, cbcIdx2) => {
                                return (
                                  <Col
                                    key={cbcIdx2}
                                    {...{
                                      xxs: 24,
                                      xs: Math.max(val.checkboxCol || 12),
                                      s: Math.max(val.checkboxCol || 12),
                                      m: Math.max(val.checkboxCol || 8)
                                    }}
                                  >
                                    <Checkbox key={cb.value} value={cb.value}>{cb.label}</Checkbox>
                                  </Col>
                                );
                              })
                            }
                          </Row>
                        );
                      })
                    }
                  </Checkbox.Group>
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'rating':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="number" name={val.field}>
                  <Rating
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    defaultValue={this.state.values[val.field]}
                    {...val.params}
                  />
                </IceFormBinder>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'select':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type={val.binderType || 'string'} name={val.field}
                               message={I18n.translate('pleaseChoose') + val.name}>
                  <Select
                    allowClear={!required}
                    showSearch={showSearch}
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    placeholder={I18n.translate('pleaseChoose') + val.name}
                    defaultValue={this.state.values[val.field]}
                    filterOption={(input, option) => {
                      if (option.props.disabled === true) return false;
                      else if (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) return true;
                      else if (`${option.props.value}`.indexOf(input) >= 0) return true;
                      return false;
                    }}
                    {...val.params}
                  >
                    {map.map((m) => {
                      return <Select.Option key={m.value} value={m.value}
                                            disabled={m.disabled || false}>{m.label}</Select.Option>;
                    })}
                  </Select>
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'cascader':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type={val.binderType || 'array'} name={val.field}
                               message={I18n.translate('pleaseChoose') + val.name} valueFormatter={(v1, v2) => {
                  return this.binderValueFormatter(val, v1, v2);
                }}>
                  <Cascader
                    style={{textAlign: 'left'}}
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    placeholder={I18n.translate('pleaseChoose') + val.name}
                    defaultValue={this.state.values[val.field]}
                    options={val.map}
                    showSearch={(inputValue, path) => {
                      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
                    }}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'region':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="array" name={val.field} message={I18n.translate('pleaseChoose') + val.name}
                               valueFormatter={(v1, v2) => {
                                 return this.binderValueFormatter(val, v1, v2);
                               }}>
                  {
                    regionJson &&
                    <Cascader
                      expandTrigger="hover"
                      size={size}
                      options={regionJson}
                      defaultValue={this.state.values[val.field]}
                      allowClear={true}
                      placeholder={I18n.translate('pleaseChoose') + val.name}
                      showSearch={(inputValue, path) => {
                        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
                      }}
                      {...val.params}
                    />
                  }
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'provincial':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="array" name={val.field} message={I18n.translate('pleaseChoose') + val.name}
                               valueFormatter={(v1, v2) => {
                                 return this.binderValueFormatter(val, v1, v2);
                               }}>
                  {
                    provincialJson &&
                    <Cascader
                      expandTrigger="hover"
                      size={size}
                      options={provincialJson}
                      defaultValue={this.state.values[val.field]}
                      allowClear={true}
                      placeholder={I18n.translate('pleaseChoose') + val.name}
                      showSearch={(inputValue, path) => {
                        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
                      }}
                      {...val.params}
                    />
                  }
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'municipal':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="array" name={val.field} message={I18n.translate('pleaseChoose') + val.name}
                               valueFormatter={(v1, v2) => {
                                 return this.binderValueFormatter(val, v1, v2);
                               }}>
                  {
                    municipalJson &&
                    <Cascader
                      expandTrigger="hover"
                      size={size}
                      options={municipalJson}
                      defaultValue={this.state.values[val.field]}
                      allowClear={true}
                      placeholder={I18n.translate('pleaseChoose') + val.name}
                      showSearch={(inputValue, path) => {
                        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
                      }}
                      {...val.params}
                    />
                  }
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'range':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="array" name={val.field}
                               message={I18n.translate('pleaseChoose') + val.name + I18n.translate('range')}>
                  <Range
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    defaultValue={this.state.values[val.field]}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'datetime':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} message={I18n.translate('pleaseChoose') + val.name}
                               valueFormatter={(date, dateStr) => {
                                 return this.binderValueFormatter(val, date, dateStr);
                               }}>
                  <DatePicker
                    className={`fromItemWidth${c} ${val.type}`}
                    size={sizeIce}
                    defaultValue={this.state.values[val.field]}
                    showTime={true}
                    formater={['YYYY-MM-DD', 'HH:mm:ss']}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'date':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} message={I18n.translate('pleaseChoose') + val.name}
                               valueFormatter={(date, dateStr) => {
                                 return this.binderValueFormatter(val, date, dateStr);
                               }}>
                  <DatePicker
                    className={`fromItemWidth${c} ${val.type}`}
                    size={sizeIce}
                    defaultValue={this.state.values[val.field]}
                    formater={['YYYY-MM-DD']}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'time':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} message={I18n.translate('pleaseChoose') + val.name}
                               valueFormatter={(date, dateStr) => {
                                 return this.binderValueFormatter(val, date, dateStr);
                               }}>
                  <TimePicker
                    className={`fromItemWidth${c} ${val.type}`}
                    size={sizeIce}
                    defaultValue={this.state.values[val.field]}
                    formater={['HH:mm:ss']}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'year':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} message={I18n.translate('pleaseChoose') + val.name}
                               valueFormatter={(date, dateStr) => {
                                 return this.binderValueFormatter(val, date, dateStr);
                               }}>
                  <YearPicker
                    className={`fromItemWidth${c} ${val.type}`}
                    size={sizeIce}
                    defaultValue={this.state.values[val.field]}
                    formater={['YYYY']}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'month':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder name={val.field} message={I18n.translate('pleaseChoose') + val.name}
                               valueFormatter={(date, dateStr) => {
                                 return this.binderValueFormatter(val, date, dateStr);
                               }}>
                  <MonthPicker
                    className={`fromItemWidth${c} ${val.type}`}
                    size={sizeIce}
                    defaultValue={this.state.values[val.field]}
                    formater={['YYYY-MM']}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'rangeDatetime':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder
                  type="array"
                  name={val.field}
                  message={I18n.translate('pleaseChoose') + val.name + I18n.translate('range')}
                  valueFormatter={(date, dateStr) => {
                    return this.binderValueFormatter(val, date, dateStr);
                  }}
                >
                  <RangePicker
                    className={`fromItemWidth${c} ${val.type}`}
                    style={{backgroundColor: 'transparent', border: '1px solid #E0E0E0'}}
                    size={sizeIce}
                    defaultValue={this.state.values[val.field]}
                    showTime={true}
                    formater={['YYYY-MM-DD', 'HH:mm:ss']}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'rangeDate':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder
                  type="array"
                  name={val.field}
                  message={I18n.translate('pleaseChoose') + val.name + I18n.translate('range')}
                  valueFormatter={(date, dateStr) => {
                    return this.binderValueFormatter(val, date, dateStr);
                  }}
                >
                  <RangePicker
                    className={`fromItemWidth${c} ${val.type}`}
                    style={{backgroundColor: 'transparent', border: '1px solid #E0E0E0'}}
                    size={sizeIce}
                    defaultValue={this.state.values[val.field]}
                    formater={['YYYY-MM-DD']}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'uploadHoss':
      case 'uploadHossImage':
      case 'uploadHossCrop':
      case 'uploadHossDrag':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <Hoss
                  col={c}
                  val={val}
                  className={`fromItemWidth${c} ${val.type}`}
                  defaultFileList={this.state.values[val.field]}
                  setValue={(values) => {
                    this.state.values[val.field] = values;
                    this.formChange(this.state.values);
                  }}
                />
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      /*
      case 'uploadAlioss':
      case 'uploadAliossImage':
      case 'uploadAliossCrop':
      case 'uploadAliossDrag':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon} />}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <Alioss
                  col={c}
                  val={val}
                  className={`fromItemWidth${c} ${val.type}`}
                  defaultFileList={this.state.values[val.field] || []}
                />
              </Col>
            </Row>
          </Col>
        );
        break;
        */
      case 'tree':
        // 如果是tree，整个根
        map = [{
          value: TreeRoot,
          label: I18n.translate('chooseAll'),
          children: JSON.parse(JSON.stringify(map)),
        }];
        if (Array.isArray(val.value)) {
          temp = JSON.parse(JSON.stringify(val.value));
          temp.forEach((treev, treeidx) => {
            temp[treeidx] = TreeRoot + '-' + treev;
          });
        } else {
          temp = [];
        }
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="array" name={val.field}>
                  <Tree
                    defaultExpandAll
                    multiple
                    checkable
                    defaultCheckedKeys={temp || []}
                    onCheck={(checkKeys) => {
                      const ckData = JSON.parse(JSON.stringify(checkKeys));
                      const nckData = [];
                      ckData.forEach((ck) => {
                        const nck = ck.replace(TreeRoot + '-', '').replace(TreeRoot, '');
                        if (nck.length > 0) {
                          nckData.push(nck);
                        }
                      });
                      this.state.values[val.field] = nckData;
                      this.formChange(this.state.values);
                    }}
                  >
                    {this.renderTree(map)}
                  </Tree>
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'treeSelect':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="array" name={val.field} message={I18n.translate('pleaseChoose') + val.name}>
                  <TreeSelect
                    showSearch
                    allowClear
                    treeDefaultExpandAll
                    defaultValue={val.value}
                    treeCheckable={val.treeCheckable === undefined ? true : false}
                    showCheckedStrategy={TreeSelect.SHOW_PARENT}
                    className={`fromItemWidth${c} ${val.type}`}
                    size={size}
                    placeholder={I18n.translate('pleaseChoose') + val.name}
                    searchPlaceholder={I18n.translate('pleaseChoose') + val.name}
                    multiple
                    defaultCheckedKeys={val.value || []}
                    onChange={(checkKeys) => {
                      const ckData = JSON.parse(JSON.stringify(checkKeys));
                      const nckData = [];
                      ckData.forEach((ck) => {
                        const nck = ck.replace(TreeRoot + '-', '').replace(TreeRoot, '');
                        if (nck.length > 0) {
                          nckData.push(nck);
                        }
                      });
                      this.state.values[val.field] = nckData;
                      this.formChange(this.state.values);
                    }}
                    {...val.params}
                  >
                    {this.renderTreeSelect(map)}
                  </TreeSelect>
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'richQuill':
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].rich} style={styles.formRich}>
                <ReactQuill
                  readOnly={false}
                  defaultValue={this.state.values[val.field] || ''}
                  modules={{
                    toolbar: [
                      ['clean'],

                      [{font: []}],
                      [{header: [1, 2, 3, 4, 5, 6]}],
                      [{size: []}],

                      ['bold', 'italic', 'underline', 'strike'],
                      [{color: []}, {background: []}],
                      ['link', 'image', 'video'],
                      [{align: []}],

                      [{list: 'ordered'}, {list: 'bullet'}],
                      [{indent: '-1'}, {indent: '+1'}],
                      [{script: 'sub'}, {script: 'super'}],
                      ['blockquote', 'code-block'],
                      [{direction: 'rtl'}],
                    ],
                  }}
                  onChange={(string) => {
                    this.state.values[val.field] = string;
                    this.formChange(this.state.values);
                  }}
                />
              </Col>
            </Row>
          </Col>
        );
        break;
      case 'str':
      case 'string':
      default:
        tpl = (
          <Col key={idx} {...col[c]} align={align}>
            <Row wrap>
              <Col {...defaultCol[c].label} className={`myFormLabel ${required ? 'required' : ''}`}>
                {val.icon && <Icon className="myIcon" type={val.icon}/>}
                {val.name && val.name.length > 0 && <label>{val.name}：</label>}
              </Col>
              <Col {...defaultCol[c].item} style={styles.formItem}>
                <IceFormBinder type="string" name={val.field} message={I18n.translate('pleaseInput') + val.name}
                               valueFormatter={(result) => {
                                 return this.binderValueFormatter(val, result);
                               }}>
                  <Input
                    className={val.type ? `fromItemWidth${c} ${val.type}` : `fromItemWidth${c} str`}
                    size={size}
                    allowClear={true}
                    placeholder={I18n.translate('pleaseInput') + val.name}
                    ref={node => this.state.nodeShadow[val.field] = node}
                    defaultValue={this.state.values[val.field]}
                    {...val.params}
                  />
                </IceFormBinder>
                <div><IceFormError name={val.field}/></div>
              </Col>
            </Row>
          </Col>
        );
        break;
    }
    return tpl;
  };

  render() {
    return (
      <div className="myform">
        <IceFormBinderWrapper
          value={this.state.values}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            {
              this.state.items.map((item, idx) => {
                return (
                  <div style={styles.formContent} key={idx}>
                    {item.title && <h2 style={styles.formTitle}>{item.title}</h2>}
                    <Row wrap>
                      {
                        item.values.map((value, iidx) => {
                          return this.renderFormItem(item.col, value, iidx);
                        })
                      }
                    </Row>
                  </div>
                );
              })
            }
          </div>
        </IceFormBinderWrapper>
        {
          this.state.error.length > 0 &&
          <Row wrap style={styles.formItem}>
            <Col {...defaultCol[this.state.items[0].col || 0].label} className="myFormLabel">&nbsp;</Col>
            <Col {...defaultCol[this.state.items[0].col || 0].item}>
              <Alert
                message={this.state.error}
                type="error"
                closable
                afterClose={() => {
                  this.setError('');
                }}
                showIcon
              />
            </Col>
          </Row>
        }
        {
          this.state.operation !== undefined && this.state.operation.length > 0 &&
          <Row wrap>
            <Col {...defaultCol[this.state.items[0].col || 0].label} className="myFormLabel">&nbsp;</Col>
            <Col {...defaultCol[this.state.items[0].col || 0].item} style={{textAlign: this.state.align}}>
              {
                this.state.operation.map((op, idx) => {
                  let optpl = null;
                  switch (op.type) {
                    case 'submit':
                      optpl = (
                        <Button
                          key={idx}
                          type="primary"
                          onClick={this.validateAllFormField}
                          disabled={this.state.loading}
                          loading={this.state.loading}
                        >
                          {op.label || I18n.translate('submit')}
                        </Button>
                      );
                      break;
                    case 'reset':
                      optpl = (
                        <Button
                          style={{marginLeft: '3px'}}
                          key={idx}
                          type="default"
                          onClick={this.reset}
                          disabled={this.state.loading}
                          loading={this.state.loading}
                        >
                          {op.label || I18n.translate('reset')}
                        </Button>
                      );
                      break;
                    case 'trigger':
                      optpl = (
                        <Button
                          style={{marginLeft: '3px'}}
                          key={idx}
                          onClick={op.onClick}
                          disabled={this.state.loading}
                          loading={this.state.loading}
                          {...op.params}
                        >
                          {op.label || I18n.translate('trigger')}
                        </Button>
                      );
                      break;
                    default:
                      break;
                  }
                  return optpl;
                })
              }
            </Col>
          </Row>
        }
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formLabel: {
    minHeight: '32px',
    lineHeight: '32px',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  formItem: {
    position: 'relative',
    minHeight: '32px',
    lineHeight: '32px',
    marginBottom: 15,
  },
  formRich: {
    marginBottom: 15,
  },
  formLabelStatic: {
    minHeight: '40px',
    lineHeight: '32px',
    textAlign: 'left',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};

