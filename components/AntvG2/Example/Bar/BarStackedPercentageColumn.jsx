import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BarStackedPercentageColumn extends Component {
  static displayName = 'BarStackedPercentageColumn';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { country: 'Europe', year: '1750', value: 163 },
      { country: 'Europe', year: '1800', value: 203 },
      { country: 'Europe', year: '1850', value: 276 },
      { country: 'Europe', year: '1900', value: 408 },
      { country: 'Europe', year: '1950', value: 547 },
      { country: 'Europe', year: '1999', value: 729 },
      { country: 'Europe', year: '2050', value: 628 },
      { country: 'Europe', year: '2100', value: 828 },
      { country: 'Asia', year: '1750', value: 502 },
      { country: 'Asia', year: '1800', value: 635 },
      { country: 'Asia', year: '1850', value: 809 },
      { country: 'Asia', year: '1900', value: 947 },
      { country: 'Asia', year: '1950', value: 1402 },
      { country: 'Asia', year: '1999', value: 3634 },
      { country: 'Asia', year: '2050', value: 5268 },
      { country: 'Asia', year: '2100', value: 7268 },
    ]);
    dv.transform({
      type: 'percent',
      field: 'value', // 统计销量
      dimension: 'country', // 每年的占比
      groupBy: ['year'], // 以不同产品类别为分组
      as: 'percent',
    });
    return {
      axis: [
        { name: 'year' },
        { name: 'percent' },
      ],
      geom: [
        { position: 'year*percent', color: 'country' },
      ],
      chartParams: {
        height: 350,
        data: dv,
        forceFit: true,
        padding: [30, 30, 80, 80],
        scale: {
          percent: {
            min: 0,
            formatter(val) {
              return (val * 100).toFixed(2) + '%';
            },
          },
        },
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="bar.stacked.percentage.column" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
