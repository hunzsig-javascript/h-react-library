import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class LineSeries extends Component {
  static displayName = 'LineSeries';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const key = 'city';
    const ds = new DataSet();
    const dv = ds.createView().source([
      { month: 'Jan', Tokyo: 7.0, London: 3.9 },
      { month: 'Feb', Tokyo: 6.9, London: 4.2 },
      { month: 'Mar', Tokyo: 9.5, London: 5.7 },
      { month: 'Apr', Tokyo: 14.5, London: 8.5 },
      { month: 'May', Tokyo: 18.4, London: 11.9 },
      { month: 'Jun', Tokyo: 21.5, London: 15.2 },
      { month: 'Jul', Tokyo: 25.2, London: 17.0 },
      { month: 'Aug', Tokyo: 26.5, London: 16.6 },
      { month: 'Sep', Tokyo: 23.3, London: 14.2 },
      { month: 'Oct', Tokyo: 18.3, London: 10.3 },
      { month: 'Nov', Tokyo: 13.9, London: 6.6 },
      { month: 'Dec', Tokyo: 9.6, London: 4.8 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['Tokyo', 'London'], // 展开字段集
      key: key,
      value: 'temperature',
    });
    return {
      key: key,
      axis: [
        { name: 'month' },
        { name: 'temperature' },
      ],
      geom: [
        { position: 'month*temperature', size: 2, color: key },
        { position: 'month*temperature', size: 4, color: key, shape: 'circle', style: { stroke: '#fff', lineWidth: 1 } },
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
        <AntvG2 type="line.series" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
