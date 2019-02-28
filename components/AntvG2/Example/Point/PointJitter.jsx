import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';
import SampleData from '../../Data/dv-grades';

export default class PointJitter extends Component {
  static displayName = 'PointJitter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source(SampleData);
    /*
    dv.transform({
      type: 'fold',
      fields: ['height', 'weight'], // 展开字段集
      key: 'key',
      value: 'value',
      retains: ['gender', 'height', 'weight'],
    });
    */
    return {
      axis: [
        { name: 'Score', grid: null },
        {
          name: 'Class',
          tickLine: null,
          subTickCount: 1,
          subTickLine: {
            lineWidth: 1,
            stroke: '#BFBFBF',
            length: 4,
          },
          grid: {
            align: 'center', // 网格顶点从两个刻度中间开始
            lineStyle: {
              stroke: '#E9E9E9',
              lineWidth: 1,
              lineDash: [3, 3],
            },
          },
        },
      ],
      geom: [
        {
          position: 'Class*Score',
          color: 'Grade',
          opacity: 0.65,
          shape: "circle",
          size: 4,
          adjust: 'jitter',
        },
      ],
      params: {
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
        <AntvG2 type="point.jitter" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
