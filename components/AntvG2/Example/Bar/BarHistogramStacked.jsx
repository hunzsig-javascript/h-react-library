import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';
import sampleData from '../../Data/diamond';

export default class BarHistogramStacked extends Component {
  static displayName = 'BarHistogramStacked';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source(sampleData);
    dv.transform({
      type: 'bin.histogram',
      field: 'depth',
      binWidth: 1,
      // offset: -0.3,
      groupBy: ['cut'],
      as: ['depth', 'count'],
    });
    return {
      axis: [
        {
          name: 'depth',
          grid: {
            lineStyle: {
              stroke: '#d9d9d9',
              lineWidth: 1,
              lineDash: [2, 2],
            },
          },
        },
        { name: 'count' },
      ],
      geom: [
        { position: 'depth*count', color: 'cut' },
      ],
      chartParams: {
        height: 350,
        data: dv,
        forceFit: true,
        padding: [30, 30, 80, 80],
        scale: {
          value: {
            nice: false,
            min: 0,
            tickInterval: 1,
          },
          count: {
            max: 14,
          },
        },
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="bar.histogram.stacked" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
