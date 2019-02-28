import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class LineBasic extends Component {
  static displayName = 'LineBasic';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { month: '01/01', SiteA: 7000, SiteB: 3900 },
      { month: '02/01', SiteA: 6900, SiteB: 4200 },
      { month: '03/01', SiteA: 9500, SiteB: 5700 },
      { month: '04/01', SiteA: 14500, SiteB: 8500 },
      { month: '05/01', SiteA: 18400, SiteB: 11900 },
      { month: '06/01', SiteA: 21500, SiteB: 15200 },
      { month: '07/01', SiteA: 25200, SiteB: 17000 },
      { month: '08/01', SiteA: 26500, SiteB: 16600 },
      { month: '09/01', SiteA: 23300, SiteB: 14200 },
      { month: '10/01', SiteA: 18300, SiteB: 10300 },
      { month: '11/01', SiteA: 13900, SiteB: 6600 },
      { month: '12/01', SiteA: 9600, SiteB: 4800 },
    ]);
    dv.transform({
      type: 'fold',
      fields: ['SiteA', 'SiteB'], // 展开字段集
      key: 'key',
      value: 'dot',
    });
    return {
      axis: [
        { name: 'month' },
        { name: 'dot' },
      ],
      geom: [
        { position: 'month*dot', size: 2, color: 'key' },
        { position: 'month*dot', size: 4, color: 'key', shape: 'circle', style: { stroke: '#fff', lineWidth: 1 } },
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
        padding: [30, 30, 30, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="line.base" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
