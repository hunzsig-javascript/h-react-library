import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class LineStep extends Component {
  static displayName = 'LineStep';

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
      { month: 'Jan', value: 51 },
      { month: 'Feb', value: 91 },
      { month: 'Mar', value: 34 },
      { month: 'Apr', value: 47 },
      { month: 'May', value: 63 },
      { month: 'June', value: 58 },
      { month: 'July', value: 56 },
      { month: 'Aug', value: 77 },
      { month: 'Sep', value: 99 },
      { month: 'Oct', value: 106 },
      { month: 'Nov', value: 88 },
      { month: 'Dec', value: 56 },
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
        { name: 'month' },
        { name: 'value' },
      ],
      geom: [
        { position: 'month*value', size: 2 },
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
        <AntvG2 type="line.step" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
