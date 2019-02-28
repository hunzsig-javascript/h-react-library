import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BarGroupedColumn extends Component {
  static displayName = 'BarGroupedColumn';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { name: 'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, May: 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
      { name: 'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, May: 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
      key: '月份',
      value: '月均降雨量',
    });
    return {
      axis: [
        { name: '月份' },
        { name: '月均降雨量' },
      ],
      geom: [
        { position: '月份*月均降雨量', color: 'name', adjust: [{ type: 'dodge', marginRatio: 1 / 32 }] }, // 不设置size就是auto
      ],
      chartParams: {
        height: 350,
        data: dv,
        forceFit: true,
        padding: [30, 30, 30, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="bar.grouped.column" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
