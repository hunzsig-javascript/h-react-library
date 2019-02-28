import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class AreaBasic extends Component {
  static displayName = 'AreaBasic';

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
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['value'], // 展开字段集
      key: key,
      value: 'value',
    });
    return {
      key: key,
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
        {},
        { size: 2 },
      ],
      params: {
        height: 350,
        data: dv,
        scale: {
          value: {
            min: 10000,
          },
          year: {
            range: [0, 1],
          },
        },
        forceFit: true,
        padding: [30, 30, 30, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="area.basic" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
