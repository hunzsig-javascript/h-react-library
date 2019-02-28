import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

import SampleData from './../../Data/iris';

export default class BoxGrouped extends Component {
  static displayName = 'BoxGrouped';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const colorMap = {
      'I. setosa': '#e04240',
      'I. versicolor': '#72e07f',
      'I. virginica': '#5f72e0',
    };
    const ds = new DataSet();
    const dv = ds.createView().source(SampleData);
    dv.transform({
      type: 'fold',
      fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'], // 展开字段集
      key: 'type',
      value: 'value',
    }).transform({
      type: 'bin.quantile',
      field: 'value', // 计算分为值的字段
      as: '_bin', // 保存分为值的数组字段
      groupBy: ['Species', 'type'],
    });
    return {
      axis: [],
      geom: [
        {
          position: 'type*_bin',
          shape: 'box',
          color: ['Species', (val) => {
            return colorMap[val];
          }],
          style: [
            'Species', {
              stroke: 'rgba(0, 0, 0, 0.45)',
              fill: (val) => {
                return colorMap[val];
              },
              fillOpacity: 0.3,
            },
          ],
          adjust: 'dodge',
        },
      ],
      params: {
        height: 350,
        data: dv,
        scale: {},
        forceFit: true,
        padding: [30, 30, 80, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="box.grouped" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
