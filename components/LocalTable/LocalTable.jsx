import React, {Component} from 'react';
import {Checkbox, Table} from '@icedesign/base';
import {Button, Tag, Modal, Pagination} from 'antd';
import FilterForm from './../Filter';
import FilterBalloon from './FilterBalloon';
import Parse from '../../common/Parse';
import I18n from "../../common/I18n";

export default class LocalTable extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    if (typeof this.props.onRef === 'function') {
      this.props.onRef(this);
    }
    this.title = this.props.title || '';
    this.hasBorder = typeof this.props.hasBorder === 'boolean' ? this.props.hasBorder : true;
    this.maxBodyHeight = this.props.maxBodyHeight || 500;

    this.filterFormatter = this.props.table.filterFormatter;
    this.filter = this.props.table.filter || [];
    this.operation = this.props.table.operation || [];
    this.state = {
      dataSource: this.props.table.dataSource || [],
      dataSourceNotPage: [],
      params: this.props.table.params || {},
      page: {
        current: 0,
        per: props.table.params.pagePer || 10,
      },
      display: this.props.table.display || [],
      isLockCol: typeof this.props.isLockCol === 'boolean' ? this.props.isLockCol : false,
      isSearch: typeof this.props.isSearch === 'boolean' ? this.props.isSearch : false,
    };
    // 加序号
    this.state.display.unshift({field: 'serial', name: I18n.tr('serial'), width: 100});
    this.filter.forEach((val) => {
      if (this.state.params[val.field] === undefined && val.value && val.value.length > 0) {
        this.state.params[val.field] = val.value;
      }
    });
    this.originDataSource = JSON.parse(JSON.stringify(this.props.table.dataSource || []));
    this.originParams = JSON.parse(JSON.stringify(this.props.table.params || {}));
    this.originDisplay = JSON.parse(JSON.stringify(this.props.table.display || []));
    this.changedCols = this.originDisplay;
    this.filterDataSource(true);
  }

  componentDidMount() {
  }

  setDataSource = (dataSource) => {
    this.originDataSource = JSON.parse(JSON.stringify(dataSource || []));
    this.filterDataSource();
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

  filterDataSource = (isInit = false) => {
    let ds = [];
    if (typeof this.filterFormatter === 'function') {
      ds = this.filterFormatter(JSON.parse(JSON.stringify(this.originDataSource)), this.state.params);
    } else {
      ds = JSON.parse(JSON.stringify(this.originDataSource));
    }
    this.state.dataSourceNotPage = JSON.parse(JSON.stringify(ds));
    if (!isInit) {
      this.setState({
        dataSourceNotPage: this.state.dataSourceNotPage,
      });
    }
    // page
    if (this.state.params.page === 1) {
      ds = ds.slice(this.state.page.current * this.state.page.per, (this.state.page.current + 1) * this.state.page.per);
    }
    ds.forEach((d, idx) => {
      d.serial = (this.state.params.page === 1) ? this.state.page.current * this.state.page.per + idx + 1 : idx + 1;
    });
    this.state.dataSource = ds;
    if (!isInit) {
      this.setState({
        dataSource: this.state.dataSource,
      });
    }
  };

  filterSearch = () => {
    this.filterDataSource();
  };

  onSort = (dataIndex, order) => {
    const dataSource = this.state.dataSource.sort((a, b) => {
      const result = Parse.isBigger(a[dataIndex], b[dataIndex]);
      return order === 'asc' ? (result === 1 ? 1 : -1) : result === 1 ? -1 : 1;
    });
    this.setState({
      dataSource: dataSource,
    });
  };

  onPageChange = (currentPage) => {
    this.state.page.current = currentPage - 1;
    this.setState({
      page: {
        current: this.state.page.current,
        per: this.state.page.per,
      },
      dataSource: this.originDataSource.slice(this.state.page.current * this.state.page.per, (this.state.page.current + 1) * this.state.page.per),
    });
  };

  onPageSizeChange = (current, per) => {
    this.state.page.current = current - 1;
    this.state.page.per = per;
    this.setState({
      page: {
        current: this.state.page.current,
        per: this.state.page.per,
      },
      dataSource: this.originDataSource.slice(this.state.page.current * this.state.page.per, (this.state.page.current + 1) * this.state.page.per),
    });
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
      title: I18n.tr('chooseDisplayCol'),
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
      title: title || I18n.tr('bigPicture'),
      content: (
        <img style={{width: '500px', verticalAlign: 'middle'}} alt={src} src={Parse.img(src)}/>
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
        dataSource={dataSource}
        onChange={(value) => {
          this.changedCols = this.originDisplay.filter(col => value.indexOf(col.field) > -1);
        }}
        defaultValue={defaultValue}
      />
    );
  }

  renderImg = (value) => {
    if (!value) {
      return;
    }
    return (
      <img
        style={{maxWidth: '100%', maxHeight: '50px', verticalAlign: 'middle'}}
        alt={value}
        src={value}
        onClick={this.imgShow.bind(this, null, value)}
      />
    );
  };

  renderColumn = (...value) => {
    const key = value[0].field;
    const index = value[2];
    const val = value[3];
    let tpl = null;
    const data = val[key];
    if (data) {
      const dataType = typeof data;
      switch (dataType) {
        case 'object':
          if (Array.isArray(data)) {
            tpl = data.join(',');
          } else {
            tpl = JSON.stringify(data);
          }
          break;
        default:
          tpl = data;
          break;
      }
    }
    return (<span key={index}>{tpl}</span>);
  };

  renderOperations = (value, index, record) => {
    return (
      this.operation.map((o, idx) => {
        let show = true;
        if (o.condition !== undefined && Array.isArray(o.condition)) {
          o.condition.forEach((cond) => {
            switch (cond.cond) {
              case 'in':
                if (!cond.value.includes(record[cond.field])) {
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
            tpl = <FilterBalloon key={idx} o={o} index={index} record={record}/>;
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
            {this.title.length > 0 && <span>{this.title}</span>}
            {typeof this.onAdd === 'function' && <Button type="primary" size="small" style={{marginLeft: '3px'}}
                                                         onClick={this.onAdd}>{I18n.tr('add')}</Button>}
            {typeof this.prepareExcel === 'function' && <Button type="default" size="small" style={{marginLeft: '3px'}}
                                                                onClick={this.prepareExcel}>{I18n.tr('export')}</Button>}
          </div>
        </h2>
        <div style={{position: 'relative', height: '30px'}}>
          <div style={{textAlign: 'right'}}>
            <div style={{position: 'absolute', top: 0, textAlign: 'left'}}>
              {this.state.page &&
              <Tag>{I18n.tr('total') + this.state.dataSourceNotPage.length + I18n.tr('results')}</Tag>}
              {this.state.page && <Tag>{I18n.tr('inPage') + this.state.dataSource.length + I18n.tr('results')}</Tag>}
            </div>
            <Button.Group size="small">
              {this.filter.length > 0 && <Button type={this.state.isSearch ? 'primary' : 'default'}
                                                 onClick={this.colSearch}> {this.state.isSearch ? I18n.tr('searchHide') : I18n.tr('searchShow')} </Button>}
              <Button type={this.state.isLockCol ? 'primary' : 'default'}
                      onClick={this.colLock}> {this.state.isLockCol ? I18n.tr('tableHeadUnLock') : I18n.tr('tableHeadLock')} </Button>
              <Button onClick={this.colChoose}> {I18n.tr('chooseDisplayCol')}({this.changedCols.length}) </Button>
            </Button.Group>
          </div>
        </div>
        {
          this.state.isSearch && this.filter.length > 0 &&
          <FilterForm
            value={this.state.params}
            display={this.filter}
            onChange={this.filterChange}
            onSubmit={this.filterSearch}
            onReset={this.filterReset}
          />
        }
        <Table
          dataSource={this.state.dataSource}
          hasBorder={this.hasBorder}
          fixedHeader={this.state.isLockCol}
          maxBodyHeight={this.maxBodyHeight}
          onSort={this.onSort.bind(this)}
        >
          {
            this.state.display.map((d, idx) => {
              let tpl = null;
              const renderColumn = (typeof d.renderColumn === 'function') ? d.renderColumn : this.renderColumn;
              switch (d.type) {
                case 'image':
                case 'img':
                case 'pic':
                case 'picture':
                  tpl = (
                    <Table.Column
                      key={idx}
                      title={d.name}
                      dataIndex={d.field}
                      width={d.width}
                      cell={this.renderImg}
                    />
                  );
                  break;
                default:
                  tpl = <Table.Column key={idx} title={d.name} cell={renderColumn.bind(this, d)} width={d.width}
                                      sortable={typeof d.sortable === 'boolean' ? d.sortable : false}/>;
                  break;
              }
              return tpl;
            })
          }
          <Table.Column
            title={I18n.tr('operation')}
            width={200}
            cell={this.renderOperations}
          />
        </Table>
        {
          this.state.params.page === 1 &&
          <div style={styles.paginationWrapper}>
            <Pagination
              style={styles.pagination}
              total={Math.ceil(this.state.dataSourceNotPage.length / this.state.page.per)}
              current={this.state.page.current + 1}
              pageSize={this.state.page.per}
              showQuickJumper={true}
              onChange={this.onPageChange}
              showSizeChanger={true}
              pageSizeOptions={['5', '10', '20', '25', '50', '100', '250']}
              onShowSizeChange={this.onPageSizeChange}
            />
          </div>
        }
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
