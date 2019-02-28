import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BarRange extends Component {
  static displayName = 'BarRange';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { profession: '两年制副学士学位', highest: 110000, minimum: 23000, mean: 56636 },
      { profession: '执法与救火', highest: 120000, minimum: 18000, mean: 66625 },
      { profession: '教育学', highest: 125000, minimum: 24000, mean: 72536 },
      { profession: '心理学', highest: 130000, minimum: 22500, mean: 75256 },
      { profession: '计算机科学', highest: 131000, minimum: 23000, mean: 77031 }
    ]);
    dv.transform({
      type: 'map',
      callback(row) { // 加工数据后返回新的一行，默认返回行数据本身
        row.range = [row.minimum, row.highest];
        return row;
      },
    });
    return {
      axis: [
        { name: 'profession', label: { offset: 12 } },
        { name: 'range' },
      ],
      geom: [
        { position: 'profession*range' },
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
        <AntvG2 type="bar.range" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
