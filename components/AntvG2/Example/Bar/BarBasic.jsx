import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BarBasic extends Component {
  static displayName = 'BarBasic';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { country: '中国', population: 104970 },
      { country: '印度', population: 29034 },
      { country: '美国', population: 131744 },
      { country: '印尼', population: 23489 },
      { country: '巴西', population: 18203 },
    ]);
    dv.transform({
      type: 'sort',
      callback(a, b) { // 排序依据
        return a.population - b.population > 0;
      },
    });
    return {
      axis: [
        { name: 'country', label: { offset: 12 } },
        { name: 'population' },
      ],
      geom: [
        { position: 'country*population' },
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
        <AntvG2 type="bar.basic" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
