import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';
import SampleData from '../../Data/diamond';

export default class BarHistogramBinWidth extends Component {
  static displayName = 'BarHistogramBinWidth';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source(SampleData);
    dv.transform({
      type: 'bin.histogram',
      field: 'depth',
      binWidth: 4, // 在此修改矩形的宽度，代表真实数值的大小
      as: ['depth', 'count'],
    });
    return {
      axis: [
        { name: 'depth' },
        { name: 'count' },
      ],
      geom: [
        {
          position: 'depth*count',
        },
      ],
      chartParams: {
        height: 350,
        data: dv,
        forceFit: true,
        padding: [30, 30, 80, 80],
        scale: {
          depth: {
            tickInterval: 2,
          },
        },
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="bar.histogram.bin.width" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
