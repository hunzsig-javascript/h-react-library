import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class LineStepSeries extends Component {
  static displayName = 'LineStepSeries';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const key = 'key';
    const ds = new DataSet();
    const dv = ds.createView().source([
      { month: 'Jan', series2: 51, series1: 125 },
      { month: 'Feb', series2: 91, series1: 132 },
      { month: 'Mar', series2: 34, series1: 141 },
      { month: 'Apr', series2: 47, series1: 158 },
      { month: 'May', series2: 63, series1: 133 },
      { month: 'June', series2: 58, series1: 143 },
      { month: 'July', series2: 56, series1: 176 },
      { month: 'Aug', series2: 77, series1: 194 },
      { month: 'Sep', series2: 99, series1: 115 },
      { month: 'Oct', series2: 106, series1: 134 },
      { month: 'Nov', series2: 88, series1: 110 },
      { month: 'Dec', series2: 56, series1: 91 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['series1', 'series2'],
      key: key,
      value: 'value',
    });
    return {
      key: key,
      axis: [
        { name: 'month' },
        { name: 'value' },
      ],
      geom: [
        { position: 'month*value', color: key, size: 2 },
      ],
      params: {
        height: 350,
        data: dv,
        scale: {
          month: {
            range: [0, 1],
          },
        },
        forceFit: true,
        padding: [30, 30, 80, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="line.step.series" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
