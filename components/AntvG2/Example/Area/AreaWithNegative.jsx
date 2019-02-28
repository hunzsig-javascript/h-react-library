import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class AreaWithNegative extends Component {
  static displayName = 'AreaWithNegative';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { year: '1996', north: 322, south: 162 },
      { year: '1997', north: 324, south: 90 },
      { year: '1998', north: 329, south: 50 },
      { year: '1999', north: 342, south: 77 },
      { year: '2000', north: 348, south: 35 },
      { year: '2001', north: 334, south: -45 },
      { year: '2002', north: 325, south: -88 },
      { year: '2003', north: 316, south: -120 },
      { year: '2004', north: 318, south: -156 },
      { year: '2005', north: 330, south: -123 },
      { year: '2006', north: 355, south: -88 },
      { year: '2007', north: 366, south: -66 },
      { year: '2008', north: 337, south: -45 },
      { year: '2009', north: 352, south: -29 },
      { year: '2010', north: 377, south: -45 },
      { year: '2011', north: 383, south: -88 },
      { year: '2012', north: 344, south: -132 },
      { year: '2013', north: 366, south: -146 },
      { year: '2014', north: 389, south: -169 },
      { year: '2015', north: 334, south: -184 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['north', 'south'], // 展开字段集
      key: 'type', // key字段
      value: 'value', // value字段
    });
    return {
      axis: [
        { name: 'year' },
        {
          name: 'value',
          label: {
            formatter: (val) => {
              return (val / 10000).toFixed(1) + 'k';
            },
          },
        },
      ],
      geom: [
        { color: 'type' },
        { size: 2, color: 'type' },
      ],
      params: {
        height: 350,
        data: dv,
        scale: {
          year: {
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
        <AntvG2 type="area.with.negative" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
