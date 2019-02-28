import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BarGroup extends Component {
  static displayName = 'BarGroup';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { label: 'Monday', series1: 2800, series2: 2260 },
      { label: 'Tuesday', series1: 1800, series2: 1300 },
      { label: 'Wednesday', series1: 950, series2: 900 },
      { label: 'Thursday', series1: 500, series2: 390 },
      { label: 'Friday', series1: 170, series2: 100 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['series1', 'series2'],
      key: 'type',
      value: 'value',
    });
    return {
      axis: [
        { name: 'label', label: { offset: 12 } },
        { name: 'value', position: 'right' },
      ],
      geom: [
        { position: 'label*value', color: 'type', adjust: [{ type: 'dodge', marginRatio: 1 / 32 }] },
      ],
      chartParams: {
        height: 350,
        data: dv,
        forceFit: true,
        padding: [30, 30, 30, 80],
        scale: {
          sales: { tickInterval: 20 },
        },
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="bar.group" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
