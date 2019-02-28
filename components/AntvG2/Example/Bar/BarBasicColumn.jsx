import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BarBasicColumn extends Component {
  static displayName = 'BarBasicColumn';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['sales'],
      key: 'name',
      value: 'sales',
    });
    return {
      axis: [
        { name: 'year' },
        { name: 'sales' },
      ],
      geom: [
        { position: 'year*sales' },
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
        <AntvG2 type="bar.basic.column" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
