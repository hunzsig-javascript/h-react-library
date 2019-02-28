import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class AreaPercentage extends Component {
  static displayName = 'AreaPercentage';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { country: 'Asia', year: '1750', value: 502 },
      { country: 'Asia', year: '1800', value: 635 },
      { country: 'Asia', year: '1850', value: 809 },
      { country: 'Asia', year: '1900', value: 5268 },
      { country: 'Asia', year: '1950', value: 4400 },
      { country: 'Asia', year: '1999', value: 3634 },
      { country: 'Asia', year: '2050', value: 947 },
      { country: 'Africa', year: '1750', value: 106 },
      { country: 'Africa', year: '1800', value: 107 },
      { country: 'Africa', year: '1850', value: 111 },
      { country: 'Africa', year: '1900', value: 1766 },
      { country: 'Africa', year: '1950', value: 221 },
      { country: 'Africa', year: '1999', value: 767 },
      { country: 'Africa', year: '2050', value: 133 },
      { country: 'Europe', year: '1750', value: 163 },
      { country: 'Europe', year: '1800', value: 203 },
      { country: 'Europe', year: '1850', value: 276 },
      { country: 'Europe', year: '1900', value: 628 },
      { country: 'Europe', year: '1950', value: 547 },
      { country: 'Europe', year: '1999', value: 729 },
      { country: 'Europe', year: '2050', value: 408 },
      { country: 'Oceania', year: '1750', value: 200 },
      { country: 'Oceania', year: '1800', value: 200 },
      { country: 'Oceania', year: '1850', value: 200 },
      { country: 'Oceania', year: '1900', value: 460 },
      { country: 'Oceania', year: '1950', value: 230 },
      { country: 'Oceania', year: '1999', value: 300 },
      { country: 'Oceania', year: '2050', value: 300 },
    ]);
    dv.transform({
      type: 'percent',
      field: 'value',
      dimension: 'country',
      groupBy: ['year'],
      as: 'percent',
    });
    return {
      axis: [
        { name: 'year' },
        { name: 'percent' },
      ],
      geom: [
        { color: 'country' },
        { size: 2, color: 'country' },
      ],
      params: {
        height: 350,
        data: dv,
        scale: {
          year: {
            type: 'linear',
            tickInterval: 50,
          },
          percent: {
            formatter: (value) => {
              value = value * 100 || 0;
              return Number.parseInt(value, 10);
            },
            alias: 'percent(%)',
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
        <AntvG2 type="area.percentage" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
