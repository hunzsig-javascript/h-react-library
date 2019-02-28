import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BarStacked extends Component {
  static displayName = 'BarStacked';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { State: 'WY', '小于5岁': 25635, '5至13岁': 1890,  '14至17岁': 9314 },
      { State: 'DC', '小于5岁': 30352, '5至13岁': 20439, '14至17岁': 10225 },
      { State: 'VT', '小于5岁': 38253, '5至13岁': 42538, '14至17岁': 15757 },
      { State: 'ND', '小于5岁': 51896, '5至13岁': 67358, '14至17岁': 18794 },
      { State: 'AK', '小于5岁': 72083, '5至13岁': 85640, '14至17岁': 22153 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['小于5岁', '5至13岁', '14至17岁'], // 展开字段集
      key: '年龄段', // key字段
      value: '人口数量', // value字段
      retains: ['State'], // 保留字段集，默认为除fields以外的所有字段
    });
    return {
      axis: [
        { name: 'State', label: { offset: 12 } },
        { name: '人口数量' },
      ],
      geom: [
        { position: 'State*人口数量', color: '年龄段', style: { stroke: '#ffffff', lineWidth: 1 } },
      ],
      chartParams: {
        height: 350,
        data: dv,
        forceFit: true,
        padding: [30, 30, 80, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="bar.stacked" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
