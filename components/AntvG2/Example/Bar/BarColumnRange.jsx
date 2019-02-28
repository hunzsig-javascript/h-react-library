import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BarColumnRange extends Component {
  static displayName = 'BarColumnRange';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { x: '分类一', y: [76, 100] },
      { x: '分类二', y: [56, 108] },
      { x: '分类三', y: [38, 129] },
      { x: '分类四', y: [58, 155] },
      { x: '分类五', y: [45, 120] },
      { x: '分类六', y: [23, 99] },
      { x: '分类七', y: [18, 56] },
      { x: '分类八', y: [18, 34] },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['y'],
      key: 'key',
      value: 'y',
    });
    return {
      axis: [
        { name: 'x' },
        { name: 'y' },
      ],
      geom: [
        { position: 'x*y', color: 'key' },
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
        <AntvG2 type="bar.column.range" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
