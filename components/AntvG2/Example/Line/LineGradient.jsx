import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class LineGradient extends Component {
  static displayName = 'LineGradient';

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
      { month: '2015-01-01', acc: 84.0 },
      { month: '2015-02-01', acc: 14.9 },
      { month: '2015-03-01', acc: 17.0 },
      { month: '2015-04-01', acc: 20.2 },
      { month: '2015-05-01', acc: 55.6 },
      { month: '2015-06-01', acc: 56.7 },
      { month: '2015-07-01', acc: 30.6 },
      { month: '2015-08-01', acc: 63.2 },
      { month: '2015-09-01', acc: 24.6 },
      { month: '2015-10-01', acc: 14.0 },
      { month: '2015-11-01', acc: 9.4 },
      { month: '2015-12-01', acc: 6.3 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['value'],
      key: key,
      value: 'value',
    });
    return {
      key: key,
      axis: [
        { name: 'month', line: { stroke: '#E6E6E6' } },
        { name: 'acc', line: false, grid: null },
      ],
      geom: [
        {
          position: 'month*acc',
          size: 1,
          color: 'l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)',
          style: {
            shadowColor: 'l (270) 0:rgba(21, 146, 255, 0)',
            shadowBlur: 60,
            shadowOffsetY: 6,
          },
        },
      ],
      params: {
        height: 350,
        data: dv,
        scale: {
          month: { alias: '月份' },
          acc: { alias: '积累量' },
        },
        forceFit: true,
        padding: [30, 30, 80, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="line.gradient" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
