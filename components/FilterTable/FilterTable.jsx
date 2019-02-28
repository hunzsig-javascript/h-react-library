import React, { Component } from 'react';
import { Table } from '@icedesign/base';
import { Spin, Button, Icon, Tag, Modal, Pagination, LocaleProvider, Checkbox } from 'antd';
import ZH_CN from 'antd/lib/locale-provider/zh_CN';
import FilterForm from './../Filter';
import FilterTableBalloon from './FilterTableBalloon';
import Api from '../../common/Api';
import Parse from '../../common/Parse';
import I18n from "../../common/I18n";

export default class EnhanceTable extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    if (typeof this.props.onRef === 'function') {
      this.props.onRef(this);
    }
    this.title = this.props.title || I18n.translate('oneList');
    this.hasBorder = typeof this.props.hasBorder === 'boolean' ? this.props.hasBorder : true;
    this.maxBodyHeight = this.props.maxBodyHeight || 500;

    this.scope = this.props.table.scope;
    this.onQuery = this.props.table.onQuery;
    this.onAdd = this.props.table.onAdd;
    this.onExcelPush = this.props.table.onExcelPush;
    this.onExcelPull = this.props.table.onExcelPull;
    this.onPrint = this.props.table.onPrint;
    this.expandedRowRender = this.props.table.expandedRowRender || function () {};
    this.hasExpandedRowCtrl = this.props.table.hasExpandedRowCtrl || false;
    this.filter = this.props.table.filter || [];
    this.filterFormatter = this.props.table.filterFormatter;
    this.operation = this.props.table.operation || [];
    this.state = {
      loading: true,
      result: [],
      params: this.props.table.params || {},
      page: null,
      display: this.props.table.display || [],
      isLockCol: typeof this.props.isLockCol === 'boolean' ? this.props.isLockCol : false,
      isSearch: typeof this.props.isSearch === 'boolean' ? this.props.isSearch : false,
    };
    // 加序号
    this.state.display.unshift({ field: 'serial', name: I18n.translate('serial'), width: 100 });
    // 如果遇到分页的设定，在开头加上分页条数
    if (this.state.params.page === 1) {
      this.state.params.pageCurrent = 0;
      if (!this.state.params.pagePer || this.state.params.pagePer < 1) {
        this.state.params.pagePer = 10;
      }
    }
    this.filter.forEach((val) => {
      if (this.state.params[val.field] === undefined && val.value && val.value.length > 0) {
        this.state.params[val.field] = val.value;
      }
    });
    this.originParams = JSON.parse(JSON.stringify(this.props.table.params || []));
    this.originDisplay = JSON.parse(JSON.stringify(this.props.table.display || []));
    this.changedCols = this.originDisplay;
  }

  componentDidMount() {
    this.apiQuery();
  }

  setLoading = (loading) => {
    this.setState({
      loading: loading,
    });
  };

  apiQuery = () => {
    this.setState({
      loading: true,
    });
    let params = JSON.parse(JSON.stringify(this.state.params));
    if (typeof this.filterFormatter === 'function') {
      params = this.filterFormatter(params);
    }
    Api.real(this.scope, params, (res) => {
      this.setState({
        loading: false,
      });
      if (res.code === 200) {
        if (res.data.page !== undefined) {
          res.data.data.forEach((d, idx) => {
            d.serial = (idx + 1) + res.data.page.current * res.data.page.per;
          });
          this.setState({
            result: res.data.data,
            page: res.data.page,
          });
        } else {
          res.data.forEach((d, idx) => {
            d.serial = idx + 1;
          });
          this.setState({
            result: res.data,
            page: null,
          });
        }
        if (typeof this.onQuery === 'function') {
          this.onQuery(res);
        }
      }
    });
  };
  filterChange = (value) => {
    this.setState({
      params: value,
    });
  };

  filterReset = () => {
    this.setState({
      params: JSON.parse(JSON.stringify(this.originParams)),
    });
  };

  filterSearch = () => {
    this.apiQuery();
  };

  onSort = (dataIndex, order) => {
    const dataSource = this.state.result.sort((a, b) => {
      const result = Parse.isBigger(a[dataIndex], b[dataIndex]);
      return order === 'asc' ? (result === 1 ? 1 : -1) : result === 1 ? -1 : 1;
    });
    this.setState({
      result: dataSource,
    });
  };

  onPageChange = (currentPage) => {
    const params = this.state.params;
    params.pageCurrent = currentPage - 1;
    this.setState({
      params: params,
    });
    this.apiQuery();
  };

  onPageSizeChange = (current, per) => {
    const params = this.state.params;
    params.pagePer = per;
    this.setState({
      params: params,
    });
    this.apiQuery();
  };

  colSearch = () => {
    this.setState({
      isSearch: !this.state.isSearch,
    });
  };
  colLock = () => {
    this.setState({
      isLockCol: !this.state.isLockCol,
    });
  };
  colChoose = () => {
    Modal.confirm({
      width: 600,
      maskClosable: true,
      className: 'vertical-center-modal',
      content: this.renderChooseCol(),
      title: I18n.translate('chooseDisplayCol'),
      onOk: () => {
        this.changedCols.forEach((ccf) => {
          this.props.table.display.forEach((ptd) => {
            if (ccf.field === ptd.field && ptd.renderColumn) {
              ccf.renderColumn = ptd.renderColumn;
            }
          });
        });
        this.setState({
          display: this.changedCols,
        });
      },
    });
  };

  imgShow = (title, src) => {
    Modal.info({
      width: 650,
      maskClosable: true,
      className: 'vertical-center-modal hideFooter',
      title: title || I18n.translate('bigPicture'),
      content: (
        <img style={{ width: '500px', verticalAlign: 'middle' }} alt={src} src={Parse.img(src)} />
      ),
    });
  };

  renderChooseCol() {
    const dataSource = this.originDisplay.map((col) => {
      return {
        label: col.name,
        value: col.field,
      };
    });
    const defaultValue = this.state.display.map(col => col.field);
    return (
      <Checkbox.Group
        options={dataSource}
        onChange={(value) => { this.changedCols = this.originDisplay.filter(col => value.indexOf(col.field) > -1); }}
        defaultValue={defaultValue}
      />
    );
  }

  renderColumn = (...value) => {
    const d = value[0];
    const index = value[2];
    const val = value[3];
    let tpl = null;
    const data = val[d.field];
    if (data !== null && data !== undefined) {
      const dataType = typeof data;
      switch (dataType) {
        case 'object':
          if (Array.isArray(data)) {
          } else {
            tpl = JSON.stringify(data);
          }
          break;
        default:
          tpl = data;
          break;
      }
    }
    return (<div key={index} style={d.style}>{tpl}</div>);
  };

  renderOperations = (value, index, record) => {
    return (
      this.operation.map((o, idx) => {
        let show = true;
        if (o.condition !== undefined && Array.isArray(o.condition)) {
          o.condition.forEach((cond) => {
            switch (cond.cond) {
            case '^':
            case 'in':
              if (!cond.value.includes(record[cond.field])) {
                show = false;
              }
              break;
            case 'notin':
            case '!^':
              if (cond.value.includes(record[cond.field])) {
                show = false;
              }
              break;
            case 'like':
            case 'strpos':
              if (record[cond.field].indexOf(cond.value) === -1) {
                show = false;
              }
              break;
            case 'neq':
            case '!=':
            case '<>':
              if (record[cond.field] === cond.value) {
                show = false;
              }
              break;
            case 'eq':
            case '=':
            default:
              if (record[cond.field] !== cond.value) {
                show = false;
              }
              break;
            }
          });
        }
        if (!show) {
          return null;
        }
        let tpl = null;
        const id = `h${o.type}_${index}_${idx}`;
        switch (o.type) {
        case 'button':
          tpl = (
            <Button
              id={id}
              style={styles.operationBtn}
              key={idx}
              {...o.params} // see https://ant.design/components/button-cn/
              onClick={o.onClick !== undefined ? o.onClick.bind(this, index, record) : undefined}
            >
              {o.name}
            </Button>
          );
          break;
        case 'balloon':
          tpl = <FilterTableBalloon key={idx} o={o} index={index} record={record} />;
          break;
        default:
          break;
        }
        return tpl;
      })
    );
  };

  render() {
    return (
      <div style={styles.content}>
        <h2 style={styles.contentTitle}>
          <div>
            {this.title}
            {typeof this.onAdd === 'function' && <Button type="primary" size="small" style={{ marginLeft: '3px' }} onClick={this.onAdd}>{I18n.translate('add')}</Button>}
            {typeof this.onExcelPush === 'function' && <Button type="default" size="small" style={{ marginLeft: '3px' }} onClick={this.onExcelPush}>{I18n.translate('import')}</Button>}
            {typeof this.onExcelPull === 'function' && <Button type="dashed" size="small" style={{ marginLeft: '3px' }} onClick={this.onExcelPull}>{I18n.translate('export')}</Button>}
            {typeof this.onPrint === 'function' && <Button type="default" size="small" style={{ marginLeft: '3px' }} onClick={this.onPrint}>{I18n.translate('print')}</Button>}
          </div>
        </h2>
        <div style={{ position: 'relative', height: '30px' }}>
          <div style={{ textAlign: 'right' }}>
            {
              this.state.page &&
              <div style={{ position: 'absolute', top: 0, textAlign: 'left' }}>
                <Tag>{I18n.translate('total') + this.state.page.total + I18n.translate('results')}</Tag>
                <Tag>{I18n.translate('inPage') + (this.state.result ? this.state.result.length : 0) + I18n.translate('results')}</Tag>
              </div>
            }
            {
              !this.state.page &&
              <div style={{ position: 'absolute', top: 0, textAlign: 'left' }}>
                <Tag>{I18n.translate('total') + (this.state.result ? this.state.result.length : 0) + I18n.translate('results')}</Tag>
              </div>
            }
            <Button.Group size="small">
              <Button type="primary" disabled={this.state.loading} onClick={this.apiQuery}>
                <Icon type={this.state.loading ? 'loading' : 'reload'} />{this.state.loading ? I18n.translate('wait') : I18n.translate('fresh')}
              </Button>
              {this.filter.length > 0 && <Button type={this.state.isSearch ? 'primary' : 'default'} onClick={this.colSearch}> {this.state.isSearch ? I18n.translate('searchHide') : I18n.translate('searchShow')} </Button>}
              <Button type={this.state.isLockCol ? 'primary' : 'default'} onClick={this.colLock}> {this.state.isLockCol ? I18n.translate('tableHeadUnLock') : I18n.translate('tableHeadLock')} </Button>
              <Button onClick={this.colChoose}> {I18n.translate('chooseDisplayCol')}({this.changedCols.length}) </Button>
            </Button.Group>
          </div>
        </div>
        {
          this.state.isSearch && this.filter.length > 0 &&
          <FilterForm
            loading={this.state.loading}
            value={this.state.params}
            display={this.filter}
            onChange={this.filterChange}
            onSubmit={this.filterSearch}
            onReset={this.filterReset}
          />
        }
        <Spin shape="dot-circle" color="#aaaaaa" spinning={this.state.loading}>
          <Table
            expandedRowRender={(record, index) => this.expandedRowRender(record, index)}
            hasExpandedRowCtrl={this.hasExpandedRowCtrl}
            dataSource={this.state.result}
            hasBorder={this.hasBorder}
            fixedHeader={this.state.isLockCol}
            maxBodyHeight={this.maxBodyHeight}
            onSort={this.onSort.bind(this)}
            primaryKey="serial"
          >
            {
              this.state.display.map((d, idx) => {
                const renderColumn = (typeof d.renderColumn === 'function') ? d.renderColumn : this.renderColumn;
                return <Table.Column key={idx} title={d.name} cell={renderColumn.bind(this, d)} width={d.width} sortable={typeof d.sortable === 'boolean' ? d.sortable : false} />;
              })
            }
            {
              this.operation.length > 0 &&
              <Table.Column
                title={I18n.translate('operation')}
                width={200}
                cell={this.renderOperations}
              />
            }
          </Table>
          {
            this.state.page !== null &&
            <div style={styles.paginationWrapper}>
              <LocaleProvider locale={ZH_CN}>
                <Pagination
                  style={styles.pagination}
                  total={this.state.page.total}
                  current={this.state.page.current + 1}
                  pageSize={this.state.params.pagePer}
                  showQuickJumper={true}
                  onChange={this.onPageChange}
                  showSizeChanger={true}
                  pageSizeOptions={['5', '10', '20', '25', '50', '100', '250']}
                  onShowSizeChange={this.onPageSizeChange}
                />
              </LocaleProvider>
            </div>
          }
        </Spin>
      </div>
    );
  }
}

const styles = {
  content: {
    width: '100%',
    minWidth: '1200px',
    position: 'relative',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: '6px',
    padding: '20px',
    marginBottom: '20px',
  },
  contentTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  operationBtn: {
    marginLeft: '6px',
    marginBottom: '2px',
  },
  paginationWrapper: {
    textAlign: 'right',
    marginTop: '26px',
    lineHeight: '1.28571',
  },
  pagination: {
    display: 'inline-block',
    marginLeft: '10px',
  },
};
